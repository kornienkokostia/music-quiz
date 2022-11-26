import { startBgAnimation, stopBgAnimation } from "./bg-gradient.js"
import { convertTime, stopQuestionAudio } from "./question-audio-player.js"

const stopOptionAudio = () => {
    pauseAudioBtnActive()
    optionAudio.pause()
}

const playAudioBtnActive = () => {
    if (document.querySelector('.option-song-start-btn')) {
        document.querySelector('.option-song-start-btn').classList.remove('song-control-btn-active')
        document.querySelector('.option-song-stop-btn').classList.add('song-control-btn-active')
    }
}

const pauseAudioBtnActive = () => {
    if (document.querySelector('.option-song-start-btn')) {
        document.querySelector('.option-song-start-btn').classList.add('song-control-btn-active')
        document.querySelector('.option-song-stop-btn').classList.remove('song-control-btn-active')
    }
}

const onSongStartBtnClick = () => {
    playAudioBtnActive()
    stopQuestionAudio()
    if (document.querySelector('.main-bg').getAttribute('active') === 'false') {
        startBgAnimation()
    }
    optionAudio.play()
}

const onSongStopBtnClick = () => {
    pauseAudioBtnActive()
    if (document.querySelector('.main-bg').getAttribute('active') === 'true') {
        stopBgAnimation()
    }
    optionAudio.pause()
}

const setAudioSrc = (audioSource) => {
    optionAudio.src = audioSource
}

const onSongProgressbarInput = () => {
    inputRangeHold = true
    document.querySelector('.option-song-progressbar-progress').value = document.querySelector('.option-song-progressbar-range').value   
    document.querySelector('.option-song-duration-start').innerHTML = convertTime(Math.round(document.querySelector('.option-song-progressbar-range').value))
    document.querySelector('.option-song-duration-end').innerHTML = `-${convertTime(Math.round(optionAudio.duration) - Math.round(document.querySelector('.option-song-progressbar-range').value))}`
}

const onSongProgressbarMouseUpOrTouchEnd = () => {
    inputRangeHold = false
    optionAudio.currentTime = document.querySelector('.option-song-progressbar-progress').value
}

const onVolumeProgressbarInput = () => {
    document.querySelector('.volume-control-progressbar-progress').value = document.querySelector('.volume-control-progressbar-range').value
    optionAudio.volume = document.querySelector('.volume-control-progressbar-progress').value  
}

let inputRangeHold = false
const optionAudio = new Audio()

optionAudio.addEventListener('loadedmetadata', () => {
    pauseAudioBtnActive()
    document.querySelector('.option-song-duration-start').innerHTML = `${convertTime(Math.round(optionAudio.currentTime))}`
    document.querySelector('.option-song-duration-end').innerHTML = `-${convertTime(Math.round(optionAudio.duration))}` 
    document.querySelector('.option-song-progressbar-range').setAttribute('max', optionAudio.duration)
    document.querySelector('.option-song-progressbar-range').setAttribute('step', optionAudio.duration / Math.floor(optionAudio.duration))
    document.querySelector('.option-song-progressbar-progress').setAttribute('max', optionAudio.duration)
})
optionAudio.addEventListener('timeupdate', () => {
    if (!inputRangeHold) {
        document.querySelector('.option-song-progressbar-progress').value = optionAudio.currentTime
        document.querySelector('.option-song-progressbar-range').value = optionAudio.currentTime
    }
    if (!inputRangeHold && !isNaN(optionAudio.duration)) {
        document.querySelector('.option-song-duration-start').innerHTML = convertTime(Math.round(optionAudio.currentTime))
        document.querySelector('.option-song-duration-end').innerHTML = `-${convertTime(Math.round(optionAudio.duration) - Math.round(optionAudio.currentTime))}`
    }
})
optionAudio.addEventListener('ended', () => {
    pauseAudioBtnActive()
})
optionAudio.addEventListener('play', () => {
    playAudioBtnActive()
})
optionAudio.addEventListener('pause', () => {
    pauseAudioBtnActive()
})

export {onSongStartBtnClick, onSongStopBtnClick, setAudioSrc, onSongProgressbarInput, 
    onSongProgressbarMouseUpOrTouchEnd, onVolumeProgressbarInput, stopOptionAudio}