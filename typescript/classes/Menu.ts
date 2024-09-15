import prompt from '../helpers/prompt.js';

export default class Menu {

  // Start menu
  showStartMenu() {
    console.clear();
    console.log("CONNECT FOUR\n");
    console.log("Info!");
    console.log("Input is case-insensitive.\n");
    let startOption = prompt("Choose an option: Play (p or press Enter), or Quit (q): ").trim().toLowerCase();
    if (startOption === '') startOption = 'p';
    return startOption === 'q' ? false : true;
  }

  // Select game mode menu
  selectGameMode() {
    console.clear();
    console.log("CONNECT FOUR\n");
    let gameMode = prompt("Choose game mode: Player vs Player (PvP or press Enter), Player vs Computer (PvE), or Computer vs Computer (EvE)? (pvp/pve/eve): ").trim().toLowerCase();
    const isPvE = gameMode === "pve";
    const isEvE = gameMode === "eve";
    return { isPvE, isEvE };
  }

  // Select difficulty menu
  selectDifficulty() {
    console.clear();
    console.log("CONNECT FOUR\n");
    let difficulty;
    while (true) {
      difficulty = prompt("Choose difficulty: Easy or Hard? (easy/hard): ").trim().toLowerCase();
      if (difficulty === "easy" || difficulty === "hard") {
        return difficulty === 'hard' ? 'Hard' : 'Easy';
      }
      console.log("Invalid input! Please choose either 'easy' or 'hard'.\n");
    }
  }
}
