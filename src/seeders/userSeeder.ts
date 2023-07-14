import { faker } from '@faker-js/faker'
import { User } from '../models/user'

export const seedUsers = async () => {
  try {
    const users = []

    for (let i = 0; i < 150; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      users.push(user)
    }

    await User.bulkCreate(users)

    console.log(`${150} users seeded successfully.`)
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}
