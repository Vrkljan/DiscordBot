#!/user/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import consola from "consola";
import isValidFilename from "valid-filename";
import sanitize from "sanitize-filename";
import { execSync } from "child_process";

const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    consola.error(`Failed to execute '${command}'`, e);
    return false;
  }
  return true;
};

const printWelcomeTitle = async () => {
  consola.log("\n\nImagine A Bot...");
  figlet("Discord.JS", (err, data) => {
    consola.log(gradient.pastel.multiline(data));
  });
  await sleep();
};

const askProjectName = async () => {
  const answers = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What would you like to call your project?",
  });

  if (isValidFilename(answers.project_name))
    return sanitize(answers.project_name).replace(/ /g, "-");
  else return undefined;
};

/**
 * SCRIPT START
 */

await printWelcomeTitle();
const repoName = await askProjectName();

consola.log(`
  Creating ${chalk.blueBright(repoName)}...
`);

if (
  !runCommand(
    `git clone --depth 1 https://github.com/Vrkljan/discord.js.git ${repoName}`
  )
)
  process.exit(1);

if (!runCommand(`cd ${repoName} && npm install`)) process.exit(1);
