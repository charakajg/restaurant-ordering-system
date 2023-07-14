import { Request, Response } from 'express'
import { DishItem } from '../models/dishItem'
import Ajv from 'ajv'

const ajv = new Ajv()
const dishSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number', minimum: 0 },
    rating: { type: 'number', minimum: 1, maximum: 5 },
    categoryId: { type: 'number' },
  },
  required: ['name', 'description', 'price', 'rating', 'categoryId'],
  additionalProperties: false,
}

export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price, rating, categoryId } = req.body
    const image = req.file ? req.file.filename : ''

    const isValid = ajv.validate(dishSchema, {
      name,
      description,
      price: Number(price),
      rating: Number(rating),
      categoryId: Number(categoryId),
    })
    if (!isValid) {
      let errorMessage = ''
      if (ajv.errors) {
        const errorMessages = ajv.errors.map(error => {
          const fieldName = error.instancePath.slice(1)
          return `${fieldName} ${error.message}`
        })
        errorMessage = ': ' + errorMessages.join('; ')
      }
      return res.status(400).json({ error: `Invalid dish information${errorMessage}` })
    }

    const dish = await DishItem.create({ name, description, price, rating, image, categoryId })
    return res.json(dish)
  } catch (error) {
    console.log(JSON.stringify(error))
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const getDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id
    const dish = await DishItem.findByPk(dishId)

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' })
    }

    return res.json(dish)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const updateDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id
    const { name, description, price, rating, categoryId } = req.body

    const dish = await DishItem.findByPk(dishId)

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' })
    }

    dish.name = name
    dish.description = description
    dish.price = price
    dish.rating = rating
    dish.categoryId = categoryId

    await dish.save()

    return res.json(dish)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id

    const dish = await DishItem.findByPk(dishId)

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' })
    }

    await dish.destroy()

    return res.json({ message: 'Dish deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await DishItem.findAll()

    return res.json(dishes)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}
