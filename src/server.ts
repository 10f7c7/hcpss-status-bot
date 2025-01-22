import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware
} from 'discord-interactions';
import { DiscordRequest, getHcpssStatus, channels, type data_storage, prevData } from './utils';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function(req, res) {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
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
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${data.date}\n${data.status}`,
        },
      });
    }

    if (name === "register_channel") {
      console.log(req.body.channel.id);
      channels.push(req.body.channel.id)
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Channel Registered!`
        }
      })
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});



async function checkStatus() {
  if (!channels.length) return;

  const data: data_storage = await getHcpssStatus();

  if (prevData.date == data.date && prevData.status == data.status) return;
  if (prevData.date != data.date && data.status.includes("Normal")) return;


  console.log("channels", channels)
  for (let i = 0; i < channels.length; i++) {
    console.log("channel", channels[i])
    DiscordRequest(`/channels/${channels[i]}/messages`, {
      method: 'POST',
      body: {
        tts: false,
        embeds: [{
          title: data.status,
          description: data.block.replace("Staff\n", "**Staff**"),
          color: data.color,
          author: { name: data.date }
        }]
      }
    })

  }

  prevData.date = data.date;
  prevData.status = data.status;


}

const check = setInterval(checkStatus, 10000)


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
