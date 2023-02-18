import { Application, Container, Filter, Graphics, Point } from 'pixi.js';;
import BaseScene from './base-scene';
import fireShader from '../components/level-fire/fire-frag';

export default class SceneFire extends BaseScene {
    constructor(app: Application) {
        super(app);

        this.interactiveChildren = false;

        this.initFire();
    }

    private initFire(): void {
        const shaderContainer = new Graphics();
        shaderContainer.beginFill(0x000000, 1);
        shaderContainer.drawRect(-150, -150, 300, 300);
        shaderContainer.endFill();
        this.addChild(shaderContainer);

        const filter = new Filter(null, fireShader, {
            time: 0.0
        });

        shaderContainer.filters = [filter];

        const fireSpeed = 4;
        this.app.ticker.add((delta) => {
            if (this.visible)
                filter.uniforms.time += fireSpeed * this.app.ticker.deltaMS / 1000;
        });
    }
}
