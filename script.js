const startBtn = document.getElementById('startBtn');
const video = document.getElementById('myVideo');
const audio = document.getElementById('myAudio');

function rampVolume(duration = 3000, steps = 30) {
  const intervalTime = duration / steps;
  let step = 0;
  audio.volume = 0;

  const interval = setInterval(() => {
    step++;
    audio.volume = Math.min(step / steps, 1);
    if (step >= steps) clearInterval(interval);
  }, intervalTime);
}

function playMedia() {
  startBtn.style.display = 'none';
  video.style.display = 'block';

  video.play().catch(() => {}); // Play muted video (usually allowed)
  
  audio.volume = 0;
  audio.play()
    .then(() => {
      rampVolume();
      localStorage.setItem('autoVolumePermission', 'granted');
    })
    .catch((err) => {
      console.warn('Audio playback failed:', err);
      alert('Audio playback was blocked by the browser. Please click Start again.');
      // Optionally, show the button again for retry
      startBtn.style.display = 'inline-block';
    });
}

startBtn.addEventListener('click', playMedia);

window.addEventListener('load', () => {
  if(localStorage.getItem('autoVolumePermission') === 'granted') {
    startBtn.style.display = 'none';
    video.style.display = 'block';

    video.play().catch(() => {});

    audio.volume = 0;
    audio.play()
      .then(() => rampVolume())
      .catch(err => {
        console.warn('Audio playback on load failed:', err);
        // Show start button again if autoplay fails
        startBtn.style.display = 'inline-block';
      });
  }
});
