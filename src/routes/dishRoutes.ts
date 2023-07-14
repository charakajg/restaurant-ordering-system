import { Router } from 'express'
import { upload } from '../config/multer'
import { createDish, getDish, updateDish, deleteDish, getAllDishes } from '../controllers/dishController'
import { authenticateJWT } from '../middlewares/authenticate'

const router = Router()

/**
 * @swagger
 * /dishes:
 *   post:
 *     summary: Create a new dish
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               categoryId:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - name
 *               - description
 *               - price
 *               - categoryId
 *     responses:
 *       '200':
 *         description: Dish created successfully.
 *       '500':
 *         description: An error occurred while creating the dish.
 */
router.post('/', authenticateJWT, upload.single('image'), createDish)

/**
 * @swagger
 * /dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Menu Management]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: An error occurred
 */
router.get('/', getAllDishes)

/**
 * @swagger
 * /dishes/{id}:
 *   get:
 *     summary: Get a dish by id
 *     tags: [Menu Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: An error occurred
 */
router.get('/:id', getDish)

/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish id
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               categoryId:
 *                 type: number
 *             required:
 *               - name
 *               - description
 *               - price
 *               - categoryId
 *     responses:
 *       '200':
 *         description: Dish updated successfully
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: An error occurred
 */
router.put('/:id', authenticateJWT, updateDish)

/**
 * @swagger
 * /dishes/{id}:
 *   delete:
 *     summary: Delete a dish
 *     tags: [Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Dish deleted successfully
 *       '404':
 *         description: Dish not found
 *       '500':
 *         description: An error occurred
 */
router.delete('/:id', authenticateJWT, deleteDish)

export default router
