import { type Request, type Response } from 'express';
import {
  InteractionType,
  InteractionResponseType,
} from 'discord-interactions';
import { getHcpssStatus, type data_storage } from './utils';
import db from "./models/index"

async function postInteractions(req: Request, res: Response): Promise<void> {
  // Interaction type and data
  const { type, data } = req.body;


  if (type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
    return
  }


  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    console.log(data);

    if (name === 'getstatus') {
      // Send a message into the channel where command was triggered from
      const data: data_storage = await getHcpssStatus()
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // content: `${data.date}\n${data.status}`,
          embeds: [{
            title: data.status,
            description: data.block.replace("Staff\n", "**Staff**"),
            color: data.color,
            author: { name: data.date }
          }]
        },
      });
      return
    }

    if (name === "register_channel") {

      const [, created] = await db.Channel.findOrCreate({
        where: {
          channelId: req.body.channel.id
        },
        defaults: {
          guildId: req.body.guild?.id
        }
      })

      if (!created) {
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Channel Already Registered."
          }
        });
        return;
      }

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Channel Registered!`
        }
      })
      return;
    }

    if (name === "register_role_ping") {
      console.log(req.body.data.options[0].value);
      const [, created] = await db.Role.findOrCreate({
        where: {
          roleId: req.body.data.options[0].value
        },
        defaults: {
          guildId: req.body.guild.id
        }
      });
      if (!created) {
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Role Already Registered."
          }
        });
        return;
      }

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Role Registered!`
        }
      })
      return;
    }

    console.error(`unknown command: ${name}`);
    res.status(400).json({ error: 'unknown command' })
    return;
  }

  console.error('unknown interaction type', type);
  res.status(400).json({ error: 'unknown interaction type' });
  return;
}


const _ = {
  postInteractions
}

export default _;
