/// <reference path="State.ts"/>
/// <reference path="Setting.ts"/>
class OptionState extends State {
    b_apply: p5.Element;
    input: p5.Element[];
    texts: p5.Element[];
    constructor() {
        super();
        this.input = new Array<p5.Element>();
        this.texts = new Array<p5.Element>();
        for (let i = 0; i < 7; i++) {
            this.texts[i] = createElement('ul', Setting.SETTING_NAME[i]);
            this.texts[i].position((windowWidth / 2) - 160, i * 50);
            this.input.push(createInput());
            this.input[i].position((windowWidth / 2) - 100, i * 50);
            this.input[i].value(Setting.settings[i]);
        }
        this.b_apply = createButton("Apply");
        this.b_apply.position(windowWidth / 2, windowHeight / 2);
        this.b_apply.mousePressed(() => this.apply());
        this.b_apply.style("font-family", "Anton");
        this.b_apply.style("background-color", "#FF5000");
        this.b_apply.style("color", "#FFFFFF");
        this.b_apply.style("font-size", "20pt");
        this.b_apply.style("padding", "24px");
        this.b_apply.center();
    }

    drawState(): void {
        background(128);
    }
    keyPressed(): void {
    }
    keyReleased(): void {
    }
    mousePressed(): void {
    }
    mouseReleased(): void {
    }
    apply() {
        Setting.up = this.input[0].value() as string;
        Setting.down = this.input[1].value() as string;
        Setting.left = this.input[2].value() as string;
        Setting.right = this.input[3].value() as string;
        Setting.cw = this.input[4].value() as string;
        Setting.ccw = this.input[5].value() as string;
        Setting.hold = this.input[6].value() as string;
    }
    deleteObject() {
        this.b_apply.remove();
        for (let i of this.input) {
            i.remove();
        }
        for (let t of this.texts) {
            t.remove();
        }
    }

    decideState(): State {
        if (keyPressed && key === 'j') {
            this.deleteObject();
            return new MenuState();
        }
        return this;
    }
}