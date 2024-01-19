require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTAyMzU3MTc0NzEzMzQ2ODcwMw.Gjmkwu.juk-Rsie9iZcyezVUgZYb_ap7UFLi4Jkp41xX4", //your bot token
    clientID: process.env.CLIENT_ID || "1023571747133468703", // your bot client id
    prefix: process.env.PREFIX || "+", // bot prefix
    ownerID: process.env.OWNERID || "261553832549548032", //your discord id
    mongourl: process.env.MONGO_URI || "mongodb+srv://Resso:742781@cluster0.tnvbkfy.mongodb.net/?retryWrites=true&w=majority", // MongoDb URL
 // devID: process.env.DEV || "",
    embedColor: process.env.COlOR || ("FF0000"), // embed colour
    logs: process.env.LOGS || "1086356602854047884", // channel id for guild create and delete logs

  webhook: {
    Cmd: {
      url: 'https://discord.com/api/webhooks/1103172463002665042/ab-Ni3HqRnpDbTbiGu2je4j_9tvIBkdYMFjKTW9J2l96RLRXKli_vJbWdj9WabgMZlGU',
    },
    Errors: {
      url: 'https://discord.com/api/webhooks/1103172457256472648/5D-m76nlOekPB9v6yQfqFZ61dP9cRut3LX4-Jp5gYsRf1_IJUytCTkvKNjmMQRHUENLC',
    },
    Loggin: {
      url: 'https://discord.com/api/webhooks/1103174774236139613/AuLLA4zgjTw_EINtd0x_eLJwU07YQro4dbusuqo15TtljzaPn20oJ6Q9Eb_60Kgsfbam',
    },
  },
  
 links: {
        support: process.env.SUPPORT || 'https://discord.gg/uYvTGBSrz6', //support server invite link
        invite: process.env.INVITE || 'https://discord.com/oauth2/authorize?client_id=1023571747133468703&permissions=8&scope=applications.commands%20bot' //bot invite link
  },
    nodes: [
      {
      host: process.env.NODE_HOST || "lava2.horizxon.studio",
            port: parseInt(process.env.NODE_PORT || "80"),
            password: process.env.NODE_PASSWORD || "horizxon.studio",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),
        },
      {
      host: process.env.NODE_HOST || "lavalink.cyber-host.eu",
            port: parseInt(process.env.NODE_PORT || "2333"),
            password: process.env.NODE_PASSWORD || "discord.gg/cyberhost",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),
}
  ],

}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
