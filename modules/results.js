import { stopBgAnimation } from "./bg-gradient.js"
import { resetGame } from "./create-quiz-page.js"
import { addSongsToLibrary } from "./library.js"
import { changeNavItemStyle } from "./navigation.js"
import * as questionAudioPlayer from "./question-audio-player.js"
import * as optionAudioPlayer from "./option-audio-player.js"

const showResultsPage = () => {
    changeNavItemStyle(2)
    document.querySelector('.main-sections').style.transform = 'translateX(-50%)'
    document.querySelector('.quiz-stages-menu').classList.remove('active')
    setTimeout(() => {window.scrollTo({ top: 0, behavior: 'smooth' });}, 1000)
    document.querySelector('.results-score').innerHTML = document.querySelector('.score-text').innerHTML
    optionAudioPlayer.stopOptionAudio()
    questionAudioPlayer.stopQuestionAudio()
    document.querySelector('.play-again-btn').addEventListener('click', () => {
        document.querySelector('.score-text').innerHTML = 0
        changeNavItemStyle(1)
        document.querySelector('.main-sections').style.transform = 'translateX(-25%)'
        document.querySelector('.quiz-stages-menu').classList.add('active')
        setTimeout(() => {window.scrollTo({ top: 44, behavior: 'smooth' });}, 1000)
        document.querySelector('.quiz-pages-wrapper').innerHTML = ''
        resetGame()
        stopBgAnimation()
    })
    document.querySelector('.library-btn').addEventListener('click', () => {
        changeNavItemStyle(3)
        document.querySelector('.main-sections').style.transform = 'translateX(-75%)'
        setTimeout(() => {window.scrollTo({ top: 0, behavior: 'smooth' });}, 1000)
        if (document.querySelector('.library-songs-list-wrapper').textContent.trim() === '') {
            addSongsToLibrary()
        }
    })
}

export {showResultsPage}