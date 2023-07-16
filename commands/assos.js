const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('assos')
        .setDescription('Gestion de l\'ouverture de l\'association !')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
        .addSubcommand(subcommand =>
            subcommand 
                .setName('open')
                .setDescription('Ouvre l\'association !')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('Ferme l\'association !')
        ),
    async execute(interaction, admin) {
        if (interaction.options.getSubcommand() === 'open') {
            if (admin.open) {
                return interaction.reply({embeds: [new EmbedBuilder()
                    .setTitle('Ouverture de l\'association')
                    .setDescription('L\'association est déjà ouverte !')
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                ]});
            } else {
                admin.open = true;
                await admin.save();
                return interaction.reply({embeds: [new EmbedBuilder()
                    .setTitle('Ouverture de l\'association')
                    .setDescription('L\'association est maintenant ouverte !')
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]
                });
            }
        } else if (interaction.options.getSubcommand() === 'close') {
            if (!admin.open) {
                return interaction.reply({embeds: [new EmbedBuilder()
                    .setTitle('Fermeture de l\'association')
                    .setDescription('L\'association est déjà fermée !')
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                    ]});
            } else {
                admin.open = false;
                await admin.save();
                return interaction.reply({embeds: [new EmbedBuilder()
                    .setTitle('Fermeture de l\'association')
                    .setDescription('L\'association est maintenant fermée !')
                    .setColor(0xFF0000)
                    .setTimestamp()
                    .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                    ]});
            }
        } 
    },
};

