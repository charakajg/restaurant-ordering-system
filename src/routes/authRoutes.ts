import { Router } from 'express'
import * as authController from '../controllers/authController'
import { RequestWithUser, authenticateJWT } from '../middlewares/authenticate'

const router = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               password: yourpassword
 *     responses:
 *       '200':
 *         description: The user has been successfully registered.
 *       '400':
 *         description: Email already exists.
 */
router.post('/register', authController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: test@t.com
 *               password: tpwd
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '400':
 *         description: Invalid email or password.
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh the JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: yourrefreshtoken
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully.
 *       '403':
 *         description: Invalid refresh token.
 */
router.post('/refresh-token', authController.refreshToken)

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Access protected resources
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: You are authenticated!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: number
 *             example:
 *               message: You are authenticated!
 *               userId: 1
 *       '401':
 *         description: Unauthorized access.
 *       '403':
 *         description: Forbidden
 */
router.get('/protected', authenticateJWT, (req: RequestWithUser, res) => {
  res.json({ message: 'You are authenticated!', userId: req.user ? req.user.id : null })
})

export default router
