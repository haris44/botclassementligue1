// si tu est sur vscode, essaye d'installer les dépendances es-lint et npm-intellisense et ajoute :
/* 
{
    "eslint.autoFixOnSave": true,
    "npm-intellisense.scanDevDependencies": true,
    "editor.formatOnSave": true,
}

Sinon c'est beaucoup mieux. Essaye de prendre l'habitude de mettre des const
L'avantage, c'est qu'une bonne partie des mauvaises pratiques ne peuvent pas se faire avec des const (for ...) 
Donc ça veux dire que dés que tu écrit un var et que tu est obligé de mettre un var, c'est qu'il y a un problème
quelque part.
*/
const Discord = require('discord.js');
const request = require('request');
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

  // must be const :p 
  let splitString = msg.content.split(' ');
  let country = splitString[1];

  let fs = require('fs');
  // Require doivent etre const et en haut du prog

  let obj = JSON.parse(fs.readFileSync('league.json', 'utf8'));

  // tu peut utiliser cette fonction directement dans le find (fn anonyme / arrow fn)
  function checkNameforId(element) {
    return element.name === country;
  }
  let idLeague = obj.league.find(checkNameforId);

  let options = {
    method: 'GET',
    url: 'http://api.football-data.org/v1/competitions/' + idLeague.id + '/leagueTable',
    headers: { 'X-Auth-Token': process.env.AUTH_TOKEN }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    // must be const
    let jsonData = JSON.parse(body)

    msg.reply('Le classement de ' + jsonData.leagueCaption + ':')

    // c'est beaucoup mieux que avant, maintenant tu peut encore simplifié grace à la fonction join
    // must be const
    let position = jsonData.standing.reduce(function (tab, value) {
      return tab + value.position + '\n';
    }, 0);

    // must be const
    let equipe = jsonData.standing.reduce(function (tab, value) {
      return tab + value.teamName + '\n';
    }, '');

    // must be const
    let points = jsonData.standing.reduce(function (tab, value) {
      return tab + value.points + '\n';
    }, 0);

    // must be const
    let embed = new Discord.RichEmbed()
      .addField('Position', position, true)
      .addField('Equipe', equipe, true)
      .addField('Points', points, true)
    msg.channel.sendEmbed(embed)
  });

});

client.login(process.env.TOKEN);

setInterval(() => {
  http.get('https://polar-temple-67867.herokuapp.com/');
}, 900000);
