const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');




// play and pause
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function showPauseIcon() {
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
}

function togglePlay() {
    if(video.paused) {
        video.play();
        showPauseIcon();
    } else {
        video.pause();
        showPlayIcon();
    }
}

// video end
video.addEventListener('ended', showPlayIcon);

// time
function displayTime(time) {
    const minutes = Math.floor (time / 60);
    let seconds = Math.floor (time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes} : ${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`
    duration.textContent = displayTime(video.duration)

}

// to seek
function setProgress(e) {
    const newTime = (e.offsetX / progressRange.offsetWidth)
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = (newTime * video.duration)
}

// volume
let lastVolume = 0;

// mute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title','Unmute');
        volumeBar.style.width = 0;
    } else {
        video.volume = lastVolume;
        volumeIcon.classList.add('fas','fa-volume-up');
        volumeIcon.setAttribute('title','Mute');
        volumeBar.style.width = `${lastVolume * 100}%`;
    }
}

// VOLUME BAR
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;

    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas','fa-volume-up');
    } else if ( volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas','fa-volume-down');
    } else if(volume===0){
        volumeIcon.classList.add('fas','fa-volume-off');
    }
    lastVolume = volume;
}

// playback speed
function changeSpeed() {
    video.playbackRate = speed.value;
}

// fullscreen
function openFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

function closeFullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
    if(!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen(player);
    }
    fullscreen = !fullscreen;
}

// event listerns
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullscreen);
    
