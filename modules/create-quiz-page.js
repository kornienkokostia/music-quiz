import * as questionAudioPlayer from "./question-audio-player.js"
import * as optionAudioPlayer from "./option-audio-player.js"
import playlist from "./songs-playlist.js"
import { stopBgAnimation } from "./bg-gradient.js"
import { showResultsPage } from "./results.js"

let currentRound = 0
let currentPlaylist = playlist[currentRound]

const shuffleArr = (arr) => arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

const rundomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

let questionNum = rundomNum(0, 5)
let shuffledPlaylist = shuffleArr(currentPlaylist).slice(0, 6)

let scoreCount = 5

let songGuesed = false

let lastClick = null

let currentVolume = document.querySelector('.library-volume-control-progressbar-progress').value

const wrongAnswerSound = new Audio('./assets/system-sound/wrong-sound.mp3')


const createQuizCurrentQuestionDiv = () => `<div class="quiz-current-question">
    <div class="question-song-cover song-cover active-song-cover">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.1 21.77" class="default-song-cover-img">
            <path class="default-song-cover-svg-path-fill" d="M17.1,.94v15.26c0,.56-.08,1.1-.33,1.61-.38,.78-1.01,1.28-1.84,1.52-.47,.13-.95,.21-1.43,.23-1.27,.06-2.37-.8-2.59-2.05-.19-1.03,.3-2.17,1.38-2.7,.43-.21,.9-.33,1.36-.42,.5-.11,1.01-.21,1.51-.33,.37-.08,.61-.3,.68-.69,.02-.08,.03-.17,.03-.25V5.86c0-.08-.02-.17-.04-.24-.05-.21-.2-.33-.41-.32s-.42,.05-.63,.09c-1.01,.2-2.03,.4-3.04,.61l-4.93,1s-.05,0-.07,0c-.37,.11-.5,.27-.51,.66-.01,.05,0,.11,0,.17-.01,3.47,0,6.94-.01,10.41,0,.56-.06,1.11-.28,1.63-.37,.85-1.03,1.39-1.92,1.65-.46,.13-.94,.21-1.43,.23-1.28,.04-2.34-.81-2.56-2.06-.19-1.08,.31-2.25,1.54-2.77,.47-.2,.97-.31,1.47-.41,.38-.08,.77-.16,1.15-.24,.51-.11,.78-.43,.8-.95V3.29c0-.17,.02-.34,.06-.5,.09-.38,.36-.6,.73-.69,.34-.08,.69-.15,1.03-.22,.98-.2,1.95-.4,2.93-.59l3.03-.61c.89-.18,1.78-.36,2.68-.54,.29-.06,.59-.12,.88-.14,.42-.04,.7,.22,.74,.64,.01,.1,.02,.2,.02,.3Z"/>
        </svg>
    </div>
    <div class="question-song-player">
        <div class="question-song-info song-info">
            <p class="question-song-title song-title">&#10033;&#10033;&#10033;&#10033;&#10033;&#10033;&#10033;&#10033;</p>
            <p class="question-song-artist song-artist">&#10033;&#10033;&#10033;&#10033;&#10033;</p>
        </div>
        <div class="question-song-controls song-controls">
            <button class="question-song-start-btn song-start-btn song-control-btn-active">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.31 20.48" class="question-song-btn-img song-btn-img">
                    <path class="player-btn-path-fill" d="M1.62,20.48c.5,0,.93-.19,1.46-.49l13.81-7.99c1.01-.6,1.42-1.04,1.42-1.77s-.41-1.17-1.42-1.75L3.08,.48c-.53-.31-.96-.48-1.46-.48C.67,0,0,.72,0,1.88V18.59c0,1.16,.67,1.89,1.62,1.89Z"/>
                </svg>
            </button>
            <button class="question-song-stop-btn song-stop-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.96 19.47" class="question-song-btn-img song-btn-img">
                    <path class="player-btn-path-fill" d="M1.67,19.47h2.75c1.1,0,1.67-.57,1.67-1.68V1.67C6.1,.54,5.52,0,4.42,0H1.67C.57,0,0,.57,0,1.67V17.78c0,1.11,.57,1.68,1.67,1.68Zm8.87,0h2.74c1.11,0,1.67-.57,1.67-1.68V1.67c0-1.13-.57-1.67-1.67-1.67h-2.74c-1.11,0-1.68,.57-1.68,1.67V17.78c0,1.11,.57,1.68,1.68,1.68Z"/>
                </svg>
            </button>
            <div class="question-song-duration-start song-duration-start song-duration"></div>
            <div class="question-song-controls-progress controls-progress">
                <input type="range" class="question-song-progressbar-range progressbar-range" name="player-progress-bar" min="0" max="" step="1">
                <progress class="question-song-progressbar-progress progressbar-progress" min="0" max="" value="0"></progress>
            </div>
            <div class="question-song-duration-end song-duration-end song-duration"></div>
        </div>
        <div class="volume-control">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.33 20.96" class="volume-min-img volume-img">
                <path class="volume-svg-path-fill" d="M12.82,20.96c.87,0,1.51-.64,1.51-1.5V1.56c0-.87-.64-1.56-1.53-1.56-.59,0-1.01,.24-1.66,.86L6.24,5.45c-.08,.07-.16,.1-.27,.1H2.65c-1.71,0-2.65,.96-2.65,2.77v4.35c0,1.82,.94,2.77,2.65,2.77h3.33c.11,0,.19,.03,.27,.09l4.9,4.64c.59,.56,1.08,.8,1.68,.8Z"/>
            </svg>
            <div class="volume-control-progress controls-progress">
                <input type="range" class="volume-control-progressbar-range progressbar-range" name="player-progress-bar" min="0" max="1" step="0.01">
                <progress class="volume-control-progressbar-progress progressbar-progress" min="0" max="1" value="1"></progress>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.75 23.35" class="volume-max-img volume-img">
                <path class="volume-svg-path-fill" d="M12.82,22.16c.87,0,1.51-.64,1.51-1.5V2.76c0-.87-.64-1.56-1.53-1.56-.6,0-1.02,.24-1.66,.86L6.23,6.65c-.07,.07-.16,.1-.27,.1H2.65c-1.72,0-2.65,.96-2.65,2.77v4.35c0,1.82,.93,2.77,2.65,2.77h3.32c.11,0,.2,.03,.27,.09l4.92,4.64c.58,.56,1.07,.8,1.67,.8Z"/>
                <path class="volume-svg-path-fill" d="M18.5,16.87c.48,.32,1.14,.21,1.49-.3,.94-1.26,1.5-3.05,1.5-4.9s-.56-3.63-1.5-4.9c-.36-.51-1.01-.63-1.49-.3-.57,.37-.67,1.06-.23,1.72,.65,.92,1.02,2.17,1.02,3.48s-.38,2.55-1.02,3.48c-.44,.66-.34,1.34,.23,1.72Z"/>
                <path class="volume-svg-path-fill" d="M23.19,20c.53,.34,1.18,.21,1.54-.33,1.53-2.16,2.41-5.04,2.41-8.01s-.88-5.87-2.41-8.01c-.36-.53-1.01-.66-1.54-.32-.55,.35-.63,1.03-.23,1.64,1.25,1.82,1.97,4.22,1.97,6.69s-.74,4.85-1.97,6.69c-.4,.61-.33,1.29,.23,1.64Z"/>
                <path class="volume-svg-path-fill" d="M27.9,23.17c.51,.34,1.19,.19,1.55-.37,2.07-3.08,3.3-6.92,3.3-11.13s-1.26-8.04-3.3-11.13c-.36-.57-1.05-.71-1.55-.37-.55,.36-.63,1.03-.25,1.64,1.8,2.73,2.91,6.11,2.91,9.86s-1.12,7.14-2.91,9.86c-.38,.6-.3,1.28,.25,1.64Z"/>
            </svg>
        </div>
    </div>
</div>`

const createQuizAnswerOptionTextDiv = () => {
    let res = ''
    for (let i = 0; i < 6; i++) {
        res += `<div class="quiz-answer-option">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.99 12.99" class="default-answer-img answer-img">
                    <circle class="default-answer-path-fill" cx="6.49" cy="6.49" r="6.12"/>
                </svg>
            <div class="answer-text-wrapper"><span class="answer-text">${shuffledPlaylist[i].title}</span></div>
        </div>`
    }
    return res
}
            
const createQuizAnswerOptionsDiv = () => `<div class="quiz-answer-options">
    <div class="quiz-answer-options-wrapper">
        ${createQuizAnswerOptionTextDiv()}
    </div>
</div>`

const createQuizOptionInfoWrapperDiv = (num) => `<div class="quiz-option-info-wrapper">
        <img src="${shuffledPlaylist[num].coverImg}" alt="song-cover" class="option-song-cover song-cover">
        <div class="option-song-player">
            <div class="option-song-info song-info">
                <p class="option-song-title song-title">${shuffledPlaylist[num].title}</p>
                <p class="option-song-artist song-artist">${shuffledPlaylist[num].artist}</p>
            </div>
            <div class="option-song-controls song-controls">
                <button class="option-song-start-btn song-start-btn song-control-btn-active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.31 20.48" class="option-song-btn-img song-btn-img">
                        <path class="player-btn-path-fill" d="M1.62,20.48c.5,0,.93-.19,1.46-.49l13.81-7.99c1.01-.6,1.42-1.04,1.42-1.77s-.41-1.17-1.42-1.75L3.08,.48c-.53-.31-.96-.48-1.46-.48C.67,0,0,.72,0,1.88V18.59c0,1.16,.67,1.89,1.62,1.89Z"/>
                    </svg>
                </button>
                <button class="option-song-stop-btn song-stop-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.96 19.47" class="option-song-btn-img song-btn-img">
                        <path class="player-btn-path-fill" d="M1.67,19.47h2.75c1.1,0,1.67-.57,1.67-1.68V1.67C6.1,.54,5.52,0,4.42,0H1.67C.57,0,0,.57,0,1.67V17.78c0,1.11,.57,1.68,1.67,1.68Zm8.87,0h2.74c1.11,0,1.67-.57,1.67-1.68V1.67c0-1.13-.57-1.67-1.67-1.67h-2.74c-1.11,0-1.68,.57-1.68,1.67V17.78c0,1.11,.57,1.68,1.68,1.68Z"/>
                    </svg>
                </button>
                <div class="option-song-duration-start song-duration-start song-duration"></div>
                <div class="option-song-controls-progress controls-progress">
                    <input type="range" class="option-song-progressbar-range progressbar-range" name="player-progress-bar" min="0" max="" step="1">
                    <progress class="option-song-progressbar-progress progressbar-progress"  min="0" max="" value="0"></progress>
                </div>
                <div class="option-song-duration-end song-duration-end song-duration"></div>
            </div>
        </div>
    </div>
    <div class="option-info-text-wrapper">
        <div class="option-info-text">${
            document.querySelector('.languages').value === 'en' ? shuffledPlaylist[num].descriptonEng : shuffledPlaylist[num].descriptonRu
        }</div>
    </div>
</div>`

const noOptionSelectedPhrase = () => document.querySelector('.languages').value === 'en' ? 'Make your guess' : 'Сделайте выбор'

const createQuizOptionsWrapperDiv = () => `<div class="quiz-options-wrapper">
    ${createQuizAnswerOptionsDiv()}                                       
    <div class="quiz-option-info"><span class="default-info-msg">${noOptionSelectedPhrase()}</span></div>                          
</div>`

const addEventListenersToOptions = () => {
    const answerBlocks = [...document.querySelectorAll('.quiz-answer-option')]
    answerBlocks.map((el, i) => {
        el.addEventListener('click', (e) => {
            
            if (e.target && i !== lastClick) {
                lastClick = i
                showQuizOptionInfo(i)
                if (i !== questionNum) {
                    if (!songGuesed && e.target.closest('.quiz-answer-option').children[0].classList[0] !== 'wrong-answer-img') {
                        wrongAnswerSound.play()
                    }
                    scoreCount -= 1
                    onWrongAnswerClick(e.target.closest('.quiz-answer-option'))
                } else {
                    onCorrectAnswerClick(e.target.closest('.quiz-answer-option'))
                    if (!songGuesed) {
                        const correctAnswerSound = new Audio('./assets/system-sound/correct-sound.mp3')
                        correctAnswerSound.play()
                    }
                    onWinShowInfo()
                    if (currentRound <= 4) {
                        document.querySelector('.next-question-btn').removeAttribute('disabled')
                    } else {
                        document.querySelector('.results-btn').removeAttribute('disabled')
                    }
                    
                    questionAudioPlayer.stopQuestionAudio()
                    if (!songGuesed) {
                        const correctScore = scoreCount < 0 ? 0 : scoreCount
                        document.querySelector('.score-text').innerHTML = Number(document.querySelector('.score-text').innerHTML) + correctScore
                    }
                    songGuesed = true
                }
            }
        } )
    })
}

const showQuizOptionInfo = (num) => {
    if (document.querySelector('.default-info-msg')) {
        document.querySelector('.quiz-option-info').innerHTML = createQuizOptionInfoWrapperDiv(num)
    } else {
        document.querySelector('.option-song-cover').src = shuffledPlaylist[num].coverImg
        document.querySelector('.option-song-title').innerHTML = shuffledPlaylist[num].title
        document.querySelector('.option-song-artist').innerHTML = shuffledPlaylist[num].artist
        document.querySelector('.option-info-text').innerHTML = document.querySelector('.languages').value === 'en' ? 
            shuffledPlaylist[num].descriptonEng : shuffledPlaylist[num].descriptonRu
    }
    // option song music player
    optionAudioPlayer.setAudioSrc(shuffledPlaylist[num].src)
    document.querySelector('.option-song-start-btn').addEventListener('click', optionAudioPlayer.onSongStartBtnClick)
    document.querySelector('.option-song-stop-btn').addEventListener('click', optionAudioPlayer.onSongStopBtnClick)
    document.querySelector('.option-song-progressbar-range').addEventListener('input', optionAudioPlayer.onSongProgressbarInput)
    document.querySelector('.option-song-progressbar-range').addEventListener('mouseup', optionAudioPlayer.onSongProgressbarMouseUpOrTouchEnd)
    document.querySelector('.option-song-progressbar-range').addEventListener('touchend', optionAudioPlayer.onSongProgressbarMouseUpOrTouchEnd)
}

const resultsPhrase = () => document.querySelector('.languages').value === 'en' ? 'Results' : 'Результаты'
const nextLevelPhrase = () => document.querySelector('.languages').value === 'en' ? 'Next level' : 'След. уровень'

const createNextQuestionBtn = () => `
    ${
        currentRound <= 4 ? `<button class="next-question-btn game-btn" disabled>${nextLevelPhrase()}</button>` : 
        `<button class="results-btn game-btn" disabled>${resultsPhrase()}</button>`
    }
`

const onWinShowInfo = () => {
    document.querySelector('.question-song-cover').style.backgroundImage = `url(${shuffledPlaylist[questionNum].coverImg})`
    document.querySelector('.default-song-cover-img').classList.add('default-cover-img-hidden')
    document.querySelector('.question-song-title').innerHTML = shuffledPlaylist[questionNum].title
    document.querySelector('.question-song-artist').innerHTML = shuffledPlaylist[questionNum].artist
    stopBgAnimation()
}

const onWrongAnswerClick = (div) => {
    if (!songGuesed) {
        div.removeChild([...div.children][0])
        const wrongAnswerImg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.21 24.21" class="wrong-answer-img answer-img">
            <path class="wrong-answer-path-fill" d="M12.1,0C5.48,0,0,5.47,0,12.1s5.48,12.11,12.1,12.11,12.11-5.48,12.11-12.11S18.73,0,12.1,0Zm4.63,13.27H7.5c-.74,0-1.25-.44-1.25-1.14s.49-1.16,1.25-1.16h9.23c.75,0,1.24,.44,1.24,1.16s-.51,1.14-1.24,1.14Z"/>
        </svg>`
        div.insertAdjacentHTML('afterbegin', wrongAnswerImg)
    }
}

const onCorrectAnswerClick = (div) => {
    div.removeChild([...div.children][0])
    const correctAnswerImg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.21 24.21" class="correct-answer-img answer-img">
        <path class="correcct-answer-path-fill" d="M12.1,0C5.48,0,0,5.47,0,12.1s5.48,12.11,12.1,12.11,12.11-5.48,12.11-12.11S18.73,0,12.1,0Zm4.94,9.59l-4.59,7.39c-.24,.37-.59,.57-1,.57s-.76-.18-1.05-.55l-2.63-3.26c-.2-.25-.29-.5-.29-.76,0-.6,.46-1.05,1.03-1.05,.37,0,.67,.16,.9,.47l1.99,2.55,3.93-6.52c.22-.37,.55-.58,.91-.58,.59,0,1.08,.42,1.08,.98,0,.28-.14,.55-.28,.76Z"/>
    </svg>`
    div.insertAdjacentHTML('afterbegin', correctAnswerImg)
}

const changeRoundItemStyle = (el) => {
    const allNavItems = [...document.querySelectorAll('.stages-menu-list-item')]
    allNavItems.map(el => el.classList.remove('stages-menu-list-item-active'))
    allNavItems[el].classList.add('stages-menu-list-item-active')
}

const resetGame = () => {
    songGuesed = false
    scoreCount = 5
    currentRound = 0
    currentPlaylist = playlist[currentRound]
    questionNum = rundomNum(0, 5)
    shuffledPlaylist = shuffleArr(currentPlaylist).slice(0, 6) 
    lastClick = null
    changeRoundItemStyle(0)
    createQuizPage()
}

const createQuizPage = () => {
    const quizPageDiv = document.createElement('div')
    quizPageDiv.className = 'quiz-page'
    quizPageDiv.innerHTML += createQuizCurrentQuestionDiv()
    quizPageDiv.innerHTML += createQuizOptionsWrapperDiv()
    quizPageDiv.innerHTML += createNextQuestionBtn()
    document.querySelector('.quiz-pages-wrapper').append(quizPageDiv)
    setTimeout(() => {addEventListenersToOptions()}, 1000);
    if (currentRound <= 4) {        
        [...document.querySelectorAll('.next-question-btn')].pop().addEventListener('click', () => {
            optionAudioPlayer.stopOptionAudio()
            questionAudioPlayer.stopQuestionAudio()
            stopBgAnimation()
            changeRoundItemStyle(currentRound+1)
            setTimeout(() => {window.scrollTo({ top: 44, behavior: 'smooth' });}, 1000)
            document.querySelector('.quiz-pages-wrapper').style.transform = 'translateX(calc(-50% - 15px))'
            setTimeout(() => {
                document.querySelector('.quiz-page').remove()
                document.querySelector('.quiz-pages-wrapper').style.transition = 'none'
                document.querySelector('.quiz-pages-wrapper').style.transform = `translateX(0)`
            }, 1000)
        
            document.querySelector('.quiz-pages-wrapper').style.transition = 'transform 1s cubic-bezier(0.645, 0.045, 0.355, 1)'

            songGuesed = false
            scoreCount = 5
            currentRound += 1
            currentPlaylist = playlist[currentRound]
            questionNum = rundomNum(0, 5)
            shuffledPlaylist = shuffleArr(currentPlaylist).slice(0, 6) 
            lastClick = null
            createQuizPage()
        })
    } else {
        document.querySelector('.results-btn').addEventListener('click', () => {
            stopBgAnimation()
            showResultsPage()
        })
    }
    
    if (currentRound === 0) {
        currentVolume = document.querySelector('.library-volume-control-progressbar-progress').value
        
    } else {
        currentVolume = document.querySelector('.volume-control-progressbar-progress').value
    }
    const arr = [...document.querySelectorAll('.volume-control-progressbar-progress')]
    arr.map(el => el.value = currentVolume)
    questionAudioPlayer.setVolume(currentVolume)
 
    // question song music player
    questionAudioPlayer.setAudioSrc(shuffledPlaylist[questionNum].src);
    [...document.querySelectorAll('.question-song-start-btn')].pop().addEventListener('click', questionAudioPlayer.onSongStartBtnClick);

    [...document.querySelectorAll('.question-song-stop-btn')].pop().addEventListener('click', questionAudioPlayer.onSongStopBtnClick);

    [...document.querySelectorAll('.question-song-progressbar-range')].pop().addEventListener('input', questionAudioPlayer.onSongProgressbarInput);

    [...document.querySelectorAll('.question-song-progressbar-range')].pop().addEventListener('mouseup', questionAudioPlayer.onSongProgressbarMouseUpOrTouchEnd);

    [...document.querySelectorAll('.question-song-progressbar-range')].pop().addEventListener('touchend', questionAudioPlayer.onSongProgressbarMouseUpOrTouchEnd);
        
    [...document.querySelectorAll('.volume-control-progressbar-range')].pop().addEventListener('input', () => {
        questionAudioPlayer.onVolumeProgressbarInput()
        optionAudioPlayer.onVolumeProgressbarInput()
    })
        
}

export {createQuizPage, resetGame, changeRoundItemStyle}