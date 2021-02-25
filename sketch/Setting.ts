class Setting {
    static left: string = 'a';
    static right: string = 'd'
    static up: string = 'w';
    static down: string = 's';
    static cw: string = 'm';
    static ccw: string = 'n';
    static hold: string = ' ';
    static settings: string[] = [Setting.up, Setting.down, Setting.left, Setting.right, Setting.cw, Setting.ccw, Setting.hold];
    static readonly SETTING_NAME: string[] = ["UP", "DOWN", "LEFT", "RIGHT", "CW", "CCW", "HOLD"];
}
