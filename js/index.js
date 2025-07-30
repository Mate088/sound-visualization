const columnsGap = 1;
const columnWidth = 3;

const canvas = document.getElementById("player-fireplace");
const ctx = canvas.getContext("2d");

const player = document.getElementById("audio-player");

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = audioCtx.createMediaElementSource(player);
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
source.connect(analyser);
analyser.connect(audioCtx.destination);

let frequencyData = new Uint8Array(analyser.frequencyBinCount);

window.onload = function () {
  document.getElementById("player-btn").addEventListener("click", function () {
    if (!this.classList.contains("play-btn__play")) {
      player.play();
      this.textContent = "Pause";
      this.classList.add("play-btn__play");
    } else {
      player.pause();
      this.textContent = "Play";
      this.classList.remove("play-btn__play");
    }
  });

  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  function drawColumn(x, width, height) {
    const centerY = canvas.height / 2;
    const gradient = ctx.createLinearGradient(0, centerY - height, 0, centerY);
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.85, "rgba(255, 150, 0, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.fillRect(x, centerY - height, width, height);
  }

  function drawDownColumn(x, width, height) {
    const centerY = canvas.height / 2;
    const gradient = ctx.createLinearGradient(0, centerY, 0, centerY + height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.15, "rgba(255, 150, 0, 1)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, centerY, width, height);
    ctx.globalCompositeOperation = 'source-over';
  }

  function render() {
    analyser.getByteFrequencyData(frequencyData);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalColumns = Math.floor(canvas.width / (columnWidth + columnsGap));
    const heightScale = canvas.height / 510;

    let xPos = 0;

    const centerColumn = Math.floor(totalColumns / 2);

    for (let i = 0; i < totalColumns; i++) {
      // Calculate distance from center
      const distanceFromCenter = Math.abs(i - centerColumn);

      // Map distance to frequency data (start from low bass, not DC)
      const frequencyIndex =
        centerColumn > 0
          ? Math.floor(
              1 +
                (distanceFromCenter / centerColumn) * (frequencyData.length - 1)
            )
          : 1;
      let columnHeight = frequencyData[frequencyIndex] * heightScale;

      if (isNaN(columnHeight)) columnHeight = 0;
      if (columnHeight > 0) {
        drawColumn(xPos, columnWidth, columnHeight);
        drawDownColumn(xPos, columnWidth, columnHeight);
      }

      xPos += columnWidth + columnsGap;
    }

    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
};

document.querySelector("button").addEventListener("click", function () {
  audioCtx.resume().then(() => {
    console.log("Playback resumed successfully");
  });
});
