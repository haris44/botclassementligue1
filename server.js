
const Discord = require("discord.js");
const request = require("request");
const client = new Discord.Client();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (!msg.content.includes('!Classement'))
    return

    var splitString = msg.content.split(" ");
    var country = splitString[1];

    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('league.json', 'utf8'));

    function checkNameforId(element) {
      return element.name === country;
    }
    var idLeague = obj.league.find(checkNameforId);

    var options = {
                        method: 'GET',
                        url: 'http://api.football-data.org/v1/competitions/'+ idLeague +'/leagueTable',
                        headers: { 'X-Auth-Token': process.env.AUTH_TOKEN }
                  }

                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                        var jsonData = JSON.parse(body)
                        msg.reply("Le classement de " +jsonData.leagueCaption +":")
                        var classement = jsonData.standing.reduce(function(tab, value) {
                          return tab + "**" +value.position + "** : " + value.teamName + "   " + value.points + "\n";
                        }, 0);
                        msg.channel.send(classement);
               });

});

// NE JAMAIS PUSH DE TOKEN SUR GITHUB !!!!!
client.login(process.env.TOKEN);

setInterval(() => {
 http.get('https://polar-temple-67867.herokuapp.com/');
}, 900000);
