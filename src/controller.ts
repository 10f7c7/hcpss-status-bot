import { type Request, type Response } from 'express';
import {
  InteractionType,
  InteractionResponseType,
} from 'discord-interactions';
import { getHcpssStatus, channels, type data_storage } from './utils';
import db from "./models/index"

async function postInteractions(req: Request, res: Response): Promise<void> {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
    return
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'getstatus') {
      // Send a message into the channel where command was triggered from
      const data: data_storage = await getHcpssStatus()
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${data.date}\n${data.status}`,
        },
      });
      return
    }

    if (name === "register_channel") {
      console.log(req.body);
      db.Channel.create({ channelId: req.body.channel.id, guildId: req.body.guild.id })
      channels.push(req.body.channel.id)
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Channel Registered!`
        }
      })
      return;
    }

    console.error(`unknown command: ${name}`);
    res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  res.status(400).json({ error: 'unknown interaction type' });
}


const _ = {
  postInteractions
}

export default _;
