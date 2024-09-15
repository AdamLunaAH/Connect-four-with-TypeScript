import Board from './Board.js';
import Player from './Player.js';
import prompt from '../helpers/prompt.js';
import Score from './Score.js';
export default class GameController {
  board: Board;
  playerX: Player;
  playerO: Player;
  isPvE: boolean;
  isEvE: boolean;
  difficulty: 'Easy' | 'Hard';
  gameQuit: boolean = false;
  score: Score;

  // Initialize game controller with players, game settings, and score manager
  constructor(playerX: Player, playerO: Player, isPvE: boolean, isEvE: boolean, difficulty: 'Easy' | 'Hard', score: Score) {
    this.playerX = playerX;
    this.playerO = playerO;
    this.isPvE = isPvE;
    this.isEvE = isEvE;
    this.difficulty = difficulty;
    this.board = new Board();
    this.score = score;
  }


  // Main game loop function
  startGameLoop() {
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();

      // Current player
      let player = this.board.currentPlayerColor === "X" ? this.playerX : this.playerO;

      // Computer makes a move
      if (this.isPvE && player.color === 'O' || this.isEvE) {
        console.log("Computer is making a move...");
        if (this.difficulty === 'Hard') {
          this.board.makeHardMove(player.color);
          this.score.updateMoves(player.color);
        } else {
          this.board.makeRandomMove(player.color);
          this.score.updateMoves(player.color);
        }
      }
      // Human move
      else {
        console.log("Info: Input is case-insensitive.\n");
        console.log("Type 'q', if you want to exit the game");
        let move = prompt(`It's your turn, ${player.color} ${player.name} - type in column (1-7): \n`);
        // Quit function
        if (move === 'q') {
          this.gameQuit = true;
          break;
        }
        // Input is empty message
        if (move === null || move.trim() === '') {
          console.log("No input provided, try again.");
          this.pauseForUser();
          continue;
        }
        const column = parseInt(move.trim()) - 1;
        // Input is invalid
        if (isNaN(column) || column < 0 || column >= 7 || !this.board.makeMove(player.color, column)) {
          console.log("Invalid move, please try again.");
          this.pauseForUser();
        } else {
          // Valid input and starts move function
          this.score.updateMoves(player.color);
        }
      }
    }
  }

  // messages pause function
  pauseForUser() {
    const pauseDuration = 3000;
    const startTime = Date.now();
    while (Date.now() - startTime < pauseDuration) { }
  }

  // Game over
  getGameOverStatus() {
    return { gameQuit: this.gameQuit, winner: this.board.winner, isDraw: this.board.isADraw };
  }
}
