class Block {
    x: number;
    y: number;
    static readonly SIZE: number = 20;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    static getMinoName(shape: number): string {
        let c: string;
        switch (shape) {
            case 0: c = ' '; break;
            case 7: c = 'T'; break; //T
            case 1: c = 'Z'; break; //Z
            case 2: c = 'S'; break; //S
            case 3: c = 'L'; break; //L
            case 4: c = 'J'; break; //J
            case 5: c = 'O'; break; //O
            case 6: c = 'I'; break; //I
            case 8: c = 'B'; break;
            default: c = 'B';
        }
        return c;
    }
    static getColor(kind: number): p5.Color {
        let c: p5.Color;
        switch (kind) {
            case 0: c = color('black'); break;
            case 7: c = color('purple'); break;//T
            case 1: c = color('red'); break; //Z
            case 2: c = color('green'); break; //S
            case 3: c = color('orange'); break; //L
            case 4: c = color('blue'); break; //J
            case 5: c = color('yellow'); break; //O
            case 6: c = color('cyan'); break; //I
            case 8: c = color('white'); break;
            default: c = color('black');
        }
        return c;

    }

    draw() {
        rect(Block.SIZE * this.x, Block.SIZE * this.y, Block.SIZE, Block.SIZE);
    }
}