class Dice {
  score = 0;
  getScore() {
    return this.score;
  }
}

class Game extends Dice {
  constructor() {
    super();
  }
  reset() {
    this.score = 0;
  }
}

const game = new Game();
let position = 0;
let gameStarted = false;
const totalboxes = 42;

const rollBtn = document.getElementById("rollbtn");
const boxlist = document.querySelector(".box-list"); 
const scoreEl = document.getElementById("score");
const circleDiv = document.getElementById("circle");
const resetbtn = document.getElementById("reset");
const customAlert1 = document.getElementById("customAlert1");
const customAlert = document.getElementById("customAlert");
const quit = document.getElementById("quit");
const startBtn = document.getElementById("startBtn");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");
const Level=document.getElementById("levelscore");
const trapsPositions = [2,3,7,9,12,16,20,22,25,28,31,35,37,39];    


const boxes = []; 


for(let i = 0; i < totalboxes; i++){
  const box = document.createElement("li");
  box.className = "box";
  box.textContent = i;
  boxes.push(box);
  boxlist.appendChild(box);
  boxes[0].textContent="";

}

const allBoxes = boxes;
customAlert1.style.display = "block";

startBtn.onclick = () => {
  customAlert1.style.display = "none";

  updateVisibleBoxes(1, position);
};

quit.onclick = () => {
  customAlert1.style.display = "block";

};

function resetGame() {
  position = 0;
  game.reset();
  gameStarted = false;
  scoreEl.textContent = "0";
  Level.textContent = "";
  updateVisibleBoxes(1, position);
}
resetbtn.addEventListener("click", resetGame);

rollBtn.addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;

  if (!gameStarted) {
    if (roll === 6 && position === 0) {
      gameStarted = true;
      position = 0;
      scoreEl.textContent = "0";
      Level.textContent = "1";
      circleDiv.style.display = "block";
      updateVisibleBoxes(1, position);
    } else {
      for (let j = 0; j < 6; j++) {
        const el = document.getElementById(`dice${j}`);
        if (el) {
          el.style.display = j === roll - 1 ? "block" : "none";
        }
      }
    }
  } else {
    position += roll;
    game.score += roll;
    scoreEl.textContent = game.score;
    updateLevel(position);
  }


  if (position >= totalboxes) {
    position = totalboxes - 1;
    showToast("Game Over!☠️");
    scoreEl.textContent = "0";
    game.reset();
    resetGame();
    customAlert.style.display = "block";

    okBtn.onclick = () => {
      customAlert.style.display = "none";
      resetGame();
    };

    cancelBtn.onclick = () => {
      customAlert.style.display = "none";
    };
  }
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById(`dice${i}`);
    if (el) {
      el.style.display = i === roll - 1 ? "block" : "none";
    }
  }

  trapsPositions.forEach(Pos =>{
  if( position === Pos){
  boxes[Pos].classList.add("trap");
  showToast("Oh no! You hit on trap!");
  circleDiv.style.display="none";
  scoreEl.textContent = "0";
  Level.textContent = "";
  gameStarted=false;
 
  setTimeout(()=>{
  boxes[Pos].classList.remove("trap");
  resetGame();
  game.reset();
  }, 1000)
  }
  })

  if(position===41){
  showToast("Congratulations! You Win 🏆");
  resetGame();
  game.reset();
  circleDiv.style.display="none";
  }
  

  if (allBoxes[position]) {
    allBoxes[position].appendChild(circleDiv);
  }
});

function updateVisibleBoxes(level) {
  let maxIndex = 11; 
  if (level === 2) {
  maxIndex = 23;
}
  else if (level === 3){ 
  maxIndex = 35;
}else if (level === 4) {
  maxIndex = 41;
}
for (let i = 0; i < allBoxes.length; i++) {
allBoxes.forEach((box, index) => {
  if(index <= maxIndex){
  box.classList.remove("hidden");
  }else{
  box.classList.add("hidden");
  }
});
boxlist.appendChild(allBoxes[i]);
}
}


function updateLevel(pos) {
  let level = "";
  switch (pos){
  case pos === 10 || pos > 10:
  level = 1;
  break;
  case pos === 20 || pos > 20:
  level = 2;
  break;
  case pos === 30 || pos > 30:
  level = 3;
  break;
  }

  Level.textContent = level;
  updateVisibleBoxes(level, pos);
}
function showToast(message) {
  const x = document.getElementById("snackbar");
  x.textContent = message;
  x.classList.add("show");
  setTimeout(() => {
    x.classList.remove("show");
  }, 3000);
}