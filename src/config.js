require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "MTExMjU4MjUxNzY2NTU2NjgzMQ.G9uy7C.ufDV-MO4DxIW0o22IBdPdchmWg0FG7vMYy3MgM", //your bot token
    clientID: process.env.CLIENT_ID || "1112582517665566831", // your bot client id
    prefix: process.env.PREFIX || "-", // bot prefix
    ownerID: process.env.OWNERID || "995889800500498532", //your discord id
    mongourl: process.env.MONGO_URI || "mongodb+srv://FreakOnTop:FreakOnTop@cluster0.2l5pd9b.mongodb.net/?retryWrites=true&w=majority", // MongoDb URL
 // devID: process.env.DEV || "",
    embedColor: process.env.COlOR || ("FF0000"), // embed colour
    logs: process.env.LOGS || "1086356602854047884", // channel id for guild create and delete logs

  webhook: {
    Cmd: {
      url: 'https://discord.com/api/webhooks/1192496129569476619/OcVyBlPqPDST4wzDGmqfNNvbGS9JvNqNQKfuyCKJa8G0z7JFnxz9N3hNc-zcDSBGqWuk',
    },
    Errors: {
      url: 'https://discord.com/api/webhooks/1192496129569476619/OcVyBlPqPDST4wzDGmqfNNvbGS9JvNqNQKfuyCKJa8G0z7JFnxz9N3hNc-zcDSBGqWuk',
    },
    Loggin: {
      url: 'https://discord.com/api/webhooks/1192496129569476619/OcVyBlPqPDST4wzDGmqfNNvbGS9JvNqNQKfuyCKJa8G0z7JFnxz9N3hNc-zcDSBGqWuk',
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
