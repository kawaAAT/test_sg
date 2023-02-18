import { Loader as LoaderPixi, Spritesheet } from 'pixi.js';
import assetsJson from "../../assets/assets.json";
import TexturesCache from './textures-cache';

export default class Loader {

  public load(): Promise<void> {
    return new Promise((resolve, reject) => {

      LoaderPixi.shared
        .add("assets", "assets/assets.png")
        .load(() => {
          const sheet = new Spritesheet(
            LoaderPixi.shared.resources["assets"].texture.baseTexture,
            assetsJson
          );

          sheet.parse((...args) => {
            for (let key in args[0]) {
              TexturesCache.set(key, args[0][key]);
            }

            resolve();
          });
        });
    });
  }
}
