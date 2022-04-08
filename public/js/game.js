
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

let players = [];

const player = new Player({
    username,
    position: {
        x: 300,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    },
    sprites:{
        up: {
            imageSrc: '/public/assets/ACharUp.png'
            },
        down: {
            imageSrc: '/public/assets/ACharDown.png',
        },
        left: {
            imageSrc: '/public/assets/ACharLeft.png',
        },
        right: {
            imageSrc: '/public/assets/ACharRight.png',
        }
    },
    framesMax: 4,
    framesLine: 2,
    scale: 2,
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    player.update();
    //console.log(players);

    if(players.length > 0){
        players.forEach(onePlayer => {
            onePlayer.switchSprite(onePlayer.currentSprite);
            //console.log(onePlayer.currentSprite)
            onePlayer.update();
        });
    }

    player.velocity.x = 0;
    player.velocity.y = 0;

    if(players.length > 0){
        players.forEach(onePlayer => {
            onePlayer.velocity.x = 0;
            onePlayer.velocity.y = 0;
        });
    }

    //player movement
    if (keys.w.pressed && player.lastKey == 'up'){
        player.velocity.y -= 3;
        player.switchSprite('up');
        player.animateFrames();
    } else

    if (keys.s.pressed && player.lastKey == 'down'){
        player.velocity.y += 3;
        player.switchSprite('down');
        player.animateFrames();
    } else

    if (keys.a.pressed && player.lastKey == 'left'){
        player.velocity.x -= 3;
        player.switchSprite('left');
        player.animateFrames();
    } else

    if (keys.d.pressed && player.lastKey == 'right'){
        player.velocity.x += 3;
        player.switchSprite('right');
        player.animateFrames();
    } else {
        player.switchSprite(player.lastKey);
        player.framesCurrent = 0;
    }
}

window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = true;
            player.lastKey = 'up';
            break;
        case 's':
            keys.s.pressed = true;
            player.lastKey = 'down';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'left';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'right';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

player.switchSprite('down');
animate();