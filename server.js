
const Discord = require("discord.js");
// request peut etre une constante
var request = require("request");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // Si tu veux verifier un élément qui est obligatoire pour toute la suite de ton code, tu peut écrire comme ça. 
  // Ça t'évite de prendre un niveau d'indentation direct, et puisque tu est dans une fonction, si tu return, tu coupe le reste
  if (msg.content !== '!Classement') 
    return 
    // options peut être une constante
    var options = {
                        method: 'GET',
      // L'URL peut etre défini en soit en variable d'env, soit en constante 
                        url: 'http://api.football-data.org/v1/competitions/450/leagueTable',
      // NE JAMAIS PUSH DE TOKEN SUR GITHUB !!!!! 
      // Ici, je t'ai passé tes tokens en variable d'env. Ça te permet de rendre ton code utilisable pour n'importe qui
      // Pour déclarer des variables d'env, soit tu les passe au démmarage (cf google), soit tu utilise un .env, soit tu export directement dans ton terminal
                        headers: { 'X-Auth-Token': process.env.AUTH_TOKEN }
                  }
// je pense que tu peut utiliser fetch (je suis plus sur)
                request(options, function (error, response, body) {
<<<<<<< HEAD
                if (error) throw new Error(error);
=======
                  
                  // if error throw error est une pratique qu'on appelle "let it crash". Perso j'adore, par contre, 
                  //il faut faire attention à ce que ton process node redemmare tout seul. (sinon, il va juste crasher)
                  // d'ailleurs, sur le premier if, tu pourrait faire la mme chose
                  if (error) throw new Error(error);
                        // pas de console.log ... :p
                        console.log(body);
                        // peut être une constante
>>>>>>> d578f49a087f906f30f0b0e33fc05df68e4c62a6
                        var jsonData = JSON.parse(body)
                        var classement = "";
                        msg.reply("Le classement de ligue 1 :")
                        // Alors, viens ici le plus intéressant ! Bon déja, arrow fn c'est mieux
                        // ensuite, tu a deux solution pour que ça soit fonctionnel :
                        // - Soit tu reduce ton array dans une string, ce qui fait que sur ton .reduce((prec, now), prec devient 
                          // classement, et now element
                        // Soit tu map ton tableau, et tu le join à la fin 
                        // dans tout les cas, on kill la dernière variable mutable de ton code comme ça, et ça c'est cool ! 
                        jsonData.standing.forEach(function(element) {
                            classement += element.position + " : " + element.teamName + "   " + element.points + "\n";
                        });
                        msg.channel.send(classement);
               });
  }

});

// NE JAMAIS PUSH DE TOKEN SUR GITHUB !!!!! 
client.login(process.env.TOKEN);
