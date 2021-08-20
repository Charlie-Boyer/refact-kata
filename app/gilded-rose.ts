export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      let pRate: number;

      const isPerempting = (currItem, rate) => {
        if (currItem.sellIn < 0) rate *= 2;
        if (currItem.name.includes('Conjured')) rate *= 2;

        const newQuality = Math.max(0, Math.min(50, currItem.quality + rate));

        return newQuality;
      };

      //Decrease sellin property for all item
      item.sellIn--;

      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          break;
        case 'Aged Brie':
          pRate = 1;
          item.quality = isPerempting(item, pRate);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (item.sellIn <= 0) {
            item.quality = 0;
            break;
          }
          if (item.sellIn <= 5) {
            pRate = 3;
          } else if (item.sellIn <= 10) {
            pRate = 2;
          } else {
            pRate = 1;
          }
          item.quality = isPerempting(item, pRate);
          break;
        default:
          pRate = -1;
          item.quality = isPerempting(item, pRate);
          break;
      }
    });

    return this.items;
  }
}
