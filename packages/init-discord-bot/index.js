#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import fse from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { createSpinner } from "nanospinner";

let projectName = "my-discord-bot";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __userDirname = process.cwd();
const newProjectPath = `${__userDirname}/${projectName}`;
const jsTemplate = `${__dirname}/templates/javascript`;
const tsTemplate = `${__dirname}/templates/typescript`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function displayBanner() {
  console.log("\nImagine A Bot...");
  figlet.text(`DiscordBot`, { font: "Larry 3D" }, (err, data) => {
    console.log(gradient.teen.multiline(data));
  });
  await sleep(100);
}

async function getProjectName() {
  const answers = await inquirer.prompt({
    name: "bot_name",
    type: "input",
    message: "Enter Project Name",
    default() {
      return chalk.blueBright("my-discord-bot");
    },
  });
  if (answers.bot_name !== chalk.blueBright("my-discord-bot"))
    projectName = answers.bot_name;
}

async function getLanguagePrefrence() {
  const answers = await inquirer.prompt({
    name: "language",
    type: "list",
    message: "Which Language Template Do You Prefer?",
    choices: ["JavaScript", "TypeScript"],
  });
  return generateTemplate(answers.language == "JavaScript");
}

async function generateTemplate(isJavaScript) {
  const spinner = createSpinner("Generating...").start();
  await sleep(800);

  // Create template directory
  fse.mkdir(`./${projectName}`, { recursive: true });

  // Copy Templates to file path
  isJavaScript
    ? fse.copy(jsTemplate, newProjectPath)
    : fse.copy(tsTemplate, newProjectPath);

  // Success after loading
  spinner.success({ text: `Generated ${chalk.blue(projectName)}!\n` });

  // How to start Project
  console.log(chalk.blue(`You can start working on your project by typing:\n`));
  console.log(chalk.magenta(`> cd ${projectName}`));
  console.log(chalk.magenta(`> npm install`));
  console.log(chalk.magenta(`> npm run start`));

  console.log(chalk.blue(`\nDont forget your .env file!`));
  console.log(chalk.blue(`Happy Coding!`));
}

await displayBanner();
await getProjectName();
await getLanguagePrefrence();
