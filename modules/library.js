import * as libraryAudioPlayer from "./library-audio-player.js";
import playlist from "./songs-playlist.js";

const allSongs = playlist.flat(1)
const sortedAllSongs = allSongs.sort((a, b) => a.title.localeCompare(b.title))

const createSongBlock = (el) => `
<img src="${el.coverImg}" alt="library-song-cover" class="library-song-cover song-cover">
<div class="library-song-info">
    <p class="library-song-title song-title">${el.title}</p>
    <p class="library-song-artist song-artist">${el.artist}</p>
</div>`

const addSongsToLibrary = () => {
    setTimeout(() => {
        sortedAllSongs.map(el => {
            const divBlock = document.createElement('div')
            divBlock.className = 'library-song'
            divBlock.innerHTML = createSongBlock(el)
            document.querySelector('.library-songs-list-wrapper').append(divBlock)
            divBlock.addEventListener('click', () => {
                libraryAudioPlayer.setAudioSrc(el.src)
                document.querySelector('.library-song-player-cover').src = el.coverImg
                document.querySelector('.library-song-player-title').innerHTML = el.title
                document.querySelector('.library-song-player-artist').innerHTML = el.artist
                document.querySelector('.library-song-description-wrapper').innerHTML = 
                    document.querySelector('.languages').value === 'en' ? el.descriptonEng : el.descriptonRu
                libraryAudioPlayer.onSongStartBtnClick()
            })
        })
    }, 1000)

    libraryAudioPlayer.setAudioSrc(sortedAllSongs[0].src)
    document.querySelector('.library-song-player-cover').src = sortedAllSongs[0].coverImg
    document.querySelector('.library-song-player-title').innerHTML = sortedAllSongs[0].title
    document.querySelector('.library-song-player-artist').innerHTML = sortedAllSongs[0].artist
    document.querySelector('.library-song-description-wrapper').innerHTML = 
        document.querySelector('.languages').value === 'en' ? sortedAllSongs[0].descriptonEng :
        sortedAllSongs[0].descriptonRu

    libraryAudioPlayer.setAudioVolume(document.querySelector('.volume-control-progressbar-progress').value)

    // library song music player
    document.querySelector('.library-song-start-btn').addEventListener('click', libraryAudioPlayer.onSongStartBtnClick)
    document.querySelector('.library-song-stop-btn').addEventListener('click', libraryAudioPlayer.onSongStopBtnClick)
    document.querySelector('.library-song-progressbar-range').addEventListener('input', libraryAudioPlayer.onSongProgressbarInput)
    document.querySelector('.library-song-progressbar-range').addEventListener('mouseup', libraryAudioPlayer.onSongProgressbarMouseUpOrTouchEnd)
    document.querySelector('.library-song-progressbar-range').addEventListener('touchend', libraryAudioPlayer.onSongProgressbarMouseUpOrTouchEnd)
    document.querySelector('.library-volume-control-progressbar-range').addEventListener('input', libraryAudioPlayer.onVolumeProgressbarInput)    
}

export {addSongsToLibrary}