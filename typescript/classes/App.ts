// App.ts
import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {
  playerX!: Player;
  playerO!: Player;
  board: Board;
  isPvE: boolean = false;
  isEvE: boolean = false;
  difficulty: 'Easy' | 'Hard' = 'Easy'
  scoreboard: { [key: string]: number } = {};

  // Player move count variable
  playerXMoves: number = 0;
  playerOMoves: number = 0;

  gameQuit: boolean =false;

  constructor() {
    //Initialize players, board and game mode
    // S while-loop that let us play the game repeatedly
    while (true) {
      this.showStartMenu();  // Show the start menu before game mode selection
      this.selectGameMode();  // Asks the user to choose between PvP and PvE
      // if (this.isPvE) {
      //   this.selectDifficulty(); // Asks the user for difficulty level
      // }
      this.createPlayers();  // Creates players based on the selected game mode
      this.board = new Board();  // Initializes the game board
      this.startGameLoop();  // Initializes the game board
      this.whoHasWonOnGameOver();  // Determines and displays the game outcome

      // Asks if we should play again
      console.log("");
      let playAgain = prompt("Do you want to play again? (yes) or quit the game? (no or press Enter) ");
      if (playAgain.trim().toLowerCase() !== "yes") {
        break;  // Exits the loop if the player does not want to play again
      }
    }
  }



  // Start menu
  showStartMenu() {
    console.clear();
    console.log("CONNECT FOUR\n");
    console.log("Info!");
    console.log("Input is case-insensitive.\n");
    let startOption = prompt("Choose an option: Play (p or press Enter), or Quit (q): ").trim().toLowerCase();
    // If the user presses Enter (empty input), it behaves as if the player pressed 'p' for Play
    if (startOption === '') {
      startOption = 'p';
    }

    if (startOption === 'q') {
      console.log("Thank you for playing! Goodbye.");
      return;
    } else if (startOption !== 'p') {
      console.log("Invalid option, please choose again.");
      this.showStartMenu();
    }
  }


  selectGameMode() {
    console.clear();
    console.log("CONNECT FOUR\n");
    console.log("Info!");
    console.log("Input is case-insensitive.\n");
    // Game mode selector
    let gameMode = prompt("Choose game mode: Player vs Player (PvP or press Enter), Player vs Computer (PvE), or Computer vs Computer (EvE)? (pvp/pve/eve): ").trim().toLowerCase();
    this.isPvE = gameMode === "pve";  // Player vs Environment
    this.isEvE = gameMode === "eve";  // Environment vs Environment

    // If EvE or PvE mode, select difficulty
    if (this.isPvE || this.isEvE) {
      this.selectDifficulty();
    }

  }

  selectDifficulty() {
    console.clear();
    console.log("CONNECT FOUR\n");
    console.log("Info!");
    console.log("Input is case-insensitive.\n");
    let validInput = false;
    let difficulty;

    while (!validInput) {
      difficulty = prompt("Choose difficulty: Easy or Hard? (easy/hard): ").trim().toLowerCase();

      if (difficulty === "easy" || difficulty === "hard") {
        validInput = true;
        this.difficulty = difficulty === "hard" ? 'Hard' : 'Easy';
      } else {
        console.log("Invalid input! Please choose either 'easy' or 'hard'.\n");
      }
    }
  }

  createPlayers() {
    console.clear();
    console.log("CONNECT FOUR\n");
    console.log("Info!");
    console.log("Input is case-insensitive.\n");
    // Create player X
    if (this.isEvE) {
      this.playerX = new Player("Computer X", "X");
    } else {
      this.playerX = new Player(prompt("Player X's name (Default: X, press Enter): "), "X");
    }


    // Create player O as ether PvE player och PvP player
    if (this.isPvE || this.isEvE) {
      this.playerO = new Player("Computer", "O");  // Creates a computer player for PvE or EvE mode
    } else {
      this.playerO = new Player(prompt("Player O's name (Default: O, press Enter): "), "O");  // Creates a human player for PvP mode
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

      if (this.isPvE && player.color === 'O' || this.isEvE) {
        // Computer's turn in PvE or EvE modes
        console.log("Computer is making a move...");
        if (this.difficulty === 'Hard') {
          // console.log("Hard difficulty is not finished, sets difficulty to easy.");
          this.board.makeHardMove(player.color);  // Hard difficulty
        } else {
          this.board.makeRandomMove(player.color);  // Easy difficulty
        }
      } else {
        // Player's turn
        console.log("Info: Input is case-insensitive.\n");
        let move = prompt(
          `It's your turn, ${player.color} ${player.name} - type in column (1-7): `
        );

        // Quit game
        if (move === 'q') {
          this.gameQuit = true;
          break; // Exit the game loop
        }
        // Convert column to numbers
        let column = parseInt(move.trim()) - 1;
        if (isNaN(column) || column < 0 || column >= 7) {
          console.log("Invalid column input, Please try again.");
          this.pauseForUser();
          continue;
        }
        // Tries to make the move
        let moveMade = this.board.makeMove(player.color, column);
        if (!moveMade) {
          console.log("Invalid move, column is full. Try a different column.");
          this.pauseForUser();
          continue;
        }


        if (moveMade) {
          if (player.color === "X") {
            this.playerXMoves++;
          } else {
            this.playerOMoves++;
          }
        }

      }


    }

  }

  // Pause to present message
  pauseForUser() {
    const pauseDuration = 3000;
    const startTime = Date.now();
    while (Date.now() - startTime < pauseDuration) {
    }
  }



  whoHasWonOnGameOver() {
    // The game is finished, tell the player who has won or if it's have a draw
    console.clear();
    this.board.render();  // Display the final state of the board
    if (this.board.winner) {
      // Determines the winner and displays the victory message
      let winningPlayer = this.board.winner === "X" ? this.playerX : this.playerO;
      let winningPlayerMoves = this.board.winner === "X" ? this.playerXMoves : this.playerOMoves;
      console.log(`Congratulations ${winningPlayer.color}: ${winningPlayer.name}, you won in ${winningPlayerMoves} moves!`);
    } else if (this.gameQuit === true) {
      console.log("Quitting the game...");
      this.pauseForUser();
    } else {
      console.log("Unfortunately it was a draw...");
    }

    this.playerXMoves = 0;
    this.playerOMoves = 0;
  }


}