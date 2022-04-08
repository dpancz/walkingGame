const socket = io();

socket.on('player', (player) => {
    //console.log(player.player.username);
    outputPlayer(player.player.player, player.player.username);
});

setInterval(() => {
    socket.emit('playerMovement', {player, username})
}, 40)

function outputPlayer(user, username){

    const playerNew = new Player({
        username,
        position: user.position,
        velocity: user.velocity,
        sprites: user.sprites,
        framesMax: user.framesMax,
        framesLine: user.framesLine,
        scale: user.scale,
        currentSprite: user.currentSprite,
        framesCurrent: user.framesCurrent
    });

    //console.log(playerNew.framesCurrent)

    let isAlreadyIn = false;
    let indexOfPlayer;

    if (players.length > 0){
        let i = 0;
        players.forEach(onePlayer => {
            if(onePlayer.username == playerNew.username){
                isAlreadyIn = true;
                indexOfPlayer = i;
            }
            i++;
        });
    }

    if(!isAlreadyIn){
        players.push(playerNew);
    } else {
        players[indexOfPlayer] = playerNew;
    }
}