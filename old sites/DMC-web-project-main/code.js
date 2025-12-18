/*
let chars =   [
    ["Dante"," the red coated devil hunter"," can't pay rent"],
    ["Vergil"," Dante's narcissistic twin"," deadbeat dad"],
    ["Nero"," anger issues"," he's also Vergil's child"]
]
function swapLines(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
}

let y = 0;
let y2 = 0;
function chanRating(){
    while(y!==999 && y2!==999){
        y = parseInt(prompt("select the character you want to swap with numbers, 1-3 (input 999 to end)" + "\n \n" + (chars.join('' + '\n'))))
        
        if(y === 999){
            break;
        }
        else if (y === 3) {
            y = 2;
        }
        else if (y === 2) {
            y = 1;
        }
        else if (y === 1) {
            y = 0;
        }
        else{
            alert("you went out of bounds, game will be continued after this message")
            chanRating()
        }
        y2 = parseInt(prompt("now select the second character you want the first to swap places with, 1-3 (input 999 to end)" + "\n \n" + (chars.join('' + '\n'))))

        if(y2 === 999){
            break;
        }
        else if (y2 === 3) {
            y2 = 2;
        }
        else if (y2 === 2) {
            y2 = 1;
        }
        else if (y2 === 1) {
            y2 = 0;
        }
        else{
            alert("you went out of bounds, game will be continued after this message")
            
        }
        if(y2<=2 && y2>=0 || y<=2  && y>=0){
            swapLines(chars, y, y2);
            alert("current rating" + "\n \n" + (chars.join('' + '\n')))
        }
}}

function viewrating(){
    alert("current rating" + "\n \n" + (chars.join('' + '\n')))
}
function reset(){
    y=0; y2=0;
    alert("you can now change the rating again")
}
*/

// rating finished (old, remade below)

(function attachBlurToggle() {
  function initBlur() {
    const blurButton =
      document.getElementById("blurToggleBtn") ||
      document.querySelector(".blur-toggle-btn");
    if (!blurButton) return;

    blurButton.addEventListener("click", () => {
      const containers = document.querySelectorAll(
        ".b, .calc-blur-hover, .home-blur-hover, .quiz-blur-hover, .char-blur-hover"
      );
      containers.forEach((container) =>
        container.classList.toggle("blur-active")
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlur);
  } else {
    // DOM already parsed — attach immediately
    initBlur();
  }
})();

const preventDefault = document.getElementById("quizForm");
if (preventDefault) {
  preventDefault.addEventListener(
    "submit",
    function (preventPageLoadingOnSubmit) {
      preventPageLoadingOnSubmit.preventDefault();

      const inputs = document.querySelectorAll("input[type='checkbox']");
      const scores = {
        dmc1: 0,
        dmc2: 0,
        dmc3: 0,
        dmc4: 0,
        dmc5: 0,
        dmcReboot: 0,
      };

      inputs.forEach((input) => {
        if (input.checked) {
          const game = input.dataset.game;
          scores[game]++;
        }
      });

      const gameData = {
        dmc1: {
          name: "Devil May Cry 1 {2001}",
          logo: "dmc logo.webp",
          video: "0601.mp4",
          videoWidth: 530,
          videoHeight: 400,
        },
        dmc2: {
          name: "Devil May Cry 2 {2003}",
          logo: "dmc2_logo.jpg",
          video: "0601(1).mp4",
          videoWidth: 498,
          videoHeight: 316,
        },
        dmc3: {
          name: "Devil May Cry 3: Dante's Awakening {2005}",
          logo: "DMC3SE_logo.webp",
          video: "0601(2).mp4",
          videoWidth: 530,
          videoHeight: 400,
        },
        dmc4: {
          name: "Devil May Cry 4 {2008}",
          logo: "DMC4_vanilla_logo.webp",
          video: "Devil May Cry 4 Title Screen.mp4",
          videoWidth: 780,
          videoHeight: 440,
        },
        dmc5: {
          name: "Devil May Cry 5 {2019}",
          logo: "dmc5logo.webp",
          video: "0601(4).mp4",
          videoWidth: 780,
          videoHeight: 440,
        },
        dmcReboot: {
          name: "DmC: Devil May Cry (Reboot) {2013}",
          logo: "https://cdn2.steamgriddb.com/logo_thumb/50a889faa543a3d86525f9325e47e593.png",
          video: "0601(3) reboot.mp4",
          videoWidth: 530,
          videoHeight: 400,
        },
      };

      let topGame = "";
      let maxScore = -1;

      for (const game in scores) {
        if (scores[game] > maxScore) {
          maxScore = scores[game];
          topGame = game;
        }
      }

      document.getElementById("quizForm").style.display = "none";
      document.getElementById("result").innerHTML = `
            <h2></h2><br>
            <div style="text-align:center; border: 4px solid #b22222; border-radius: 18px; padding: 32px; background: rgba(34,34,34, 0.9); box-shadow: 0 0 16px #b22222;">
            <video src="${gameData[topGame].video}" width="${gameData[topGame].videoWidth}" height="${gameData[topGame].videoHeight}" autoplay style="display:block;margin:auto; border-radius: 10px; border: 2px solid #b22222;"></video>
            <br>
            <img src="${gameData[topGame].logo}" alt="${gameData[topGame].name} Logo" style="width:400px;height:200px;display:block;margin:auto; border-radius: 10px; border: 2px solid #b22222;"><br>
            <span style="color: red; display: block; text-align: center; margin-left: 25%; margin-right: 25%; font-size: 1.5rem;">${gameData[topGame].name}</span><br><br>
            <button id="reload" onclick="location.reload()">Reset Quiz</button>
            </div>
            <h2></h2><br>
        `;
    }
  );
}

const checkboxes = document.querySelectorAll("input[type='checkbox']");
if (checkboxes.length > 0) {
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checkedCount = document.querySelectorAll(
        "input[type='checkbox']:checked"
      ).length;
      if (checkedCount >= 6) {
        checkboxes.forEach((cb) => {
          if (!cb.checked) cb.disabled = true;
        });
      } else {
        checkboxes.forEach((cb) => (cb.disabled = false));
      }
    });
  });
}

// quiz finished

let prefix = "";
let currentMode = "";
let moderesult = "";
const display = document.getElementById("display");

const modes = {
  dmc1missions: {
    prefix: "23-",
    moderesult: "DMC1 Missions left:",
    task: "Input the number of missions you completed",
    calculate: function (input) {
      return 23 - Number(input);
    },
  },
  dmc2missions: {
    prefix: "18-",
    moderesult: "DMC2 Missions left:",
    task: "Input the number of missions you completed",
    calculate: function (input) {
      return 18 - Number(input);
    },
  },
  dmc3missions: {
    prefix: "20-",
    moderesult: "DMC3 Missions left:",
    task: "Input the number of missions you completed",
    calculate: function (input) {
      return 20 - Number(input);
    },
  },
  dmc4missions: {
    prefix: "20-",
    moderesult: "DMC4 Missions left:",
    task: "Input the number of missions you completed",
    calculate: function (input) {
      return 20 - Number(input);
    },
  },
  dmc5missions: {
    prefix: "20-",
    moderesult: "DMC5 Missions left:",
    task: "Input the number of missions you completed",
    calculate: function (input) {
      return 20 - Number(input);
    },
  },
  dmcstylehuman: {
    prefix: "4500-",
    moderesult: "Style points left for S rank:",
    task: "Input the number of style points you last got",
    calculate: function (input) {
      return 4500 - Number(input);
    },
  },
  dmcstyledh: {
    prefix: "5000-",
    moderesult: "Style points left for S rank:",
    task: "Input the number of style points you last got",
    calculate: function (input) {
      return 5000 - Number(input);
    },
  },
  dmcstylesos: {
    prefix: "5500-",
    moderesult: "Style points left for S rank:",
    task: "Input the number of style points you last got",
    calculate: function (input) {
      return 5500 - Number(input);
    },
  },
  dmcstylehah: {
    prefix: "5500-",
    moderesult: "Style points left for S rank:",
    task: "Input the number of style points you last got",
    calculate: function (input) {
      return 5500 - Number(input);
    },
  },
  dmcstyledmd: {
    prefix: "6000-",
    moderesult: "Style points left for S rank:",
    task: "Input the number of style points you last got",
    calculate: function (input) {
      return 6000 - Number(input);
    },
  },
  totalgamecost: {
    prefix: "$124.96-$",
    moderesult: "Amount of dollars left to buy all games:",
    task: "input the amount of dollars you have",
    calculate: function (input) {
      return 124.96 - Number(input);
    },
  },
};

function setCalcMode(mode) {
  currentMode = mode;
  if (modes[mode]) {
    prefix = modes[mode].prefix;
    moderesult = modes[mode].moderesult;
    display.value = prefix;
    document.getElementById("mode-result").innerHTML = `
            <div style="text-align:center; border: 4px solid #b22222; border-radius: 18px; padding: 16px; background: rgba(34,34,34,0.9); box-shadow: 0 0 16px #b22222; width: 60%; margin: auto;">
            <bold>${modes[mode].task}</bold><br>
            </div>
        `;
  } else {
    prefix = "";
    moderesult = "";
    display.value = "";
    document.getElementById("mode-result").innerHTML = "";
  }
}

function appendToDisplay(input) {
  if (prefix && display.selectionStart < prefix.length) {
    display.setSelectionRange(prefix.length, prefix.length);
  }
  display.value += input;
  display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
  if (prefix) {
    display.value = prefix;
  } else {
    display.value = "";
  }
}

function deleteLast() {
  if (prefix && display.value.length > prefix.length) {
    display.value = display.value.slice(0, -1);
  } else if (!prefix && display.value.length > 0 && display.value !== "Error") {
    display.value = display.value.slice(0, -1);
  }
}

function calculate() {
  try {
    if (prefix && display.value.startsWith(prefix) && modes[currentMode]) {
      let userInput = display.value.slice(prefix.length);
      let result = modes[currentMode].calculate(userInput);
      if (isNaN(result)) {
        display.value = "Error";
      } else {
        display.value = result;
      }
      document.getElementById("mode-result").innerHTML = `
                <div style="text-align:center; border: 4px solid #b22222; border-radius: 18px; padding: 16px; background: rgba(34,34,34,0.9); box-shadow: 0 0 16px #b22222; width: 60%; margin: auto;">
                <bold>${moderesult} ${display.value}</bold><br><br>
                <button id="reload" onclick="location.reload()">Clear Result</button>
                </div>
            `;
    } else {
      let result = eval(display.value.replace("%", "/100"));
      if (isNaN(result)) {
        display.value = "Error";
      } else {
        display.value = result;
      }
    }
    display.scrollLeft = display.scrollWidth;
  } catch (error) {
    display.value = "Error";
  }
}

// Character rating UI

let chars = [
  ["Dante", ", the red coated devil hunter", " can't pay rent."],
  ["Vergil", ", Dante's narcissistic twin", " deadbeat dad."],
  ["Nero", ", anger issues", " he's also Vergil's child."],
  ["Lady", ", real name is Mary", " Dante never paid her yet.."],
  [
    "Trish",
    ", the devil with a heart of gold",
    " looks identical to the twin's mother.",
  ],
  ["kyrie", ", Nero's love interest", " she is a singer."],
];

function swapLines(array, index1, index2) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}

document.getElementById("body-char").onload = function () {
  renderRatingUI();
};

function renderRatingUI() {
  document.getElementById("rating-container").innerHTML = `
        <h2 style="text-align:center;">Character Rating</h2>
        <ol id="char-list" style="padding-left: 24px;">
            ${chars
              .map(
                (char, i) => `<li><b>${char[0]}</b>${char[1]}, ${char[2]}</li>`
              )
              .join("")}
        </ol>
        <a style="">(all characters except Kyrie and Trish have father issues)</a>
        <div style="margin-top:16px; font-size: 1.6rem;">
            <label>Swap position: 
                <select id="swap1" style="font-size: 1.45rem;">${chars.map(
                  (char, i) => `<option value="${i}">${char[0]}</option>`
                )}</select>
                with 
                <select id="swap2" style="font-size: 1.45rem;">${chars.map(
                  (char, i) => `<option value="${i}">${char[0]}.</option>`
                )}</select>
                <button id="swap" onclick="Swap()" style="font-size: 1.4rem;">Swap</button>
            </label> 
            <button id="resetchar" onclick="resetChar()" style="margin-left:16px; font-size: 1.4rem;">Reset</button>
        </div>
        <div id="rating-message" style="margin-top:12px; color: red;"></div>
    `;
}

function Swap() {
  const index1 = parseInt(document.getElementById("swap1").value);
  const index2 = parseInt(document.getElementById("swap2").value);
  if (index1 === index2) {
    showRatingMessage("Please select two different characters.");
    return;
  }
  swapLines(chars, index1, index2);
  renderRatingUI();
  showRatingMessage(`Swapped ${chars[index2][0]} and ${chars[index1][0]}.`);
}

function resetChar() {
  chars = [
    ["Dante", ", the red coated devil hunter", " can't pay rent."],
    ["Vergil", ", Dante's narcissistic twin", " deadbeat dad."],
    ["Nero", ", anger issues", " he's also Vergil's child."],
    ["Lady", ", real name is Mary", " Dante never paid her yet.."],
    [
      "Trish",
      ", the devil with a heart of gold",
      " looks identical to the twin's mother.",
    ],
    ["kyrie", ", Nero's love interest", " she is a singer."],
  ];
  renderRatingUI();
  showRatingMessage("Rating reset.");
}

function showRatingMessage(msg) {
  document.getElementById("rating-message").innerHTML = msg;
}
