const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies givin bot description !'),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('Bot Info')
        interaction.reply({ embeds: [exampleEmbed] });
    },
};

