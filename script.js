
//width = 1623 - 297
//height = 1038 - 37

const event_open = new Event('open');
const event_close = new Event('close');

document.querySelectorAll('.windows_menu_btn').forEach((btn)=>{
    
    btn.addEventListener('open',(e)=>{
        console.log(btn)
        btn.classList.remove('hidden')
        btn.classList.add('interacted')
        btn.addEventListener('mouseover',event_mouse_enter)
        btn.addEventListener('mouseleave',event_mouse_exit)
    })
    btn.addEventListener('close',(e)=>{
        btn.classList.add('hidden')
        btn.classList.remove('interacted')
        btn.classList.style = ''
        btn.removeEventListener('mouseover',event_mouse_enter)
        btn.removeEventListener('mouseleave',event_mouse_exit)
    })
    btn.addEventListener('click',()=>{
        menu_open = '#' + btn.dataset.open
        if (btn.classList.contains('interacted')){
            document.querySelectorAll(menu_open).forEach((item)=>{
                item.dispatchEvent(event_close)
            })
            btn.classList.remove('interacted')
            btn.style.filter = ''
            return
        }
        btn.classList.add('interacted')
        btn.style.filter = 'brightness(50%)'
        btn.removeEventListener('mouseover',event_mouse_enter)
        btn.removeEventListener('mouseleave',event_mouse_exit)
        document.querySelectorAll(menu_open).forEach((item)=>{
            item.dispatchEvent(event_open)
        })
    })
    function event_mouse_enter(e){
        btn.style = 'brightness(50%)'
    } 
    function event_mouse_exit(e){
        btn.style = ''
    } 
    btn.dispatchEvent(event_open)
})