window.onload = () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawSquare(x, y, size, space, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size - space, size - space);
    }

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            drawSquare(x, y, 30, 1, "black");
        }
    }
}