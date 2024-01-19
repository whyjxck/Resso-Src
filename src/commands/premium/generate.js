const chalk = import ('chalk');
const { EmbedBuilder } = require('discord.js');
const Redeem = require("../../schema/Redeem")
const moment = require('moment')
var voucher_codes = require('voucher-code-generator')

module.exports = {
    name: "generate",
    category: "Information",
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: true,
 execute: async (message, args, client, prefix) => {
      
    let codes = [];

    const plan = args[0];
    const plans = ['daily', 'weekly', 'monthly', 'yearly'];

    if (!plan) return message.channel.send({ content: `**> Please provide plan**` })

    if (!plans.includes(args[0]))
      return message.channel.send({ content:  `**Invalid Plan, available plans:** ${plans.join(', ')}`})

    let time;
    if (plan === 'daily') time = Date.now() + 86400000;
    if (plan === 'weekly') time = Date.now() + 86400000 * 7;
    if (plan === 'monthly') time = Date.now() + 86400000 * 30;
    if (plan === 'yearly') time = Date.now() + 86400000 * 365;

    let amount = args[1];
    if (!amount) amount = 1;

    for (var i = 0; i < amount; i++) {
      const codePremium = voucher_codes.generate({
        pattern: '####-####-####'
      })

      const code = codePremium.toString().toUpperCase()
      const find = await Redeem.findOne({ code: code })

      if (!find) {
        Redeem.create({
          code: code,
          plan: plan,
          expiresAt: time
        })
        codes.push(`${i + 1} - ${code}`)
      }
    }

    const embed = new EmbedBuilder()
    .setColor(client.embedColor)
      .setDescription(`${codes.join('\n')}`)
      

      message.channel.send({ embeds: [embed] })
  }
}