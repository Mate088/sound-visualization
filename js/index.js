const canvas = document.getElementById('player-fireplace')
const ctx = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

function drawColumn(x, width, height) {
    const gradient = ctx.createLinearGradient(0, canvas.height - height / 2, 0, canvas.height);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.9, 'rgba(255, 150, 0, 1)');
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height - height / 2, width, height);
}

drawColumn(0, 100, 600);

drawColumn(400, 10, 30);