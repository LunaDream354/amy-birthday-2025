
//width = 1623 - 297
//height = 1038 - 37
	// item = document.querySelector('.window[data-window_id="'+windowOpen+'"]')
	// item.querySelector('iframe').contentWindow.postMessage('stop','*')
	// item.classList.add('hidden')

document.querySelectorAll('.menu_item').forEach((btn)=>{
	const event_open = new Event('open')
	const event_close = new Event('close')
	
	btn.addEventListener('open',(e)=>{
		btn.addEventListener('mouseover',event_mouse_enter)
		btn.addEventListener('mouseleave',event_mouse_exit)
	})
	btn.addEventListener('close',(e)=>{
		btn.classList.remove('interacted')
		btn.style.filter = ''
		btn.removeEventListener('mouseover',event_mouse_enter)
		btn.removeEventListener('mouseleave',event_mouse_exit)
		if ('menu' in btn.dataset){
			menu_open = '#' + btn.dataset.menu
			document.querySelector(menu_open).dispatchEvent(event_close)
		}
	})
	btn.addEventListener('click',()=>{
		
		if ('menu' in btn.dataset){
			menu_open = '#' + btn.dataset.menu
			if (btn.classList.contains('interacted')){
				document.querySelector(menu_open).dispatchEvent(event_close)
				btn.classList.remove('interacted')
			}else{
				btn.classList.add('interacted')
				btn.style.filter = 'brightness(50%)'
				document.querySelector(menu_open).dispatchEvent(event_open)
				btn.addEventListener('mouseover',event_mouse_enter)
				btn.addEventListener('mouseleave',event_mouse_exit)
			}
		}
		if ('window' in btn.dataset){
			item = document.querySelector('#window_'+btn.dataset.window)
			document.querySelector('#start').dispatchEvent(event_close)
			item.dispatchEvent(event_open)
			item.classList.remove('hidden')
		}
	})
	function event_mouse_enter(e){
		btn.style.filter = 'brightness(50%)'
	} 
	function event_mouse_exit(e){
		btn.style.filter = ''
	}
})

document.querySelectorAll('.menu').forEach((menu)=>{
	const event_open = new Event('open');
	const event_close = new Event('close');
	menu.addEventListener('open',()=>{
		menu.classList.remove('hidden')
		menu.querySelectorAll(':scope > '+'.menu_item').forEach((btn)=>{
			btn.dispatchEvent(event_open)
		})
		menu.addEventListener('mouseout',event_mouse_out)
	})
	menu.addEventListener('close',()=>{
		menu.classList.add('hidden')
		menu.querySelectorAll(':scope > '+'.menu_item').forEach((btn)=>{
			btn.dispatchEvent(event_close)
		})
		menu.removeEventListener('mouseout',event_mouse_out)
	})

	function event_mouse_out(e){
	}
	if(!menu.classList.contains('hidden'))
		menu.dispatchEvent(event_open)
})
