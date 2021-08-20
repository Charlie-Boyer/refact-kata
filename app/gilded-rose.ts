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
        const newQuality = Math.max(0, Math.min(50, currItem.quality + rate));
        
        // Conjured element is perempting twice as fast
        if (currItem.name.includes('Conjured')) {
          rate = rate * 2;
        }
        return newQuality;
      };

      switch (item.name) {
        case 'Aged Brie':
          pRate = 1;
          item.quality = isPerempting(item, pRate);
          item.sellIn--;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          item.sellIn--;
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (item.sellIn <= 0) {
            item.quality = 0;
            item.sellIn--;
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
          item.sellIn--;
          break;
        default:
          pRate = -1;
          item.quality = isPerempting(item, pRate);
          item.sellIn--;
          break;
      }
    });

    return this.items;
  }
}
