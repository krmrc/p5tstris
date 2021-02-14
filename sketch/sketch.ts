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
    if (keyCode === 81) game.minoVr = -1;
    if (keyCode === 69) game.minoVr = 1;
    if (keyCode === 83) game.minoDrop = true;
}

function setup() {
    createCanvas(600, 800);
    game = new Game();
}

function draw() {
    if (left_clicking) {
        game.field.tiles[floor(mouseY / Block.SIZE)][floor(mouseX / Block.SIZE)] = 8;
    }
    if (right_clicking) {
        game.field.tiles[floor(mouseY / Block.SIZE)][floor(mouseX / Block.SIZE)] = 0;
    }
    game.proc();
}