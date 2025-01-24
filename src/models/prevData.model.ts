import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'


export class PrevData extends Model<
  InferAttributes<PrevData>,
  InferCreationAttributes<PrevData>
> {
  declare id: number
  declare date: string
  declare status: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>


  static initModel(sequelize: Sequelize): typeof PrevData {
    PrevData.init({
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: "prevDatas"
    })

    return PrevData
  }
}
