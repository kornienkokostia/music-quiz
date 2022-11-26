import { startBgAnimation, stopBgAnimation } from "./bg-gradient.js"
import { stopOptionAudio } from "./option-audio-player.js"

const convertTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    seconds = seconds < 10 ? '0' + String(seconds) : String(seconds)
    return `<span class="minutes duration-num">${minutes}</span>:
            <span class="seconds-one duration-num">${seconds[0]}</span>
            <span class="seconds-two duration-num">${seconds[1]}</span>`
}

const stopQuestionAudio = () => {
    pauseAudioBtnActive()
    questionAudio.pause()
}

const playAudioBtnActive = () => {
    [...document.querySelectorAll('.question-song-start-btn')].pop().classList.remove('song-control-btn-active');
    [...document.querySelectorAll('.question-song-stop-btn')].pop().classList.add('song-control-btn-active')
}

const pauseAudioBtnActive = () => {
    [...document.querySelectorAll('.question-song-start-btn')].pop().classList.add('song-control-btn-active');
    [...document.querySelectorAll('.question-song-stop-btn')].pop().classList.remove('song-control-btn-active')
}

const onSongStartBtnClick = () => {
    playAudioBtnActive()
    stopOptionAudio()
    if (document.querySelector('.main-bg').getAttribute('active') === 'false') {    
        startBgAnimation()
    }

    questionAudio.play()
}

const onSongStopBtnClick = () => {
    pauseAudioBtnActive()
    if (document.querySelector('.main-bg').getAttribute('active') === 'true') {
        stopBgAnimation()
    }
    questionAudio.pause()
}

const setAudioSrc = (audioSource) => {
    questionAudio.src = audioSource
}

const onSongProgressbarInput = () => {
    inputRangeHold = true;
    [...document.querySelectorAll('.question-song-progressbar-progress')].pop().value = [...document.querySelectorAll('.question-song-progressbar-range')].pop().value;   
    [...document.querySelectorAll('.question-song-duration-start')].pop().innerHTML = convertTime(Math.round([...document.querySelectorAll('.question-song-progressbar-range')].pop().value));
    [...document.querySelectorAll('.question-song-duration-end')].pop().innerHTML = `-${convertTime(Math.round(questionAudio.duration) - Math.round([...document.querySelectorAll('.question-song-progressbar-range')].pop().value))}`;
}

const onSongProgressbarMouseUpOrTouchEnd = () => {
    inputRangeHold = false
    questionAudio.currentTime = [...document.querySelectorAll('.question-song-progressbar-progress')].pop().value
}

const setVolume = (volume) => {
    [...document.querySelectorAll('.volume-control-progressbar-progress')].pop().value = volume;
    [...document.querySelectorAll('.volume-control-progressbar-range')].pop().value = volume;
    questionAudio.volume = volume 
}

const onVolumeProgressbarInput = () => {
    [...document.querySelectorAll('.volume-control-progressbar-progress')].pop().value = [...document.querySelectorAll('.volume-control-progressbar-range')].pop().value
    questionAudio.volume = [...document.querySelectorAll('.volume-control-progressbar-progress')].pop().value  
}

let inputRangeHold = false
const questionAudio = new Audio()

questionAudio.addEventListener('loadedmetadata', () => {
    [...document.querySelectorAll('.question-song-duration-start')].pop().innerHTML = `${convertTime(Math.round(questionAudio.currentTime))}`;
    [...document.querySelectorAll('.question-song-duration-end')].pop().innerHTML = `-${convertTime(Math.round(questionAudio.duration))}`; 
    [...document.querySelectorAll('.question-song-progressbar-range')].pop().setAttribute('max', questionAudio.duration);
    [...document.querySelectorAll('.question-song-progressbar-range')].pop().setAttribute('step', questionAudio.duration / Math.floor(questionAudio.duration));
    [...document.querySelectorAll('.question-song-progressbar-progress')].pop().setAttribute('max', questionAudio.duration);
})
questionAudio.addEventListener('timeupdate', () => {
    if (!inputRangeHold) {
        [...document.querySelectorAll('.question-song-progressbar-progress')].pop().value = questionAudio.currentTime;
        [...document.querySelectorAll('.question-song-progressbar-range')].pop().value = questionAudio.currentTime;
    }
    if (!inputRangeHold) {
        [...document.querySelectorAll('.question-song-duration-start')].pop().innerHTML = convertTime(Math.round(questionAudio.currentTime));
        [...document.querySelectorAll('.question-song-duration-end')].pop().innerHTML = `-${convertTime(Math.round(questionAudio.duration) - Math.round(questionAudio.currentTime))}`;
    }
})
questionAudio.addEventListener('ended', () => {
    pauseAudioBtnActive()
})
questionAudio.addEventListener('play', () => {
    playAudioBtnActive()
})
questionAudio.addEventListener('pause', () => {
    pauseAudioBtnActive()
})

export {onSongStartBtnClick, onSongStopBtnClick, setAudioSrc, onSongProgressbarInput, 
    onSongProgressbarMouseUpOrTouchEnd, onVolumeProgressbarInput, convertTime, stopQuestionAudio, setVolume}