import { Order } from '../models/order'
import { DishItem } from '../models/dishItem'
import { faker } from '@faker-js/faker'

export const seedOrders = async () => {
  try {
    const orderCount = 10000 // Number of orders to generate

    for (let i = 0; i < orderCount; i++) {
      const userId = faker.datatype.number({ min: 1, max: 100 }) // Assuming you have 100 users
      const dishId = faker.datatype.number({ min: 1, max: 100 }) // Assuming you have 100 dish items
      const quantity = faker.datatype.number({ min: 1, max: 5 })
      const dish = await DishItem.findByPk(dishId)
      if (!dish) {
        console.error('Unable to find a dish with id: ', dishId)
        continue
      }
      const price = dish.price * quantity

      await Order.create({
        userId,
        dishId,
        quantity,
        price,
        timestamp: faker.date.past(),
        status: faker.helpers.arrayElement(['Pending', 'Completed']),
      })
    }

    console.log('Order seeding completed')
  } catch (error) {
    console.error('Order seeding error:', error)
  }
}
