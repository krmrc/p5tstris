let game: Game;
let left_clicking: boolean = false;
let right_clicking: boolean = false;

function mousePressed() {
    if (mouseButton === LEFT) {
        left_clicking = true;
    }
    if (mouseButton === RIGHT) {
        right_clicking = true;
    }
}
function mouseReleased() {
    if (mouseButton === LEFT) {
        left_clicking = false;
    }
    if (mouseButton === RIGHT) {
        right_clicking = false;
    }
}
function keyPressed() {
    if (keyCode === 65) game.minoVx = -1;
    if (keyCode === 68) game.minoVx = 1;
    if (key === 'n') game.minoVr = -1;
    if (key === 'm') game.minoVr = 1;
    if (key === 'w') game.minoHardDrop = true;
    if (keyCode === 83) game.minoDrop = true;
    if (key === ' ') game.mino_hold = true;
}
function keyReleased() {
    if (keyCode === 65) game.minoVx = 0;
    if (keyCode === 68) game.minoVx = 0;
    if (key === 'n') game.minoVr = 0;
    if (key === 'm') game.minoVr = 0;
    if (key === 'w') game.minoHardDrop = false;
    if (keyCode === 83) game.minoDrop = false;
    if (key === ' ') game.mino_hold = false;
}

function touchStart() {
    if (mouseX > windowWidth / 2) {
        game.minoVr = 1;
    } else {
        game.minoVr = -1;
    }
}
// function touchMoved() {
//     if (abs(mouseX - pmouseX) > abs(mouseY - pmouseY)) {
//         if (pmouseX < mouseX) {
//             game.minoVx = 1;
//         } else {
//             game.minoVx = -1;
//         }
//     } else {
//         if (pmouseY < mouseY) {
//             game.minoDrop = true;
//         } else {
//             game.minoHardDrop = true;
//         }
//     }
// }

function setup() {
    createCanvas(windowWidth, windowHeight);
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    Block.size = floor(min(windowWidth, windowHeight) / 30);
    Block.offset_x = Block.size * 5;
    Block.offset_y = Block.size * -15;
    game = new Game();
    frameRate(20);
}
function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
    resizeCanvas(windowWidth, windowHeight);
    Block.size = floor(min(windowWidth, windowHeight) / 30);
    Block.offset_x = Block.size * 5;
    Block.offset_y = Block.size * -15;
}

function draw() {
    if (left_clicking) {
        game.field.tiles[floor((mouseY - Block.offset_y) / Block.size)][floor((mouseX - Block.offset_x) / Block.size)] = 8;
    }
    if (right_clicking) {
        game.field.tiles[floor((mouseY - Block.offset_y) / Block.size)][floor((mouseX - Block.offset_x) / Block.size)] = 0;
    }
    game.proc();
}
