export default class Score {
  score: { [key: string]: number } = {}; // Track score for each player
  playerXMoves: number = 0; // Player X score tracking
  playerOMoves: number = 0; // Player O score tracking

  // Reset move count
  resetMoves() {
    this.playerXMoves = 0;
    this.playerOMoves = 0;
  }

  // Increment player move count
  updateMoves(playerColor: 'X' | 'O') {
    if (playerColor === 'X') this.playerXMoves++;
    else this.playerOMoves++;
  }

  // Presents the winner move count
  getMoves(playerColor: 'X' | 'O') {
    return playerColor === 'X' ? this.playerXMoves : this.playerOMoves;
  }
}
