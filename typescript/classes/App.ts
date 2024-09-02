// App.ts
import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {
  playerX!: Player;
  playerO!: Player;
  board: Board;
  isPvE: boolean = false;
  difficulty: 'Easy' | 'Hard' = 'Easy'

  constructor() {
    //Initialize players, board and game mode
    // S while-loop that let us play the game repeatedly
    while (true) {
      this.selectGameMode();  // Asks the user to choose between PvP and PvE
      if (this.isPvE) {
        this.selectDifficulty(); // Asks the user for difficulty level
      }
      this.createPlayers();  // Creates players based on the selected game mode
      this.board = new Board();  // Initializes the game board
      this.startGameLoop();  // Initializes the game board
      this.whoHasWonOnGameOver();  // Determines and displays the game outcome

      // Asks if we should play again
      console.log("");
      let playAgain = prompt("Do you want to play again? (yes/no)? ");
      if (playAgain.trim().toLowerCase() !== "yes") {
        break;  // Exits the loop if the player does not want to play again
      }
    }
  }

  selectGameMode() {
    console.clear();
    console.log("CONNECT FOUR\n");
    // Game mode selector
    let gameMode = prompt("Choose game mode: Player vs Player (PvP) or Player vs Computer (PvE)? (pvp/pve): ").trim().toLowerCase();
    this.isPvE = gameMode === "pve";  // Set the game mode based on user input
  }

  selectDifficulty() {
    console.clear();
    console.log("CONNECT FOUR\n");
    let difficulty = prompt("Choose difficulty: Easy or Hard? (easy/hard): ").trim().toLowerCase();
    this.difficulty = difficulty === "hard" ? 'Hard' : 'Easy';
  }

  createPlayers() {
    console.clear();
    console.log("CONNECT FOUR\n");
    // Create player X
    this.playerX = new Player(prompt("Player X's name: "), "X");

    // Create player O as ether PvE player och PvP player
    if (this.isPvE) {
      this.playerO = new Player("Computer", "O");  // Creates a computer player for PvE mode
    } else {
      this.playerO = new Player(prompt("Player O's name: "), "O");  // Creates a human player for PvP mode
    }
  }



  startGameLoop() {
    // Game loop - runs until the game is over
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();  // Display the current state of the board

      // Determine the current player
      let player =
        this.board.currentPlayerColor === "X"
          ? this.playerX
          : this.playerO;

      if (this.isPvE && player.color === 'O') {
        // Computer's turn
        console.log("Computer is making a move...");
        if (this.difficulty === 'Hard') {
          console.log("Hard difficulty is not finished, sets difficulty to easy.");
          this.board.makeHardMove(player.color);  // Hard difficulty
          // this.board.makeRandomMove(player.color);  // Easy difficulty
        } else {
          this.board.makeRandomMove(player.color);  // Easy difficulty
        }
      } else {
        // Player's turn
        let move = prompt(
          `It's your turn, ${player.color} ${player.name} - type in column (1-7): `
        );
        // Convert column to numbers
        let column = parseInt(move.trim()) - 1;
        if (isNaN(column) || column < 0 || column >= 7) {
          console.log("Invalid column input, Please try again.");
          continue;
        }
        // Tries to make the move
        this.board.makeMove(player.color, column);
      }


    }
  }

  whoHasWonOnGameOver() {
    // The game is finished, tell the player who has won or if it's have a draw
    console.clear();
    this.board.render();  // Display the final state of the board
    if (this.board.winner) {
      // Determines the winner and displays the victory message
      let winningPlayer =
        this.board.winner === "X" ? this.playerX : this.playerO;
      console.log(
        `Congratulations ${winningPlayer.color}: ${winningPlayer.name} , you won!`
      );
    } else {
      console.log("Unfortunately it was a draw...");
    }
  }
}