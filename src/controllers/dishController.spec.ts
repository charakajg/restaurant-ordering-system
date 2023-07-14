import request from 'supertest'
import { app } from '../main'
import { DishItem } from '../models/dishItem'

describe('Dish Controller', () => {
  beforeEach(async () => {
    // Clear the dish items table before each test
    await DishItem.destroy({ truncate: true })
  })

  describe('POST /dish', () => {
    test('should create a new dish', async () => {
      const newDish = {
        name: 'Chicken Tikka',
        description: 'Delicious chicken tikka dish',
        price: 10.99,
        categoryId: 1,
      }

      const response = await request(app).post('/dish').send(newDish)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('name', newDish.name)
      expect(response.body).toHaveProperty('description', newDish.description)
      expect(response.body).toHaveProperty('price', newDish.price)
      expect(response.body).toHaveProperty('categoryId', newDish.categoryId)

      // Check if the dish is saved in the database
      const savedDish = await DishItem.findByPk(response.body.id)
      expect(savedDish).not.toBeNull()
      expect(savedDish?.name).toBe(newDish.name)
      expect(savedDish?.description).toBe(newDish.description)
      expect(savedDish?.price).toBe(newDish.price)
      expect(savedDish?.categoryId).toBe(newDish.categoryId)
    })
  })

  describe('GET /dish/:id', () => {
    beforeEach(async () => {
      // Create a dish item for get tests
      const newDish = {
        name: 'Chicken Tikka',
        description: 'Delicious chicken tikka dish',
        price: 10.99,
        categoryId: 1,
      }
      await DishItem.create(newDish)
    })

    test('should get a dish by id', async () => {
      const dishId = 1

      const response = await request(app).get(`/dish/${dishId}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', dishId)
    })

    test('should return an error with non-existent dish id', async () => {
      const dishId = 999

      const response = await request(app).get(`/dish/${dishId}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Dish not found')
    })
  })

  describe('PUT /dish/:id', () => {
    beforeEach(async () => {
      // Create a dish item for update tests
      const newDish = {
        name: 'Chicken Tikka',
        description: 'Delicious chicken tikka dish',
        price: 10.99,
        categoryId: 1,
      }
      await DishItem.create(newDish)
    })

    test('should update a dish by id', async () => {
      const dishId = 1
      const updatedDish = {
        name: 'Chicken Biryani',
        description: 'Spicy chicken biryani dish',
        price: 12.99,
        categoryId: 2,
      }

      const response = await request(app).put(`/dish/${dishId}`).send(updatedDish)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', dishId)
      expect(response.body).toHaveProperty('name', updatedDish.name)
      expect(response.body).toHaveProperty('description', updatedDish.description)
      expect(response.body).toHaveProperty('price', updatedDish.price)
      expect(response.body).toHaveProperty('categoryId', updatedDish.categoryId)

      // Check if the dish is updated in the database
      const updatedDishItem = await DishItem.findByPk(dishId)
      expect(updatedDishItem).not.toBeNull()
      expect(updatedDishItem?.name).toBe(updatedDish.name)
      expect(updatedDishItem?.description).toBe(updatedDish.description)
      expect(updatedDishItem?.price).toBe(updatedDish.price)
      expect(updatedDishItem?.categoryId).toBe(updatedDish.categoryId)
    })

    test('should return an error with non-existent dish id', async () => {
      const dishId = 999
      const updatedDish = {
        name: 'Chicken Biryani',
        description: 'Spicy chicken biryani dish',
        price: 12.99,
        categoryId: 2,
      }

      const response = await request(app).put(`/dish/${dishId}`).send(updatedDish)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Dish not found')
    })
  })

  describe('DELETE /dish/:id', () => {
    beforeEach(async () => {
      // Create a dish item for delete tests
      const newDish = {
        name: 'Chicken Tikka',
        description: 'Delicious chicken tikka dish',
        price: 10.99,
        categoryId: 1,
      }
      await DishItem.create(newDish)
    })

    test('should delete a dish by id', async () => {
      const dishId = 1

      const response = await request(app).delete(`/dish/${dishId}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Dish deleted successfully')

      // Check if the dish is deleted from the database
      const deletedDish = await DishItem.findByPk(dishId)
      expect(deletedDish).toBeNull()
    })

    test('should return an error with non-existent dish id', async () => {
      const dishId = 999

      const response = await request(app).delete(`/dish/${dishId}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Dish not found')
    })
  })
})
