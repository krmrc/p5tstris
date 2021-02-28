class Srs {
    static readonly Z: Block[] = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
    static readonly R: Block[] = [new Block(0, 0), new Block(1, 0), new Block(1, 1), new Block(0, -2), new Block(1, -2)];
    static readonly T: Block[] = [new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0), new Block(0, 0)];
    static readonly L: Block[] = [new Block(0, 0), new Block(-1, 0), new Block(-1, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, -2), new Block(-1, -2)];

    static readonly R_O: Block[] = [new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1)];
    static readonly T_O: Block[] = [new Block(-1, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1), new Block(0, 1)];
    static readonly L_O: Block[] = [new Block(-1, 0), new Block(-1, 0), new Block(-1, 0), new Block(-1, 0), new Block(-1, 0)];

    static readonly Z_I: Block[] = [new Block(0, 0), new Block(-1, 0), new Block(2, 0), new Block(-1, 0), new Block(2, 0)];
    static readonly R_I: Block[] = [new Block(-1, 0), new Block(0, 0), new Block(0, 0), new Block(0, -1), new Block(0, 2)];
    static readonly T_I: Block[] = [new Block(-1, -1), new Block(1, -1), new Block(-2, -1), new Block(1, 0), new Block(-2, 0)];
    static readonly L_I: Block[] = [new Block(0, -1), new Block(0, -1), new Block(0, -1), new Block(0, 1), new Block(0, -2)];

    static getRotation(now: Mino, future: Mino, off: number): Block {
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