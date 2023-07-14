import { Router } from 'express'
import { placeOrder, getOrders, updateOrderStatus } from '../controllers/orderController'
import { authenticateJWT } from '../middlewares/authenticate'

const router = Router()

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Order Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               dishId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             example:
 *               userId: 1
 *               dishId: 1
 *               quantity: 2
 *     responses:
 *       '200':
 *         description: Order placed successfully.
 *       '500':
 *         description: An error occurred while placing the order.
 */
router.post('/', authenticateJWT, placeOrder)

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order Management]
 *     responses:
 *       '200':
 *         description: List of orders retrieved successfully.
 *       '500':
 *         description: An error occurred while retrieving the orders.
 */
router.get('/', getOrders)

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Order Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: Completed
 *     responses:
 *       '200':
 *         description: Order status updated successfully.
 *       '404':
 *         description: Order not found.
 *       '500':
 *         description: An error occurred while updating the order status.
 */
router.put('/:id/status', authenticateJWT, updateOrderStatus)

export default router
