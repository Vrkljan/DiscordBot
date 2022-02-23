<p align="center">
  <img src="https://github.com/Vrkljan/DiscordBot/blob/68ccaff4f8e59b0f73a0a68f09de8958b8c9eeb2/assets/discordbot.PNG" alt="DiscordBot Banner"  >
</p>

<h3 align="center">
  Init-Discord-Bot CLI
</h3>

<hr/>

<p align="center" >This CLI tool helps users init projects for DiscordBot using npx</p>

## Getting Started

To start, run ``npx init-discord-bot@latest`` to generate a project:

```
npx init-discord-bot@latest
```

After you have cloned the project, you need to cd and install the dependencies:
```
cd <project name>
npm install
```
Make sure you as well change the ``.env.example`` to just ``.env`` and populate the varibles inside:
```
BOT_TOKEN = <Your Discord Bot Token>
DISCORD_CLIENT_ID = <Your Discord Client ID>
DISCORD_GUILD_ID = <Your Discord Guild/Server ID you are doing development in>
NODE_ENV = development
```
