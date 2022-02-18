import { Client, Message, ClientOptions, Collection, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { promisify } from 'util';
import { glob } from 'glob';
import path from 'path';
import consola from 'consola';
import dotenv from 'dotenv';
dotenv.config();
const globPromise = promisify(glob);

interface Event {
	(client: DiscordBot, ...args: any[]): Promise<void>;
}

interface Command {
	(client: DiscordBot, msg: Message, args?: string[]): Promise<void>;
}

interface DiscordBotArgs {
	token: string
	clientId: string
	guildId: string
}


class DiscordBot extends Client {

	private prefix: string = '!';
	public inDevMode = process.env.NODE_ENV === 'development';
	public console = consola;
	private commands: Collection<string, Command> = new Collection();
	private interactions: Collection<string, Interaction> = new Collection();
	private events: Collection<string, Event> = new Collection();

	public getCommands() {
		return this.commands;
	}

	public getEvents() {
		return this.events;
	}

	public getInteractions() {
		return this.interactions;
	}

	public getCommandPrefix() {
		return this.prefix;
	}

	public setCommandPrefix(newPrefix: string) {
		this.prefix = newPrefix;
	}

	private async setEvents(eventFiles: string[]) {
		await Promise.all(eventFiles.map(async (filePath: string) => {
			const name: string = path.parse(filePath).name
			const event: Event = (await import(filePath)).default;
			this.events.set(name, event);
			this.on(name, event.bind(null, this));
		}));
	}

	private async setCommands(commandFiles: string[]) {
		await Promise.all(commandFiles.map(async (filePath: string) => {
			const name: string = path.parse(filePath).name
			const command: Event = (await import(filePath)).default;
			this.commands.set(name, command);
		}));
	}

	private async setSlashCommands(commandFiles: string[], args: DiscordBotArgs) {

		const rest = new REST({ version: '9' }).setToken(args.token);

		let slashCommands = await Promise.all(commandFiles.map(async (filePath: string) => {
			const command = (await import(filePath)).default;
			this.interactions.set(command.data.name, command);
			return command.data.toJSON();
		}));


		(async () => {
			try {
				await rest.put(
					this.inDevMode ?
						Routes.applicationGuildCommands(args.clientId, args.guildId)
						: Routes.applicationCommands(args.clientId),
					{ body: slashCommands },
				);
			} catch (error) {
				console.error(error);
			}
		})();
	}

	public constructor(intents: ClientOptions, args: DiscordBotArgs) {
		super(intents);
		this.start(args)
	}

	private async start(args: DiscordBotArgs) {
		await this.setCommands(await globPromise(`${process.cwd()}/src/commands/**/*{.ts,.js}`));
		await this.setEvents(await globPromise(`${process.cwd()}/src/events/**/*{.ts,.js}`));
		await this.setSlashCommands(await globPromise(`${process.cwd()}/src/interactions/**/*{.ts,.js}`), args);
		this.login(args.token)
	}
}



export default DiscordBot;
