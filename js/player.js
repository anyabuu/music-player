import {calcTime} from "./utils.js";

export async function playSong(src, currentIndex, songs, meta, playNow) {

    const nextButton = document.querySelector('.btn-next');
    const prevButton = document.querySelector('.btn-prev');

    await playSongInner(src, meta);

    nextButton.addEventListener('click', async () => {
        const song = songs[currentIndex + 1];

       if(song) {
           await playSongInner(song.url, song)
       }
    })

    async function playSongInner(song, meta) {
        updateMetaInfo(meta);
        const timelineAll = document.querySelector('.timeline__all');
        const playButton = document.querySelector('.player__btn');
        const muteButton = document.querySelector('.sound__btn');
        const audio = document.querySelector('audio');
        audio.src = src;
        const timelineCurrent = document.querySelector('.timeline__current');
        const soundInput = document.querySelector('.sound__input');
        const rangeTimeline = document.querySelector('.range-timeline');
        const player = document.querySelector('.player');

        let playState = 'paused'; //флажок, изначально песня на паузе
        let muteState = 'full';
        let soundInputLastValue = soundInput.value;
        let ref = null;


        // function runWhenLoaded() { /* read duration etc, this = audio element */ }
        //
        // if (!audio.readyState) {
        //     audio.addEventListener("loadedmetadata", runWhenLoaded);
        // } else {
        //     runWhenLoaded.call(audio);
        //     timelineAll.innerText = calcTime(audio.duration);
        // }

        audio.addEventListener('progress', () => {
            const percentOfBuffer = audio.buffered.length === 0 ? 0 : audio.buffered.end(0) * 100 / audio.duration;

            player.style.setProperty('--buffered-width', `${percentOfBuffer}%`);
        });

        const whilePlaying = () => {
            const {currentTime, duration} = audio;
            const percentOfTrack = (currentTime * 100) / duration;
            timelineCurrent.innerText = calcTime(currentTime);
            rangeTimeline.value = percentOfTrack;
            player.style.setProperty('--seek-before-width', `${percentOfTrack}%`);

            ref = requestAnimationFrame(whilePlaying);
        }

        playButton.addEventListener('click', async() => {
            if (playState === 'paused') {
                await audio.play();
                requestAnimationFrame(whilePlaying);
                playButton.classList.add('player__btn--paused');

                playState = 'played';
            } else if (playState === 'played') {
                await audio.pause();
                cancelAnimationFrame(whilePlaying);
                playButton.classList.remove('player__btn--paused');

                playState = 'paused';
            }

        });

        soundInput.value = 100;

        soundInput.addEventListener('input', (event) => {
            const {value} = event.target;

            soundInputLastValue = value;
            audio.volume = value / 100;
            if(soundInput.value === '0') {
                muteState = 'full';
                toggleMuteButton();
            } else {
                muteState = 'muted';
                toggleMuteButton();
            }
        })

        muteButton.addEventListener('click', () => {
            if(muteState === 'full'){
                audio.volume = 0;
                soundInput.value = 0;
                toggleMuteButton();
            } else if(muteState === 'muted') {
                audio.volume = soundInputLastValue / 100;
                soundInput.value = soundInputLastValue === '0' ? '10' : soundInputLastValue;
                toggleMuteButton();
            }
        });

        function toggleMuteButton () {
            if(muteState === 'full') {
                muteState = 'muted';
                muteButton.classList.add('sound__btn--mute')
            } else if (muteState === 'muted') {
                muteState = 'full';
                muteButton.classList.remove('sound__btn--mute')
            }
        }

        rangeTimeline.addEventListener('input', (event) => {
            audio.currentTime = event.target.value * audio.duration / 100;
        })

        audio.load();
        audio.pause();
        if(playNow) {
            await audio.pause();
            playButton.click();
            playState = 'played';
        }

    }
    }


function updateMetaInfo(song) {
   document.querySelector('.meta__image').src = song.cover;
   document.querySelector('.meta__name').innerText = song.name;
   document.querySelector('.meta__artist').innerText = song.artist;
   document.querySelector('.meta__album').innerText = song.album;
   document.querySelector('.meta__year').innerText = song.year;
}
