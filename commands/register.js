const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const User = require('../models/User')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Inscription à l\'association League of Legends !')
    .addStringOption(option =>
      option
        .setName('nom')
        .setDescription('Votre nom')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('prénom')
        .setDescription('Votre prénom')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('classe')
        .setDescription('Votre classe')
        .setRequired(true)
        .addChoices(
          { name: '1ère année initial', value: '1I' },
          { name: '1ère année alternance', value: '1A' },
          { name: '1ère année janvier', value: '1J' },
          { name: '2ème année initial', value: '2I' },
          { name: '2ème année alternance', value: '2A' },
          { name: '2ème année janvier', value: '2J' },
          { name: '3ème année alternance', value: '3A' },
          { name: '3ème année janvier', value: '3J' },
          { name: '4ème année alternance', value: '4A' },
          { name: '4ème année janvier', value: '4J' },
          { name: '5ème année alternance', value: '5A' },
          { name: '5ème année janvier', value: '5J' }
        ))
    .addStringOption(option =>
      option
        .setName('mail')
        .setDescription('Votre mail')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('Votre pseudo League of Legends')
        .setRequired(true)),
    async execute(interaction) {
        const nom = interaction.options.getString('nom')
        const prenom = interaction.options.getString('prénom')
        const classe = interaction.options.getString('classe')
        const mail = interaction.options.getString('mail')
        const username = interaction.options.getString('username')

        const user = await User.findOne({ id: interaction.user.id })
        if (user) {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Erreur')
                .setDescription('Vous êtes déjà inscrit !')
            interaction.reply({ embeds: [exampleEmbed] })
        } else {
            await User.create({
                id: interaction.user.id,
                firstname: prenom,
                lastname: nom,
                class: classe,
                mail: mail,
                username: username
            })
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Inscription réussie !')
                .setDescription('Vous êtes maintenant inscrit à l\'association League of Legends !')
                
            interaction.reply({ embeds: [exampleEmbed] })
        }
    }
}