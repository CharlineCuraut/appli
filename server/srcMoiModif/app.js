const path = require('path');
const api = require('./api.js');
const apifriends = require('./apifriends.js');
const apimessages = require('./apimessages.js');
const Datastore = require('nedb');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");
const cors = require('cors')

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"   // IP sur laquelle tourne votre client
}));

app.use(session({
    secret: "technoweb rocks"
}));

app.use ( (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Method', 'POST, GET, OPTIONS, PUT, DELETE')
    res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

db = {}
db.messages = new Datastore({filename: basedir+"/messages.db"})
db.users = new Datastore({filename: basedir+"/users.db"})
db.friends = new Datastore({filename: basedir+"/friends.db"})


db.messages.loadDatabase()
db.users.loadDatabase()
db.friends.loadDatabase()

app.use('/api', api.default(db.users));
app.use('/apimessages', apimessages.default(db.messages, db.users));
app.use('/apifriends', apifriends.default(db.users, db.friends));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

