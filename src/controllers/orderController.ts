import { Request, Response } from 'express'
import Ajv from 'ajv'
import { Order } from '../models/order'
import { DishItem } from '../models/dishItem'
import { RequestWithUser } from '../middlewares/authenticate'

const ajv = new Ajv()
const orderSchema = {
  type: 'object',
  properties: {
    userId: { type: 'number' },
    dishId: { type: 'number' },
    quantity: { type: 'number', minimum: 1 },
  },
  required: ['userId', 'dishId', 'quantity'],
  additionalProperties: false,
}

export const placeOrder = async (req: RequestWithUser, res: Response) => {
  try {
    const { dishId, quantity } = req.body
    const userId = req.user ? req.user.id : null

    const isValid = ajv.validate(orderSchema, { userId: Number(userId), dishId: Number(dishId), quantity })
    if (!isValid) {
      let errorMessage = ''
      if (ajv.errors) {
        const errorMessages = ajv.errors.map(error => {
          const fieldName = error.instancePath.slice(1)
          return `${fieldName} ${error.message}`
        })
        errorMessage = ': ' + errorMessages.join('; ')
      }
      return res.status(400).json({ error: `Invalid order information${errorMessage}` })
    }

    // Calculate the price based on dish price and quantity
    const dish = await DishItem.findByPk(dishId)
    if (!dish) {
      return res.status(500).json({ error: 'An error occurred' })
    }

    const price = dish.price * quantity

    // Create a new order entry
    const order = await Order.create({
      userId,
      dishId,
      quantity,
      price,
      timestamp: new Date(),
      status: 'Pending',
    })

    return res.json(order)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    // Implement pagination and filtering based on the request parameters if needed
    const orders = await Order.findAll()

    return res.json(orders)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id
    const { status } = req.body

    const order = await Order.findByPk(orderId)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Update the order status
    order.status = status
    await order.save()

    return res.json(order)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}
