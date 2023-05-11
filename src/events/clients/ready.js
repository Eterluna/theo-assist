module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      `Theo Assist | Bot is now logged in as ${client.user.tag} and online!`
    );
  },
};
