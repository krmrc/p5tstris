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
    if (key === 'w') game.minoHardDrop = true;
    if (keyCode === 83) game.minoDrop = true;
    if (key === ' ') game.mino_hold = true;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    game = new Game();

    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
}
function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
    Block.size = floor(min(windowWidth, windowHeight) / 45);
}

function draw() {
    if (left_clicking) {
        game.field.tiles[floor(mouseY / Block.size)][floor((mouseX - Block.OFFSET_X) / Block.size)] = 8;
    }
    if (right_clicking) {
        game.field.tiles[floor(mouseY / Block.size)][floor((mouseX - Block.OFFSET_X) / Block.size)] = 0;
    }
    game.proc();
}
