import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/user'
import { Config } from '../config/config'

const PASSWORD_MASK = '****'

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = await User.create({ name, email, password: hashedPassword })
  newUser.password = PASSWORD_MASK
  res.json(newUser)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' })
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const accessToken = jwt.sign({ id: user.id }, Config.accessTokenSecret, { expiresIn: '1h' })
  const refreshToken = jwt.sign({ id: user.id }, Config.refreshTokenSecret)
  user.refreshToken = refreshToken
  await user.save()

  return res.json({ accessToken, refreshToken })
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshTokenFromUser = req.body.refreshToken
  if (!refreshTokenFromUser) {
    return res.status(403).json({ message: 'Refresh Token is required!' })
  }

  let userData
  try {
    userData = jwt.verify(refreshTokenFromUser, Config.refreshTokenSecret)
  } catch (e) {
    return res.status(403).json({ message: 'Invalid Refresh Token' })
  }

  const user = await User.findOne({ where: { id: (userData as jwt.JwtPayload).id } })
  if (!user || user.refreshToken !== refreshTokenFromUser) {
    return res.status(403).json({ message: 'Invalid Refresh Token' })
  }

  const newAccessToken = jwt.sign({ id: user.id }, Config.accessTokenSecret, { expiresIn: '1h' })
  const newRefreshToken = jwt.sign({ id: user.id }, Config.refreshTokenSecret)

  user.refreshToken = newRefreshToken
  await user.save()

  return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
}
