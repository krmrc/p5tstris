class Game {
    mino: Mino;
    hold: number;
    minoVx: number;
    minoHardDrop: boolean;
    minoDrop: boolean;
    mino_hold: boolean;
    holded: boolean;
    minoVr: number;
    field: Field;
    fc: number;
    rng: number;
    minos: Array<Mino>;
    static readonly VISIBLE_NEXT: number = 5;


    constructor(rng?: number) {
        this.minoVx = 0;
        this.minoHardDrop = false;
        this.minoDrop = false;
        this.minoVr = 0;
        this.field = new Field();
        this.fc = 0;
        if (rng) {
            this.rng = rng;
        } else {
            this.rng = random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        this.minos = new Array<Mino>();
        this.rng_generate();
        this.mino = this.minos.shift();
        this.hold = null;
        this.holded = false;
    }

    private rng_next(): number { // XorShift32bit
        let y = this.rng;
        // console.log(y)

        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        return y = y ^ (y << 5);
    }
    protected rng_generate() {
        while (this.minos.length < 12) {
            let bag: number[] = [0, 1, 2, 3, 4, 5, 6];

            for (let i = 6; i >= 0; i--) { // フィッシャーイェーツ
                this.rng = this.rng_next();
                let j = i + (this.rng % (7 - i));
                // println("j: "+j);
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
    static isMinoMovable(mino: Mino, field: Field) {
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
            let o = new Mino(-3.5, 20, 0, this.hold).draw()
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

            for (let offset = 0; offset <= 5; offset++) { // Blockのx,yの移動分だけ返していく。
                if (offset === 5) {
                    futureMino.offset = 0;
                    break;
                }
                let diff: Block = Srs.getRotation(this.mino, futureMino, offset);
                futureMino.x += diff.x;
                futureMino.y += diff.y;
                if (Game.isMinoMovable(futureMino, this.field)) {
                    this.mino.x = futureMino.x;
                    this.mino.y = futureMino.y;
                    can_rotate = true;
                    break;
                } else {
                    futureMino.x = this.mino.x;
                    futureMino.y = this.mino.y;
                }
            }
            if (can_rotate) {
                this.mino.rot = (this.mino.rot + this.minoVr + 4000) % 4;
            } else {
                this.mino.offset = 0;
            }
            // this.mino.offset = 0;
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
            // this.minoVx = 0;
        }
    }
    hardDrop() {
        if (this.minoHardDrop) {
            let futureMino = this.mino.copy();
            while (Game.isMinoMovable(futureMino, this.field)) {
                futureMino.y++;
            }
            this.mino.y = futureMino.y - 1;
            // 接地
            // 設置処理
            this.put();

            // 消去
            this.deleteLine();
            this.minoHardDrop = false;
        }
    }
    proc() {
        // Hold
        if (this.mino_hold) {
            if (!this.holded) {
                if (this.hold === null) {
                    this.hold = this.mino.shape;
                    this.mino = this.minos.shift();
                    this.rng_generate();
                } else {
                    let tmp = new Mino(0, 0, 0, this.mino.shape);
                    this.mino = new Mino(6, 20, 0, this.hold);
                    this.hold = tmp.shape;
                }
                this.holded = true;
            }
            this.mino_hold = false;

        }

        // 落下
        //  || this.fc % 20 === 19
        if (this.minoDrop) {
            let futureMino = this.mino.copy();
            futureMino.y += 1;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.y += 1;
            } else {
                // 接地
                // 設置処理
                // this.put();
            }
            // 消去
            // this.deleteLine();
            // this.minoDrop = false;
        }
        // 回転
        this.rotate();
        // ハードドロップ
        this.hardDrop();
        // 左右移動
        this.move();

        // 描画
        background(64);
        this.field.draw();
        this.mino.draw();
        this.drawNexts();
        this.drawHold();
        this.fc++;
    }
}
