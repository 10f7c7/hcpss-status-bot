import * as cheerio from 'cheerio';
import 'dotenv/config';

export interface data_storage {
  date: string;
  status: string;
  block?: string;
  color?: number;
}



export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export async function getHcpssStatus() {
  const html = await fetch("https://status.hcpss.org")

  const $ = cheerio.load(await html.text());
  const section = $("#status-block div").html();
  const data = cheerio.load(section);
  let block: string = "";
  const body = data("body").children()


  for (let j = 0; j < body.length; j++) {
    if (body[j].tagName == "h2") continue;
    if (body[j].tagName == "p") {
      block += body[j].children[0].data + "\n\n";
      continue;
    }
    if (body[j].tagName == "h3") {
      block += `**${body[j].children[0].data}** \n`;
      continue;
    }
    if (body[j].tagName == "ul") {
      for (let k = 0; k < body[j].children.length; k++) {
        if (body[j].children[k].tagName == "li") {
          block += `- ${body[j].children[k].children[0].data} \n`
        }
      }
      continue;
    }

    console.log(body[j].tagName)

  }
  const colorWord = $("#status-block div").css()['border-left'].split(" ")[2]

  let color: number;

  switch (colorWord) {
    case "grey":
    case "gray": {
      color = 0x808080
      break;
    }
    case "green": {
      color = 0x008000
    }

  }




  const dataReturn: data_storage = {
    date: data("h2").text().split("\n")[0],
    status: data("h2").text().split("\n")[1].trim(),
    block: block.replace("undefined", ""),
    color: color
  }

  return dataReturn;
}

export const channels: Array<string> = [];




export const prevData: data_storage = { date: '', status: '' }; 
