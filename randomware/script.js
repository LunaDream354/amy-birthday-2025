
{
    const event_open = new Event('open')
    const event_close = new Event('close')
    const section = document.querySelector('#window_randomware')

    class Tool {
        constructor(icon, icon_used, sprite, x, y, audio_files) {
            this.icon = icon
            this.icon_used = icon_used
            this.sprites = sprite
            this.x = x
            this.y = y
            this.audio = []
            for (const file of audio_files) {
                this.audio.push(new Sound(file))
            }
        }
        play_sfx() {
            const pos = Math.floor(Math.random() * this.audio.length)
            const audio_chosen = this.audio[pos]
            const pitch = Math.random() * (0.2 + 0.2) - 0.2
            audio_chosen.rate(1 + pitch)
            audio_chosen.play()
        }
        get_sprite() {
            return this.sprites[Math.floor(Math.random() * this.sprites.length)]
        }
    }
    const tools = [
        new Tool(
            'randomware/resources/hammer/cursor.png',
            'randomware/resources/hammer/icon_used.png',
            ['randomware/resources/hammer/effects/effect_1.png'],
            20, 120,
            [
                new SoundInfo('randomware/resources/hammer/sounds/effect_1.mp3', 0.2),
                new SoundInfo('randomware/resources/hammer/sounds/effect_2.mp3', 0.3),
                new SoundInfo('randomware/resources/hammer/sounds/effect_3.mp3', 0.5),
            ]),
        new Tool(
            'randomware/resources/laser/cursor.png',
            'randomware/resources/laser/cursor.png',
            [
                'randomware/resources/laser/effects/effect_1.png',
                'randomware/resources/laser/effects/effect_2.png',
                'randomware/resources/laser/effects/effect_3.png'
            ],
            11, 140,
            [
                new SoundInfo('randomware/resources/laser/sounds/effect_1.mp3', 0.2),
                new SoundInfo('randomware/resources/laser/sounds/effect_2.mp3', 0.3),
                new SoundInfo('randomware/resources/laser/sounds/effect_3.mp3', 0.5),
                new SoundInfo('randomware/resources/laser/sounds/effect_4.mp3', 0.5),
            ]),
    ]
    let current_tool = tools[0]

    section.addEventListener('open', () => {
        current_tool = tools[0]
        set_cursor(current_tool.icon, current_tool.x, current_tool.y)
        section.addEventListener('keydown', key_down)
        section.addEventListener('mousedown', mouse_down)
    })
    section.addEventListener('close', () => {
        document.body.style.cursor = 'default'
        current_tool = undefined
        section.removeEventListener('keydown', key_down)
        section.removeEventListener('mousedown', mouse_down)
    })
    function key_down(e) {
        if (e.key <= '0' || e.key > String(tools.length))
            return
        current_tool = tools[e.key - 1]
        set_cursor(current_tool.icon, current_tool.x, current_tool.y)
    }
    function mouse_down(e) {
        if (e.button === 0 && current_tool != undefined) {
            set_cursor(current_tool.icon_used, current_tool.x, current_tool.y)
            const effect = document.createElement('img')
            effect.src = current_tool.get_sprite()
            effect.classList.add('effect')
            section.appendChild(effect)
            const mouseX = e.clientX
            const mouseY = e.clientY
            const rect = section.getBoundingClientRect()
            const relativeX = mouseX - rect.left;
            const relativeY = mouseY - rect.top;
            effect.style.left = `${relativeX - effect.offsetWidth / 2}px`
            effect.style.top = `${relativeY - effect.offsetHeight / 2}px`
            current_tool.play_sfx()
            setTimeout(() => {
                section.removeChild(effect)
            }, 5000)
            setTimeout(() => { set_cursor(current_tool.icon, current_tool.x, current_tool.y) }, 500)
        }
    }
    function set_cursor(img, x, y) {
        document.body.style.cursor = `url("${img}") ${x} ${y}, auto`
    }
}
