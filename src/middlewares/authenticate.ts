import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Config } from '../config/config'

export interface RequestWithUser extends Request {
  user?: { id: string }
}

export const authenticateJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token) {
    try {
      const user = jwt.verify(token, Config.accessTokenSecret)
      req.user = user as { id: string }
      next()
    } catch (err) {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(401)
  }
}
