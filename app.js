class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
    }
    activePad(){
        //console.log(this);
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //console.log(step);
        //Loop over the bars
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pad is activePad
            if (bar.classList.contains('active')){
                //Check each sound button
                if (bar.classList.contains('kick-pad')){
                    this.kickAudio.play();
                    this.kickAudio.currentTime = 0;
                }
                if (bar.classList.contains('snare-pad')){
                    this.snareAudio.play();                    this.kickAudio.currentTime = 0;
                    this.snareAudio.currentTime = 0;
                }
                if (bar.classList.contains('hihat-pad')){
                    this.hihatAudio.play();
                    this.hihatAudio.currentTime = 0;
                }
            }
        });
        this.index++;
    }
    start(){
        //console.log(this);
        const interval = (60/this.bpm) * 1000;
        setInterval(()=>{
            this.repeat();
        }, interval);
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener(`click`, drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = ``;
    })
});

drumKit.playBtn.addEventListener('click', function() {
    drumKit.start();
});