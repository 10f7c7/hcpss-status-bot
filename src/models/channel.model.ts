import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'


export class Channel extends Model<
  InferAttributes<Channel>,
  InferCreationAttributes<Channel>
> {
  declare channelId: number
  declare guildId: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>


  static initModel(sequelize: Sequelize): typeof Channel {
    Channel.init({
      channelId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      guildId: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: "channels"
    })

    return Channel
  }
}
