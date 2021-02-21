/// <reference path="State.ts"/>

class MenuState extends State {
    nextState: number;
    b_game: p5.Element;
    constructor() {
        super();
        this.nextState = 0;

        this.b_game = createButton("GAME");
        this.b_game.position(windowWidth / 2, windowHeight / 2);
        this.b_game.mousePressed(() => this.makeGame());
        this.b_game.style("font-family", "Anton");
        this.b_game.style("background-color", "#FF5000");
        this.b_game.style("color", "#FFFFFF");
        this.b_game.style("font-size", "24pt");
        this.b_game.style("padding", "24px");
        this.b_game.center();
    }
    drawState() {
        background(128);
    }
    keyPressed() {
    }
    keyReleased() {
    }
    mousePressed() {
    }
    mouseReleased() {
    }
    makeGame() {
        this.nextState = 1;
        this.b_game.remove();
    }
    decideState(): State {

        if (keyPressed && key === 'k' || this.nextState === 1) {
            return new GameState();
        }
        return this;
    }
}