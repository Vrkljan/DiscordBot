import DiscordBot from "discord-ts-bot";
import { Message } from "discord.js";

export default async (client: DiscordBot, msg: Message) => {
	msg.reply("Pong!");
}