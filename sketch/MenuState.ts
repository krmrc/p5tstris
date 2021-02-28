/// <reference path="State.ts"/>

class MenuState extends State {
    nextState: number;
    b_game: p5.Element;
    b_bot: p5.Element;
    b_setting: p5.Element;
    constructor() {
        super();
        this.nextState = 0;

        this.b_game = createButton("GAME");
        this.b_game.position((windowWidth / 2), (windowHeight / 2) - 150);
        this.b_game.mousePressed(() => this.makeGame());
        this.b_game.style("font-family", "Anton");
        this.b_game.style("background-color", "#FF5000");
        this.b_game.style("color", "#FFFFFF");
        this.b_game.style("font-size", "24pt");
        this.b_game.style("padding", "24px");
        this.b_game.size(200, 100);
        this.b_game.center('horizontal');

        this.b_bot = createButton("BOT");
        this.b_bot.position((windowWidth / 2), (windowHeight / 2) - 50);
        this.b_bot.mousePressed(() => this.makeBot());
        this.b_bot.style("font-family", "Anton");
        this.b_bot.style("background-color", "#FF5000");
        this.b_bot.style("color", "#FFFFFF");
        this.b_bot.style("font-size", "24pt");
        this.b_bot.style("padding", "24px");
        this.b_bot.size(200, 100);
        this.b_bot.center('horizontal');

        this.b_setting = createButton("OPTION");
        this.b_setting.position(windowWidth / 2, (windowHeight / 2) + 150);
        this.b_setting.mousePressed(() => this.makeSetting());
        this.b_setting.style("font-family", "Anton");
        this.b_setting.style("background-color", "#FF5000");
        this.b_setting.style("color", "#FFFFFF");
        this.b_setting.style("font-size", "24pt");
        this.b_setting.style("padding", "24px");
        this.b_setting.size(200, 100);
        this.b_setting.center('horizontal');

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
        this.b_bot.remove();
        this.b_setting.remove();
    }
    makeBot() {
        this.nextState = 3;
        this.b_game.remove();
        this.b_bot.remove();
        this.b_setting.remove();
    }
    makeSetting() {
        this.nextState = 2;
        this.b_game.remove();
        this.b_bot.remove();
        this.b_setting.remove();
    }
    decideState(): State {
        // console.log(this.nextState);
        if (keyPressed && key === 'k' || this.nextState === 1) {
            this.b_game.remove();
            this.b_setting.remove();
            this.b_bot.remove();
            return new GameState();
        }
        if (keyPressed && key === 'l' || this.nextState === 2) {
            this.b_game.remove();
            this.b_setting.remove();
            this.b_bot.remove();
            return new OptionState();
        }
        if (keyPressed && key === ';' || this.nextState === 3) {
            this.b_game.remove();
            this.b_setting.remove();
            this.b_bot.remove();
            return new BotState();
        }
        return this;
    }
}
