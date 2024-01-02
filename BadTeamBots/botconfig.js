module.exports = {
   Admins: ["288371901753982978", "288371901753982978"], //Admins of the bot
  ExpressServer: true, //If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || "!", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/XaS5MyzsDr", //Support Server Link
  Token: process.env.Token || "OTIyNDA4NDI0ODM3Mzc4MDU4.GZIBDu.r5mj4Ieu77a7NCnB8NFCORYAamPOmAkYHbVSBs", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "922408424837378058", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "R8acmbZ7sNOnB0ktfDMMQ0l2f07kVYP7", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  ServerDeafen: true, //If you want bot to stay deafened
  DefaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  CallbackURL: "/api/callback", //Discord API Callback url. Do not touch it if you don't know what you are doing. All you need to change for website to work is on line 20.
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is EPIC", //A Secret like a password
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "RANDOM", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 1099511627775, //Bot Inviting Permissions
  Website: process.env.Website || "http://changeme", //Website where it is hosted at includes http or https || Use "0.0.0.0" if you using Heroku || Do not include /api/callback. Just the website url. I.e. "https://foo.bar"
  
  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: "【 Komutlar İçin | !yardım | 】", // The message shown
    type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING
  },

  //Lavalink
  Lavalink: {
    id: "Main",
    host: "localhost",
    port: 8080, // The port that lavalink is listening to. This must be a number!
    pass: "badteam",
    secure: false, // Set this to true if the lavalink uses SSL or you're hosting lavalink on repl.it
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "154f306939874a139459714f8ece97ab", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "cb09be9615bb4e289dc2d64650433c71", //Spotify Client Secret
  },
};
