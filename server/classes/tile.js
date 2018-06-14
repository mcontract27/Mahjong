class Tile {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.red = false;
    this.imgUrl = `./images/${suit}/${value}.png`;
  }

  setRed(){
    this.red = true;
    this.imgUrl = `./images/${this.suit}/red${this.value}.png`;
  };
}

module.exports = Tile
