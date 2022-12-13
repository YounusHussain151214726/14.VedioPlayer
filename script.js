const vedio = document.getElementById("video");
const vedioPlay = document.getElementById("play");
const fullScreen = document.getElementById("fullScreen");
const curr = document.getElementById("curr");
const dura = document.getElementById("dura");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const speedSelect = document.getElementById("speedSelect");
const volumeR = document.getElementById("volumeR");
const controlSec = document.getElementById("controlSec");

//vedio is play ?
let isPlay = false;
//vedio is inFullSc ?
let isFullSc = false;

function Play() {
  isPlay = true;
  vedio.play();
  vedioPlay.classList.replace("fa-play", "fa-pause");
}
function Pause() {
  isPlay = false;
  vedio.pause();
  vedioPlay.classList.replace("fa-pause", "fa-play");
}

function normalScreen() {
  isFullSc = false;
  vedio.width = "520";
  vedio.height = "440";
  controlSec.classList.replace("largeScreen", "operate");
}

function forFullScreen() {
  isFullSc = true;
  vedio.width = window.outerWidth;
  vedio.height = window.outerHeight;

  // largeScreen

  controlSec.classList.replace("operate", "largeScreen");
}

function timeInfo(e) {
  if (isPlay) {
    console.log(e);

    let { duration, currentTime } = e.srcElement;

    //progressBar

    const progressTime = (currentTime / duration) * 100;
    progress.style.width = `${progressTime}%`;

    console.log(progressTime);

    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    // console.log(durationMinutes , durationSeconds)

    if (durationMinutes < 10) {
      dura.textContent = `0${durationMinutes} : ${durationSeconds}`;
    }

    //currentTime

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);

    // console.log(currentMinutes , currentSeconds)

    if (currentMinutes < 10 && currentSeconds < 10) {
      curr.textContent = `0${currentMinutes} : 0${currentSeconds}`;
    } else {
      curr.textContent = `${currentMinutes} : ${currentSeconds}`;
    }
  }
}

//Volume set Function
function VolumeFun(e) {
  //  console.log()
  let volume = e.offsetX / volumeR.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }

  volumeR.style.width = `${volume}`;
  vedio.volume = volume;
}

//speed rate
function speedRate() {
  vedio.playbackRate = speedSelect.value;

  console.log(vedio.defaultPlaybackRate);

  console.log(speedSelect.value);
}

function progressCont(e) {
  let width = this.clientWidth;
  let currentLocation = e.offsetX;
  const { duration } = vedio;

  vedio.currentTime = (currentLocation / width) * duration;
}

//progressContainer

progressContainer.addEventListener("click", progressCont);

//timeUpdate

vedio.addEventListener("timeupdate", timeInfo);

//speed rate

speedSelect.addEventListener("change", speedRate);

//ended
vedio.addEventListener("ended", () => {
  vedioPlay.classList.replace("fa-pause", "fa-play");
});

//fullScreen
fullScreen.addEventListener("click", () => {
  const isFull = isFullSc ? normalScreen() : forFullScreen();
});

//onButtonClick
vedioPlay.addEventListener("click", () => {
  const isPlays = isPlay ? Pause() : Play();
});

//on vedio Click
vedio.addEventListener("click", () => {
  const isPlays = isPlay ? Pause() : Play();
  console.log(isPlay);
});

volumeR.addEventListener("click", VolumeFun);
