/// <reference path="Game.ts"/>

class Bot extends Game {
    order: Array<number>;
    p_field: Field;
    p_mino: Mino;
    p_minos: Array<Mino>;
    constructor(rng?: number) {
        super();
        this.order = new Array<number>();
        this.p_field = new Field();
        this.p_minos = new Array<Mino>();
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

    undo(r?: number) {
        for (let y = 0; y < 42; y++) {
            for (let x = 0; x < 14; x++) {
                this.field.tiles[y][x] = this.p_field.tiles[y][x];
            }
        }
        this.minos = new Array<Mino>();
        for (let m of this.p_minos) {
            this.minos.push(m.copy());
        }
        if (r) {
            this.mino = new Mino(6, 20, (r + 400) % 4, this.p_mino.shape)
        } else {
            this.mino = new Mino(6, 20, 0, this.p_mino.shape);
        }
    }
    getColumnMinHeight(c: number) {
        for (let i = 0; i < 40; i++) {
            if (this.field.tiles[i][c] != 0) {
                return i;
            }
        }
        return 40;
    }
    getHeightAverage(): number {
        let height_sum = 0;
        for (let i = 2; i < 12; i++) {
            height_sum += this.getColumnMinHeight(i);
        }
        let average = height_sum / 10;
        return average;
    }
    getMinHeight(): number {
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
    getMaxHeight(): number {
        // int min = 0;
        for (let i = 0; i < 40; i++) {
            for (let j = 2; j < 12; j++) {
                if (this.field.tiles[i][j] != 0) {
                    return i;
                }
            }
        }
        return 40;
    }
    hensa2(): number {
        let hensa2 = 0.0;
        for (let i = 2; i < 12; i++) {
            hensa2 += pow((this.getColumnMinHeight(i) - this.getHeightAverage()), 2);
        }
        return hensa2;
    }

    calcScore(): number {
        const score = this.getMaxHeight() - 10 * sqrt(this.hensa2());
        console.log(score)
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

        let max_score: number = -99999;
        for (let r = -1; r < 3; r++) {
            if (r === 0) {
            } else if (r === 1) {
                this.minoVr = 1;
                this.rotate();
            } else if (r === 2) {
                this.minoVr = 1;
                this.rotate();
                this.minoVr = 1;
                this.rotate();
            } else {
                this.minoVr = -1;
                this.rotate();
            }
            for (let i = 2; i < 12; i++) {
                if (i <= 6) {
                    for (let j = 0; j < 6 - i; j++) {
                        this.minoVx = -1;
                        this.move();
                    }
                } else {
                    for (let j = 0; j < i - 6; j++) {
                        this.minoVx = 1;
                        this.move();
                    }

                }
                this.hardDrop();
                let now_score: number = this.calcScore();

                if (max_score < now_score) {
                    max_score = now_score;
                    // console.log(now_score)
                    this.order.splice(0);
                    if (r === 0) {
                    } else if (r === 1) {
                        this.order.push(32);
                    } else if (r === 2) {
                        this.order.push(32);
                        this.order.push(32);
                    } else {
                        this.order.push(16);
                    }
                    if (i <= 6) {
                        for (let j = 0; j < 6 - i; j++) {
                            this.order.push(1);
                        }
                    } else {
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
        if (this.order.length === 0) {
            this.makeDecision();
        } else {
            let o = this.order.shift();
            // console.log(o);
            if (o === 1) {
                this.minoVx = -1;
            } else if (o === 2) {
                this.minoVx = 1;
            } else if (o === 16) {
                this.minoVr = -1;
            } else if (o === 32) {
                this.minoVr = 1;
            } else if (o === 8) {
                this.minoHardDrop = true;
            }
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