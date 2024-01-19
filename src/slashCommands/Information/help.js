const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder,
CommandInteraction, Client, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Help with all commands, or one specific command.",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
 run: async (client, interaction, prefix) => {
        await interaction.deferReply({
          ephemeral: false
        });


  const embed = new EmbedBuilder()
.setAuthor({name:`|  Help Menu `,
      iconURL: interaction.member.user.displayAvatarURL({dynamic: true})})
.setDescription(`**Resso Is A Discord Music Bot Made To Provide You With Many awesome Features And Quality Music\n\n

Command Categories
<:music:1051036850275487786> : Music 
<:info:1051035041553186886> : Information  
<:icon_playlist:1051035149069996063> : Playlist 
<:filters:1051035312308101172> : Filters 
<:Config:1051035499575382026> : Config
\n[support](https://discord.gg/uYvTGBSrz6) | [vote](https://top.gg/bot/1023571747133468703/vote) | [invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)

Choose A Category From Menu Below**`)

.setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({ text: `Requested by: ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
       const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Select Here ')
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '1051036850275487786',
            },
            {
              label: 'Info',
              value: 'info',
              emoji: '1051035041553186886',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '1051035149069996063',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '1051035312308101172',
            },
            {
              label: 'Config',
              value: 'config',
              emoji: '1051035499575382026',
            },
          ])
      ) 
          const row2 = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix} help`)
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '1051036850275487786',
            },
            {
              label: 'Info',
              value: 'info',
              emoji: '1051035041553186886',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '1051035149069996063',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '1051035312308101172',
            },
            {
              label: 'Config',
              value: 'config',
              emoji: '1051035499575382026',
            },
          ])
      ) 
   
   let but3 = new ButtonBuilder().setCustomId("home").setEmoji("<:zz_home:1051035403651657758>").setStyle(ButtonStyle.Danger)
  
    let but2 = new ButtonBuilder().setCustomId("music").setEmoji("<:music:1051036850275487786>").setStyle(ButtonStyle.Secondary)
  
    let but1 = new ButtonBuilder().setCustomId("info").setEmoji("<:info:1051035041553186886>").setStyle(ButtonStyle.Secondary);
    
    let but5 = new ButtonBuilder().setCustomId("playlist").setEmoji("<:icon_playlist:1051035149069996063>").setStyle(ButtonStyle.Secondary);

    let but4 = new ButtonBuilder().setCustomId("config").setEmoji("<:Config:1051035499575382026>").setStyle(ButtonStyle.Secondary);

     let _commands;
     let editEmbed = new EmbedBuilder();
     
await interaction.editReply({ embeds: [embed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] });


    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === interaction.member.user.id) return true;
       else {
     b.reply({ ephemeral: true, content: `Only **${interaction.member.user.username}** can use this button, run the command again to use the help menu.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
        await interaction.editReply({ components: [row2,new ActionRowBuilder().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true),  but5.setDisabled(true))] }).catch(() => {});
    });
    collector.on('collect', async (b) => {
       if(!b.deferred) await b.deferUpdate()
        if(b.customId === "home") {
           return await interaction.editReply({ embeds: [embed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Music Commands").setFooter({text: `Total ${_commands.length} music commands.`});
           return await interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
        }
         if(b.customId == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Information Commands").setFooter({text: `Total ${_commands.length} information commands.`})
          return await interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
         }
         if(b.customId == "playlist") {
          _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Playlist Commands").setFooter({text: `Total ${_commands.length} playlist commands.`})
           return await interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
          }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Config Commands").setFooter({text: `Total ${_commands.length} config commands.`})
          return await interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
         
        }
        
      const options = b.values[0];
           if(options === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Music Commands").setFooter({text: `Total ${_commands.length} music commands.`});
           return interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
        }
         if(options == "info") {
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Information Commands").setFooter({text: `Total ${_commands.length} information commands.`})
          return interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
         }
               if(options == "filters") {
         _commands = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("filters Commands").setFooter({text: `Total ${_commands.length} information commands.`})
          return interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
               }
         if(options == "playlist") {
          _commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``);
              editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Playlist Commands").setFooter({text: `Total ${_commands.length} playlist commands.`})
           return interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })
          }
         if(options == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Config Commands").setFooter({text: `Total ${_commands.length} config commands.`})
          return interaction.editReply({ embeds: [editEmbed], components: [row, new ActionRowBuilder().addComponents(but1, but2, but3, but4, but5)] })   
       }
        });

   }
}