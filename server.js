
const Discord = require("discord.js");
var request = require("request");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!Classement') {
    var options = {
                        method: 'GET',
                        url: 'http://api.football-data.org/v1/competitions/450/leagueTable',
                        headers: { 'X-Auth-Token': '2459d8cb166a476a84cf82a8fa415b4d' }
                  }

                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                        var jsonData = JSON.parse(body)
                        var classement = "";
                        msg.reply("Le classement de ligue 1 :")
                        jsonData.standing.forEach(function(element) {
                            classement += element.position + " : " + element.teamName + "   " + element.points + "\n";
                        });
                        msg.channel.send(classement);
               });
  }

});

client.login('MzU2ODg3NTk5Mjc0NjU1NzY2.DJh5Cw.7Q8gkyXwPwTS4TbngV7RnqHWFCQ');
