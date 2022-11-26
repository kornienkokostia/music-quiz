import { startBgAnimation, stopBgAnimation } from "./bg-gradient.js"
import { convertTime } from "./question-audio-player.js"

const playAudioBtnActive = () => {
    document.querySelector('.library-song-start-btn').classList.remove('song-control-btn-active')
    document.querySelector('.library-song-stop-btn').classList.add('song-control-btn-active')
}

const pauseAudioBtnActive = () => {
    document.querySelector('.library-song-start-btn').classList.add('song-control-btn-active')
    document.querySelector('.library-song-stop-btn').classList.remove('song-control-btn-active')
}

const onSongStartBtnClick = () => {
    playAudioBtnActive()
    if (document.querySelector('.main-bg').getAttribute('active') === 'false') {
        startBgAnimation()
    }
    libraryAudio.play()
}

const onSongStopBtnClick = () => {
    pauseAudioBtnActive()
    if (document.querySelector('.main-bg').getAttribute('active') === 'true') {
        stopBgAnimation()
    }
    libraryAudio.pause()
}

const setAudioSrc = (audioSource) => {
    libraryAudio.src = audioSource
}

const onSongProgressbarInput = () => {
    inputRangeHold = true
    document.querySelector('.library-song-progressbar-progress').value = document.querySelector('.library-song-progressbar-range').value   
    document.querySelector('.library-song-duration-start').innerHTML = convertTime(Math.round(document.querySelector('.library-song-progressbar-range').value))
    document.querySelector('.library-song-duration-end').innerHTML = `-${convertTime(Math.round(libraryAudio.duration) - Math.round(document.querySelector('.library-song-progressbar-range').value))}`
}

const onSongProgressbarMouseUpOrTouchEnd = () => {
    inputRangeHold = false
    libraryAudio.currentTime = document.querySelector('.library-song-progressbar-progress').value
}

const onVolumeProgressbarInput = () => {
    document.querySelector('.library-volume-control-progressbar-progress').value = document.querySelector('.library-volume-control-progressbar-range').value
    libraryAudio.volume = document.querySelector('.library-volume-control-progressbar-progress').value  
}

const setAudioVolume = (value) => {
    libraryAudio.volume = value
    document.querySelector('.library-volume-control-progressbar-range').value = value
    document.querySelector('.library-volume-control-progressbar-progress').value = value
}

let inputRangeHold = false
const libraryAudio = new Audio()

libraryAudio.addEventListener('loadedmetadata', () => {
    document.querySelector('.library-song-duration-start').innerHTML = `${convertTime(Math.round(libraryAudio.currentTime))}`
    document.querySelector('.library-song-duration-end').innerHTML = `-${convertTime(Math.round(libraryAudio.duration))}` 
    document.querySelector('.library-song-progressbar-range').setAttribute('max', libraryAudio.duration)
    document.querySelector('.library-song-progressbar-range').setAttribute('step', libraryAudio.duration / Math.floor(libraryAudio.duration))
    document.querySelector('.library-song-progressbar-progress').setAttribute('max', libraryAudio.duration)
})
libraryAudio.addEventListener('timeupdate', () => {
    if (!inputRangeHold) {
        document.querySelector('.library-song-progressbar-progress').value = libraryAudio.currentTime
        document.querySelector('.library-song-progressbar-range').value = libraryAudio.currentTime
    }
    if (!inputRangeHold && !isNaN(libraryAudio.duration)) {
        document.querySelector('.library-song-duration-start').innerHTML = convertTime(Math.round(libraryAudio.currentTime))
        document.querySelector('.library-song-duration-end').innerHTML = `-${convertTime(Math.round(libraryAudio.duration) - Math.round(libraryAudio.currentTime))}`
    }
})
libraryAudio.addEventListener('ended', () => {
    pauseAudioBtnActive()
})
libraryAudio.addEventListener('play', () => {
    playAudioBtnActive()
})
libraryAudio.addEventListener('pause', () => {
    pauseAudioBtnActive()
})

export {onSongStartBtnClick, onSongStopBtnClick, setAudioSrc, onSongProgressbarInput, 
    onSongProgressbarMouseUpOrTouchEnd, onVolumeProgressbarInput, setAudioVolume}