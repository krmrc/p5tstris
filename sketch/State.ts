abstract class State {
    constructor() {

    }
    doState(): State {
        this.drawState();
        return this.decideState();
    }
    abstract drawState(): void;
    abstract keyPressed(): void;
    abstract keyReleased(): void;
    abstract mousePressed(): void;
    abstract mouseReleased(): void;
    abstract decideState(): State;
}