import { Router } from 'express'
import { upload } from '../config/multer'
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from '../controllers/categoryController'
import { authenticateJWT } from '../middlewares/authenticate'

const router = Router()

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Category created successfully.
 *       '500':
 *         description: An error occurred while creating the category.
 */

router.post('/', authenticateJWT, upload.single('image'), createCategory)

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Menu Management]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: An error occurred
 */
router.get('/', getAllCategories)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by id
 *     tags: [Menu Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: An error occurred
 */
router.get('/:id', getCategory)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category id
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: An error occurred
 */
router.put('/:id', authenticateJWT, updateCategory)

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: An error occurred
 */
router.delete('/:id', authenticateJWT, deleteCategory)

export default router
