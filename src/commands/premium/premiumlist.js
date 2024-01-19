const { EmbedBuilder, client } = require('discord.js');

module.exports = {
    name: "premiumlist",
    category: "Information",
    aliases: [ "plist" ],
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: true,
 execute: async (message, args, client, prefix) => {

  let data = client.premiums
      .filter((data) => data?.isPremium === true)
      .map((data) => {
        return `<@${data.Id}> **Plan** : \`${
          data.premium.plan
        }\` **Expire At** :  <t:${Math.floor(
          data.premium.expiresAt / 1000
        )}:F> `;
      });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`All Premium Users`)
          .setColor(client.embedColor)
          .setDescription(data.join("\n") || "No Premium User Found"),
      ],
    });
  },
};