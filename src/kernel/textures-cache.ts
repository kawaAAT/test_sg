import { Texture } from 'pixi.js';

// did not find how Pixi developers usually save textures
// to have access to them globally with handy short calls,
// so created this Cache class to get textures with shorter calls
export default class TexturesCache {
  private static map = new Map<string, Texture>();

  public static get = function (key: string): Texture | undefined {
    return TexturesCache.map.get(key);
  }

  public static set = function (key: string, value: Texture): void {
    TexturesCache.map.set(key, value);
  }
}
