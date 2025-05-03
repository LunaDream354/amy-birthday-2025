class Sound{
    constructor(url){
        let url_result
        this.volume = 1.0
        if (url instanceof SoundInfo){
            url_result = url.path
            this.volume = url.volume
        }else {
            url_result = url
            this.volume = 1.0
        }
        this.audio = new Howl({src:[url_result],volume:this.volume})
    }
    play(){
        this.audio.volume(this.volume)
        this.audio.play()
    }
    pause(){
        this.audio.pause()
    }
    stop(){
        this.audio.stop()
    }
    rate(value){
        this.audio.rate(value)
    }
}
class SoundInfo{
    constructor(path,volume){
        this.path = path
        this.volume = volume
    }
}