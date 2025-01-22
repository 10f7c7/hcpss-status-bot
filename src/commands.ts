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


const ALL_COMMANDS = [GET_STATUS_COMMAND, REGISTER_CHANNEL_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
