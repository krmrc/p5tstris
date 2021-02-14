class Block {
    x: number;
    y: number;
    static size: number = 20;
    static readonly OFFSET_X: number = 100;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    static getMinoName(shape: number): string {
        let c: string;
        switch (shape) {
            case 0: c = ' '; break;
            case 1: c = 'S'; break; //S
            case 2: c = 'Z'; break; //Z
            case 3: c = 'J'; break; //J
            case 4: c = 'L'; break; //L
            case 5: c = 'T'; break; //T
            case 6: c = 'O'; break; //O
            case 7: c = 'I'; break; //I
            case 8: c = 'B'; break;
            default: c = 'W';
        }
        return c;
    }
    static getColor(kind: number): p5.Color {
        let c: p5.Color;
        switch (kind) {
            case 0: c = color('black'); break;
            case 1: c = color('green'); break; //S
            case 2: c = color('red'); break; //Z
            case 3: c = color('blue'); break; //J
            case 4: c = color('orange'); break; //L
            case 5: c = color('purple'); break; //T
            case 6: c = color('yellow'); break; //O
            case 7: c = color('cyan'); break; //I
            case 8: c = color('white'); break;
            default: c = color('black');
        }
        return c;

    }

    draw() {
        rect(Block.size * this.x + Block.OFFSET_X, Block.size * this.y, Block.size, Block.size);
    }
}