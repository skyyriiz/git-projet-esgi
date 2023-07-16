const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/User.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('username')
        .setDescription('Change votre username LoL dans la base de données !')
        .addStringOption(option => option.setName('username').setDescription('ton nouveau username LoL').setRequired(true)),
    async execute(interaction) {
        const getUser = await User.findOne({id: interaction.user.id});

        var username = interaction.options.getString('username');

        if (!getUser) return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Vous n\'êtes pas inscrit !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
    
        getUser.username = username;

        await getUser.save();

        return interaction.reply({ embeds: [new EmbedBuilder().setColor(0x00FF00).setTitle('Changement de username').setDescription('Votre username a bien été changé !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
    },
};

