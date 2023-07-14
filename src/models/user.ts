import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

interface UserInstance extends Model {
  id: number
  name: string
  email: string
  password: string
  refreshToken: string // add this
}

export const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
)
