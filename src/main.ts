#!/usr/bin/env node

import 'dotenv/config'
import express from 'express'
import { Config } from './config/config'

import { resolve } from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger'

import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import dishRoutes from './routes/dishRoutes'
import orderRoutes from './routes/orderRoutes'
import reportRoutes from './routes/reportRoutes'

const nodePath = resolve(process.argv[1])
const modulePath = resolve(fileURLToPath(import.meta.url))
const isCLI = nodePath === modulePath

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/dishes', dishRoutes)
app.use('/orders', orderRoutes)
app.use('/reports', reportRoutes)

export default function main(port: number = Config.port) {
  if (isCLI) {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  }
}

if (isCLI) {
  main()
}

export { app }
