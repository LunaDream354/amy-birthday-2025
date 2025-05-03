{
    const event_open = new Event('open')
    const event_close = new Event('close')
    const section = document.querySelector('#window_nose')
    const container = section.querySelector('#game_container_nose')
    const score = section.querySelector("#score_nose")
    const noses = section.querySelectorAll("nose_hole")
    let createHandTimer
    section.addEventListener('open', () => {
        document.body.style.cursor = 'url("nose/resources/cursor.png") 37 39, auto'
        createHandTimer = setInterval(createHand(),6000)
    })
    section.addEventListener('close', () => {
        document.body.style.cursor = 'default'
        clearInterval(createHandTimer)
    })
    function createHand(){
        const target = Math.floor(Math.random()*noses.length)
        const edge = Math.floor(Math.random() * 4);
        let x, y
        const containerRect = section.getBoundingClientRect()
        
        const hand = document.createElement("img");
        hand.classList.add("hand")
        section.appendChild(hand)
        section.style.left = spawn_pos
        const targetCenter = {
            x: target.offsetLeft + target.offsetWidth / 2,
            y: target.offsetTop + target.offsetHeight / 2,
          };
        let rotation = Math.atan2(targetCenter.y-)
        hand.style.transform = `rotate(${rotation}deg)`
        const targetRect = target.getBoundingClientRect()
        const speed = Math.random()*(10+5)-5
        const interval = setInterval(()=>{
            
        },20)
    }
    
  function width_obj_to_screen(percent,obj) {
    const pixelValue = (percent / 100) * obj.getBoundingClientRect().width
    return (pixelValue / section.getBoundingClientRect().width) * 100
  }

  function height_obj_to_screen(percent, obj) {
    const pixelValue = (percent / 100) * obj.getBoundingClientRect().height
    return (pixelValue / section.getBoundingClientRect().height) * 100
  }
}