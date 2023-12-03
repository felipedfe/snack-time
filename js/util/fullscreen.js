function addFullscreen() {

  const element = document.documentElement;

  function requestFullscreen() {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari, iOS */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari, iOS */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  const fullscreenButton = document.getElementById('fullscreen-button');
  console.log(fullscreenButton)

  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      requestFullscreen();
    } else {
      exitFullscreen();
    }
    console.log("click");
  });
}