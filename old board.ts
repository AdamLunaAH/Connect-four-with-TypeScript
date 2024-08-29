// Board.ts
export default class Board {

  matrix: string[][];
  currentPlayerColor: 'X' | 'O';
  winner: 'X' | 'O' | false;
  isADraw: boolean;
  gameOver: boolean;

  constructor() {
    // Initialize a 6x7 board with empty spaces
    this.matrix = [...new Array(6)].map(() =>
      [...new Array(7)].map(() => ' ')
    );
    // Set the starting player
    this.currentPlayerColor = 'X';
    // Initialize game status (updates after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  // Render the current state of the board to the console
  render(): void {
    // A basic way of showing the board
    // console.table(this.matrix);
    // A more customized board with our own
    // Separator lines for row and column
    let line = '\n' + '-'.repeat(30) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column} `).join('')
        + '|').join(line) +
      line
    );
  }

  // Make a move on the board
  makeMove(color: 'X' | 'O', column: number): boolean {
    // Prevents any move if the game is over
    if (this.gameOver) { return false; }
    // Validate that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // Validate that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }
    // Validate that the row and column are numbers - otherwise don't make the move
    if (isNaN(column) || column < 0 || column >= 7) { return false; }
    // // Validate that the row is between 0 and 5 - otherwise don't make the move
    // if (row < 0 || row >= this.matrix.length) { return false; }
    // // Validate that the column is between 0 and 6 - otherwise don't make the move
    // if (column < 0 || column >= this.matrix[0].length) { return false; }
    // // Check if the position is empty - otherwise don't make the move
    // if (this.matrix[row][column] !== ' ') { return false; }

    // Complete the move on the board
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = color;
        // Switches to the other player
        this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        // Check for a win or draw and update the game status
        this.winner = this.winCheck();
        this.isADraw = this.drawCheck();
        this.gameOver = !!this.winner || this.isADraw;
        return true;
      }
    }
    console.log("Column is full. Try a different column.");
    return false;

    // // Complete the move on the board
    // this.matrix[row][column] = color;
    // // Switches to the other player
    // this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
    // // Check for a win or draw and update the game status
    // this.winner = this.winCheck();
    // this.isADraw = this.drawCheck();
    // this.gameOver = !!this.winner || this.isADraw;
    // return true;
  }

  // Make a random move for the specified player (computer player)
  makeRandomMove(color: 'X' | 'O'): void {
    if (this.gameOver) return;

    let availableMoves: number[] = [];
    for (let c = 0; c < this.matrix[0].length; c++) {
      if (this.matrix[0][c] === ' ') {
        availableMoves.push(c);
      }

    }

    if (availableMoves.length > 0) {
      let column = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      this.makeMove(color, column);
    }
  }

  // Check if on of the players is the winner
  winCheck(): 'X' | 'O' | false {
    let m = this.matrix;
    // Represent ways you can win as offset from ONE position on the board
    let winDirections: [number, number][][] = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2], [3, -3]]  // diagonal 2 win
    ];
    /* Loop through each player color, each position (row + column),
    each win type to check if someone has won :)
    */
    for (const color of ['X', 'O'] as const) {
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          // ro = row offset, co = column offset
          for (let direction of winDirections) {
            let colorsInCombo = '';
            for (let [dr, dc] of direction) {
              if (m[r + dr] && m[r + dr][c + dc] === color) {
                colorsInCombo += color;
              } else {
                break;
              }
            }
            if (colorsInCombo === color.repeat(4)) {
              return color;
            }

          }

        }
      }
    }
    return false;
  }

  // Check if the game has ended in a draw
  drawCheck(): boolean {
    // If no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }

}



// Make a move for the hard difficulty level
makeHardMove(color: 'X' | 'O'): void {
  if(this.gameOver) return;

  const opponentColor = color === 'X' ? 'O' : 'X';

  // Function to simulate making a move and checking for a win
  const canWin = (color: 'X' | 'O', column: number): boolean => {
    let tempBoard = this.cloneBoard();
    if (tempBoard.makeMove(color, column)) {
      return tempBoard.winner === color;
    }
    return false;
  };

  // Try to find a winning move for the AI
  console.log("Checking for AI's winning move...");
  for(let c = 0; c < 7; c++) {
  if (this.matrix[0][c] === ' ') {
    console.log(`Checking column ${c + 1} for AI win...`);
    if (canWin(color, c)) {
      console.log(`AI chooses column ${c + 1} to win.`);
      this.makeMove(color, c);
      return;
    }
  }
}

// Try to block the opponent's winning move, including vertical threats
console.log("Checking for opponent's winning move to block...");
for (let c = 0; c < 7; c++) {
  if (this.matrix[0][c] === ' ') {
    console.log(`Checking column ${c + 1} for opponent win...`);
    if (canWin(opponentColor, c)) {
      console.log(`AI chooses column ${c + 1} to block opponent.`);
      this.makeMove(color, c);
      return;
    }
  }
}

// If no immediate win or block, make a random move
console.log("No immediate win or block, AI makes a random move...");
this.makeRandomMove(color);
  }

// copy of the board for Hard difficulty logic
cloneBoard(): Board {
  const newBoard = new Board();
  newBoard.matrix = this.matrix.map(row => row.slice());
  newBoard.currentPlayerColor = this.currentPlayerColor;
  newBoard.winner = this.winner;
  newBoard.isADraw = this.isADraw;
  newBoard.gameOver = this.gameOver;
  return newBoard;
}