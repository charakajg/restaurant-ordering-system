import { Request, Response } from 'express'
import { User } from '../models/user'
import * as authController from '../controllers/authController'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Config } from '../config/config'
import { mock } from 'jest-mock-extended'

// Mock the User model and bcrypt functions
jest.mock('../models/user')
jest.mock('bcryptjs')

// Create mock instances
const UserMock = User as jest.Mocked<typeof User>
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>
const jwtMock = jwt as jest.Mocked<typeof jwt>

describe('AuthController', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    UserMock.create.mockClear()
    UserMock.findOne.mockClear()
    bcryptMock.hashSync.mockClear()
    bcryptMock.compare.mockClear()
    jwtMock.sign.mockClear()
    jwtMock.verify.mockClear()
  })

  it('should register a user', async () => {
    const req = mock<Request>()
    const res = mock<Response>()
    req.body = { name: 'John', email: 'john@example.com', password: 'yourpassword' }

    bcryptMock.hashSync.mockReturnValue('hashedpassword')

    await authController.register(req, res)

    expect(bcryptMock.hashSync).toHaveBeenCalledWith('yourpassword', 10)
    expect(UserMock.create).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      password: 'hashedpassword',
    })
    expect(res.json).toHaveBeenCalledWith(expect.any(Object)) // expect any object
  })

  it('should login a user', async () => {
    const req = mock<Request>()
    const res = mock<Response>()
    req.body = { email: 'john@example.com', password: 'yourpassword' }

    const mockUser = { id: 1, email: 'john@example.com', password: 'hashedpassword', refreshToken: 'refreshToken' }
    UserMock.findOne.mockResolvedValue(mockUser as any)
    //bcryptMock.compare.mockResolvedValue(true)

    await authController.login(req, res)

    expect(UserMock.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } })
    expect(bcryptMock.compare).toHaveBeenCalledWith('yourpassword', 'hashedpassword')
    expect(jwtMock.sign).toHaveBeenCalledWith({ id: mockUser.id }, Config.accessTokenSecret, { expiresIn: '1h' })
    expect(res.json).toHaveBeenCalledWith({ accessToken: expect.any(String), refreshToken: expect.any(String) })
  })

  it('should refresh tokens', async () => {
    const req = mock<Request>()
    const res = mock<Response>()
    req.body = { refreshToken: 'oldRefreshToken' }

    const mockUser = {
      id: 1,
      email: 'john@example.com',
      password: 'hashedpassword',
      refreshToken: 'oldRefreshToken',
      save: jest.fn(),
    }
    jwtMock.verify.mockReturnValue({ id: mockUser.id } as any)
    UserMock.findOne.mockResolvedValue(mockUser as any)

    await authController.refreshToken(req, res)

    expect(jwtMock.verify).toHaveBeenCalledWith('oldRefreshToken', Config.refreshTokenSecret)
    expect(UserMock.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } })
    expect(jwtMock.sign).toHaveBeenCalledTimes(2) // Called twice for new access and refresh tokens
    expect(mockUser.save).toHaveBeenCalled() // The new refreshToken is saved to the user
    expect(res.json).toHaveBeenCalledWith({ accessToken: expect.any(String), refreshToken: expect.any(String) })
  })
})
