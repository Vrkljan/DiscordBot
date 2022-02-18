module.exports = async (client, int) => {
  // If Command doesnt exist, return
  if (!int.isCommand()) return;

  // Get Command from Collection
  const command = client.getInteractions().get(int.commandName);

  // Make sure we grabed the command
  if (!command) return;

  // Try and execute the command
  try {
    await command.execute(int);
  } catch (error) {
    client.console.error(error);
    await int.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
