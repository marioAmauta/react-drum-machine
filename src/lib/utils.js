export function playSound({ id }) {
  const audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.play();
}

export function setVolume({ volume }) {
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => (audio.volume = volume / 100));
}
