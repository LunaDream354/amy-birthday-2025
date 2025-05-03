function flappybird(){
  const section = document.querySelector('#window_flappybird')
  const bird = section.querySelector('#bird')
  const gameContainer = section.querySelector("#game-container")
  const scoreDisplay = section.querySelector("#score")

  let birdTop = 60;
  let birdAcceleration = 0;
  let gravity = 4;
  let isGameOver = false;
  let score = 0;
  const event_open = new Event('open')
  const event_close = new Event('close')

  function jump(e) {
    if (isGameOver) 
      return
    if (birdAcceleration >= -10)
      birdAcceleration += -80;  
  }

  function createPipe() {
    if (isGameOver) return;
    const minGap = percentHeightToVH(400,bird)
    const maxGap = percentHeightToVH(600,bird)
    const pipe_min_size = 10
    const gap_size = Math.floor(Math.random()*(maxGap-minGap)) + minGap
    const pipe_top_height = Math.floor(Math.random()*(100-gap_size-pipe_min_size*2+1))+pipe_min_size
    const pipeTop = document.createElement("div");
    const pipeBottom = document.createElement("div");
    gameContainer.appendChild(pipeTop);
    gameContainer.appendChild(pipeBottom);

    pipeTop.classList.add("pipe", "pipe-top");
    pipeBottom.classList.add("pipe", "pipe-bottom");
    pipeTop.style.height = pipe_top_height + "%";
    pipeBottom.style.height = (100 - pipe_top_height - gap_size) + "%";
    
    let pipeLeft = 100.0 + percentWidthToVW(100,pipeTop);
    pipeTop.style.left = pipeLeft + "%";
    pipeBottom.style.left = pipeLeft + "%";
    
    const topInterval = setInterval(() => {
      if (pipeLeft == null){
        clearInterval(topInterval)
        return
      }
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
        if (score == 5){
          //HERE RAS
        }
      }
      pipeLeft -= 1;
      pipeTop.style.left = pipeLeft + "%";
      pipeBottom.style.left = pipeLeft + "%";
      if (isColliding(bird,pipeTop) || isColliding(bird,pipeBottom)) {
        endGame();
        clearInterval(topInterval)
      }
    }, 20);
  }

  function endGame() {
    if (isGameOver)
      return
    isGameOver = true;
    alert("Game Over! Your score: " + score);
    section.dispatchEvent(event_close)
    section.querySelectorAll('.pipe').forEach((item)=>{
      item.remove()
    })
  }

  function gameLoop() {
    if (isGameOver) return;
    birdAcceleration = Math.min(gravity+birdAcceleration,40)
    birdTop += birdAcceleration * 0.02
    bird.style.top = birdTop + "%";
    if (birdTop > 120 || birdTop < 0) {
      endGame();
    }
  }
  let gameloop_id = 0
  let create_pipe_id = 0
  section.addEventListener('open',(e)=>{
    birdTop = 60
    birdAcceleration = 0
    isGameOver = false
    score = 0
    scoreDisplay.textContent = score;
    gameloop_id = setInterval(gameLoop, 20);
    create_pipe_id = setInterval(createPipe, 1000);
    section.addEventListener("keydown", jump);
    section.addEventListener("click", jump);
  })
  section.addEventListener('close',(e)=>{
    section.removeEventListener("keydown", jump);
    section.removeEventListener("click", jump);
    clearInterval(gameloop_id)
    clearInterval(create_pipe_id)
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
    return (pixelValue / section.getBoundingClientRect().width) * 100;
  }

  function percentHeightToVH(percent, obj) {
    const pixelValue = (percent / 100) * obj.getBoundingClientRect().height;
    return (pixelValue / section.getBoundingClientRect().height) * 100;
  }
  function is_out_view(element){
    const rect = element.getBoundingClientRect();
    return (
      ((rect.bottom < 0 && rect.top < 0)||rect.bottom > section.getBoundingClientRect().height 
      && rect.top > section.getBoundingClientRect().height)
        ||
        ((rect.left < 0 && rect.right < 0)|| rect.left > section.getBoundingClientRect().width 
          && rect.right > section.getBoundingClientRect().width)
    );

  }
}
flappybird()