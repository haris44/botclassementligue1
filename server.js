
const Discord = require("discord.js");
const request = require("request");
const client = new Discord.Client();

const urlLigue1 = 'http://api.football-data.org/v1/competitions/450/leagueTable';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content !== '!Classement')
    return

    var options = {
                        method: 'GET',
                        url: urlLigue1,
                        headers: { 'X-Auth-Token': process.env.AUTH_TOKEN }
                  }

                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                        var jsonData = JSON.parse(body)
                        msg.reply("Le classement de ligue 1 :")
                        var classement = jsonData.reduce(function(tab, value) {
                          return a + value.position + " : " + value.teamName + "   " + value.points + "\n";
                        }, 0);
                        msg.channel.send(classement);
               });
  }

});

// NE JAMAIS PUSH DE TOKEN SUR GITHUB !!!!!
client.login(process.env.TOKEN);
