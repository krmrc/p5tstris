class Mino {
    x: number;
    y: number;
    rot: number;
    shape: number;
    offset: number;
    p_rot: number;
    constructor(x: number, y: number, rot: number, shape: number, offset?: number) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.shape = shape;
        if (offset) {
            this.offset = offset;
        } else {
            this.offset = 0;
        }
        this.p_rot = 0;
    }

    calcBlocks(): Block[] {
        let blocks: Block[] = [];
        // ※switchについて: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/switch
        switch (this.shape) {
            case 1: blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, -1)]; break; //S
            case 2: blocks = [new Block(-1, -1), new Block(0, -1), new Block(0, 0), new Block(1, 0)]; break; //Z
            case 3: blocks = [new Block(1, 0), new Block(-1, 0), new Block(-1, -1), new Block(0, 0)]; break; //J
            case 4: blocks = [new Block(1, 0), new Block(-1, 0), new Block(1, -1), new Block(0, 0)]; break; //L
            case 5: blocks = [new Block(-1, 0), new Block(0, 0), new Block(0, -1), new Block(1, 0)]; break; //T
            case 6: blocks = [new Block(1, -1), new Block(1, 0), new Block(0, 0), new Block(0, -1)]; break; //O
            case 7: blocks = [new Block(-1, 0), new Block(2, 0), new Block(0, 0), new Block(1, 0)]; break; //I
        }
        //this.rotの値だけ、90度右回転する。回数は剰余で0～3に丸めこむ。
        //this.rotがマイナスの場合剰余がバグるので、4の倍数を足して調整
        let rot = (40000000 + this.rot) % 4;
        for (let r = 0; r < rot; r++) {
            // ※mapについて: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            blocks = blocks.map(b => new Block(-b.y, b.x));
        }
        // blocks = Srs.calcRotation(blocks, rot, this.offset, this.shape);
        // Srs.calcRotation(this);
        //ブロックのグローバル座標（Field上の座標）に変換する
        //※forEachについて: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
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
    copy(): Mino {
        return new Mino(this.x, this.y, this.rot, this.shape);
    }
    printShape(): string {
        return `${Block.getMinoName(this.shape)}`;
    }
    toString() {
        return `${Block.getMinoName(this.shape)}`;
        // return `Mino(x:${this.x}, y:${this.y}, shape:${Block.getMinoName(this.shape)}, rot:${this.rot})`;
    }
}