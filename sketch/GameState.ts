/// <reference path="State.ts"/>
/// <reference path="Setting.ts"/>

class GameState extends State {
    game: Game;
    left_clicking: boolean = false;
    right_clicking: boolean = false;
    constructor() {
        super();
        this.game = new Game();
    }


    mousePressed() {
        if (mouseButton === LEFT) {
            this.left_clicking = true;
        }
        if (mouseButton === RIGHT) {
            this.right_clicking = true;
        }
    }
    mouseReleased() {
        if (mouseButton === LEFT) {
            this.left_clicking = false;
        }
        if (mouseButton === RIGHT) {
            this.right_clicking = false;
        }
    }
    keyPressed() {
        if (key === Setting.left) this.game.minoVx = -1;
        if (key === Setting.right) this.game.minoVx = 1;
        if (key === Setting.ccw) this.game.minoVr = -1;
        if (key === Setting.cw) this.game.minoVr = 1;
        if (key === Setting.up) this.game.minoHardDrop = true;
        if (key === Setting.down) this.game.minoDrop = true;
        if (key === Setting.hold) this.game.mino_hold = true;
        if (key == 'r') this.game = new Game();
    }
    keyReleased() {
        if (key === Setting.left) this.game.minoVx = 0;
        if (key === Setting.right) this.game.minoVx = 0;
        if (key === Setting.ccw) this.game.minoVr = 0;
        if (key === Setting.cw) this.game.minoVr = 0;
        if (key === Setting.up) this.game.minoHardDrop = false;
        if (key === Setting.down) this.game.minoDrop = false;
        if (key === Setting.hold) this.game.mino_hold = false;
    }

    touchStart() {
        if (mouseX > windowWidth / 2) {
            this.game.minoVr = 1;
        } else {
            this.game.minoVr = -1;
        }
    }
    // touchMoved() {
    //     if (abs(mouseX - pmouseX) > abs(mouseY - pmouseY)) {
    //         if (pmouseX < mouseX) {
    //             this.game.minoVx = 1;
    //         } else {
    //             this.game.minoVx = -1;
    //         }
    //     } else {
    //         if (pmouseY < mouseY) {
    //             this.game.minoDrop = true;
    //         } else {
    //             this.game.minoHardDrop = true;
    //         }
    //     }
    // }

    windowResized() {
        // resizeCanvas(windowWidth, windowHeight);
        resizeCanvas(windowWidth, windowHeight);
        Block.size = floor(min(windowWidth, windowHeight) / 30);
        Block.offset_x = Block.size * 5;
        Block.offset_y = Block.size * -15;
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
    decideState() {
        if (keyPressed && key === 'j') {
            return new MenuState();
        }
        return this;
    }
}