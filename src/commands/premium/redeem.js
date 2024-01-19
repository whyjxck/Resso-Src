const PremiumUser = require("../../schema/PremiumUser");
const { EmbedBuilder } = require('discord.js');
const Redeem = require("../../schema/Redeem");
const moment = require('moment')

module.exports = {
    name: "redeem",
    category: "Information",
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

        let user = await PremiumUser.findOne({ Id: message.author.id })
      if(!user) user = await PremiumUser.create({ Id: message.author.id }) 

      
        let code = args[0]
        if (!code)
            return message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`**Please specify the code you want to redeem!**`),
            ],
        })

        if (user && user?.isPremium) {
            return message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`**> You already are a premium user**`),
            ],
        })
    }
  
        const premium = await Redeem.findOne({
            code: code.toUpperCase(),
        })
  
        if (premium) {
            const expires = moment(premium.expiresAt).format(
            'dddd, MMMM Do YYYY HH:mm:ss',
        )
  
        user.isPremium = true;
        user.premium.redeemedBy.push({
          id: message.author.id,
          tag: message.author.tag,
      });
        user.premium.redeemedAt = Date.now();
        user.premium.expiresAt = premium.expiresAt;
        user.premium.plan = premium.plan;


       user = await user.save({ new: true }).catch(() => {});
        client.premiums.set(message.author.id, user)
        await premium.deleteOne().catch(() => {});

        message.channel.send({
            embeds: [
            new EmbedBuilder()
                .setTitle('Premium Redeemed')
                .setDescription(`**You have successfully redeemed premium!**\n\n*Expires at*: [\`${expires}\`]`)
                .setColor(client.embedColor)
                .setTimestamp(),
            ],
        })
  
        } else {
        return message.channel.send({
            embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
                .setDescription(`**The code is invalid. Please try again using valid one!**`,)
                ],
            })
        }
    }
}