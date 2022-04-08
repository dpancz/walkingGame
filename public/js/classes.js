class Player{
    constructor({
        position,
        velocity,
        sprites,
        framesMax = 1,
        scale = 1,
        framesLine = 1,
        username,
        currentSprite = 'down',
        framesCurrent = 0
    }){
        this.position = position;
        this.velocity = velocity;
        this.sprites = sprites;
        this.image = new Image();
        this.scale = scale;
        this.lastKey;
        this.username = username
        this.currentSprite = currentSprite;

        this.framesLine = framesLine;
        this.framesMax = framesMax;
        this.framesCurrent = framesCurrent;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.framePosition = {
            x: 0,
            y: 0
        };

        for(let sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    draw(){

        ctx.fillStyle = 'yellow';
        ctx.fillText(this.username, this.position.x + 15, this.position.y)

        ctx.drawImage(
            this.image,
            
            this.framePosition.x * (this.image.width / this.framesLine),
            this.framePosition.y * (this.image.height / this.framesLine),
            this.image.width / this.framesLine,
            this.image.height / this.framesLine,

            this.position.x,
            this.position.y,
            (this.image.width / this.framesLine) * this.scale,
            this.image.height / this.framesLine * this.scale
            );
    }

    update(){
        this.draw();
        //this.animateFrames();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        switch(this.framesCurrent){
            case 0:
                this.framePosition.x = 0;
                this.framePosition.y = 0;
                break;
            case 1:
                this.framePosition.x = 1;
                this.framePosition.y = 0;
                break;
            case 2:
                this.framePosition.x = 0;
                this.framePosition.y = 1;
                break;
            case 3:
                this.framePosition.x = 1;
                this.framePosition.y = 1;
                break;
        }
    }

    animateFrames(){
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold == 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    switchSprite(sprite){
        switch(sprite){
            case 'up':
                if (this.image != this.sprites.up.image){
                    this.image = this.sprites.up.image;
                    this.currentSprite = 'up';
                };
                break;
            case 'down':
                if (this.image != this.sprites.down.image){
                    this.image = this.sprites.down.image;
                    this.currentSprite = 'down';
                };
                break;
            case 'left':
                if (this.image != this.sprites.left.image){
                    this.image = this.sprites.left.image;
                    this.currentSprite = 'left';
                };
                break;
            case 'right':
                if (this.image != this.sprites.right.image){
                    this.image = this.sprites.right.image;
                    this.currentSprite = 'right';
                };
                break;
        }
    }
}