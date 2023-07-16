require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('Donne ton historique de games LoL ou TFT')
        .addSubcommand(subcommand =>
            subcommand 
                .setName('lol')
                .setDescription('Donne ton historique de games LoL')
                .addStringOption(option => option.setName('invocateur').setDescription('invocateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tft')
                .setDescription('Donne ton historique de games TFT')
                .addStringOption(option => option.setName('invocateur').setDescription('invocateur').setRequired(true))
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'lol') {
            const riotapi = process.env.RIOT_API_KEY;
            var summoner = interaction.options.getString('invocateur');

            const res = await superagent.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver cet utilisateur', ephemeral: true });
            });
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);

            var puuid = res.body.puuid;
            console.log(puuid);

            const res2 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible ces matchs', ephemeral: true });
            });

            const matchId = [];
            for(var i = 0; i < res2.body.length; i++){
                matchId.push(res2.body[i]);
            }
            console.log(matchId);

            const res3 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[0]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            });

            const res4 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[1]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            });

            const res5 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[2]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            });

            const res6 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[3]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            });

            const res7 = await superagent.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId[4]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            });

            var team = 0;

            for(i=0; i <= 10; i++){
                if(res3.body.metadata.participants[i] == puuid && i < 5){
                    team = 0;
                } else if(res3.body.metadata.participants[i] == puuid && i > 5){
                    team = 1;
                }
            }

            var team2 = 0;

            for(i=0; i < 10; i++){
                if(res4.body.metadata.participants[i] == puuid && i < 5){
                    team2 = 0;
                } else if(res4.body.metadata.participants[i] == puuid && i > 5){
                    team2 = 1;
                }
            }

            var team3 = 0;

            for(i=0; i <= 10; i++){
                if(res5.body.metadata.participants[i] == puuid && i < 5){
                    team3 = 0;
                } else if(res5.body.metadata.participants[i] == puuid && i > 5){
                    team3 = 1;
                }
            }

            var team4 = 0;

            for(i=0; i <= 10; i++){
                if(res6.body.metadata.participants[i] == puuid && i < 5){
                    team4 = 0;
                } else if(res6.body.metadata.participants[i] == puuid && i > 5){
                    team4 = 1;
                }
            }

            var team5 = 0;

            for(i=0; i <= 10; i++){
                if(res7.body.metadata.participants[i] == puuid && i < 5){
                    team5 = 0;
                } else if(res7.body.metadata.participants[i] == puuid && i > 5){
                    team5 = 1;
                }
            }

            var currentTimestamp = Date.now();
            
            var endTimestamp = res3.body.info.gameEndTimestamp;
            var endTimestamp2 = res4.body.info.gameEndTimestamp;
            var endTimestamp3 = res5.body.info.gameEndTimestamp;
            var endTimestamp4 = res6.body.info.gameEndTimestamp;
            var endTimestamp5 = res7.body.info.gameEndTimestamp;

            var agoTimestamp = currentTimestamp - endTimestamp;
            var agoTimestamp2 = currentTimestamp - endTimestamp2;
            var agoTimestamp3 = currentTimestamp - endTimestamp3;
            var agoTimestamp4 = currentTimestamp - endTimestamp4;
            var agoTimestamp5 = currentTimestamp - endTimestamp5;

            var days = false;
            var days2 = false;
            var days3 = false;
            var days4 = false;
            var days5 = false;

            if(Math.floor(agoTimestamp / 3600000) > 24){
                var time = Math.floor(agoTimestamp / 86400000) + 1;
                days = true;
            } else {
                var time = Math.floor(agoTimestamp / 3600000);
                days = false;
            }

            if(Math.floor(agoTimestamp2 / 3600000) > 24){
                var time2 = Math.floor(agoTimestamp2 / 86400000) + 1;
                days2 = true;
            } else {
                var time2 = Math.floor(agoTimestamp2 / 3600000);
                days2 = false;
            }

            if(Math.floor(agoTimestamp3 / 3600000) > 24){
                var time3 = Math.floor(agoTimestamp3 / 86400000) + 1;
                days3 = true;
            } else {
                var time3 = Math.floor(agoTimestamp3 / 3600000);
                days3 = false;
            }

            if(Math.floor(agoTimestamp4 / 3600000) > 24){
                var time4 = Math.floor(agoTimestamp4 / 86400000) + 1;
                days4 = true;
            } else {
                var time4 = Math.floor(agoTimestamp4 / 3600000);
                days4 = false;
            }

            if(Math.floor(agoTimestamp5 / 3600000) > 24){
                var time5 = Math.floor(agoTimestamp5 / 86400000) + 1;
                days5 = true;
            } else {
                var time5 = Math.floor(agoTimestamp5 / 3600000);
                days5 = false;
            }

            var gameMode = res3.body.info.gameMode;
            var gameMode2 = res4.body.info.gameMode;
            var gameMode3 = res5.body.info.gameMode;
            var gameMode4 = res6.body.info.gameMode;
            var gameMode5 = res7.body.info.gameMode;

            var result = res3.body.info.teams[team].win;
            var result2 = res4.body.info.teams[team2].win;
            var result3 = res5.body.info.teams[team3].win;
            var result4 = res6.body.info.teams[team4].win;
            var result5 = res7.body.info.teams[team5].win;

            console.log(result);

            interaction.reply({ embeds: [new EmbedBuilder()
                .setTitle(`Matchs de ${summoner}`)
                .setDescription(`Les 5 derniers matchs de ${summoner}`)
                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${res.body.profileIconId}.png`)
                .addFields({name: `Match 1`, value: `**Mode de jeu :** ${gameMode == 'ARAM' ? 'Aram' : 'Faille de l\'invocateur'}\nIl y a ${time} ${days == true ? 'jour(s)' : 'heure(s)'} \n**Resultat : ** ${result == true ? ':white_check_mark: Match remporté' : ':x:  Match perdu'}`})
                .addFields({name: `Match 2`, value: `**Mode de jeu :** ${gameMode2 == 'ARAM' ? 'Aram' : 'Faille de l\'invocateur'}\nIl y a ${time2} ${days2 == true ? 'jour(s)' : 'heure(s)'} \n**Resultat : ** ${result2 == true ? ':white_check_mark: Match remporté' : ':x:  Match perdu'}`})
                .addFields({name: `Match 3`, value: `**Mode de jeu :** ${gameMode3 == 'ARAM' ? 'Aram' : 'Faille de l\'invocateur'}\nIl y a ${time3} ${days3 == true ? 'jour(s)' : 'heure(s)'} \n**Resultat : ** ${result3 == true ? ':white_check_mark: Match remporté' : ':x:  Match perdu'}`})
                .addFields({name: `Match 4`, value: `**Mode de jeu :** ${gameMode4 == 'ARAM' ? 'Aram' : 'Faille de l\'invocateur'}\nIl y a ${time4} ${days4 == true ? 'jour(s)' : 'heure(s)'} \n**Resultat : ** ${result4 == true ? ':white_check_mark: Match remporté' : ':x:  Match perdu'}`})
                .addFields({name: `Match 5`, value: `**Mode de jeu :** ${gameMode5 == 'ARAM' ? 'Aram' : 'Faille de l\'invocateur'}\nIl y a ${time5} ${days5 == true ? 'jour(s)' : 'heure(s)'} \n**Resultat : ** ${result5 == true ? ':white_check_mark: Match remporté' : ':x:  Match perdu'}`})
                .setColor('#00ff00')
                .setTimestamp()
                .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
            ] });
        
        } else if(interaction.options.getSubcommand() == "tft"){
            const riotapi = process.env.TEMPORARY_KEY;

            var summoner = interaction.options.getString('invocateur');

            const res = await superagent.get(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summoner}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver cet utilisateur', ephemeral: true });
            });
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);

            var puuid = res.body.puuid;
            console.log(puuid)

            const res2 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=5&api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ces matchs', ephemeral: true });
            })

            const matchId = [];
            for(var i = 0; i < res2.body.length; i++){
                matchId.push(res2.body[i]);
            }
            console.log(matchId);

            const res3 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId[0]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            })

            const res4 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId[1]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            })

            const res5 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId[2]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            })

            const res6 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId[3]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            })

            const res7 = await superagent.get(`https://europe.api.riotgames.com/tft/match/v1/matches/${matchId[4]}?api_key=${riotapi}`).catch(err => {
                return interaction.reply({ content: 'Impossible de trouver ce match', ephemeral: true });
            })

            for(var i = 0; i < res3.body.info.participants.length; i++){
                if(res3.body.info.participants[i].puuid == puuid){
                    var placement = res3.body.info.participants[i].placement;
                }

                if (placement == 1){
                    var placement = ":first_place: 1ère place";
                } else if (placement == 2){
                    var placement = ":second_place: 2ème place";
                } else if (placement == 3){
                    var placement = ":third_place: 3ème place";
                } else if (placement == 4){
                    var placement = ":four:ème place";
                } else if (placement == 5){
                    var placement = ":five:ème place";
                } else if (placement == 6){
                    var placement = ":six:ème place";
                } else if (placement == 7){
                    var placement = ":seven:ème place";
                } else if (placement == 8){
                    var placement = ":eight:ème place";
                } else if (placement == 9){
                    var placement = ":nine:ème place";
                } else if (placement == 10){
                    var placement = ":keycap_ten:ème place";
                }
            }

            for(var i = 0; i < res4.body.info.participants.length; i++){
                if(res4.body.info.participants[i].puuid == puuid){
                    var placement2 = res4.body.info.participants[i].placement;
                }
                
                if (placement2 == 1){
                    var placement2 = ":first_place: 1ère place";
                } else if (placement2 == 2){
                    var placement2 = ":second_place: 2ème place";
                } else if (placement2 == 3){
                    var placement2 = ":third_place: 3ème place";
                } else if (placement2 == 4){
                    var placement2 = ":four:ème place";
                } else if (placement2 == 5){
                    var placement2 = ":five:ème place";
                } else if (placement2 == 6){
                    var placement2 = ":six:ème place";
                } else if (placement2 == 7){
                    var placement2 = ":seven:ème place";
                } else if (placement2 == 8){
                    var placement2 = ":eight:ème place";
                } else if (placement2 == 9){
                    var placement2 = ":nine:ème place";
                } else if (placement2 == 10){
                    var placement2 = ":keycap_ten:ème place";
                }
            }

            for(var i = 0; i < res5.body.info.participants.length; i++){
                if(res5.body.info.participants[i].puuid == puuid){
                    var placement3 = res5.body.info.participants[i].placement;
                }

                if (placement3 == 1){
                    var placement3 = ":first_place: 1ère place";
                } else if (placement3 == 2){
                    var placement3 = ":second_place: 2ème place";
                } else if (placement3 == 3){
                    var placement3 = ":third_place: 3ème place";
                } else if (placement3 == 4){
                    var placement3 = ":four:ème place";
                } else if (placement3 == 5){
                    var placement3 = ":five:ème place";
                } else if (placement3 == 6){
                    var placement3 = ":six:ème place";
                } else if (placement3 == 7){
                    var placement3 = ":seven:ème place";
                } else if (placement3 == 8){
                    var placement3 = ":eight:ème place";
                } else if (placement3 == 9){
                    var placement3 = ":nine:ème place";
                } else if (placement3 == 10){
                    var placement3 = ":keycap_ten:ème place";
                }
            }

            for(var i = 0; i < res6.body.info.participants.length; i++){
                if(res6.body.info.participants[i].puuid == puuid){
                    var placement4 = res6.body.info.participants[i].placement;
                }

                if (placement4 == 1){    
                    var placement4 = ":first_place: 1ère place";
                } else if (placement4 == 2){
                    var placement4 = ":second_place: 2ème place";
                } else if (placement4 == 3){
                    var placement4 = ":third_place: 3ème place";
                } else if (placement4 == 4){
                    var placement4 = ":four:ème place";
                } else if (placement4 == 5){
                    var placement4 = ":five:ème place";
                } else if (placement4 == 6){
                    var placement4 = ":six:ème place";
                } else if (placement4 == 7){
                    var placement4 = ":seven:ème place";
                } else if (placement4 == 8){
                    var placement4 = ":eight:ème place";
                } else if (placement4 == 9){
                    var placement4 = ":nine:ème place";
                } else if (placement4 == 10){
                    var placement4 = ":keycap_ten:ème place";
                } 
            }

            for(var i = 0; i < res7.body.info.participants.length; i++){
                if(res7.body.info.participants[i].puuid == puuid){
                    var placement5 = res7.body.info.participants[i].placement;
                }

                if (placement5 == 1){
                    var placement5 = ":first_place: 1ère place";
                } else if (placement5 == 2){    
                    var placement5 = ":second_place: 2ème place";
                } else if (placement5 == 3){
                    var placement5 = ":third_place: 3ème place";
                } else if (placement5 == 4){
                    var placement5 = ":four:ème place";
                } else if (placement5 == 5){
                    var placement5 = ":five:ème place";
                } else if (placement5 == 6){
                    var placement5 = ":six:ème place";
                } else if (placement5 == 7){
                    var placement5 = ":seven:ème place";
                } else if (placement5 == 8){    
                    var placement5 = ":eight:ème place";
                } else if (placement5 == 9){
                    var placement5 = ":nine:ème place";
                } else if (placement5 == 10){
                    var placement5 = ":keycap_ten:ème place";
                }
            }

            var mode = res3.body.info.tft_game_type;
            var mode2 = res4.body.info.tft_game_type;
            var mode3 = res5.body.info.tft_game_type;
            var mode4 = res6.body.info.tft_game_type;
            var mode5 = res7.body.info.tft_game_type;

            currentTimestamp = Date.now();

            var endTimestamp = res3.body.info.game_datetime;
            var endTimestamp2 = res4.body.info.game_datetime;
            var endTimestamp3 = res5.body.info.game_datetime;
            var endTimestamp4 = res6.body.info.game_datetime;
            var endTimestamp5 = res7.body.info.game_datetime;

            var agoTimestamp = currentTimestamp - endTimestamp;
            var agoTimestamp2 = currentTimestamp - endTimestamp2;
            var agoTimestamp3 = currentTimestamp - endTimestamp3;
            var agoTimestamp4 = currentTimestamp - endTimestamp4;
            var agoTimestamp5 = currentTimestamp - endTimestamp5;

            var days = false;
            var days2 = false;
            var days3 = false;
            var days4 = false;
            var days5 = false;

            if(Math.floor(agoTimestamp / 3600000) > 24){
                var time = Math.floor(agoTimestamp / 86400000) + 1;
                days = true;
            } else {
                var time = Math.floor(agoTimestamp / 3600000);
                days = false;
            }

            if(Math.floor(agoTimestamp2 / 3600000) > 24){
                var time2 = Math.floor(agoTimestamp2 / 86400000) + 1;
                days2 = true;
            } else {
                var time2 = Math.floor(agoTimestamp2 / 3600000);
                days2 = false;
            }

            if(Math.floor(agoTimestamp3 / 3600000) > 24){
                var time3 = Math.floor(agoTimestamp3 / 86400000) + 1;
                days3 = true;
            } else {
                var time3 = Math.floor(agoTimestamp3 / 3600000);
                days3 = false;
            }

            if(Math.floor(agoTimestamp4 / 3600000) > 24){
                var time4 = Math.floor(agoTimestamp4 / 86400000) + 1;
                days4 = true;
            } else {
                var time4 = Math.floor(agoTimestamp4 / 3600000);
                days4 = false;
            }

            if(Math.floor(agoTimestamp5 / 3600000) > 24){
                var time5 = Math.floor(agoTimestamp5 / 86400000) + 1;
                days5 = true;
            } else {
                var time5 = Math.floor(agoTimestamp5 / 3600000);
                days5 = false;
            }

            interaction.reply({ embeds: [new EmbedBuilder()
                .setTitle(`Matchs TFT de ${summoner}`)
                .setDescription(`Les 5 derniers matchs TFT de ${summoner}`)
                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${res.body.profileIconId}.png`)
                .addFields({name: `Match1`, value: `**Mode:** ${mode == 'pairs' ? 'Double Up' : mode} \n **Placement:** ${placement} \n **Il y a:** ${time} ${days == true ? 'jours' : 'heures'}`})
                .addFields({name: `Match2`, value: `**Mode:** ${mode2 == 'pairs' ? 'Double Up' : mode2} \n **Placement:** ${placement2} \n **Il y a:** ${time2} ${days2 == true ? 'jours' : 'heures'}`})
                .addFields({name: `Match3`, value: `**Mode:** ${mode3 == 'pairs' ? 'Double Up' : mode3} \n **Placement:** ${placement3} \n **Il y a:** ${time3} ${days3 == true ? 'jours' : 'heures'}`})
                .addFields({name: `Match4`, value: `**Mode:** ${mode4 == 'pairs' ? 'Double Up' : mode4} \n **Placement:** ${placement4} \n **Il y a:** ${time4} ${days4 == true ? 'jours' : 'heures'}`})
                .addFields({name: `Match5`, value: `**Mode:** ${mode5 == 'pairs' ? 'Double Up' : mode5} \n **Placement:** ${placement5} \n **Il y a:** ${time5} ${days5 == true ? 'jours' : 'heures'}`})
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})] });
            }
    },
};

