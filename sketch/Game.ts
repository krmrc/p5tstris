class Game {
    mino: Mino;
    minoVx: number;
    minoDrop: boolean;
    minoVr: number;
    field: Field;
    fc: number;
    rng: number;
    minos: Array<Mino>;

    constructor(rng?: number) {
        this.minoVx = 0;
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
    }
    // static makeMino(): Mino {
    //     return new Mino(7, 20, 0, floor(random(0, 7)));
    // }
    private rng_next(): number { // XorShift32bit
        let y = this.rng;
        console.log(y)

        y = y ^ (y << 13);
        y = y ^ (y >> 17);
        return y = y ^ (y << 5);
    }
    private rng_generate() {
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
                this.minos.push(new Mino(7, 20, 0, bag[i] + 1));
            }
        }
    }
    static isMinoMovable(mino: Mino, field: Field) {
        let blocks = mino.calcBlocks();
        return blocks.every(b => field.tileAt(b.x, b.y) === 0);
    }

    proc() {
        // 落下
        if (this.minoDrop || this.fc % 20 === 19) {
            let futureMino = this.mino.copy();
            futureMino.y += 1;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.y += 1;
            } else {
                // 接地
                // 設置処理
                for (let b of this.mino.calcBlocks()) {
                    this.field.putBlock(b.x, b.y, this.mino.shape);
                }
                // console.log("せっち");
                this.mino = this.minos.shift();
                this.rng_generate();
            }
            // 消去
            let line;
            while ((line = this.field.findLineFilled()) !== -1) {
                this.field.cutLine(line);
            }
            this.minoDrop = false;
        }
        // 左右移動
        if (this.minoVx !== 0) {
            let futureMino = this.mino.copy();
            futureMino.x += this.minoVx;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.x += this.minoVx;
            }
            this.minoVx = 0;
        }
        // 回転
        if (this.minoVr !== 0) {
            let futureMino = this.mino.copy();
            futureMino.rot += this.minoVr;
            if (Game.isMinoMovable(futureMino, this.field)) {
                this.mino.rot += this.minoVr;
            }
            this.minoVr = 0;
        }

        // 描画
        background(64);
        this.field.draw();
        this.mino.draw();
        this.fc++;
    }
}
