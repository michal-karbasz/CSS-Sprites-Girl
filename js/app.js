// document.addEventListener('DOMContentLoaded', function(){


    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canWidth = 1024;
    var canHeight = 768;  


    canvas.width = canWidth;
    canvas.height = canHeight;
    
//  sprite variables   
    var spriteRunRight = new Image();
    spriteRunRight.src = './img/run_right.png';
    var spriteRunLeft = new Image();
    spriteRunLeft.src = './img/run_left.png';
    var spriteIdle = new Image();
    spriteIdle.src = './img/idle.png';
    var spriteJumpRight = new Image();
    spriteJumpRight.src = './img/jump_right.png';
    var startX = 0;  //where to draw
    var startY = 768 - 82;
    var sourceX;
    var sourceY;
    var spriteWidth = 416;
    var spriteHeight = 9080;

    var spriteColumns = 1;
    var spriteRows = 20;

    var width = spriteWidth / spriteColumns;
    var height = spriteHeight / spriteRows;

    var leftPressed = false;
    var rightPressed = false;
    var upPressed = false;
    var speed = 3;
    var currentFrame = 0;
    var jumpHeight = 30;

    var gravity = canvas.gravity = 0.3;
    startY += gravity;

//display girl  
    function drawImage(){
        updateFrame();
        if (rightPressed === true){
            spriteHeight = 9080;
            spriteRows = 20;
            ctx.drawImage(spriteRunRight, sourceX, sourceY, width, height, startX, startY, 75, 82);
            startX += 5;
        } else if (leftPressed === true) {
            spriteHeight = 9080;
            spriteRows = 20;
            ctx.drawImage(spriteRunLeft, sourceX, sourceY, width, height, startX, startY, 75, 82);
            startX -= 5;
        } else if (upPressed === true) {
            spriteHeight = 13620;
            spriteRows = 30;
            ctx.drawImage(spriteJumpRight, sourceX, sourceY, width, height, startX, startY, 75, 82);
            jump()
            
            upPressed = false;            
        } else {
            spriteHeight = 7264;
            spriteRows = 16;
            ctx.drawImage(spriteIdle, sourceX, sourceY, width, height, startX, startY, 75, 82);
            
        }
    }


    
//sprite engine
    function updateFrame() {
        ctx.clearRect(startX, startY, 75, 82); //clear the leftover images
        currentFrame = ++currentFrame % spriteRows;
        sourceX = 0;
        sourceY = currentFrame * height;
    }    

    function runGame(rate) {
        clearInterval(intervalId);
        var intervalId = setInterval(function (rate) {
            drawImage();
        }, rate);
    }
    runGame(45);


function jump() {
    ctx.clearRect(startX, startY, 75, 82);
    startY -=jumpHeight;
    setTimeout(land, 500);
    
}

function land() {
    ctx.clearRect(startX, startY, 75, 82);
    startY +=jumpHeight;
    // ctx.clearRect(startX, startY, 75, 82);
}

// movement control
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 68) {
        rightPressed = true;
    } else if(e.keyCode == 65) {
        leftPressed = true;
    } else if(e.keyCode == 87) {
        upPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 68) {
        rightPressed = false;
    } else if(e.keyCode == 65) {
        leftPressed = false;
    } else if(e.keyCode == 87) {
        upPressed = false;
    }
}




// });