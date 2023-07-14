import 'dotenv/config'

import { seedUsers } from './userSeeder'
import { seedCategories, seedDishes } from './dishSeeder'
import { seedOrders } from './orderSeeder'

await seedUsers()
await seedCategories()
await seedDishes()
await seedOrders()
