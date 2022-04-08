const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static('./public/'));

let players = [];

io.on('connection', socket => {
    console.log("New webSocket");

    socket.on('playerMovement', (player, username) => {
        socket.broadcast.emit('player', {player, username});
    });
})

app.get('/', (req, res) => {
    res.render('start');
});

app.post('/', (req, res) => {
    let i = 0;
    let isOccupied = false;
    players.forEach(onePlayer => {
        if (onePlayer == req.body.username){
            isOccupied = true;
        }
        i++;
    });

    if(!isOccupied){
        players.push(req.body.username);
        let playerID = players.length - 1;
        console.log(players, playerID);
        res.render('game', {username: req.body.username, playerID});
    } else {
        res.render('start');
    }
});