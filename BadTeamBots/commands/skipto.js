const { MessageEmbed } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");

module.exports = {
  name: "şarkıatla|şa|",
  description: `Sıradaki bir şarkıya atla`,
  usage: "<sayı>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["st", "şarkıatla", "şa"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    const player = client.Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: client.botconfig.ServerDeafen,
    });

    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Şu anda hiçbir şey çalmıyor...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız!**"
      );

    try {
      if (!args[0])
        return client.sendTime(
          message.channel,
          `**Kullanım**: \`${GuildDB.prefix}şa [sayı]\``
        );
      //if the wished track is bigger then the Queue Size
      if (Number(args[0]) > player.queue.size)
        return client.sendTime(
          message.channel,
          `❌ | O şarkı sırada değil! Lütfen tekrar deneyin!`
        );
      //remove all tracks to the jumped song
      player.queue.remove(0, Number(args[0]) - 1);
      //stop the player
      player.stop();
      //Send Success Message
      return client.sendTime(
        message.channel,
        `⏭ Atlandı \`${Number(args[0] - 1)}\` . Şarkı`
      );
    } catch (e) {
      console.log(String(e.stack).bgRed);
      client.sendError(message.channel, "Bir şeyler yanlış gitti.");
    }
  },
  SlashCommand: {
    options: [
      {
        name: "position",
        value: "[position]",
        type: 4,
        required: true,
        description: "Sıradaki belirli bir şarkıya atlar",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `:x: | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız!**`
        );
      let CheckNode = client.Manager.nodes.get(client.botconfig.Lavalink.id);
      if (!CheckNode || !CheckNode.connected) {
        return client.sendTime(
          interaction,
          "❌ | **Sunucuya bağlanamadı**"
        );
      }

      let player = client.Manager.create({
        guild: interaction.guild_id,
        voiceChannel: voiceChannel.id,
        textChannel: interaction.channel_id,
        selfDeafen: client.botconfig.ServerDeafen,
      });

      try {
        if (!interaction.data.options)
          return client.sendTime(
            interaction,
            `**Usage**: \`${GuildDB.prefix}skipto <number>\``
          );
        let skipTo = interaction.data.options[0].value;
        //if the wished track is bigger then the Queue Size
        if (
          skipTo !== null &&
          (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)
        )
          return client.sendTime(
            interaction,
            `❌ | O şarkı sırada değil! Lütfen tekrar deneyin!`
          );

        player.stop(skipTo);
        //Send Success Message
        return client.sendTime(
          interaction,
          `⏭ Atlandı \`${Number(skipTo)}\` songs`
        );
      } catch (e) {
        console.log(String(e.stack).bgRed);
        client.sendError(interaction, "Bir şeyler yanlış gitti.");
      }
    },
  },
};
