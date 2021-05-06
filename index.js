const Discord = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const xkcd = require("xkcd-api");
const client = new Discord.Client();

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  const prefix = "xkcd:";
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  if (msg.content === "xkcd:latest") {
    xkcd.latest(function (error, response) {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
        msg.channel.send(response.alt, { files: [response.img] });
      }
    });
  }

  if (msg.content === "xkcd:random") {
    xkcd.random(function (error, response) {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
        msg.channel.send(response.alt, { files: [response.img] });
      }
    });
  }
});

client.login(process.env.TOKEN);
