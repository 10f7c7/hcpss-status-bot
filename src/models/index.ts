import type { Sequelize } from 'sequelize'
import { Channel } from './channel.model'
import { Role } from './role.model'
import { PrevData } from './prevData.model'

const _ = {
  Channel,
  Role,
  PrevData
};

export default _;

export function initModels(sequelize: Sequelize) {
  Channel.initModel(sequelize);
  Role.initModel(sequelize);
  PrevData.initModel(sequelize);

  return {
    Channel,
    Role
  }
}
