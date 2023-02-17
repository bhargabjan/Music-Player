function changeColor(color) {
  document.body.style.background = color;
}

// **********Function to the music system********

const track_name = document.querySelector(".name");
const now_playing = document.querySelector(".now-playing");
const track_art = document.querySelector(".track-art");
const track_artist = document.querySelector(".artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next-track");
const prev_btn = document.querySelector(".prev-track");

const music_seek_bar = document.querySelector(".music-seek-bar");
const volume_seek_bar = document.querySelector(".volume-seek-bar");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".duration");
// **********Function to the music system********

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement("audio");

function random_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = songs[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + songs[track_index].image + ")";
  // track_art.style.display = "none";
  track_name.textContent = songs[track_index].name;
  track_artist.textContent = songs[track_index].artist;

  now_playing.textContent =
    "Playing " + (track_index + 1) + " Of " + songs.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_color();
}

const seekUpdate = () => {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    music_seek_bar.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
};

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  music_seek_bar.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < songs.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (music_seek_bar.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_seek_bar.value / 100;
}

(function () {
  loadTrack(track_index);
})();
