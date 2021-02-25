let state: State;
function setup() {
    createCanvas(windowWidth, windowHeight);
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    document.oncontextmenu = (e) => {
        e.preventDefault();
    }
    Block.size = floor(min(windowWidth, windowHeight) / 30);
    Block.offset_x = Block.size * 5;
    Block.offset_y = Block.size * -15;

    state = new MenuState();
}

function keyPressed() {
    state.keyPressed();
}
function keyReleased() {
    state.keyReleased();
}
function mousePressed() {
    state.mousePressed();
}
function mouseReleased() {
    state.mouseReleased();
}
function draw() {
    state = state.doState();
}
