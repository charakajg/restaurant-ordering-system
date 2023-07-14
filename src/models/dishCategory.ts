import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

interface DishCategoryInstance extends Model {
  id: number
  name: string
  image: string
}

export const DishCategory = sequelize.define<DishCategoryInstance>(
  'DishCategory',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
)
