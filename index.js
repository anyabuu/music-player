import {calcTime} from "./js/utils.js";
import {playSong} from './js/player.js';

const songs = [
    {
        url: 'audio/CtrlAltDelete.mp3',
        cover: 'https://lh3.googleusercontent.com/6qPkFhjiVXQtyHCYv3q8fY2v9ZYK2mzgOssvAOyZqrp9tfx6wnRxpKmOnrG36syuRVdaKCNGV02uXbY=w60-h60-l90-rj',
        name: 'CtrlAltDelete',
        artist: 'Bones',
        album: 'UNRENDERED',
        year: '2017',
    },
    {
        url: 'audio/star_shopping.mp3',
        cover: 'https://lh3.googleusercontent.com/ngAFtvoQiPcj7bIts6WC9slvou7lzUYRyoGXHjfE0ZF8UIp9GCY1sgXPjQb_xo18asOFhqwb__bYRrTytQ=w60-h60-l90-rj',
        name: 'Star Shopping',
        artist: 'Lil Peep',
        album: 'Star shopping',
        year: '2017',
    },
    {
        url: 'audio/liverpool_street.mp3',
        cover: 'https://lh3.googleusercontent.com/19y8nbouGDVk9Sg2SMGPdXItwY0OLHsE59egweO4FlHjtHGrhxgri2XVoOl7Bp4L0ZA9QjLMV6HyYBTR=w60-h60-l90-rj',
        name: 'Liverpool Street In The Rain',
        artist: 'Mall Grab',
        album: 'How The Dogs Chill, Vol.1',
        year: '2018',
    },
    {
        url: 'audio/bones_xavier-wulf.mp3',
        cover: 'https://lh3.googleusercontent.com/JcFZ40cGvHICV748gpof7NO9nEuiG-imWQC45A1ozbL7q87ySLMKwuBsMyq7NiE53Qtk5w_KCAVH6RBFRA=w60-h60-l90-rj',
        name: 'Cemetery Blunts',
        artist: 'Xavier Wulf & Bones',
        album: 'Lame',
        year: '2013',
    },
    {
        url: 'audio/black_siemens.mp3',
        cover: 'https://lh3.googleusercontent.com/KftDgajIuHTMxe2fBa_mBfQEvlbRTb561i7klH3rVyztDMfow5pGAhcrr2P24w1GVKICuaKzC6CK3JWp4w=w60-h60-l90-rj',
        name: 'Black Siemens',
        artist: 'Pharaoh',
        album: 'Black Siemens',
        year: '2015',
    },
];

const list = document.querySelector('.list');
songs.forEach((song, index, songs) => {
    if(index === 0) {
        playSong(song.url, index, songs, song);
        song.isPlayed = true;
    }

    renderSong(song, index, songs);
});

function renderSong (song, index, songs) {
  const item = document.createElement('li');
  item.classList.add('list__item');
  song.item = item;

  item.addEventListener('click', async(event) => {
      await playSong(song.url, index, songs, song, true);
      clearPlayState();
      item.isPlayed = true;

      if(item.isPlayed) {
          item.classList.add('list__item--active');
      }
  });

  if(song.isPlayed) {
      item.classList.add('list__item--active');
  }
  const image = document.createElement('img');
  const text = document.createElement('p');
  image.src = song.cover;
  text.innerText = `${song.name} - ${song.artist}`;

  item.append(image, text);
  list.append(item);
}

function clearPlayState() {
    songs.forEach(song => {
        song.isPlayed = false;
        song?.item.classList.remove('list__item--active');
    })
}