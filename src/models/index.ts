import type { Sequelize } from 'sequelize'
import { Channel } from './channel.model'
import { Role } from './role.model'

const _ = {
  Channel,
  Role
};

export default _;

export function initModels(sequelize: Sequelize) {
  Channel.initModel(sequelize)
  Role.initModel(sequelize)


  return {
    Channel,
    Role
  }
}
