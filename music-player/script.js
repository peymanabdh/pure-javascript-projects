const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress_container = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const curent_time = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine1",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Electric Chill Machine2",
    artist: "Jacinto Design2",
  },
  {
    name: "jacinto-3",
    displayName: "Electric Chill Machine3",
    artist: "Jacinto Design3",
  },
  {
    name: "metric-1",
    displayName: "metric Chill Machine4",
    artist: "Jacinto Design4",
  },
];

let isPlaying = false;
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
//current song
let songIndex = 0;
loadSong(songs[songIndex]);
//next
function nextSong() {
  songIndex++;
  if (songs.length > songIndex) {
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[0]);
    songIndex = 0;
  }
}
//prev
function prevSong() {
  songIndex--;
  if (songIndex == -1) {
    loadSong(songs[songs.length - 1]);
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //audio time
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    if (durationSecond) {
      durationEl.textContent = `${durationMinutes}:${durationSecond}`; //delay to avoid NaN
    }
    //audio current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    curent_time.textContent = `${currentMinutes}:${currentSecond}`;
  }
}
function setprogressBar(e) {
  const { duration } = music;
  const width = this.clientWidth;
  const offset_x = e.offsetX;
  //   console.log((offset_x / width) * duration);

  music.currentTime = (offset_x / width) * duration;
}

//events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progress_container.addEventListener("click", setprogressBar);
