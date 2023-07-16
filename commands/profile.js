require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Récupère les stats de ton compte LoL')
        .addStringOption(option => option.setName('invocateur').setDescription('invocateur').setRequired(true)),
    async execute(interaction) {
        const riotapi = process.env.RIOT_API_KEY;

        var summoner = interaction.options.getString('invocateur');

        const get = await superagent.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${riotapi}`).catch(err => {
            return interaction.reply({embeds: [new EmbedBuilder()
                .setTitle('Récupération des stats')
                .setDescription('Impossible de trouver cet utilisateur')
                .setColor(0xFF0000)
                .setTimestamp()
                .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                ]});
        });

        const headerDate = get.headers && get.headers.date ? get.headers.date : 'no response date';
        console.log('Status Code:', get.statusCode);
        console.log('Date in Response header:', headerDate);

        var id = get.body.id;
        console.log(id);

        let rank = await superagent.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${riotapi}`).catch(err => {
            return interaction.reply({embeds: [new EmbedBuilder()
                .setTitle('Récupération des stats')
                .setDescription('Impossible de trouver cet utilisateur')
                .setColor(0xFF0000)
                .setTimestamp()
                .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                ]});
        });

        //console.log(rank.body);

        for (let i = 0; i < rank.body.length; i++) {
            if (rank.body[i].queueType == "RANKED_SOLO_5x5") {
                var soloTier = rank.body[i].tier;
                var soloRank = rank.body[i].rank;
                var soloLP = rank.body[i].leaguePoints + " LP";
                var soloWins = rank.body[i].wins;
                var soloLosses = rank.body[i].losses;
                var soloWinrate = "(" + Math.round((soloWins / (soloWins + soloLosses)) * 100) + "% de Winrate)";

            }
            if (rank.body[i].queueType == "RANKED_FLEX_SR") {
                var flexTier = rank.body[i].tier;
                var flexRank = rank.body[i].rank;
                var flexLP = rank.body[i].leaguePoints + " LP";
                var flexWins = rank.body[i].wins;
                var flexLosses = rank.body[i].losses;
                var flexWinrate = "(" + Math.round((flexWins / (flexWins + flexLosses)) * 100) + "% de Winrate)";
            }
            if (rank.body[i].queueType == "RANKED_FLEX_TT") {
                var ttTier = rank.body[i].tier;
                var ttRank = rank.body[i].rank;
                var ttLP = rank.body[i].leaguePoints + " LP";
                var ttWins = rank.body[i].wins;
                var ttLosses = rank.body[i].losses;
                var ttWinrate = "(" + Math.round((ttWins / (ttWins + ttLosses)) * 100) + "% de Winrate)";
            }
            if (rank.body[i].queueType == "RANKED_TFT_DOUBLE_UP") {
                var tftTier = rank.body[i].tier;
                var tftRank = rank.body[i].rank;
                var tftLP = rank.body[i].leaguePoints + " LP";
                var tftWins = rank.body[i].wins;
                var tftLosses = rank.body[i].losses;
                var tftWinrate = "(" + Math.round((tftWins / (tftWins + tftLosses)) * 100) + "% de Winrate)";
            }
        }

        if (soloTier == undefined) {
            soloTier = "Unranked";
            soloRank = "";
            soloLP = "";
            soloWinrate = "";
        }

        if (flexTier == undefined) {
            flexTier = "Unranked";
            flexRank = "";
            flexLP = "";
            flexWinrate = "";
        }

        if (ttTier == undefined) {
            ttTier = "Unranked";
            ttRank = "";
            ttLP = "";
            ttWinrate = "";
        }

        if (tftTier == undefined) {
            tftTier = "Unranked";
            tftRank = "";
            tftLP = "";
            tftWinrate = "";
        }

        var embed = new EmbedBuilder()
        .setTitle(`Statistiques de ${summoner}`)
        .setColor(0x00AE86)
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${get.body.profileIconId}.png`)
        .addFields({ name: 'Niveau', value: `${get.body.summonerLevel}`, inline: true })
        .addFields({ name: 'Solo/Duo', value: `${soloTier} ${soloRank} ${soloLP} ${soloWinrate}`, inline: false })
        .addFields({ name: 'Flex 5v5', value: `${flexTier} ${flexRank} ${flexLP} ${flexWinrate}`, inline: false })
        .addFields({ name: 'TFT', value: `${tftTier} ${tftRank} ${tftLP} ${tftWinrate}`, inline: false })
        .addFields({ name: 'Double Up', value: `${ttTier} ${ttRank} ${ttLP} ${ttWinrate}`, inline: false })
        .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
        .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

