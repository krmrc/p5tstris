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
            case 7:
                c = 'T';
                break;
            case 1:
                c = 'Z';
                break;
            case 2:
                c = 'S';
                break;
            case 3:
                c = 'L';
                break;
            case 4:
                c = 'J';
                break;
            case 5:
                c = 'O';
                break;
            case 6:
                c = 'I';
                break;
            case 8:
                c = 'B';
                break;
            default: c = 'B';
        }
        return c;
    }
    static getColor(kind) {
        let c;
        switch (kind) {
            case 0:
                c = color('black');
                break;
            case 7:
                c = color('purple');
                break;
            case 1:
                c = color('red');
                break;
            case 2:
                c = color('green');
                break;
            case 3:
                c = color('orange');
                break;
            case 4:
                c = color('blue');
                break;
            case 5:
                c = color('yellow');
                break;
            case 6:
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
        rect(Block.SIZE * this.x, Block.SIZE * this.y, Block.SIZE, Block.SIZE);
    }
}
Block.SIZE = 20;
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
        for (let y = 0; y < 42; y++) {
            for (let x = 0; x < 14; x++) {
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
class Game {
    constructor(rng) {
        this.minoVx = 0;
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
    }
    rng_next() {
        let y = this.rng;
        console.log(y);
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
                this.minos.push(new Mino(7, 20, 0, bag[i] + 1));
            }
        }
    }
    static isMinoMovable(mino, field) {
        let blocks = mino.calcBlocks();
        return blocks.every(b => field.tileAt(b.x, b.y) === 0);
    }
    proc() {
        if (this.minoDrop || this.fc % 20 === 19) {
            let futureMino = this.mino.copy();
            futureMino.y += 1;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.y += 1;
            }
            else {
                for (let b of this.mino.calcBlocks()) {
                    this.field.putBlock(b.x, b.y, this.mino.shape);
                }
                this.mino = this.minos.shift();
                this.rng_generate();
            }
            let line;
            while ((line = this.field.findLineFilled()) !== -1) {
                this.field.cutLine(line);
            }
            this.minoDrop = false;
        }
        if (this.minoVx !== 0) {
            let futureMino = this.mino.copy();
            futureMino.x += this.minoVx;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.x += this.minoVx;
            }
            this.minoVx = 0;
        }
        if (this.minoVr !== 0) {
            let futureMino = this.mino.copy();
            futureMino.rot += this.minoVr;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.rot += this.minoVr;
            }
            this.minoVr = 0;
        }
        background(64);
        this.field.draw();
        this.mino.draw();
        this.fc++;
    }
}
class Mino {
    constructor(x, y, rot, shape) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.shape = shape;
    }
    calcBlocks() {
        let blocks = [];
        switch (this.shape) {
            case 7:
                blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, 0)];
                break;
            case 1:
                blocks = [new Block(-1, -1), new Block(0, -1), new Block(0, 0), new Block(1, 0)];
                break;
            case 2:
                blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, -1)];
                break;
            case 3:
                blocks = [new Block(-1, -2), new Block(-1, -1), new Block(-1, 0), new Block(0, 0)];
                break;
            case 4:
                blocks = [new Block(0, -2), new Block(0, -1), new Block(-1, 0), new Block(0, 0)];
                break;
            case 5:
                blocks = [new Block(-1, -1), new Block(-1, 0), new Block(0, 0), new Block(0, -1)];
                break;
            case 6:
                blocks = [new Block(-2, 0), new Block(-1, 0), new Block(0, 0), new Block(1, 0)];
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
let game;
let left_clicking = false;
let right_clicking = false;
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
    if (keyCode === 65)
        game.minoVx = -1;
    if (keyCode === 68)
        game.minoVx = 1;
    if (keyCode === 81)
        game.minoVr = -1;
    if (keyCode === 69)
        game.minoVr = 1;
    if (keyCode === 83)
        game.minoDrop = true;
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
//# sourceMappingURL=../sketch/sketch/build.js.map