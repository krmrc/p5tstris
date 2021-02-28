class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static getMinoName(shape) {
        let c;
        switch (shape) {
            case 0:
                c = ' ';
                break;
            case 1:
                c = 'S';
                break;
            case 2:
                c = 'Z';
                break;
            case 3:
                c = 'J';
                break;
            case 4:
                c = 'L';
                break;
            case 5:
                c = 'T';
                break;
            case 6:
                c = 'O';
                break;
            case 7:
                c = 'I';
                break;
            case 8:
                c = 'B';
                break;
            default: c = 'W';
        }
        return c;
    }
    static getColor(kind) {
        let c;
        switch (kind) {
            case 0:
                c = color('black');
                break;
            case 1:
                c = color('green');
                break;
            case 2:
                c = color('red');
                break;
            case 3:
                c = color('blue');
                break;
            case 4:
                c = color('orange');
                break;
            case 5:
                c = color('purple');
                break;
            case 6:
                c = color('yellow');
                break;
            case 7:
                c = color('cyan');
                break;
            case 8:
                c = color('white');
                break;
            default: c = color('black');
        }
        return c;
    }
    draw() {
        rect(Block.size * this.x + Block.offset_x, Block.size * this.y + Block.offset_y, Block.size, Block.size);
    }
}
Block.size = 20;
Block.offset_x = Block.size * 5;
Block.offset_y = -Block.size * 15;
class Game {
    constructor(rng) {
        this.minoVx = 0;
        this.minoHardDrop = false;
        this.minoDrop = false;
        this.minoVr = 0;
        this.field = new Field();
        this.fc = 0;
        if (rng) {
            this.rng = rng;
        }
        else {
            this.rng = random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        this.minos = new Array();
        this.rng_generate();
        this.mino = this.minos.shift();
        this.hold = null;
        this.holded = false;
    }
    rng_next() {
        let y = this.rng;
        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        return y = y ^ (y << 5);
    }
    rng_generate() {
        while (this.minos.length < 12) {
            let bag = [0, 1, 2, 3, 4, 5, 6];
            for (let i = 6; i >= 0; i--) {
                this.rng = this.rng_next();
                let j = i + (this.rng % (7 - i));
                if (j < 0) {
                    j *= -1;
                }
                let newValue = bag[j];
                let oldValue = bag[i];
                bag[i] = newValue;
                bag[j] = oldValue;
            }
            for (let i = 0; i < 7; i++) {
                this.minos.push(new Mino(6, 20, 0, bag[i] + 1));
            }
        }
    }
    static isMinoMovable(mino, field) {
        let blocks = mino.calcBlocks();
        return blocks.every(b => field.tileAt(b.x, b.y) === 0);
    }
    drawNexts() {
        for (let i = 0; i < Game.VISIBLE_NEXT; i++) {
            let o = new Mino(18, 20 + (i * 4), 0, this.minos[i].shape).draw();
        }
    }
    drawHold() {
        if (this.hold !== null) {
            let o = new Mino(-3.5, 20, 0, this.hold).draw();
        }
    }
    put() {
        for (let b of this.mino.calcBlocks()) {
            this.field.putBlock(b.x, b.y, this.mino.shape);
        }
        this.mino = this.minos.shift();
        this.rng_generate();
        this.holded = false;
    }
    deleteLine() {
        let line;
        while ((line = this.field.findLineFilled()) !== -1) {
            this.field.cutLine(line);
        }
    }
    rotate() {
        if (this.minoVr !== 0) {
            let futureMino = this.mino.copy();
            let can_rotate = false;
            futureMino.rot = (futureMino.rot + this.minoVr + 400) % 4;
            for (let offset = 0; offset <= 5; offset++) {
                if (offset === 5) {
                    futureMino.offset = 0;
                    break;
                }
                let diff = Srs.getRotation(this.mino, futureMino, offset);
                futureMino.x += diff.x;
                futureMino.y += diff.y;
                if (Game.isMinoMovable(futureMino, this.field)) {
                    this.mino.x = futureMino.x;
                    this.mino.y = futureMino.y;
                    can_rotate = true;
                    break;
                }
                else {
                    futureMino.x = this.mino.x;
                    futureMino.y = this.mino.y;
                }
            }
            if (can_rotate) {
                this.mino.rot = (this.mino.rot + this.minoVr + 4000) % 4;
            }
            else {
                this.mino.offset = 0;
            }
            this.minoVr = 0;
        }
    }
    move() {
        if (this.minoVx !== 0) {
            let futureMino = this.mino.copy();
            futureMino.x += this.minoVx;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.x += this.minoVx;
            }
        }
    }
    hardDrop() {
        if (this.minoHardDrop) {
            let futureMino = this.mino.copy();
            while (Game.isMinoMovable(futureMino, this.field)) {
                futureMino.y++;
            }
            this.mino.y = futureMino.y - 1;
            this.put();
            this.deleteLine();
            this.minoHardDrop = false;
        }
    }
    proc() {
        if (this.mino_hold) {
            if (!this.holded) {
                if (this.hold === null) {
                    this.hold = this.mino.shape;
                    this.mino = this.minos.shift();
                    this.rng_generate();
                }
                else {
                    let tmp = new Mino(0, 0, 0, this.mino.shape);
                    this.mino = new Mino(6, 20, 0, this.hold);
                    this.hold = tmp.shape;
                }
                this.holded = true;
            }
            this.mino_hold = false;
        }
        if (this.minoDrop) {
            let futureMino = this.mino.copy();
            futureMino.y += 1;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.y += 1;
            }
            else {
            }
        }
        this.rotate();
        this.hardDrop();
        this.move();
        background(64);
        this.field.draw();
        this.mino.draw();
        this.drawNexts();
        this.drawHold();
        this.fc++;
    }
}
Game.VISIBLE_NEXT = 5;
class Bot extends Game {
    constructor(rng) {
        super();
        this.order = new Array();
        this.p_field = new Field();
        this.p_minos = new Array();
        this.p_mino = this.p_minos.shift();
    }
    move() {
        if (this.minoVx !== 0) {
            let futureMino = this.mino.copy();
            futureMino.x += this.minoVx;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.x += this.minoVx;
            }
            this.minoVx = 0;
        }
    }
    undo(r) {
        for (let y = 0; y < 42; y++) {
            for (let x = 0; x < 14; x++) {
                this.field.tiles[y][x] = this.p_field.tiles[y][x];
            }
        }
        this.minos = new Array();
        for (let m of this.p_minos) {
            this.minos.push(m.copy());
        }
        if (r) {
            this.mino = new Mino(6, 20, (r + 400) % 4, this.p_mino.shape);
        }
        else {
            this.mino = new Mino(6, 20, 0, this.p_mino.shape);
        }
    }
    getColumnMinHeight(c) {
        for (let i = 0; i < 40; i++) {
            if (this.field.tiles[i][c] != 0) {
                return i;
            }
        }
        return 40;
    }
    getHeightAverage() {
        let height_sum = 0;
        for (let i = 2; i < 12; i++) {
            height_sum += this.getColumnMinHeight(i);
        }
        let average = height_sum / 10;
        return average;
    }
    getMinHeight() {
        let max = 40;
        for (let i = 40; i > 0; i--) {
            for (let j = 2; j < 11; j++) {
                if (this.field.tiles[i][j] != 0) {
                    max = i;
                }
            }
        }
        return max;
    }
    getMaxHeight() {
        for (let i = 0; i < 40; i++) {
            for (let j = 2; j < 12; j++) {
                if (this.field.tiles[i][j] != 0) {
                    return i;
                }
            }
        }
        return 40;
    }
    hensa2() {
        let hensa2 = 0.0;
        for (let i = 2; i < 12; i++) {
            hensa2 += pow((this.getColumnMinHeight(i) - this.getHeightAverage()), 2);
        }
        return hensa2;
    }
    calcScore() {
        const score = this.getMaxHeight() - 10 * sqrt(this.hensa2());
        console.log(score);
        return score;
    }
    makeDecision() {
        for (let y = 0; y < 42; y++) {
            for (let x = 0; x < 14; x++) {
                this.p_field.tiles[y][x] = this.field.tiles[y][x];
            }
        }
        this.p_mino = new Mino(6, 20, 0, this.mino.shape);
        this.p_minos.splice(0);
        for (let m of this.minos) {
            this.p_minos.push(m.copy());
        }
        let max_score = -99999;
        for (let r = -1; r < 3; r++) {
            if (r === 0) {
            }
            else if (r === 1) {
                this.minoVr = 1;
                this.rotate();
            }
            else if (r === 2) {
                this.minoVr = 1;
                this.rotate();
                this.minoVr = 1;
                this.rotate();
            }
            else {
                this.minoVr = -1;
                this.rotate();
            }
            for (let i = 2; i < 12; i++) {
                if (i <= 6) {
                    for (let j = 0; j < 6 - i; j++) {
                        this.minoVx = -1;
                        this.move();
                    }
                }
                else {
                    for (let j = 0; j < i - 6; j++) {
                        this.minoVx = 1;
                        this.move();
                    }
                }
                this.hardDrop();
                let now_score = this.calcScore();
                if (max_score < now_score) {
                    max_score = now_score;
                    this.order.splice(0);
                    if (r === 0) {
                    }
                    else if (r === 1) {
                        this.order.push(32);
                    }
                    else if (r === 2) {
                        this.order.push(32);
                        this.order.push(32);
                    }
                    else {
                        this.order.push(16);
                    }
                    if (i <= 6) {
                        for (let j = 0; j < 6 - i; j++) {
                            this.order.push(1);
                        }
                    }
                    else {
                        for (let j = 0; j < i - 6; j++) {
                            this.order.push(2);
                        }
                    }
                    this.order.push(8);
                }
                this.undo(r);
            }
            this.undo();
        }
        this.undo();
    }
    proc() {
        if (this.mino_hold) {
            if (!this.holded) {
                if (this.hold === null) {
                    this.hold = this.mino.shape;
                    this.mino = this.minos.shift();
                    this.rng_generate();
                }
                else {
                    let tmp = new Mino(0, 0, 0, this.mino.shape);
                    this.mino = new Mino(6, 20, 0, this.hold);
                    this.hold = tmp.shape;
                }
                this.holded = true;
            }
            this.mino_hold = false;
        }
        if (this.minoDrop) {
            let futureMino = this.mino.copy();
            futureMino.y += 1;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.y += 1;
            }
            else {
            }
        }
        if (this.order.length === 0) {
            this.makeDecision();
        }
        else {
            let o = this.order.shift();
            if (o === 1) {
                this.minoVx = -1;
            }
            else if (o === 2) {
                this.minoVx = 1;
            }
            else if (o === 16) {
                this.minoVr = -1;
            }
            else if (o === 32) {
                this.minoVr = 1;
            }
            else if (o === 8) {
                this.minoHardDrop = true;
            }
        }
        this.rotate();
        this.hardDrop();
        this.move();
        background(64);
        this.field.draw();
        this.mino.draw();
        this.drawNexts();
        this.drawHold();
        this.fc++;
    }
}
class State {
    constructor() {
    }
    doState() {
        this.drawState();
        return this.decideState();
    }
}
class Setting {
}
Setting.left = 'a';
Setting.right = 'd';
Setting.up = 'w';
Setting.down = 's';
Setting.cw = 'm';
Setting.ccw = 'n';
Setting.hold = ' ';
Setting.settings = [Setting.up, Setting.down, Setting.left, Setting.right, Setting.cw, Setting.ccw, Setting.hold];
Setting.SETTING_NAME = ["UP", "DOWN", "LEFT", "RIGHT", "CW", "CCW", "HOLD"];
class GameState extends State {
    constructor() {
        super();
        this.left_clicking = false;
        this.right_clicking = false;
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
        if (key === Setting.left)
            this.game.minoVx = -1;
        if (key === Setting.right)
            this.game.minoVx = 1;
        if (key === Setting.ccw)
            this.game.minoVr = -1;
        if (key === Setting.cw)
            this.game.minoVr = 1;
        if (key === Setting.up)
            this.game.minoHardDrop = true;
        if (key === Setting.down)
            this.game.minoDrop = true;
        if (key === Setting.hold)
            this.game.mino_hold = true;
        if (key == 'r')
            this.game = new Game();
    }
    keyReleased() {
        if (key === Setting.left)
            this.game.minoVx = 0;
        if (key === Setting.right)
            this.game.minoVx = 0;
        if (key === Setting.ccw)
            this.game.minoVr = 0;
        if (key === Setting.cw)
            this.game.minoVr = 0;
        if (key === Setting.up)
            this.game.minoHardDrop = false;
        if (key === Setting.down)
            this.game.minoDrop = false;
        if (key === Setting.hold)
            this.game.mino_hold = false;
    }
    touchStart() {
        if (mouseX > windowWidth / 2) {
            this.game.minoVr = 1;
        }
        else {
            this.game.minoVr = -1;
        }
    }
    windowResized() {
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
        }
        catch (error) {
        }
        finally {
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
class BotState extends GameState {
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
        }
        catch (error) {
        }
        finally {
            this.game.proc();
        }
    }
}
class Field {
    constructor() {
        this.tiles = [
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ];
    }
    tileAt(x, y) {
        if (x < 0 || x >= 12 || y < 0 || y >= 42)
            return 8;
        return this.tiles[y][x];
    }
    putBlock(x, y, kind) {
        this.tiles[y][x] = kind;
    }
    findLineFilled() {
        for (let y = 0; y < 40; y++) {
            let isFilled = this.tiles[y].every(t => t !== 0);
            if (isFilled)
                return y;
        }
        return -1;
    }
    cutLine(y) {
        this.tiles.splice(y, 1);
        this.tiles.unshift([8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8]);
    }
    draw() {
        for (let y = 20; y < 41; y++) {
            for (let x = 1; x < 13; x++) {
                push();
                fill(Block.getColor(this.tileAt(x, y)));
                new Block(x, y).draw();
                pop();
            }
        }
    }
    toString() {
        let s = '';
        for (let y = 0; y < 42; y++) {
            for (let x = 0; x < 14; x++) {
                s += Block.getMinoName(this.tileAt(x, y));
            }
            s += '\n';
        }
        return s;
    }
}
class MenuState extends State {
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
    decideState() {
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
class Mino {
    constructor(x, y, rot, shape, offset) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.shape = shape;
        if (offset) {
            this.offset = offset;
        }
        else {
            this.offset = 0;
        }
        this.p_rot = 0;
    }
    calcBlocks() {
        let blocks = [];
        switch (this.shape) {
            case 1:
                blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, -1)];
                break;
            case 2:
                blocks = [new Block(-1, -1), new Block(0, -1), new Block(0, 0), new Block(1, 0)];
                break;
            case 3:
                blocks = [new Block(1, 0), new Block(-1, 0), new Block(-1, -1), new Block(0, 0)];
                break;
            case 4:
                blocks = [new Block(1, 0), new Block(-1, 0), new Block(1, -1), new Block(0, 0)];
                break;
            case 5:
                blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, 0)];
                break;
            case 6:
                blocks = [new Block(1, -1), new Block(1, 0), new Block(0, 0), new Block(0, -1)];
                break;
            case 7:
                blocks = [new Block(-1, 0), new Block(2, 0), new Block(0, 0), new Block(1, 0)];
                break;
        }
        let rot = (40000000 + this.rot) % 4;
        for (let r = 0; r < rot; r++) {
            blocks = blocks.map(b => new Block(-b.y, b.x));
        }
        blocks.forEach(b => (b.x += this.x, b.y += this.y));
        return blocks;
    }
    draw() {
        push();
        fill(Block.getColor(this.shape));
        let blocks = this.calcBlocks();
        for (let b of blocks) {
            b.draw();
        }
        pop();
    }
    copy() {
        return new Mino(this.x, this.y, this.rot, this.shape);
    }
    printShape() {
        return `${Block.getMinoName(this.shape)}`;
    }
    toString() {
        return `${Block.getMinoName(this.shape)}`;
    }
}
class OptionState extends State {
    constructor() {
        super();
        this.input = new Array();
        this.texts = new Array();
        for (let i = 0; i < 7; i++) {
            this.texts[i] = createElement('ul', Setting.SETTING_NAME[i]);
            this.texts[i].position((windowWidth / 2) - 160, i * 50);
            this.input.push(createInput());
            this.input[i].position((windowWidth / 2) - 100, i * 50);
            this.input[i].value(Setting.settings[i]);
        }
        this.b_apply = createButton("Apply");
        this.b_apply.position(windowWidth / 2, windowHeight / 2);
        this.b_apply.mousePressed(() => this.apply());
        this.b_apply.style("font-family", "Anton");
        this.b_apply.style("background-color", "#FF5000");
        this.b_apply.style("color", "#FFFFFF");
        this.b_apply.style("font-size", "20pt");
        this.b_apply.style("padding", "24px");
        this.b_apply.center();
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
    apply() {
        Setting.up = this.input[0].value();
        Setting.down = this.input[1].value();
        Setting.left = this.input[2].value();
        Setting.right = this.input[3].value();
        Setting.cw = this.input[4].value();
        Setting.ccw = this.input[5].value();
        Setting.hold = this.input[6].value();
    }
    deleteObject() {
        this.b_apply.remove();
        for (let i of this.input) {
            i.remove();
        }
        for (let t of this.texts) {
            t.remove();
        }
    }
    decideState() {
        if (keyPressed && key === 'j') {
            this.deleteObject();
            return new MenuState();
        }
        return this;
    }
}
class Srs {
    static getRotation(now, future, off) {
        switch (now.shape) {
            case 6:
                if (now.rot === 0 && future.rot === 1) {
                    return new Block(Srs.Z[off].x - Srs.R_O[off].x, Srs.Z[off].y - Srs.R_O[off].y);
                }
                if (now.rot === 1 && future.rot === 2) {
                    return new Block(Srs.R_O[off].x - Srs.T_O[off].x, Srs.R_O[off].y - Srs.T_O[off].y);
                }
                if (now.rot === 2 && future.rot === 3) {
                    return new Block(Srs.T_O[off].x - Srs.L_O[off].x, Srs.T_O[off].y - Srs.L_O[off].y);
                }
                if (now.rot === 3 && future.rot === 0) {
                    return new Block(Srs.L_O[off].x - Srs.Z[off].x, Srs.L_O[off].y - Srs.Z[off].y);
                }
                break;
            case 7:
                if (now.rot === 0 && future.rot === 1) {
                    return new Block(Srs.Z_I[off].x - Srs.R_I[off].x, Srs.Z_I[off].y - Srs.R_I[off].y);
                }
                if (now.rot === 1 && future.rot === 2) {
                    return new Block(Srs.R_I[off].x - Srs.T_I[off].x, Srs.R_I[off].y - Srs.T_I[off].y);
                }
                if (now.rot === 2 && future.rot === 3) {
                    return new Block(Srs.T_I[off].x - Srs.L_I[off].x, Srs.T_I[off].y - Srs.L_I[off].y);
                }
                if (now.rot === 3 && future.rot === 0) {
                    return new Block(Srs.L_I[off].x - Srs.Z_I[off].x, Srs.L_I[off].y - Srs.Z_I[off].y);
                }
                if (now.rot === 0 && future.rot === 3) {
                    return new Block(Srs.Z_I[off].x - Srs.L_I[off].x, Srs.Z_I[off].y - Srs.L_I[off].y);
                }
                if (now.rot === 1 && future.rot === 0) {
                    return new Block(Srs.R_I[off].x - Srs.Z_I[off].x, Srs.R_I[off].y - Srs.Z_I[off].y);
                }
                if (now.rot === 2 && future.rot === 1) {
                    return new Block(Srs.T_I[off].x - Srs.R_I[off].x, Srs.T_I[off].y - Srs.R_I[off].y);
                }
                if (now.rot === 3 && future.rot === 2) {
                    return new Block(Srs.L_I[off].x - Srs.T_I[off].x, Srs.L_I[off].y - Srs.T_I[off].y);
                }
                break;
            default:
                if (now.rot === 0 && future.rot === 1) {
                    return new Block(Srs.Z[off].x - Srs.R[off].x, Srs.Z[off].y - Srs.R[off].y);
                }
                if (now.rot === 1 && future.rot === 2) {
                    return new Block(Srs.R[off].x - Srs.T[off].x, Srs.R[off].y - Srs.T[off].y);
                }
                if (now.rot === 2 && future.rot === 3) {
                    return new Block(Srs.T[off].x - Srs.L[off].x, Srs.T[off].y - Srs.L[off].y);
                }
                if (now.rot === 3 && future.rot === 0) {
                    return new Block(Srs.L[off].x - Srs.Z[off].x, Srs.L[off].y - Srs.Z[off].y);
                }
                if (now.rot === 0 && future.rot === 3) {
                    return new Block(Srs.Z[off].x - Srs.L[off].x, Srs.Z[off].y - Srs.L[off].y);
                }
                if (now.rot === 1 && future.rot === 0) {
                    return new Block(Srs.R[off].x - Srs.Z[off].x, Srs.R[off].y - Srs.Z[off].y);
                }
                if (now.rot === 2 && future.rot === 1) {
                    return new Block(Srs.T[off].x - Srs.R[off].x, Srs.T[off].y - Srs.R[off].y);
                }
                if (now.rot === 3 && future.rot === 2) {
                    return new Block(Srs.L[off].x - Srs.T[off].x, Srs.L[off].y - Srs.T[off].y);
                }
                break;
        }
        return new Block(0, 0);
    }
}
Srs.Z = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
Srs.R = [new Block(0, 0), new Block(1, 0), new Block(1, 1), new Block(0, -2), new Block(1, -2)];
Srs.T = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
Srs.L = [new Block(0, 0), new Block(-1, 0), new Block(-1, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, -2), new Block(-1, -2)];
Srs.R_O = [new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1)];
Srs.T_O = [new Block(-1, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1)];
Srs.L_O = [new Block(-1, 0), new Block(-1, 0), new Block(-1, 0), new Block(-1, 0), new Block(-1, 0)];
Srs.Z_I = [new Block(0, 0), new Block(-1, 0), new Block(2, 0), new Block(-1, 0), new Block(2, 0)];
Srs.R_I = [new Block(-1, 0), new Block(0, 0), new Block(0, 0), new Block(0, -1), new Block(0, 2)];
Srs.T_I = [new Block(-1, -1), new Block(1, -1), new Block(-2, -1), new Block(1, 0), new Block(-2, 0)];
Srs.L_I = [new Block(0, -1), new Block(0, -1), new Block(0, -1), new Block(0, 1), new Block(0, -2)];
let state;
function setup() {
    createCanvas(windowWidth, windowHeight);
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    document.oncontextmenu = (e) => {
        e.preventDefault();
    };
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
//# sourceMappingURL=../sketch/sketch/build.js.map