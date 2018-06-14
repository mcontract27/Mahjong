const tile = require("./tile");

const suits = ["pin", "sou", "man", "wind", "dragon"];
const suitValues = {
  pin: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sou: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  man: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  wind: ["east", "south", "west", "north"],
  dragon: ["red", "white", "green"]
};

class deck {
  constructor(red = false) {
    this.tiles = [];
    this.red = red;
  }

  newDeck(){
    const deckArr = [];
    suits.forEach(suit => {
      suitValues[suit].forEach(value => {
        for (let i = 0; i < 4; i++) deckArr.push(new tile(suit, value));
      });
    });
    if (this.red) [16, 17, 52, 88].forEach(i => deckArr[i].setRed());
    this.tiles = deckArr;
    this.shuffle();
  };

  shuffle(){
    let shuffled = [];
    while (this.tiles.length) {
      shuffled.push(
        ...this.tiles.splice(Math.floor(Math.random() * this.tiles.length), 1)
      );
    }
    this.tiles = shuffled;
  };

  draw(tileCount = 1){
    const tiles = this.tiles.splice(this.tiles.length - tileCount);
    return tiles;
  };
}

module.exports = deck
