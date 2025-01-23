import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'


export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare roleId: number
  declare guildId: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>


  static initModel(sequelize: Sequelize): typeof Role {
    Role.init({
      roleId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      guildId: {
        type: DataTypes.BIGINT,
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
      tableName: "roles"
    })

    return Role
  }
}
