import DiscordBot from "discord-bot-app";
import { Message } from "discord.js";

export default async (client: DiscordBot, msg: Message) => {
	// Check for prefix and that message isn't from a bot and comes from a server(guild).
	if (!msg.content.startsWith(client.getCommandPrefix()) || msg.author.bot || !msg.guild)
		return;

	// Split up the command arguments, remove prefix.
	const args = msg.content.slice(client.getCommandPrefix().length).trim().split(/ +/);

	// Pop Command from Args array
	const command = args.shift();

	// If command doesnt exist then ignore
	if (!client.getCommands().has(command!)) return;

	// Run the command
	client.getCommands().get(command!)!(client, msg, args);
}
