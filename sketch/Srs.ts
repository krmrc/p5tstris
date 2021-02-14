class Srs {
    static readonly Z: Block[] = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
    static readonly R: Block[] = [new Block(0, 0), new Block(1, 0), new Block(1, 1), new Block(0, -2), new Block(1, -2)];
    static readonly T: Block[] = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
    static readonly L: Block[] = [new Block(0, 0), new Block(-1, 0), new Block(-1, 1), new Block(0, -2), new Block(-1, -2)];

    static readonly R_O: Block[] = [new Block(0, 1)];
    static readonly T_O: Block[] = [new Block(-1, 1)];
    static readonly L_O: Block[] = [new Block(-1, 0)];

    static readonly Z_I: Block[] = [new Block(0, 0), new Block(-1, 0), new Block(2, 0), new Block(-1, 0), new Block(2, 0)];
    static readonly R_I: Block[] = [new Block(-1, 0), new Block(0, 0), new Block(0, 0), new Block(0, -1), new Block(0, 2)];
    static readonly T_I: Block[] = [new Block(-1, -1), new Block(1, -1), new Block(-2, -1), new Block(1, 0), new Block(-2, 0)];
    static readonly L_I: Block[] = [new Block(0, -1), new Block(0, -1), new Block(0, -1), new Block(0, 1), new Block(0, -2)];

    static calcRotation(block: Block[], rot: number, off: number, kind: number): Block[] {
        switch (kind) {
            case 6:
                if (rot + 400 % 4 === 0) {
                    block = block.map(b => new Block(b.x - Srs.Z[off].x, b.y - Srs.Z[off].y));
                } else if (rot + 400 % 4 === 1) {
                    block = block.map(b => new Block(b.x - Srs.R_O[off].x, b.y - Srs.R_O[off].y));
                } else if (rot + 400 % 4 === 2) {
                    block = block.map(b => new Block(b.x - Srs.T_O[off].x, b.y - Srs.T_O[off].y));
                } else if (rot + 400 % 4 === 3) {
                    block = block.map(b => new Block(b.x - Srs.L_O[off].x, b.y - Srs.L_O[off].y));
                }
                break;
            case 7:
                if (rot + 400 % 4 === 0) {
                    block = block.map(b => new Block(b.x - Srs.Z_I[off].x, b.y - Srs.Z_I[off].y));
                } else if (rot + 400 % 4 === 1) {
                    block = block.map(b => new Block(b.x - Srs.R_I[off].x, b.y - Srs.R_I[off].y));
                } else if (rot + 400 % 4 === 2) {
                    block = block.map(b => new Block(b.x - Srs.T_I[off].x, b.y - Srs.T_I[off].y));
                } else if (rot + 400 % 4 === 3) {
                    block = block.map(b => new Block(b.x - Srs.L_I[off].x, b.y - Srs.L_I[off].y));
                }
                break;
            default:
                if (rot + 400 % 4 === 0) {
                    block = block.map(b => new Block(b.x - Srs.Z[off].x, b.y - Srs.Z[off].y));
                } else if (rot + 400 % 4 === 1) {
                    block = block.map(b => new Block(b.x - Srs.R[off].x, b.y - Srs.R[off].y));
                } else if (rot + 400 % 4 === 2) {
                    block = block.map(b => new Block(b.x - Srs.T[off].x, b.y - Srs.T[off].y));
                } else if (rot + 400 % 4 === 3) {
                    block = block.map(b => new Block(b.x - Srs.L[off].x, b.y - Srs.L[off].y));
                }
        }

        return block;
    }
    // static calcRotation(mino: Mino) {
    //     let diff: Block;
    //     switch (mino.shape) {
    //         case 6:
    //             if (mino.rot + 400 % 4 === 0) {
    //                 mino.x += Srs.Z[mino.offset].x;
    //                 mino.y += Srs.Z[mino.offset].y;
    //             } else if (mino.rot + 400 % 4 === 1) {
    //                 mino.x += Srs.R_O[mino.offset].x;
    //                 mino.y += Srs.R_O[mino.offset].y;
    //             } else if (mino.rot + 400 % 4 === 2) {
    //                 mino.x += Srs.T_O[mino.offset].x;
    //                 mino.y += Srs.T_O[mino.offset].y;
    //             } else if (mino.rot + 400 % 4 === 3) {
    //                 mino.x += Srs.L_O[mino.offset].x;
    //                 mino.y += Srs.L_O[mino.offset].y;
    //             }
    //             break;
    //     }
    // }
}