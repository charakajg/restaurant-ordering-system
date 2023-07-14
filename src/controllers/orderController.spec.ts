import request from 'supertest'
import { app } from '../main'
import { Order } from '../models/order'
import { DishItem } from '../models/dishItem'

describe('Order Controller', () => {
  beforeEach(async () => {
    // Clear the orders and dish items tables before each test
    await Order.destroy({ truncate: true })
    await DishItem.destroy({ truncate: true })
  })

  describe('POST /order', () => {
    test('should place a new order', async () => {
      // Create a dish item for the order
      const dish = await DishItem.create({
        name: 'Chicken Tikka',
        description: 'Delicious chicken tikka dish',
        price: 10.99,
        categoryId: 1,
      })

      const newOrder = {
        userId: 'user123',
        dishId: dish.id,
        quantity: 2,
      }

      const response = await request(app).post('/order').send(newOrder)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('userId', newOrder.userId)
      expect(response.body).toHaveProperty('dishId', newOrder.dishId)
      expect(response.body).toHaveProperty('quantity', newOrder.quantity)
      expect(response.body).toHaveProperty('price', dish.price * newOrder.quantity)

      // Check if the order is saved in the database
      const savedOrder = await Order.findByPk(response.body.id)
      expect(savedOrder).not.toBeNull()
      expect(savedOrder?.userId).toBe(newOrder.userId)
      expect(savedOrder?.dishId).toBe(newOrder.dishId)
      expect(savedOrder?.quantity).toBe(newOrder.quantity)
      expect(savedOrder?.price).toBe(dish.price * newOrder.quantity)
    })

    test('should return an error with invalid order data', async () => {
      const invalidOrder = {
        userId: 'user123',
        dishId: 'invalid',
        quantity: 'invalid',
      }

      const response = await request(app).post('/order').send(invalidOrder)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', 'Invalid order data')
    })

    test('should return an error with non-existent dish id', async () => {
      const newOrder = {
        userId: 'user123',
        dishId: 999,
        quantity: 2,
      }

      const response = await request(app).post('/order').send(newOrder)

      expect(response.status).toBe(500)
      expect(response.body).toHaveProperty('error', 'An error occurred')
    })
  })

  describe('GET /orders', () => {
    beforeEach(async () => {
      // Create sample orders
      await Order.bulkCreate([
        {
          userId: 'user123',
          dishId: 1,
          quantity: 2,
          price: 21.98,
          timestamp: new Date(),
          status: 'Pending',
        },
        {
          userId: 'user456',
          dishId: 2,
          quantity: 1,
          price: 9.99,
          timestamp: new Date(),
          status: 'Completed',
        },
      ])
    })

    test('should get all orders', async () => {
      const response = await request(app).get('/orders')

      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(2)
    })

    // Add test cases for pagination and filtering if needed
  })

  describe('PUT /order/:id/status', () => {
    beforeEach(async () => {
      // Create an order for update tests
      await Order.create({
        userId: 'user123',
        dishId: 1,
        quantity: 2,
        price: 21.98,
        timestamp: new Date(),
        status: 'Pending',
      })
    })

    test('should update the status of an order', async () => {
      const orderId = 1
      const newStatus = 'Completed'

      const response = await request(app).put(`/order/${orderId}/status`).send({ status: newStatus })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', orderId)
      expect(response.body).toHaveProperty('status', newStatus)

      // Check if the order status is updated in the database
      const updatedOrder = await Order.findByPk(orderId)
      expect(updatedOrder).not.toBeNull()
      expect(updatedOrder?.status).toBe(newStatus)
    })

    test('should return an error with non-existent order id', async () => {
      const orderId = 999
      const newStatus = 'Completed'

      const response = await request(app).put(`/order/${orderId}/status`).send({ status: newStatus })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Order not found')
    })
  })
})
