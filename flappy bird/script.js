const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let birdTop = 60;
let birdAcceleration = 0;
let gravity = 2;
let isGameOver = false;
let score = 0;
function jump(e) {
  if (e.key == "Escape")
    return
  if (isGameOver) 
    return
  if (birdAcceleration >= -10)
    birdAcceleration = -40;
  
}

function createPipe() {
  if (isGameOver) return;
  const minGap = percentHeightToVH(400,bird)
  const maxGap = percentHeightToVH(200,bird)
  const pipeGap = Math.floor(Math.random()*(maxGap))+minGap
  
  const pipeGapMiddle = Math.floor(Math.random()*(100 - pipeGap) + 10)
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  pipeTop.classList.add("pipe", "pipe-top");
  pipeBottom.classList.add("pipe", "pipe-bottom");
  pipeTop.style.height = (100 - pipeGapMiddle - pipeGap/2 )+ "vh";
  pipeBottom.style.height = (100 - pipeGapMiddle - pipeGap/2 ) - pipeGap/2 + "vh";
  
  let pipeLeft = 100.0 + percentWidthToVW(100,pipeTop);
  pipeTop.style.left = pipeLeft + "vw";
  pipeBottom.style.left = pipeLeft + "vw";
  
  const topInterval = setInterval(() => {
    if (pipeLeft <= -percentWidthToVW(100,pipeTop)) {
      clearInterval(topInterval);
      gameContainer.removeChild(pipeTop);
      gameContainer.removeChild(pipeBottom);
      return;
    }
    let middle = bird.getBoundingClientRect().left - pipeTop.getBoundingClientRect().right
    if (Math.abs(middle) < 10 && !pipeTop.classList.contains("counted")) {
      score++;
      pipeTop.classList.add("counted")
      scoreDisplay.textContent = score;
    }
    pipeLeft -= 1;
    pipeTop.style.left = pipeLeft + "vw";
    pipeBottom.style.left = pipeLeft + "vw";
    if (isColliding(bird,pipeTop) || isColliding(bird,pipeBottom)) {
      endGame();
    }
  }, 20);
}

function endGame() {
  isGameOver = true;
  alert("Game Over! Your score: " + score);
}

function gameLoop() {
  if (isGameOver) return;
  birdAcceleration = Math.min(gravity+birdAcceleration,40)
  birdTop += birdAcceleration * 0.02
  bird.style.top = birdTop + "vh";
  if (birdTop > 450 || birdTop < 0) {
    endGame();
  }
}
window.addEventListener('message',(e)=>{
  if (e.data === 'start'){
    console.log(e.id)
    parent_id = e.id
    setInterval(gameLoop, 20);
    createPipe()
    //setInterval(createPipe, 1500);
    document.addEventListener("keydown", jump);
    document.addEventListener("click", jump);
  }else if(e.data === 'stop'){
    location.reload()
  }
})
function isColliding(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom 
  );
}
function percentWidthToVW(percent,obj) {
  const pixelValue = (percent / 100) * obj.getBoundingClientRect().width;
  return (pixelValue / window.innerWidth) * 100;
}

function percentHeightToVH(percent, obj) {
  const pixelValue = (percent / 100) * obj.getBoundingClientRect().height;
  return (pixelValue / window.innerHeight) * 100;
}
function is_out_view(element){
  const rect = element.getBoundingClientRect();
  return (
    ((rect.bottom < 0 && rect.top < 0)||rect.bottom > window.innerHeight && rect.top > window.innerHeight)
      ||
      ((rect.left < 0 && rect.right < 0)|| rect.left > window.innerWidth && rect.right > window.innerWidth)
  );

}