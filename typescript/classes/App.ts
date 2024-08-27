import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {
    playerX!: Player;
    playerO!: Player;
    board: Board;
    isPvE: boolean = false;

    constructor() {
        // // Initialize players and board

        // this.startApp();

        // a while-loop that let us play the game repeatedly
        while (true) {
            this.selectGameMode();
            this.createPlayers();
            this.board = new Board();
            this.startGameLoop();
            this.whoHasWonOnGameOver();
            // ask if we should play again
            console.log("");
            let playAgain = prompt("Do you want to play again? (yes/no)? ");
            if (playAgain.trim().toLowerCase() !== "yes") {
                break;
            }
        }
    }

    // startApp() {
    //     // a while-loop that let us play the game repeatedly
    //     while (true) {
    //         this.createPlayers();
    //         this.board = new Board();
    //         this.startGameLoop();
    //         this.whoHasWonOnGameOver();
    //         // ask if we should play again
    //         console.log("");
    //         let playAgain = prompt("Vill ni spela igen? (ja/nej)? ");
    //         if (playAgain.trim().toLowerCase() !== "ja") {
    //             break;
    //         }
    //     }
    // }

    selectGameMode() {
        console.clear();
        console.log("CONNECT FOUR\n");
        let gameMode = prompt("Choose game mode: Player vs Player (PvP) or Player vs Computer (PvE)? (pvp/pve): ").trim().toLowerCase();
        this.isPvE = gameMode === "pve";
    }

    createPlayers() {
        console.clear();
        console.log("CONNECT FOUR\n");
        this.playerX = new Player(prompt("Player X's name: "), "X");

        if (this.isPvE) {
            this.playerO = new Player("Computer", "O");
        } else {
            this.playerO = new Player(prompt("Player O's name: "), "O");
        }
    }



    startGameLoop() {
        // game loop - runs until the game is over
        while (!this.board.gameOver) {
            console.clear();
            this.board.render();
            let player =
                this.board.currentPlayerColor === "X"
                    ? this.playerX
                    : this.playerO;

            if (this.isPvE && player.color === 'O') {
                // Computer's turn
                console.log("Computer is making a move...");
                this.board.makeRandomMove(player.color);
            } else {
                // Player's turn
                let move = prompt(
                    `It's your turn, ${player.color} ${player.name} - type in row,column: `
                );
                // convert row and columns to numbers and zero-based indexes
                let [row, column] = move.split(",").map((x: string) => +x.trim() - 1);
                // try to make the move
                this.board.makeMove(player.color, row, column);
            }


        }
    }

    whoHasWonOnGameOver() {
        // the game is over, tell the player who has one or if we have a draw
        console.clear();
        this.board.render();
        if (this.board.winner) {
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