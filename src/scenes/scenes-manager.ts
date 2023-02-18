import { Application } from 'pixi.js';
import ButtonLevel from '../components/level-select/button-level';
import BaseScene from './base-scene';
import SceneFire from './scene-fire';
import SceneLevelSelect from './scene-level-select';
import SceneStacks from './scene-stacks';
import SceneTextGenerator from './scene-text-generator';

export default class ScenesManager {
    private app: Application;
    private backButton: ButtonLevel = null;
    
    private sceneLevelSelect: SceneLevelSelect = null;
    private sceneStacks: SceneStacks = null;
    private sceneTextGenerator: SceneTextGenerator = null;
    private sceneFire: SceneFire = null;
    private currentScene: BaseScene = null;

    constructor(app: Application) {
        this.app = app;

        this.initScenes();
        this.initBackButton();

        this.sceneLevelSelect.show();
        this.currentScene = this.sceneLevelSelect;

        window.addEventListener('resize', _ => {
            this.resize();
        });
        this.resize();
    }

    private initScenes(): void {
        this.initLevelSelectScene();
        this.initStacksScene();
        this.initTextGeneratorScene();
        this.initFireScene();
    }

    private initLevelSelectScene(): void {
        this.sceneLevelSelect = new SceneLevelSelect(this.app);
        this.app.stage.addChild(this.sceneLevelSelect);

        this.sceneLevelSelect.on(this.sceneLevelSelect.onStackChoosenEvent, () => {
            this.changeScene(this.sceneLevelSelect, this.sceneStacks);
        });

        this.sceneLevelSelect.on(this.sceneLevelSelect.onTextGenChoosenEvent, () => {
            this.changeScene(this.sceneLevelSelect, this.sceneTextGenerator);
        });

        this.sceneLevelSelect.on(this.sceneLevelSelect.onFireDemoChoosenEvent, () => {
            this.changeScene(this.sceneLevelSelect, this.sceneFire);
        });
    }

    private initStacksScene(): void {
        this.sceneStacks = new SceneStacks(this.app);
        this.app.stage.addChild(this.sceneStacks);
    }

    private initTextGeneratorScene(): void {
        this.sceneTextGenerator = new SceneTextGenerator(this.app);
        this.app.stage.addChild(this.sceneTextGenerator);
    }

    private initFireScene(): void {
        this.sceneFire = new SceneFire(this.app);
        this.app.stage.addChild(this.sceneFire);
    }

    private initBackButton(): void {
        const btn = this.backButton = new ButtonLevel('BACK');
        this.backButton.scale.set(0.6);
        this.app.stage.addChild(btn);

        btn.on('pointerdown', () => {
            this.changeScene(this.currentScene, this.sceneLevelSelect);
        });
    }

    private changeScene(oldScene: BaseScene, newScene: BaseScene): void {
        oldScene.hide();
        newScene.show();

        this.currentScene = newScene;
    }

    private resize(): void {
        this.backButton.x = this.app.view.width / 2 - 110;
        this.backButton.y = -this.app.view.height / 2 + 30;
    }
}
