import Menu from './Menu.js';
import GameController from './GameController.js';
import PlayerCreate from './PlayerCreate.js';
import Score from './Score.js';
import GameOver from './GameOver.js';
import prompt from '../helpers/prompt.js';

export default class App {
  menu: Menu;
  playerCreate: PlayerCreate;
  score: Score;
  gameOver: GameOver;

  constructor() {
    // Initialize properties
    this.menu = new Menu();
    this.playerCreate = new PlayerCreate();
    this.score = new Score();
    this.gameOver = new GameOver(this.score);

    // Main game loop
    while (true) {
      // Display start menu and exit the game if the user quits
      if (!this.menu.showStartMenu()) {
        break;
      }

      // Get game mode and difficulty
      const { isPvE, isEvE } = this.menu.selectGameMode();
      const difficulty = (isPvE || isEvE) ? this.menu.selectDifficulty() : 'Easy';

      // Create players based on the game mode
      const { playerX, playerO } = this.playerCreate.createPlayers(isEvE, isPvE);

      // Initialize GameController with players and game settings
      const gameController = new GameController(playerX, playerO, isPvE, isEvE, difficulty, this.score);
      gameController.startGameLoop();

      // Game over
      const gameOverStatus = gameController.getGameOverStatus();
      this.gameOver.handleGameOver(gameOverStatus, playerX, playerO);

      // Quit or restart the game
      let playAgain = prompt("Do you want to play again? (yes) or quit the game? (no or press Enter) ");
      playAgain = playAgain ? playAgain.trim().toLowerCase() : 'no';
      if (playAgain !== "yes") {
        break;
      }
    }
  }
}
