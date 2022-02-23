//@ts-ignore
import DiscordBot from "discord-bot-app";

export default async (client: DiscordBot) => {
	client.console.success(`${client.user!.tag} is now Online.`);
}