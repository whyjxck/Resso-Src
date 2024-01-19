const { EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Get the bot's invite link.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: true
        });

      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
        new ButtonBuilder()
          .setLabel("Support")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.gg/uYvTGBSrz6")
      );

    const mainPage = new EmbedBuilder()
      .setAuthor({name:`| Invite link `,
      iconURL:client.user.displayAvatarURL()})
      .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Requested by: ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
      .addFields([{ name: 'invite Sparky', value: `[Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)` }])
    await interaction.followUp({embeds: [mainPage], components: [row]})
  }
}
