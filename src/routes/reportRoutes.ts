import { Router } from 'express'
import {
  getTotalSalesReport,
  getTopSellingMenuItemsReport,
  getAverageOrderValueReport,
} from '../controllers/reportController'

const router = Router()

/**
 * @swagger
 * /reports/total-sales:
 *   get:
 *     summary: Get total sales report
 *     tags: [Reporting]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date for the report (format: yyyy-mm-dd)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date for the report (format: yyyy-mm-dd)
 *     responses:
 *       '200':
 *         description: Total sales report retrieved successfully.
 *       '500':
 *         description: An error occurred while retrieving the total sales report.
 */
router.get('/total-sales', getTotalSalesReport)

/**
 * @swagger
 * /reports/top-selling-menu-items:
 *   get:
 *     summary: Get top-selling menu items report
 *     tags: [Reporting]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [totalOrders, totalRevenue]
 *         description: Sorting criteria for the report (e.g., "totalOrders", "totalRevenue")
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of top-selling items to retrieve
 *     responses:
 *       '200':
 *         description: Top-selling menu items report retrieved successfully.
 *       '500':
 *         description: An error occurred while retrieving the top-selling menu items report.
 */
router.get('/top-selling-menu-items', getTopSellingMenuItemsReport)

/**
 * @swagger
 * /reports/average-order-value:
 *   get:
 *     summary: Get average order value report
 *     tags: [Reporting]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date for the report (format: yyyy-mm-dd)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date for the report (format: yyyy-mm-dd)
 *     responses:
 *       '200':
 *         description: Average order value report retrieved successfully.
 *       '500':
 *         description: An error occurred while retrieving the average order value report.
 */
router.get('/average-order-value', getAverageOrderValueReport)

export default router
