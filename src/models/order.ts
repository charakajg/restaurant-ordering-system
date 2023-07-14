import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import { User } from './user'
import { DishItem } from './dishItem'

interface OrderInstance extends Model {
  id: number
  userId: number
  dishId: number
  quantity: number
  price: number
  timestamp: Date
  status: string
}

export const Order = sequelize.define<OrderInstance>(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    dishId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
)

Order.belongsTo(User, { foreignKey: 'userId' })
Order.belongsTo(DishItem, { foreignKey: 'dishId' })
