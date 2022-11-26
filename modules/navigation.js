const changeNavItemStyle = (el) => {
    const allNavItems = [...document.querySelectorAll('.nav-list-item-text')]
    allNavItems.map(el => el.classList.remove('nav-list-item-active'))
    allNavItems[el].classList.add('nav-list-item-active')
}

const onMainMenuButtonClickToggle = () => {
    document.querySelector('.menu-btn-block-wrapper').classList.toggle('mobile-menu-open')
    document.querySelector('.header-mobile-bg').classList.toggle('mobile-bg-active')
    document.body.classList.toggle('body-fixed')
    document.querySelector('.game-settings-btn').classList.toggle('game-settings-btn-hidden')
    document.querySelector('.nav-list').classList.toggle('nav-list-mobile-visible')
}
const onMainMenuButtonClickRemove = () => {
    document.querySelector('.menu-btn-block-wrapper').classList.remove('mobile-menu-open')
    document.querySelector('.header-mobile-bg').classList.remove('mobile-bg-active')
    document.body.classList.remove('body-fixed')
    document.querySelector('.game-settings-btn').classList.remove('game-settings-btn-hidden')
    document.querySelector('.nav-list').classList.remove('nav-list-mobile-visible')
}
const onQuizMenuButtonClickToggle = () => {
    document.querySelector('.quiz-stages-menu-btn-icon').classList.toggle('quiz-stages-menu-btn-active')
    document.querySelector('.quiz-stages-menu').classList.toggle('stages-menu-mobile-open')
}
const onQuizMenuButtonClickRemove = () => {
    document.querySelector('.quiz-stages-menu-btn-icon').classList.remove('quiz-stages-menu-btn-active')
    document.querySelector('.quiz-stages-menu').classList.remove('stages-menu-mobile-open')
}

export {changeNavItemStyle, onMainMenuButtonClickRemove, onQuizMenuButtonClickRemove, onMainMenuButtonClickToggle,
onQuizMenuButtonClickToggle}