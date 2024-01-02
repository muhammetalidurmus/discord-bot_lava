const { DiscordMusicBot } = require("../structures/DiscordMusicBot");
const { VoiceState, MessageEmbed } = require("discord.js");
/**
 *
 * @param {DiscordMusicBot} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns {Promise<void>}
 */
module.exports = async (client, oldState, newState) => {
  // get guild and player
  let guildId = newState.guild.id;
  const player = client.Manager.get(guildId);

  // check if the bot is active (playing, paused or empty does not matter (return otherwise)
  if (!player || player.state !== "BAĞLI") return;

  // prepreoces the data
  const stateChange = {};
  // get the state change
  if (oldState.channel === null && newState.channel !== null)
    stateChange.type = "KATIL";
  if (oldState.channel !== null && newState.channel === null)
    stateChange.type = "AYRILMAK";
  if (oldState.channel !== null && newState.channel !== null)
    stateChange.type = "TAŞINMAK";
  if (oldState.channel === null && newState.channel === null) return; // you never know, right
  if (newState.serverMute == true && oldState.serverMute == false)
    return player.pause(true);
  if (newState.serverMute == false && oldState.serverMute == true)
    return player.pause(false);
  // move check first as it changes type
  if (stateChange.type === "TAŞINMAK") {
    if (oldState.channel.id === player.voiceChannel) stateChange.type = "AYRILMAK";
    if (newState.channel.id === player.voiceChannel) stateChange.type = "KATIL";
  }
  // double triggered on purpose for MOVE events
  if (stateChange.type === "KATIL") stateChange.channel = newState.channel;
  if (stateChange.type === "AYRILMAK") stateChange.channel = oldState.channel;

  // check if the bot's voice channel is involved (return otherwise)
  if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
    return;

  // filter current users based on being a bot
  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "KATIL":
      if (stateChange.members.size === 1 && player.paused) {
        let emb = new MessageEmbed()
          .setAuthor(`Duraklatılmış sıraya devam ediliyor`, client.botconfig.IconURL)
          .setColor(client.botconfig.EmbedColor)
          .setDescription(
            `Hepiniz beni tek başıma çalmam için müzikle bıraktığınız için oynatmaya devam ediyorum`
          );
        await client.channels.cache.get(player.textChannel).send(emb);

        // update the now playing message and bring it to the front
        let msg2 = await client.channels.cache
          .get(player.textChannel)
          .send(player.nowPlayingMessage.embeds[0]);
        player.setNowplayingMessage(msg2);

        player.pause(false);
      }
      break;
    case "AYRILMAK":
      if (stateChange.members.size === 0 && !player.paused && player.playing) {
        player.pause(true);

        let emb = new MessageEmbed()
          .setAuthor(`Duraklatıldı!`, client.botconfig.IconURL)
          .setColor(client.botconfig.EmbedColor)
          .setDescription(`Oyuncu duraklatıldı çünkü herkes ayrıldı`);
        await client.channels.cache.get(player.textChannel).send(emb);
      }
      break;
  }
};
