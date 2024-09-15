export default class Player {

  name: string;  // Player's name
  color: 'X' | 'O';  // Player's symbol (either 'X' or 'O')

  constructor(name: string, color: 'X' | 'O') {
    this.name = name;  // Initialize the player's name
    this.color = color;  // Initialize the player's symbol
  }

}