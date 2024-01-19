const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const PremiumUser = require("../../schema/PremiumUser");
const moment = require('moment')
module.exports = {
    name: "badges",
    category: "Information",
    aliases: [ "profile", "pr" ],
    description: "user profile",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    voteonly: false,
   execute: async (message, args, client, prefix) => {

  const PremiumPlan = await PremiumUser.findOne({ Id: message.author.id })
     let user = await PremiumUser.findOne({ Id: message.author.id })
     
     if(!user) user = await PremiumUser.create({ Id: message.author.id }) 
       
  //   const expires = moment(PremiumPlan.premium.expiresAt).format('dddd, MMMM Do YYYY HH:mm:ss');

		try {
		if (user && user.isPremium) {
            const embed = new EmbedBuilder()
        .setAuthor({name:`|Premium profile `,
      iconURL:message.author.displayAvatarURL()})
                .setDescription(`*User*: \`${message.author.tag}\`\n*Plan*: \`${PremiumPlan.premium.plan}\``)
                .setColor(client.embedColor)

            return message.channel.send({ embeds: [embed] });

		} else {
			const Premiumed = new EmbedBuilder()
       .setColor(client.embedColor)
  .setAuthor({name:`|Premium required `,
      iconURL:message.author.displayAvatarURL()})
          .setDescription("Oops! Looks like your not my premium user.!")
          .addFields([{ name: 'Want premium join here',value: `[Here](https://discord.gg/uYvTGBSrz6)` }])
          const row = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()
    .setLabel("vote Me")
    .setStyle(ButtonStyle.Link)
    .setEmoji("<:topgg:1082905644287402005>")
              .setURL("https://top.gg/bot/1023571747133468703/vote"), 
    new ButtonBuilder()
    .setLabel("support server")
    .setStyle(ButtonStyle.Link)
      .setEmoji("<:invite:1082905857446133820>")             
    .setURL("https://discord.gg/uYvTGBSrz6")
			);
          return message.channel.send({embeds: [Premiumed], components: [row]});
	  	}
	    } catch (err) {
		  	console.log(err)
		 	message.channel.send({ content: "Something went wrong, try again later." })
	    }
	}
};