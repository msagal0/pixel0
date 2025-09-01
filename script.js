window.onload = () => {
    //Setting up
    const inside = document.getElementById('inside');
    const canvas = document.createElement('canvas');
    const gridColorBox = document.getElementById('gridColorBox');
    const gridColorEnter = document.getElementById('gridColorEnter');
    inside.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Customize grid color
    gridColorEnter.addEventListener('mousedown', () => {
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                drawSquare(x, y, 10, 1, gridColorBox.value);
            } 
        }
    })

    //Function to draw squares
    function drawSquare(x, y, size, space, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size - space, size - space);
    }

    //Drawing the grid
    for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
            drawSquare(x, y, 10, 1, "black");
        } 
    }
    //mousedown event listener on the canvas to draw
    canvas.addEventListener('mousedown', (de) => {
        //Function to draw while mouse is moving
        function mouseMove (me) {
            let x = Math.floor(me.offsetX / 10);
            let y = Math.floor(me.offsetY / 10);
            drawSquare(x, y, 10, 1, "green");
        }
        //Function to stop drawing
        function mouseUp () {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        }
        //Adding listeners on for mouseup and mousemove
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    }) 
}