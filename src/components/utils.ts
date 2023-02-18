export default class Utils {

  public static getRandomHex = function (): string {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  }

  public static shuffle = function (arr: any[]): any[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  public static rndSign = function (): number {
    return Math.random() < 0.5 ? -1 : 1;
  }
}