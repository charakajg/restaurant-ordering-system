import { faker } from '@faker-js/faker'
import { DishItem } from '../models/dishItem'
import { DishCategory } from '../models/dishCategory'

export const seedCategories = async () => {
  try {
    const categoryCount = 12 // Number of dish categories to generate

    for (let i = 0; i < categoryCount; i++) {
      const name = faker.lorem.word()

      await DishCategory.create({ name })
    }

    console.log('Dish category seeding completed')
  } catch (error) {
    console.error('Dish category seeding error:', error)
  }
}

export const seedDishes = async () => {
  try {
    const dishCount = 150 // Number of dishes to generate

    for (let i = 0; i < dishCount; i++) {
      const name = faker.lorem.word()
      const description = faker.lorem.sentence()
      const price = faker.datatype.number({ min: 5, max: 50 })
      const rating = faker.datatype.number({ min: 1, max: 5 })
      const categoryId = faker.datatype.number({ min: 1, max: 10 })

      await DishItem.create({ name, description, price, rating, categoryId })
    }

    console.log('Dish seeding completed')
  } catch (error) {
    console.error('Dish seeding error:', error)
  }
}
