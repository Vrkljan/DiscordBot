//@ts-ignore
import DiscordBot from "discord-ts-bot";

export default async (client: DiscordBot) => {
	client.console.success(`${client.user!.tag} is now Online.`);
}