{
    const event_open = new Event('open')
    const event_close = new Event('close')
    const section = document.querySelector('#window_randomware')

    class Tool{
        constructor(icon,icon_used,sprite){
            this.icon = icon
            this.icon_used = icon_used
            this.sprite = sprite
        }
    }
    const tools = [
        new Tool('randomware/resource/hammer_icon.png','randomware/resource/hammer_icon.png','randomware/resource/hammer_crack.png'),
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
        section.style.cursor = 'auto'
        current_tool = undefined
        section.removeEventListener('keydown',key_down)
        section.removeEventListener('mousedown',mouse_down)
    })
    function key_down(e){
        console.log(e)
        if (e.key <1 || e.key > tools.length)
            return
        current_tool = tools[e.key-1]
        set_cursor(current_tool.icon)
    }
    function mouse_down(e){
        if (e.button === 0 && current_tool != undefined) {
            set_cursor(current_tool.icon_used)
            const effect = document.createElement('img')
            section.appendChild(effect)
            effect.classList.add('effect')
            const x = e.clientX
            const y = e.clientY
            effect.style.left = `${x - effect.offsetWidth / 2}px`
            effect.style.top = `${y - effect.offsetHeight / 2}px`
            setTimeout(()=>{
                section.removeChild(effect)}, 5000)
            setTimeout(set_cursor(current_tool.icon),500)
        }
    }
    function set_cursor(img){
        if (section.classList.contains('hidden'))
            return
        section.style.cursor = 'url('+img+'), auto;'
    }
}
