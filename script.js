const playlist = [
  { id: 'rGAS66E9rMQ', title: 'Enchanted' },
  { id: 'pcHHyi9Wdts', title: 'Everything has changed' },
  { id: 'OuFnpmGwg5k', title: 'invisible string' },
  { id: 'x3Ipm2gI1bM', title: 'You Are In Love' },
  { id: 'tgVYh94QH8k', title: 'Lover' },
  { id: 'DzCGD9PO1Dg', title: 'MINE' }, 
  { id: 'HkAB1Gavw1Y', title: 'Daylight' },
  { id: 'LfJ_Rx9PTwg', title: 'Timeless' }
];

let currentIndex = 0;
let player;
let progressInterval;

const titleEl = document.getElementById('current-title');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const progressFill = document.getElementById('progress-fill');
const clockEl = document.getElementById('clock');

const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// On touch devices, using both click + touchend causes each press to run twice.
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (isTouchDevice) {
  playPauseBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    playPauseToggle();
  }, { passive: false });

  prevBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    prevTrack();
  }, { passive: false });

  nextBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    nextTrack();
  }, { passive: false });
} else {
  playPauseBtn.addEventListener('click', playPauseToggle);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
}

// Prevent default touch behaviors for better mobile experience
document.addEventListener('touchmove', function(e) {
  if (e.target.closest('.controls')) {
    e.preventDefault();
  }
}, { passive: false });

// Clock Logic
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  clockEl.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// Handle device orientation changes for responsive layout
window.addEventListener('orientationchange', function() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// YouTube API Injection
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  // Responsive player dimensions based on screen size
  const playerWidth = window.innerWidth > 480 ? '200' : '0';
  const playerHeight = window.innerWidth > 480 ? '200' : '0';
  
  player = new YT.Player('player', {
    height: playerHeight,
    width: playerWidth,
    videoId: playlist[currentIndex].id,
    host: 'https://www.youtube-nocookie.com', // Bypasses ad-blocker network restrictions
    playerVars: { 
      'controls': 0, 
      'disablekb': 1, 
      'rel': 0, 
      'playsinline': 1,
      'enablejsapi': 1,
      'origin': window.location.origin,
      'widget_referrer': window.location.origin 
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError // Catches copyright blocks
    }
  });
}

function onPlayerReady() {
  titleEl.textContent = playlist[currentIndex].title;
}

// The Diagnostic Tool: Alerts you if a record label blocks the video
function onPlayerError(event) {
  console.error("YouTube API Error Code:", event.data);
  if (event.data === 150 || event.data === 101) {
    alert("Error 150: The record label disabled external embedding for this specific video. You have to find a different YouTube ID for this song!");
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  }
  
  if (event.data === YT.PlayerState.PLAYING) {
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    progressInterval = setInterval(updateProgressBar, 1000);
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.UNSTARTED) {
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    clearInterval(progressInterval);
  }
}

function playPauseToggle() {
  if (!player || !player.getPlayerState) return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
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
  iconPlay.style.display = 'block';
  iconPause.style.display = 'none';
  
  if(player && player.loadVideoById) {
    player.loadVideoById(playlist[currentIndex].id);
  }
}

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

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}