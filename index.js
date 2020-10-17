const canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let ballRadius = 10;
    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 2;
    let dy = -2;
    let racketHeight = 10;
    let racketWidth = 75;
    let racketX = (canvas.width-racketWidth)/2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 5;
    let brickColumnCount = 4;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let score = 0;
    let lives = 3;

    const bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    
    function collisionDetection() {
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                let b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            alert("Gratulerer, du vant!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function tegnBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    function tegnRacket() {
        ctx.beginPath();
        ctx.rect(racketX, canvas.height-racketHeight, racketWidth, racketHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    function tegnBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function tegnScore() {
        ctx.font = "20px helvetica";
        ctx.fillStyle = "white";
        ctx.fillText("Poeng: "+score, 8, 20);
    }
    function tegnLives() {
        ctx.font = "20px helvetica";
        ctx.fillStyle = "white";
        ctx.fillText("Liv: "+lives, canvas.width-65, 20);
    }

    function tegn() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tegnBricks();
        tegnBall();
        tegnRacket();
        tegnScore();
        tegnLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > racketX && x < racketX + racketWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    racketX = (canvas.width-racketWidth)/2;
                }
            }
        }

        if(rightPressed && racketX < canvas.width-racketWidth) {
            racketX += 7;
        }
        else if(leftPressed && racketX > 0) {
            racketX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(tegn);
    }

    tegn();