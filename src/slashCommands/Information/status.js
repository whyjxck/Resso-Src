const {
  EmbedBuilder,
  ApplicationCommandType,
  version,
  CommandInteraction,
  Client,
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");

module.exports = {
  name: "stats",
  description: "Displays bot stats.",
  type: ApplicationCommandType.chatInput,
  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
          ephemeral: false,
        });
 const duration1 = moment
    .duration(interaction.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
 let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i]. members.me.voice.channel) connectedchannelsamount += 1;
            }
            if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
    
            let dev = [], cdev = [], supp =[];
            let user = await client.users.fetch(`261553832549548032`);//aj
            dev.push(`[${user.username}](https://discord.com/users/261553832549548032)`);
 //   user = await client.users.fetch(`737876938701668372`);//pratiyush 
      //      dev.push(`[${user.username}](https://discord.com/users/737876938701668372)`);
            //    user = await client.users.fetch(``);//pos
      //      supp.push(`[${user.username}](https://discord.com/users/909837635000864778)`);
       const embed = new EmbedBuilder()
			      .setColor(client.embedColor)
              .setAuthor({ name: `| Resso information `, iconURL:interaction.member.user.displayAvatarURL()})
         .setThumbnail(client.user.displayAvatarURL())
           .setTimestamp()
         .setFooter({text: `Requested by ${interaction.member.user.tag}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })})     
              .setDescription(`**Playing arround 
• Guilds: ${client.guilds.cache.size}\n• Users: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\n• Channels: ${client.channels.cache.size}\n• Connections: ${connectedchannelsamount}

Memories
• Total Memory : ${(os.totalmem() / 1024 / 1024).toFixed(
        2
      )}mb
• Free Memory : ${(os.freemem() / 1024 / 1024).toFixed(
        2
      )}mb
• Heap Total : ${(
          process.memoryUsage().heapTotal /
          1024 /
          1024
        ).toFixed(2)}mb
• Heap Usage : ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}mb

host status 
• Platfrom : ${os.type}
• Cores : ${os.cpus().length}
• Model: ${os.cpus()[0].model} 
• Speed: ${os.cpus()[0].speed} MHz  

Bot info
• Discord.js : v${version}
• Node : ${process.version}
• Bot ping : ${Math.round(client.ws.ping)}ms 
• Uptime : ${duration1}**`)   
      .addFields([
                {name: `**__Developer__**`, value: dev.join(`, `) }
              ])
.setTimestamp()
    .setFooter({ text: `Requested by: ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
      
    interaction.followUp({ embeds: [embed] });
  },
};