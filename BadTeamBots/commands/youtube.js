const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube|yt|",
  description: "YouTube'ta yayın başlat",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt","youtube"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bot'un Davet Oluşturma İzni yok**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "BadTeam | Youtube Watch Together ",
        "https://i.ibb.co/HnFW7kF/749289646097432667.jpg"
      )
      .setColor("#FF0000").setDescription(`
**BadTeam Youtube Watch Together**'ı kullanarak bir Ses Kanalında arkadaşlarınızla YouTube izleyebilirsiniz. Katılmak için *Yayına Katıla* tıklayın!

__**[Yayına Katıl](https://discord.com/invite/${Invite.code})**__

⚠ Not: Bu yalnızca Masaüstünde çalışır
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Bu komutu kullanmak için bir ses kanalında olmalısınız."
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot'un Davet Oluşturma İzni yok**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "YouTube'a Birlikte Katılın",
          "https://i.ibb.co/HnFW7kF/749289646097432667.jpg"
        )
        .setColor("#FF0000").setDescription(`
Using **YouTube'a Birlikte Katılın** YouTube'u arkadaşlarınızla bir Ses Kanalında izleyebilirsiniz. Tıkla *Yayına Katıla* katılmak için!

__**[YouTube'a Birlikte Katılın](https://discord.com/invite/${Invite.code})**__

⚠ Not: Bu yalnızca Masaüstünde çalışır.
`);
      interaction.send(embed.toJSON());
    },
  },
};
