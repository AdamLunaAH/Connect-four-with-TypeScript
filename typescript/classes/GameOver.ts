import Score from './Score.js';
import Player from './Player.js';


export default class GameOver {
  score: Score;

  constructor(score: Score) {
    this.score = score;
  }

  // Game over function
  handleGameOver(
    status: { gameQuit: boolean; winner: string | false; isDraw: boolean },
    playerX: Player,
    playerO: Player) {
    console.clear();
    if (status.gameQuit) {
      console.log("Quitting the game...");
    } else if (status.winner) {
      const winner = status.winner === 'X' ? playerX : playerO;
      const loser = status.winner === 'X' ? playerO : playerX;
      const moves = this.score.getMoves(winner.color);

      // Default name if player uses default name
      const loserName = loser.name.trim() === '' || loser.name === loser.color ? `Player ${loser.color}` : loser.name;

      // Check if the computer won and display lose-message
      if (winner.name === 'Computer') {
        console.log(`Sorry, ${loserName} lost against the computer.`);
      } else {
        console.log(`Congratulations ${winner.color}: ${winner.name}, you won in ${moves} moves!`);
      }
    } else {
      console.log("Unfortunately it was a draw...");
    }
    // Reset the move count
    this.score.resetMoves();
  }
}
