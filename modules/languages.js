import playlist from "./songs-playlist.js"

const fullPlaylist = playlist.flat(1)

const englishLang = () => {
    document.querySelector('.start-page-item .nav-list-item-text').innerHTML = 'Start page'
    document.querySelector('.quiz-page-item .nav-list-item-text').innerHTML = 'Quiz'
    document.querySelector('.results-page-item .nav-list-item-text').innerHTML = 'Results'
    document.querySelector('.library-page-item .nav-list-item-text').innerHTML = 'Library'
    document.querySelector('.game-settings-title').innerHTML = 'Settings'
    document.querySelector('.language').innerHTML = 'Language'
    document.querySelector('.live-bg').innerHTML = 'Live wallpaper'
    document.querySelector('.stages-menu-list-item:nth-of-type(1)').innerHTML = 'Pop'
    document.querySelector('.stages-menu-list-item:nth-of-type(2)').innerHTML = 'Hip-Hop/Rap'
    document.querySelector('.stages-menu-list-item:nth-of-type(3)').innerHTML = 'Dance'
    document.querySelector('.stages-menu-list-item:nth-of-type(4)').innerHTML = 'Rock'
    document.querySelector('.stages-menu-list-item:nth-of-type(5)').innerHTML = 'Alternative'
    document.querySelector('.stages-menu-list-item:nth-of-type(6)').innerHTML = 'K-Pop'
    document.querySelector('.game-score').innerHTML = `Score:&nbsp;<span class="score-text">${document.querySelector('.score-text').innerHTML}</span>`
    document.querySelector('.start-page-rules-heading').innerHTML = 'The rules are pretty simple:'
    document.querySelector('.start-page-rule-item:nth-of-type(1) span').innerHTML = 'You will have 6 rounds.'
    document.querySelector('.start-page-rule-item:nth-of-type(2) span').innerHTML = `Each round you'll have to guess a song of different 
    genre after you listen to it.`
    document.querySelector('.start-page-rule-item:nth-of-type(3) span').innerHTML = `If the first guess is successful, you'll get 5 ponts. 
    After each try, you will get one less points.`
    document.querySelector('.start-game-btn span').innerHTML = 'Start'
    document.querySelector('.results-page-heading').innerHTML = 'Game over'
    document.querySelector('.results-score-text').innerHTML = `Your score is &nbsp;<span class="results-score">${document.querySelector('.results-score').innerHTML}</span>`
    document.querySelector('.play-again-btn span').innerHTML = 'Play again'
    document.querySelector('.library-btn span').innerHTML = 'Library'
    document.querySelector('.library-back-btn').innerHTML = 'Back'
    document.querySelector('.default-info-msg') ? document.querySelector('.default-info-msg').innerHTML = 'Make your guess' : false
    document.querySelector('.next-question-btn') ? document.querySelector('.next-question-btn').innerHTML = 'Next level' : false
    document.querySelector('.results-btn') ? document.querySelector('.results-btn').innerHTML = 'Results' : false
    if (document.querySelector('.option-info-text')) {
        fullPlaylist.map(el => {
            if (el.descriptonRu === document.querySelector('.option-info-text').innerHTML) {
                document.querySelector('.option-info-text').innerHTML = el.descriptonEng
            }
        })
    }
    if (document.querySelector('.library-song-description-wrapper')) {
        fullPlaylist.map(el => {
            if (el.descriptonRu === document.querySelector('.library-song-description-wrapper').innerHTML) {
                document.querySelector('.library-song-description-wrapper').innerHTML = el.descriptonEng
            }
        })
    }
    document.querySelector('.footer-legal-text-main').innerHTML = 'Copyright ?? 2022 <span class="footer-legal-text-title">Music Quiz</span> All rights reserved.'
}

const russianLang = () => {
    document.querySelector('.start-page-item .nav-list-item-text').innerHTML = '??????????'
    document.querySelector('.quiz-page-item .nav-list-item-text').innerHTML = '??????????????????'
    document.querySelector('.results-page-item .nav-list-item-text').innerHTML = '????????????????????'
    document.querySelector('.library-page-item .nav-list-item-text').innerHTML = '????????????????????'
    document.querySelector('.game-settings-title').innerHTML = '??????????????????'
    document.querySelector('.language').innerHTML = '????????'
    document.querySelector('.live-bg').innerHTML = '?????????? ????????'
    document.querySelector('.stages-menu-list-item:nth-of-type(1)').innerHTML = '??????'
    document.querySelector('.stages-menu-list-item:nth-of-type(2)').innerHTML = '??????-??????/??????'
    document.querySelector('.stages-menu-list-item:nth-of-type(3)').innerHTML = '????????????????????????'
    document.querySelector('.stages-menu-list-item:nth-of-type(4)').innerHTML = '??????'
    document.querySelector('.stages-menu-list-item:nth-of-type(5)').innerHTML = '????????????????????????????'
    document.querySelector('.stages-menu-list-item:nth-of-type(6)').innerHTML = 'K-Pop'
    document.querySelector('.game-score').innerHTML = `????????:&nbsp;<span class="score-text">${document.querySelector('.score-text').innerHTML}</span>`
    document.querySelector('.start-page-rules-heading').innerHTML = '?????????????? ???????? ???????????????? ??????????????:'
    document.querySelector('.start-page-rule-item:nth-of-type(1) span').innerHTML = '?? ?????? ?????????? 6 ??????????????.'
    document.querySelector('.start-page-rule-item:nth-of-type(2) span').innerHTML = `?? ???????????? ???????????? ???? ???????????? ???????????? ?????????????? ?????????? ?????????????? ??????????, 
    ?????????????? ?????????????????? ????.`
    document.querySelector('.start-page-rule-item:nth-of-type(3) span').innerHTML = `???????? ???? ?????????????? ?? ?????????????? ????????, ???? ?????????????????? 5 ??????????. 
    ???????????? ?????????????????? ?????????????? ?????????? ???????????????? ???????? ????????.`
    document.querySelector('.start-game-btn span').innerHTML = '????????????'
    document.querySelector('.results-page-heading').innerHTML = '???????? ????????????????'
    document.querySelector('.results-score-text').innerHTML = `???? ?????????????? &nbsp;<span class="results-score">${document.querySelector('.results-score').innerHTML}</span>&nbsp;??????????`
    document.querySelector('.play-again-btn span').innerHTML = '???????????? ??????'
    document.querySelector('.library-btn span').innerHTML = '????????????????????'
    document.querySelector('.library-back-btn').innerHTML = '??????????'
    document.querySelector('.default-info-msg') ? document.querySelector('.default-info-msg').innerHTML = '???????????????? ??????????' : false
    document.querySelector('.next-question-btn') ? document.querySelector('.next-question-btn').innerHTML = '????????. ??????????????' : false
    document.querySelector('.results-btn') ? document.querySelector('.results-btn').innerHTML = '????????????????????' : false
    if (document.querySelector('.option-info-text')) {
        fullPlaylist.map(el => {
            if (el.descriptonEng === document.querySelector('.option-info-text').innerHTML) {
                document.querySelector('.option-info-text').innerHTML = el.descriptonRu
            }
        })
    }
    if (document.querySelector('.library-song-description-wrapper')) {
        fullPlaylist.map(el => {
            if (el.descriptonEng === document.querySelector('.library-song-description-wrapper').innerHTML) {
                document.querySelector('.library-song-description-wrapper').innerHTML = el.descriptonRu
            }
        })
    }
    document.querySelector('.footer-legal-text-main').innerHTML = '?? 2022 <span class="footer-legal-text-title">Music Quiz</span> ?????? ?????????? ????????????????.'
}

const languageOnLoad = () => {
    if (localStorage.getItem('lang') === 'ru') {
        russianLang()
        document.querySelector('.languages').value = 'ru'
    } else {
        englishLang()
        document.querySelector('.languages').value = 'en'
    }
}

const onLanguageSettingChange = () => {
    const lang = document.querySelector('.languages').value
    localStorage.setItem('lang', lang)
    if (lang === 'ru') {russianLang()}
    if (lang === 'en') {englishLang()}
}

export {englishLang, russianLang, languageOnLoad, onLanguageSettingChange}