console.log("Démarrage => coucou");
var fs = require("fs"),
    path = require('path'),
    vm = require('vm');
// Appel de config.js pour la configuration DEV ou PROD
vm.runInThisContext(fs.readFileSync(__dirname + "/config/config.js"))
// Init librairie
express = require('express'),
bodyParser = require('body-parser'),
session = require ('express-session'),
deferred = require('deferred'),
app = express();

// Déclaration dossier static
app.use('/', express.static(__dirname + '/app'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({secret: 'monsecret'}));

console.log(__dirname + '/app');
console.log("Dossier static => Start");
//
var mot = "";

// Routes
// Affichage de la PunshLine
app.get('/', function (req, res) {
    console.log("racine '/'");
    // gestion de la vue    
    res.sendfile(__dirname + '/app/views/index.html');
});

// Mes ajax
app.get('/mot', function (req,res){
    var listePiste = new Array();
    fs.readdir(dirPath, function(err,list){
        if(err) throw err;
        else{
            list.forEach(element => {
                if(element != "son"){
                    // je dois enlever le ".mp3" de chaque éléments.
                    listePiste.push(element.replace('.mp3',""));
                }
            });
            mot = listePiste[random(listePiste.length)]
            // mon JSON
            res.json({ selectMot : mot, url : '/mp3/'+ mot +'.mp3'});
        }
    });
});

// fonction random
function random(max) {
    return Math.floor(Math.random() * Math.floor(max));
}






// Démarrage serveur
app.listen(3000);