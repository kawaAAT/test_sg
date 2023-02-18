import { Application, Container } from 'pixi.js';

export default class BaseScene extends Container {
    protected app: Application;

    constructor(app: Application) {
        super();

        this.visible = false;
        this.app = app;

        window.addEventListener('resize', _ => {
            this.resize();
        });
    }

    public show(): void {
        this.visible = true;
        this.resize();
    }

    public hide(): void {
        this.visible = false;
    }

    protected resize(): void { }
}
