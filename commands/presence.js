require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');
const User = require('../models/User.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('presence')
        .setDescription('Vérifie la présence de l\'association !'),
    async execute(interaction, admin) {
        const getUser = await User.findOne({id: interaction.user.id});

        if (!getUser) return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Vous n\'êtes pas inscrit !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});

        var check_in_game = true;

        const date = new Date().toISOString().replace(/T.+/, '').toString();
        
        if (interaction.member.roles.cache.has('1052958694054297651') == false) return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Vous n\'êtes pas inscrit !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
       
        if (admin.open == false) return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('L\'association est fermée ! Elle sera ouverte le mercredi et le jeudi de 21h à 23h.').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        
        const summoner = getUser.username;

        const riotapi = process.env.RIOT_API_KEY;

        const res = await superagent.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${riotapi}`).catch(err => {
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Ce compte n\'existe pas dans la base de données Riot !\n\n*Si vous avez changé votre username entre temps, changez le avec la commande /username*').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        });

        var id = res.body.id;
        var puuid = res.body.puuid;

        const game_in = await superagent.get(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${riotapi}`).catch(err => {
            check_in_game = false;
        });

        const res2 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${riotapi}`).catch(err => {
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Impossible de trouver ces matchs !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        });

        const matchId = [];
        for(var i = 0; i < res2.body.length; i++){
            matchId.push(res2.body[i]);
        }

        const res3 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[0]}?api_key=${riotapi}`).catch(err => {
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Impossible de trouver ce match !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        });

        var currentTimestamp = Date.now();

        var check_today = true;

        var endTimestamp = res3.body.info.gameEndTimestamp;

        var agoTimestamp = currentTimestamp - endTimestamp;

        if(Math.floor(agoTimestamp / 3600000) > 4){
            check_today = false;
        }

        
        if (admin.open == true && getUser.last_date != date && (check_in_game == true || check_today == true)){
            getUser.presences += 1;
            getUser.last_date = date;
            await getUser.save();
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0x00FF00).setTitle('Validation de la présence').setDescription('Votre présence a bien été validée !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        } else if (admin.open == true && getUser.last_date == date) {
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Vous avez déjà validé votre présence aujourd\'hui !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        } else if (admin.open == true && getUser.last_date != date && (check_in_game == false && check_today == false)) {
            return interaction.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setTitle('Validation de la présence').setDescription('Vous n\'êtes pas en jeu ou vous n\'avez pas joué pendant l\'association !').setTimestamp().setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})]});
        }
    },
};

