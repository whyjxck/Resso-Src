const User = require("../../schema/PremiumUser");
const { EmbedBuilder } = require('discord.js');
const Redeem = require("../../schema/Redeem");
const moment = require('moment')

module.exports = {
    name: "rp",
    category: "Information",
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: true,
 execute: async (message, args, client, prefix) => {

  const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return message.reply({
        content: `> Mention a User `,
      });
    }
    let data = client.premiums.get(user.id);
    if (!data?.isPremium) {
      return message.reply({
        content: `\`${user.user.username}\` is Not a Premium User`,
      });
    } else {
      await User.findOneAndRemove({ Id: user.id });
      await client.premiums.delete(user.id);
      return message.reply({
        content: `Premium Removed From \`${user.user.username}\``,
      });
    }
  },
};