{
    const event_open = new Event('open')
    const event_close = new Event('close')
    const section = document.querySelector('#window_randomware')
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    class Tool{
        constructor(icon,icon_used,sprite,x,y, audio_files){
            this.icon = icon
            this.icon_used = icon_used
            this.sprite = sprite
            this.x = x
            this.y = y
            this.audio = []
            async function load_sounds() {
                for(const url of audio_files){
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    this.audio.add(await audioContext.decodeAudioData(arrayBuffer));
                }
                console.log ("Audio from tool loaded")
            }
            load_sounds()
            function playSound(){
                const audio_chosen = Math.floor(Math.random()*0.99*this.audio.length)
                const pitch = Math.random()*(0.1+0.1)-0.1
                const source = audioContext.createBufferSource()
                source.buffer = this.audio[audio_chosen]
                source.playbackRate.value = 1.0 + pitch
                source.connect(audioContext.destination)
                source.start()
            }
        }
    }
    const tools = [
        new Tool('randomware/resource/hammer/cursor.png',
            'randomware/resource/hammer/icon_used.png',
            'randomware/resource/hammer/effect.png',
            20,120,[
                'randomware/resource/hammer/sounds/effect_1.mp3',
                'randomware/resource/hammer/sounds/effect_2.mp3',
                'randomware/resource/hammer/sounds/effect_3.mp3',
            ]),
        new Tool('b','b','b'),
        new Tool('c','c','c'),
        new Tool('d','d','d'),
        new Tool('e','e','e')
    ]
    let current_tool = undefined

    section.addEventListener('open',()=>{
        section.addEventListener('keydown',key_down)
        section.addEventListener('mousedown',mouse_down)
    })
    section.addEventListener('close',()=>{
        console.log("awe")
        document.body.style.cursor = 'default'
        current_tool = undefined
        section.removeEventListener('keydown',key_down)
        section.removeEventListener('mousedown',mouse_down)
    })
    function key_down(e){
        if (e.key <= '0' || e.key >= String(tools.length))
            return
        console.log(e.key)
        current_tool = tools[e.key-1]
        set_cursor(current_tool.icon,current_tool.x,current_tool.y)
    }
    function mouse_down(e){
        if (e.button === 0 && current_tool != undefined) {
            set_cursor(current_tool.icon_used,current_tool.x,current_tool.y)
            const effect = document.createElement('img')
            effect.src = current_tool.sprite
            effect.classList.add('effect')
            section.appendChild(effect)
            const mouseX  = e.clientX
            const mouseY = e.clientY
            const rect = section.getBoundingClientRect()
            const relativeX = mouseX - rect.left;
            const relativeY = mouseY - rect.top;
            effect.style.left = `${relativeX - effect.offsetWidth / 2}px`
            effect.style.top = `${relativeY - effect.offsetHeight / 2}px`
            current_tool.playSound()
            setTimeout(()=>{
                section.removeChild(effect)}, 5000)
            setTimeout(()=>{set_cursor(current_tool.icon,current_tool.x,current_tool.y)},500)
        }
    }
    function set_cursor(img,x,y){
        if (section.classList.contains('hidden'))
            return
        document.body.style.cursor = `url("${img}") ${x} ${y}, auto`
    }
}
