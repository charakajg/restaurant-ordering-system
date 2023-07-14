import { Request, Response } from 'express'
import { DishCategory } from '../models/dishCategory'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const image = req.file ? req.file.filename : ''

    const category = await DishCategory.create({ name, image })
    return res.json(category)
  } catch (error) {
    return res.status(500).json({ error: `An error occurred: ${JSON.stringify(error)}` })
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id
    const category = await DishCategory.findByPk(categoryId)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    return res.json(category)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id
    const { name } = req.body

    const category = await DishCategory.findByPk(categoryId)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    category.name = name

    await category.save()

    return res.json(category)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id

    const category = await DishCategory.findByPk(categoryId)

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    await category.destroy()

    return res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await DishCategory.findAll()

    return res.json(categories)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' })
  }
}
