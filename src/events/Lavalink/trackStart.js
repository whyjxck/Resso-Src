const {
  EmbedBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ButtonBuilder, editEmbed, PermissionsBitField, PermissionFlagsBits} = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
module.exports = async (client , player, track, payload, args) => {
  let guild = client.guilds.cache.get(player.guild);
  if (!guild) return;
  let channel = guild.channels.cache.get(player.textChannel)
      if (!channel.guild.members.me.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]))
      return channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| I don't have enough permissions connect your VC! Please give me permission to \`CONNECT\` or \`SPEAK\` `}),
        ],
      });
  
const emojiffilt = client.emoji.ffilt;
  const queqe = player.get("dcQ");
  const thing = new EmbedBuilder()
.setAuthor({name:`|  Now playing `, iconURL:client.user.displayAvatarURL()})
.setDescription(`[${track.title ?? queue.title}](${client.config.links.support})[${convertTime(track?.duration ?? queue.duration)}]`)
    .setImage('https://cdn.discordapp.com/attachments/1098142295674605608/1104304508693131345/IMG_20221206_120450.png')
    .setTimestamp()
.setFooter({text: `Requested by ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL({ dynamic: true })}) 
    .setColor(client.embedColor);

         const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('lund')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Select Filter')
          .addOptions([
            {
              label: 'Clear',
              value: 'h1',
              emoji: '1051035312308101172',
            },
            {
              label: 'Bass',
              value: 'h2',
              emoji: '1051035312308101172',
            },
            {
              label: 'Bassboost',
              value: 'h3',
              emoji: '1051035312308101172',
            },
           {
              label: 'Slowed+reverb',
              value: 'h10',
              emoji: '1051035312308101172',
            },

            {
              label: 'Nightcore',
              value: 'h4',
              emoji: '1051035312308101172',
            },
            {
              label: 'Pitch',
              value: 'h5',
              emoji: '1051035312308101172',
            },
            {
              label: 'Distord',
              value: 'h6',
              emoji: '1051035312308101172',
            },
            {
              label: 'Equalizer',
              value: 'h7',
              emoji: '1051035312308101172',
            },
            {
              label: '8D',
              value: 'h8',
              emoji: '1051035312308101172',
            },
            {
              label: 'Speed',
              value: 'h9',
              emoji: '1051035312308101172',
            },
          ])
      )
  
    const But1 = new ButtonBuilder()
    .setCustomId("replay")
    .setEmoji("<:emoji_5:1051033454625697862>")
    .setStyle(ButtonStyle.Secondary);
  const But2 = new ButtonBuilder()
    .setCustomId("vdown")
    .setEmoji("<:volDown:1052115010891022376>")
    .setStyle(ButtonStyle.Secondary);
  const But3 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji("<:Pause:1052111872926699571>")
    .setStyle(ButtonStyle.Danger);
  const But4 = new ButtonBuilder()
    .setCustomId("vup")
    .setEmoji("<:volume:1051032615865561098>")
    .setStyle(ButtonStyle.Secondary);
  const But5 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji("<:skip:1051032537981526056>")
    .setStyle(ButtonStyle.Secondary);
  
const row1 = new ActionRowBuilder().addComponents(
    But1,
    But2,
    But3,
    But4,
    But5
  );
  const m = await channel.send({ embeds: [thing], components: [row,row1] }).then(m => player.message = m);
 
  const embed = new EmbedBuilder().setColor(client.embedColor);
  const collector = m.createMessageComponentCollector({
    filter: (r)=> {
      if (
        r.guild.members.me.voice.channel &&
        r.guild.members.me.voice.channelId === r.member.voice.channelId
      )
        return true;
else          {
                   r.reply({embeds : [new EmbedBuilder().setColor(client.embedColor).setAuthor({name: `|  You aren't connected to my voice channel.`, iconURL: r.member.user.displayAvatarURL()})],ephemeral: true,
        });
        return false;
}

    },
    time: track?.duration ?? queue.duration,
  });
  collector.on("collect", async (i) => {
await i.deferReply({
ephemeral: true,
    });   
    if (i.customId === "vdown") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) - 10;
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `The current volume is: **${amount}**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    } else if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(!player.paused);
      const Text = player.paused
        ? `**Paused**`
        : `**Resume**`;
      i.editReply({
        embeds: [ 
          embed
         .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `Song have been ${Text}`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
   } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }

      await player.stop();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription("** Song is skipped**"
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });         
    } else if (i.customId === "vup") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) + 10;
      if (amount >= 150)
        return i
          .editReply({
            embeds: [
              embed
                .setAuthor({
                  name: i.member.user.tag,
                  iconURL: i.member.user.displayAvatarURL(),
                })
                .setDescription(
                  `Cannot higher the player volume further more.`
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 10000);
          });
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `The current volume is: **${amount}**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
      }, 10000);
      });
   return;
    }    else if(i.customId === "replay") {
        if(!player) {
          collector.stop();
        }
        await player.seek(0);
            i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription("**Song is now on reply**"),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
      }, 10000);
      });
   return;
    }    

  if(i.isStringSelectMenu())
            {
                for(const value of i.values)
                {
                    if(value === `h1`)
                    {
                await player.clearEffects();

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Filters are off**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
           }
                                      if(value === `h2`)
                    {
                await player.setBassboost(true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Bass mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h3`)
                    {
                         var bands = new Array(7).fill(null).map((_, i) => (
                    { band: i, gain: 0.25 }
                ));
                await player.setEQ(...bands);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Bassboost mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h4`)
                    {
                await player.setNightcore (true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Nightcore mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h5`)
                    {
                await player.setPitch(2);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Pitch mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h6`)
                    {
                await player.setDistortion (true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Distort mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h7`)
                    {
                await player.setEqualizer (true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Equalizer mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h8`)
                    {
                await player.set8D(true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**8D mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                                      if(value === `h9`)
                    {
                await player.setSpeed(2);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Speed mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
if(value === `h10`)
                    {
                await player.setVaporwave(true);

      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Slowed+reverb mode is on**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
                    }
                  
                    }
} 
  });
            }