import { Application, Container, Renderer } from 'pixi.js';
import ScenesManager from './scenes/scenes-manager';
import Loader from './kernel/loader';
import TWEEN from '@tweenjs/tween.js';
const FPSMeter = require('fps-m')

const main = async () => {
    const app = new Application();
    app.renderer.backgroundColor = 0xF3D2F1;

    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    window.addEventListener('resize', _ => resize(app));
    resize(app);

    await new Loader().load();

    document.body.appendChild(app.view);

    initFpsMeter();
    new ScenesManager(app);
};

const initFpsMeter = (): void => {
    const fps = new FPSMeter({ ui: true });
    fps.start();
    fps.element.style.top = '0px';
    fps.element.style.bottom = '';
}

const animate = (time: number): void => {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

const resize = (app: Application): void => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.position.x = app.view.width / 2;
    app.stage.position.y = app.view.height / 2;
}

main();
