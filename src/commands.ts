import 'dotenv/config';
import { InstallGlobalCommands } from './utils';

// Simple test command
const GET_STATUS_COMMAND = {
  name: 'getstatus',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const REGISTER_CHANNEL_COMMAND = {
  name: "register_channel",
  description: "registers channel to receive updates",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2]
}

const REGISTER_ROLE_PING_COMMAND = {
  name: "register_role_ping",
  description: "registers a role to be pinged upon status change",
  type: 1,
  integration_types: [0],
  contexts: [0],
  options: [
    {
      name: "role",
      type: 8,
      description: "role that you want to get pinged",
      required: true
    }
  ]
}


const ALL_COMMANDS = [GET_STATUS_COMMAND, REGISTER_CHANNEL_COMMAND, REGISTER_ROLE_PING_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
