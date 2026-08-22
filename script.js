let play=document.getElementById('play');
let progressbar=document.getElementById('progressbar');
let audio= new Audio('audio/1.mp3');
let playmusic=Array.from(document.getElementsByClassName("play-music fa-solid fa-circle-play"));
let currentsong=1;

audio.onplay=()=>{
    disc.style.animationPlayState="running";
}
audio.onpause=()=>{
    disc.style.animationPlayState="paused";
}

play.addEventListener('click', ()=>{
    if(audio.paused || audio.currentTime==0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else{
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
})
audio.addEventListener('timeupdate', ()=>{
    let progress=(audio.currentTime/audio.duration)*100;
    progressbar.value=progress;
    progressbar.style.background=`linear-gradient(to right, #f5deb3 ${progress}%, #333 ${progress}%)`;
})
progressbar.addEventListener('input', function(){
    let value=this.value;
    this.style.background=`linear-gradient(to right, #f5deb3 ${value}%, #333 ${value}%)`;
    audio.currentTime=(progressbar.value * audio.duration)/100;
})

makeAllPLay=()=>{
    playmusic.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
playmusic.forEach((elements)=>{
    elements.addEventListener('click',(e)=>{
        makeAllPLay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index=parseInt(e.target.id);
        currentsong=index;
        audio.src=`audio/${index}.mp3`;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    })
})

let allMusic=Array.from(document.getElementsByClassName('music-card'));
songs=[
    {songname: 'Yaara Teri Yaari', songdes: 'Rahul Jain', songimg: 'images/1.jpg',songaudio: 'audio/1.mp3'},
    {songname: 'Jai ho', songdes: 'A.R Rahman', songimg: 'images/2.jpg',songaudio: 'audio/2.mp3'},
    {songname: 'Phir le aya dil', songdes: 'Pritam Chakraborty', songimg: 'images/3.jpg',songaudio: 'audio/3.mp3'},
    {songname: 'Ashiquei 2', songdes: 'Songs mashup', songimg: 'images/4.jpg',songaudio: 'audio/4.mp3'},
    {songname: 'Ashan nehi yaha', songdes: 'Arijit Singh', songimg: 'images/5.jpg',songaudio: 'audio/5.mp3'},
    {songname: 'Sun Le zara', songdes: 'Zareen Khan & Karan Kundrra', songimg: 'images/6.jpg',songaudio: 'audio/6.mp3'},
    {songname: 'Baarish', songdes: 'Ash King and Shashaa Tirupati', songimg: 'images/7.jpg',songaudio: 'audio/7.mp3'},
    {songname: 'Rataan lambiya', songdes: 'Jubin Nautiyal, Asees Kaur', songimg: 'images/8.jpg',songaudio: 'audio/8.mp3'},
    {songname: 'Pasoori', songdes: 'Shae Gill, Ali Sethi', songimg: 'images/9.jpg',songaudio: 'audio/9.mp3'},
    {songname: 'Sun meri sehzadi', songdes: 'Alka Yagnik and Kumar Sanu ', songimg: 'images/10.jpg',songaudio: 'audio/10.mp3'},
    {songname: 'Bondhu Chol', songdes: ' Anupam Roy ', songimg: 'images/11.jpg',songaudio: 'audio/11.mp3'},
    {songname: 'Despacito', songdes: 'Luis Fonsi', songimg: 'images/12.jpg',songaudio: 'audio/12.mp3'},
    {songname: 'Dynamite', songdes: 'BTS', songimg: 'images/13.jpg',songaudio: 'audio/13.mp3'},
    {songname: 'Dugga Elo', songdes: 'Guddu and Monali Thakur', songimg: 'images/14.jpg',songaudio: 'audio/14.mp3'},
    {songname: 'Love Nwantiti', songdes: 'Ckay', songimg: 'images/15.jpg',songaudio: 'audio/15.mp3'}
]

order=[...songs];

allMusic.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src= songs[i].songimg;
    element.getElementsByClassName('img-title')[0].innerText =songs[i].songname;
    element.getElementsByClassName('img-descpt')[0].innerText =songs[i].songdes;
})

let suffle=document.getElementById('shuffle');
let repeat= document.getElementById('repeat');
let nowbar=document.querySelector('.now-bar');

let songOnRepeat=false;
let songONSuffle=false;

function shuffleSongs (OriginalOrder) {
    order=[...OriginalOrder];
    for (i = order.length-1; i > 0; i--) {
        let j=Math.floor(Math.random*(i+1));
        [order[i],order[j]]=[order[j],order[i]];
    }
    return order;
}

suffle.addEventListener('click', () => {
    if(!songONSuffle){
        songONSuffle=true;
        songOnRepeat=false;
        suffle.classList.add('active');
        repeat.classList.remove('active');

        order= shuffleSongs(songs);
    }else{
        songONSuffle=false;
        suffle.classList.remove('active');

        order= songs;
    }
})

repeat.addEventListener('click', () => {
    if(!songOnRepeat){
        songOnRepeat=true;
        songONSuffle=false;
        repeat.classList.add('active');
        suffle.classList.remove('active');
    }else{
        songOnRepeat=false;
        repeat.classList.remove('active');
    }
})

playnextsong=()=>{
    if(!songOnRepeat){
        let nextsong=(currentsong+1)%playmusic.length;
        currentsong= nextsong==0?15:nextsong;
        audio.src=order[currentsong-1].songaudio;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    } else{
        audio.src=order[currentsong-1].songaudio;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    }
}

playprevsong=()=>{
    if(!songOnRepeat){
        let prevsong=(currentsong-1);
        currentsong=prevsong==0?15:prevsong;
        audio.src=order[currentsong-1].songaudio;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    }
    else{
        audio.src=order[currentsong-1].songaudio;
        audio.currentTime=0;
        audio.play();
        updateNowBar();
    }
   
}

function updateNowBar () {
    nowbar.getElementsByClassName('img-title-info')[0].innerText = order[currentsong-1].songname;
    nowbar.getElementsByClassName('img-des-info')[0].innerText= order[currentsong-1].songdes;
}
forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click',()=>{
    playnextsong();
})

audio.addEventListener('ended', ()=>{
    playnextsong();
})
backward.addEventListener('click',()=>{
    playprevsong();
})

