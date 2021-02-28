/// <reference path="GameState.ts"/>

class BotState extends GameState {
    game: Bot;
    constructor() {
        super();
        this.game = new Bot();
    }
    drawState() {
        try {
            if (this.left_clicking) {
                this.game.field.tiles[floor((mouseY - Block.offset_y) / Block.size)][floor((mouseX - Block.offset_x) / Block.size)] = 8;
            }
            if (this.right_clicking) {
                this.game.field.tiles[floor((mouseY - Block.offset_y) / Block.size)][floor((mouseX - Block.offset_x) / Block.size)] = 0;
            }
        } catch (error) {

        } finally {
            this.game.proc();
        }

    }
}