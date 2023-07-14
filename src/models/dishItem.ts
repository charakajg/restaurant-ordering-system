import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import { DishCategory } from './dishCategory'

interface DishItemInstance extends Model {
  id: number
  name: string
  description: string
  price: number
  rating: number
  image: string
  categoryId: number
}

export const DishItem = sequelize.define<DishItemInstance>(
  'DishItem',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  },
)

DishItem.belongsTo(DishCategory, { foreignKey: 'categoryId' })
