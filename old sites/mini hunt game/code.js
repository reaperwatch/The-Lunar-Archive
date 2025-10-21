const ROWS = 5;
const COLS = 5;
const TREASURE_COUNT = 3;
const TRAP_COUNT = 2;

let land = [];
let vland = [];
let treasuresFound = 0;

function createEmptyBoard(fill = "~") {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(fill));
}

function placeItem(board, item) {
  let row, col;
  do {
    row = Math.floor(Math.random() * ROWS);
    col = Math.floor(Math.random() * COLS);
  } while (board[row][col] !== "~");
  board[row][col] = item;
}

function resetGame() {
  land = createEmptyBoard();
  vland = createEmptyBoard();
  treasuresFound = 0;

  for (let i = 0; i < TREASURE_COUNT; i++) {
    placeItem(land, "t");
  }
  for (let i = 0; i < TRAP_COUNT; i++) {
    placeItem(land, "x");
  }
  console.log("New game board:", land);
}

document.getElementById("img").onload = function () {
  alert(
    "this is a simple mini game of treasure hunt!\n" +
      "there are 3 treasure chests and 2 traps\n" +
      "'~' means land, 'o' means an empty hole and 'ø' means a hole that used to have teasure.\n" +
      "if the prompt disappears clicking play again will not restart progress but getting trapped will.\n"
  );
  resetGame();
};

function Fun() {
  if (treasuresFound === TREASURE_COUNT) {
    alert("You have already won! The game will restart.");
    resetGame();
    return;
  }

  const vlandDisplay = vland.map((row) => row.join(" ")).join("\n");
  const lineInput = prompt(
    "In what line (column) would you strike? 0-4\n" + vlandDisplay
  );
  const rowInput = prompt(
    "In what row (down) would you strike? 0-4\n" + vlandDisplay
  );

  if (lineInput === null || rowInput === null) {
    alert("Action canceled. Click the button to continue.");
    return;
  }

  const col = parseInt(lineInput);
  const row = parseInt(rowInput);

  if (
    isNaN(col) ||
    isNaN(row) ||
    col < 0 ||
    col >= COLS ||
    row < 0 ||
    row >= ROWS
  ) {
    alert("You missed the land. Click the button again to continue.");
    return;
  }

  const cell = land[row][col];

  if (cell === "~") {
    alert("You found nothing, try again.");
    vland[row][col] = "o";
    land[row][col] = "o";
  } else if (cell === "t") {
    treasuresFound++;
    vland[row][col] = "ø";
    land[row][col] = "ø";
    if (treasuresFound === TREASURE_COUNT) {
      alert("You win!");
      resetGame();
    } else {
      alert(
        `Found a treasure! ${treasuresFound} down, ${
          TREASURE_COUNT - treasuresFound
        } to go.`
      );
    }
  } else if (cell === "o" || cell === "ø") {
    alert("You tried to dig an already dug hole, you found nothing.");
  } else if (cell === "x") {
    alert("You got trapped! The game will restart.");
    alert(
      "The hidden board was:\n" + land.map((row) => row.join(" ")).join("\n")
    );
    resetGame();
    return;
  }
}

/* old code from like more than half a year ago probably even more, not only is it messy but it also had bugs (unintended behavior) that i fixed in the new code above.

let land = [
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
];
let vland = [
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
];
let z = Math.floor(Math.random() * 5 + 0);
let c = Math.floor(Math.random() * 5 + 0);
let v = Math.floor(Math.random() * 5 + 0);
let b = Math.floor(Math.random() * 5 + 0);
let n = Math.floor(Math.random() * 5 + 0);
let m = Math.floor(Math.random() * 5 + 0);
let l = Math.floor(Math.random() * 5 + 0);
let k = Math.floor(Math.random() * 5 + 0);
let h = Math.floor(Math.random() * 5 + 0);
let w = Math.floor(Math.random() * 5 + 0);
land[c].splice(z, 1, "t");
land[b].splice(v, 1, "x");
land[m].splice(n, 1, "x");
land[k].splice(l, 1, "t");
land[w].splice(h, 1, "t");
console.log(land);
let i = 0;
document.getElementById("img").onload = function () {
  alert(
    "this is a simple mini game of treasure hunt!" +
      "\n" +
      "there are 3 treasure chests and 2 traps" +
      "\n" +
      "'~' means land, 'o' means an empty hole and 'ø' means a hole that used to have teasure." +
      "\n" +
      "if the prompt disappears clicking play again will not restart progress but getting trapped will." +
      "\n" +
      "it can disappear by enterting anything that isn't a number and going out of range."
  );
};
function Fun() {
  for (; i < 3; ) {
    let line = parseInt(
      prompt(
        "in what line(straight) would you strike ? 0-4" +
          "\n" +
          vland.join("" + "\n")
      )
    );
    let row = parseInt(
      prompt(
        "in what row(down) would you strike ? 0- 4" +
          "\n" +
          vland.join("" + "\n")
      )
    );
    if (line >= 5 || line < 0 || row >= 5 || row < 0) {
      alert("you missed the the land, click the button again to continue.");
    }
    let j = land[row][line];
    if (j === "~") {
      alert("you found nothing, try again.");
      vland[row][line] = "o";
      land[row][line] = "o";
    }
    if (j === "t") {
      i++;
      alert("found a treasure.");
      vland[row][line] = "ø";
      land[row][line] = "ø";
    }
    if (j === "o") {
      alert("you tried to dig an already dug hole, you found nothing.");
    }
    if (j === "ø") {
      alert("you tried to dig an already dug hole, you found nothing.");
    } else if (j === "x") {
      alert("you got trapped, click the button again to restart.");
      let z1 = Math.floor(Math.random() * 5 + 0);
      let c1 = Math.floor(Math.random() * 5 + 0);
      let v1 = Math.floor(Math.random() * 5 + 0);
      let b1 = Math.floor(Math.random() * 5 + 0);
      let n1 = Math.floor(Math.random() * 5 + 0);
      let m1 = Math.floor(Math.random() * 5 + 0);
      let l1 = Math.floor(Math.random() * 5 + 0);
      let k1 = Math.floor(Math.random() * 5 + 0);
      let h1 = Math.floor(Math.random() * 5 + 0);
      let w1 = Math.floor(Math.random() * 5 + 0);
      for (let e = 0; e < 5; e++) {
        vland[e][0] = "~";
        vland[e][1] = "~";
        vland[e][2] = "~";
        vland[e][3] = "~";
        vland[e][4] = "~";
        land[e][0] = "~";
        land[e][1] = "~";
        land[e][2] = "~";
        land[e][3] = "~";
        land[e][4] = "~";
      }
      land[z1][c1] = "t";
      land[v1][b1] = "t";
      land[n1][m1] = "t";
      land[k1][l1] = "x";
      land[w1][h1] = "x";
      break;
    }
  }
  if (i === 3) {
    alert("you win.");
  }
}

*/
