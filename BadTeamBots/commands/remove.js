const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "kaldır",
  description: `Sıradan bir şarkıyı kaldırma`,
  usage: "[sayı]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm", "kaldır"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
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

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Sırada kaldırılacak hiçbir şey yok");
    let rm = new MessageEmbed()
      .setDescription(
        `✅ **|** Kuyruktan kaldırılan şarkı **\`${Number(args[0])}\`** !`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Usage - **${client.botconfig.prefix}\`remove [track]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`The queue has only ${player.queue.length} songs!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "[track]",
        type: 4,
        required: true,
        description: "Sıradan bir şarkıyı kaldırma",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Şu anda hiçbir şey çalmıyor...**"
        );
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
          ":x: | **Bu komutu kullanabilmek için benimle aynı ses kanalında olmalısınız!**"
        );

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime("❌ | **Şu anda hiçbir şey çalmıyor...**");
      let rm = new MessageEmbed()
        .setDescription(
          `✅ | **Kaldırılan parça** \`${Number(args[0])}\` from the queue!`
        )
        .setColor("GREEN");
      if (isNaN(args[0]))
        rm.setDescription(`**Usage:** \`${GuildDB.prefix}remove [track]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`sıra var sadece ${player.queue.length} şarkılar!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  },
};
