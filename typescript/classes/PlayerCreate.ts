import Player from './Player.js';
import prompt from '../helpers/prompt.js';

export default class PlayerCreate {
  createPlayers(isEvE: boolean, isPvE: boolean) {
    console.clear();
    console.log("CONNECT FOUR\n");

    // Create Player X, input name of use default
    const playerX = isEvE ? new Player("Computer X", "X") :
      new Player(prompt("Player X's name (Default: X, press Enter): "), "X");

    // Create Player X, input name or use default
    const playerO = (isPvE || isEvE) ? new Player("Computer", "O") :
      new Player(prompt("Player O's name (Default: O, press Enter): "), "O");

    return { playerX, playerO };
  }
}
