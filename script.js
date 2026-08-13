// Add unofficial Lyric Video IDs here to prevent embedding errors
const playlist = [
  { id: 'ic8j13piAhQ', title: 'Cruel Summer' }, 
  { id: 'e-ORhEE9VVg', title: 'Blank Space' },
  { id: '-BjZmE2gtdo', title: 'Lover' }
];

let currentIndex = 0;
let player;
let progressInterval;

// DOM Elements
const titleEl = document.getElementById('current-title');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const progressFill = document.getElementById('progress-fill');

// Event Listeners for UI
document.getElementById('playPauseBtn').addEventListener('click', playPauseToggle);
document.getElementById('prevBtn').addEventListener('click', prevTrack);
document.getElementById('nextBtn').addEventListener('click', nextTrack);

// Inject YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '200',
    width: '200',
    videoId: playlist[currentIndex].id,
    playerVars: { 
      controls: 0, 
      disablekb: 1, 
      rel: 0, 
      playsinline: 1 
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady() {
  titleEl.textContent = playlist[currentIndex].title;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  }
  
  if (event.data === YT.PlayerState.PLAYING) {
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    progressInterval = setInterval(updateProgressBar, 1000);
  } else {
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    clearInterval(progressInterval);
  }
}

// Media Controls Logic
function playPauseToggle() {
  if (!player) return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadNewTrack();
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadNewTrack();
}

function loadNewTrack() {
  titleEl.textContent = playlist[currentIndex].title;
  progressFill.style.width = '0%';
  timeCurrent.textContent = '0:00';
  if(player) {
    player.loadVideoById(playlist[currentIndex].id);
  }
}

// Progress Bar Math
function updateProgressBar() {
  if (player && player.getDuration) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (duration > 0) {
      const progressPercent = (currentTime / duration) * 100;
      progressFill.style.width = progressPercent + '%';
      timeCurrent.textContent = formatTime(currentTime);
      timeTotal.textContent = formatTime(duration);
    }
  }
}

// Time Formatting
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}