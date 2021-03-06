class Field {
    tiles: number[][];
    constructor() {
        // ※2次元配列について:
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array
        // 「2次元配列を生成する」を見てください。
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
    tileAt(x: number, y: number): number {
        if (x < 0 || x >= 12 || y < 0 || y >= 42) return 8; //画面外
        return this.tiles[y][x];
    }
    putBlock(x: number, y: number, kind: number) {
        this.tiles[y][x] = kind;
    }
    findLineFilled() {
        for (let y = 0; y < 40; y++) {
            // ※every関数について: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every
            let isFilled = this.tiles[y].every(t => t !== 0);
            if (isFilled) return y;
        }
        return -1;
    }
    cutLine(y: number) {
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