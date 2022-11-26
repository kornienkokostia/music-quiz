import { onBgSettingChange, setBgForceOffOnLoad, startBgAnimation, stopBgAnimation } from "./bg-gradient.js"
import { createQuizPage } from "./create-quiz-page.js"
import { languageOnLoad, onLanguageSettingChange} from "./languages.js"
import { onSongStopBtnClick } from "./library-audio-player.js"
import { changeNavItemStyle, onMainMenuButtonClickRemove, onMainMenuButtonClickToggle, onQuizMenuButtonClickRemove, onQuizMenuButtonClickToggle } from "./navigation.js"

startBgAnimation()

document.querySelector('.start-game-btn').addEventListener('click', () => {
    changeNavItemStyle(1)
    document.querySelector('.main-sections').style.transform = 'translateX(-25%)'
    document.querySelector('.quiz-stages-menu').classList.add('active')
    setTimeout(() => {window.scrollTo({ top: 44, behavior: 'smooth' });}, 1000)
    document.querySelector('.quiz-pages-wrapper').innerHTML = ''
    createQuizPage()
    stopBgAnimation()
})

document.querySelector('.library-back-btn').addEventListener('click', () => {
    changeNavItemStyle(2)
    document.querySelector('.main-sections').style.transform = 'translateX(-50%)'
    setTimeout(() => {window.scrollTo({ top: 0, behavior: 'smooth' });}, 1000)
    onSongStopBtnClick()
})

document.querySelector('.menu-btn-block-wrapper').addEventListener('click', onMainMenuButtonClickToggle)

document.querySelector('.game-settings-btn-wrapper').addEventListener('click', () => {
    document.querySelector('.game-settings').classList.toggle('active')
})


window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        onMainMenuButtonClickRemove()
        onQuizMenuButtonClickRemove()
    }
})

window.addEventListener('scroll', () => {
    onQuizMenuButtonClickRemove()
    document.querySelector('.game-settings').classList.remove('active')
})

window.addEventListener('click', (e) => {
    if (e.target.closest('.quiz-stages-menu') !== document.querySelector('.quiz-stages-menu')) {
        onQuizMenuButtonClickRemove()
    }
    if (e.target.closest('.game-settings') !== document.querySelector('.game-settings') && 
    e.target.closest('.game-settings-btn-wrapper') !== document.querySelector('.game-settings-btn-wrapper')) {
        document.querySelector('.game-settings').classList.remove('active')
    }
})

document.querySelector('.quiz-stages-menu-btn-icon').addEventListener('click', onQuizMenuButtonClickToggle)

languageOnLoad()
document.querySelector('.languages').addEventListener('change', onLanguageSettingChange)

setBgForceOffOnLoad()
document.querySelector('.bg-checkbox').addEventListener('change', onBgSettingChange)





