class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.muteBtns = document.querySelectorAll('.mute');
        
        this.index = 0;
        this.bpm = 120;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
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
        //Check if already playing
        if(this.isPlaying){ //If it's playing and you push Btn then it will stop
            //Clear the interval
            clearInterval(this.isPlaying); //Stop interval
            this.isPlaying = null;
        } else{       
            this.isPlaying = setInterval(()=>{
                this.repeat();
            }, interval);
        }    
    }
    updateBtn(){
        if (this.isPlaying){ //IF it's playing, and Btn pushed then the music stops, and Btn changed to Play
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        } else{
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(e.target.value);
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }   
    }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch (muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else{
            switch (muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener(`click`, drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = ``;
    })
});

drumKit.playBtn.addEventListener('click', function() {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});