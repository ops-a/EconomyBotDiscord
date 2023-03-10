require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const logger = require("./logger");
const performChecks = require("./functions/performChecks");
const handleBtns = require("./buttonHandlers/handleBtns");
const levelHandler = require("./functions/levelHandler");
const getUserInfo = require("./db/getUserInfo");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

console.log("Command files: ", commandFiles);
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// On message creation
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) {
    return;
  }

  const user = await getUserInfo(message.author.id);

  if (!user) {
    console.log("Message sent but user not registered. Ignoring it.");
    return;
  }
  try {
    await levelHandler(message);
  } catch (e) {
    console.log("Error in MessageCreate Event: ", e);
    logger.error("Error in MessageCreate Event: ", e);
  }
});

// On any interaction: application commands or button clicks
client.on(Events.InteractionCreate, async (interaction) => {
  // If not a slash command, return
  if (interaction.isButton()) {
    try {
      await handleBtns(interaction);
    } catch (e) {
      console.log("Error in InteractionCreate: ", e);
      logger.error("Error in InteractionCreate: ", e);
    }
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  // await levelHandler(interaction)
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} found!`);
    return;
  }

  try {
    const value = await performChecks(interaction);
    // Increase xp by 10.
    // await increaseXP(interaction.user.id)

    if (value) {
      try {
        await command.execute(interaction);
      } catch (e) {
        logger.error("Error in command.execute(): ", e);
      }
    }
  } catch (error) {
    console.error(error);
    logger.log("Error in performChecks(): ", e);
    await interaction.reply({
      content: "There was an error while executing this command.",
      ephemeral: true,
    });
  }

  // console.log(interaction);
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN);
