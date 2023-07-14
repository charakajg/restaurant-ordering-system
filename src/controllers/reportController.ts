import { Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import Ajv from 'ajv'
import { sequelize } from '../config/database'

interface TotalSalesResult {
  totalSales: number
}

const ajv = new Ajv()
const topSellingReportSchema = {
  type: 'object',
  properties: {
    sortBy: { type: 'string', enum: ['totalOrders', 'totalRevenue'] },
    limit: { type: 'number', minimum: 1 },
  },
  additionalProperties: false,
}

export const getTotalSalesReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query

    const query = `
      SELECT SUM(price) AS totalSales
      FROM Orders
      WHERE timestamp >= :startDate AND timestamp <= :endDate;
    `

    const result = await sequelize.query<TotalSalesResult>(query, {
      replacements: { startDate, endDate },
      type: QueryTypes.SELECT,
    })

    const totalSales = result[0]?.totalSales || 0

    res.json({ totalSales })
  } catch (error) {
    console.error('Error retrieving total sales:', error)
    res.status(500).json({ error: 'An error occurred while retrieving total sales' })
  }
}

interface TopSellingMenuItem {
  id: number
  name: string
  totalOrders: number
  totalRevenue: number
}

export const getTopSellingMenuItemsReport = async (req: Request, res: Response) => {
  try {
    const { sortBy = 'totalOrders', limit = 10 } = req.query

    const isValid = ajv.validate(topSellingReportSchema, { sortBy, limit: Number(limit) })
    if (!isValid) {
      let errorMessage = ''
      if (ajv.errors) {
        const errorMessages = ajv.errors.map(error => {
          const fieldName = error.instancePath.slice(1)
          return `${fieldName} ${error.message}`
        })
        errorMessage = ': ' + errorMessages.join('; ')
      }
      return res.status(400).json({ error: `Invalid report request${errorMessage}` })
    }

    const query = `
      SELECT di.id, di.name, COUNT(o.id) AS totalOrders, SUM(o.price) AS totalRevenue
      FROM DishItems di
      JOIN Orders o ON di.id = o.dishId
      GROUP BY di.id, di.name
      ORDER BY ${sortBy} DESC
      LIMIT :limit;
    `

    const result = await sequelize.query<TopSellingMenuItem>(query, {
      replacements: { limit },
      type: QueryTypes.SELECT,
    })

    return res.json(result)
  } catch (error) {
    console.error('Error retrieving top-selling menu items:', error)
    return res.status(500).json({ error: 'An error occurred while retrieving top-selling menu items' })
  }
}

interface AverageOrderValueResult {
  averageOrderValue: number
}

export const getAverageOrderValueReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query

    const query = `
      SELECT AVG(price) AS averageOrderValue
      FROM Orders
      WHERE timestamp >= :startDate AND timestamp <= :endDate;
    `

    const result = await sequelize.query<AverageOrderValueResult>(query, {
      replacements: { startDate, endDate },
      type: QueryTypes.SELECT,
    })

    const averageOrderValue = result[0]?.averageOrderValue || 0

    res.json({ averageOrderValue })
  } catch (error) {
    console.error('Error retrieving average order value:', error)
    res.status(500).json({ error: 'An error occurred while retrieving average order value' })
  }
}
