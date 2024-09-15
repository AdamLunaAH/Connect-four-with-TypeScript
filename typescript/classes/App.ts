import Menu from './Menu.js';
import GameController from './GameController.js';
import PlayerCreate from './PlayerCreate.js';
import Score from './Score.js';
import Player from './Player.js';
import prompt from '../helpers/prompt.js';

export default class App {
  menu: Menu;
  playerCreate: PlayerCreate;
  score: Score;

  constructor() {
    // Start menu-------
    this.menu = new Menu();
    this.playerCreate = new PlayerCreate();
    this.score = new Score();

    // Main game loop
    while (true) {
      // Display start menu and exit the game if the user quits
      if (!this.menu.showStartMenu()) {
        break
      };

      // Get game mode and difficulty
      const { isPvE, isEvE } = this.menu.selectGameMode();
      const difficulty = (isPvE || isEvE) ? this.menu.selectDifficulty() : 'Easy';

      // Create players based on the game mode
      const { playerX, playerO } = this.playerCreate.createPlayers(isEvE, isPvE);

      // Initialize GameController with players and game settings!!!!!!!!!!
      const gameController = new GameController(playerX, playerO, isPvE, isEvE, difficulty, this.score);
      gameController.startGameLoop();

      // Game over
      const gameOverStatus = gameController.getGameOverStatus();
      this.handleGameOver(gameOverStatus, playerX, playerO);

      // Quit or restart the game
      let playAgain = prompt("Do you want to play again? (yes) or quit the game? (no or press Enter) ");
      playAgain = playAgain ? playAgain.trim().toLowerCase() : 'no';
      if (playAgain !== "yes") {
        break;
      }
    }
  }

  // Game over function
  handleGameOver(status: { gameQuit: boolean; winner: string | false; isDraw: boolean }, playerX: Player, playerO: Player) {
    console.clear();
    if (status.gameQuit) {
      console.log("Quitting the game...");
    } else if (status.winner) {
      const winner = status.winner === 'X' ? playerX : playerO;
      const moves = this.score.getMoves(winner.color);
      console.log(`Congratulations ${winner.color}: ${winner.name}, you won in ${moves} moves!`);
    } else {
      console.log("Unfortunately it was a draw...");
    }
    // Reset the move count
    this.score.resetMoves();
  }
}
