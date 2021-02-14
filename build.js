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
        rect(Block.SIZE * this.x + Block.OFFSET_X, Block.SIZE * this.y, Block.SIZE, Block.SIZE);
    }
}
Block.SIZE = 20;
Block.OFFSET_X = 100;
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
                for (let b of this.mino.calcBlocks()) {
                    this.field.putBlock(b.x, b.y, this.mino.shape);
                }
                this.mino = this.minos.shift();
                this.rng_generate();
                this.holded = false;
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
            let can_rotate = false;
            futureMino.rot = (futureMino.rot + this.minoVr + 400) % 4;
            for (let offset = 0; offset <= 5; offset++) {
                let diff = Srs.getRotation(this.mino, futureMino, offset);
                futureMino.x += diff.x;
                futureMino.y += diff.y;
                if (offset === 5) {
                    futureMino.offset = 0;
                    break;
                }
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
        background(64);
        this.field.draw();
        this.mino.draw();
        this.drawNexts();
        this.drawHold();
        this.fc++;
    }
}
Game.VISIBLE_NEXT = 5;
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
Srs.L = [new Block(0, 0), new Block(-1, 0), new Block(-1, 1), new Block(0, -2), new Block(-1, -2)];
Srs.R_O = [new Block(0, 1)];
Srs.T_O = [new Block(-1, 1)];
Srs.L_O = [new Block(-1, 0)];
Srs.Z_I = [new Block(0, 0), new Block(-1, 0), new Block(2, 0), new Block(-1, 0), new Block(2, 0)];
Srs.R_I = [new Block(-1, 0), new Block(0, 0), new Block(0, 0), new Block(0, -1), new Block(0, 2)];
Srs.T_I = [new Block(-1, -1), new Block(1, -1), new Block(-2, -1), new Block(1, 0), new Block(-2, 0)];
Srs.L_I = [new Block(0, -1), new Block(0, -1), new Block(0, -1), new Block(0, 1), new Block(0, -2)];
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
    if (key === ' ')
        game.mino_hold = true;
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