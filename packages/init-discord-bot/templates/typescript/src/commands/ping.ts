import DiscordBot from "discord-bot-app";
import { Message } from "discord.js";

export default async (client: DiscordBot, msg: Message) => {
	msg.reply("Pong!");
}
