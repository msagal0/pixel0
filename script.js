window.onload = () => {
    //Setting up
    const inside = document.getElementById('inside');
    const canvas = document.createElement('canvas');
    const gridColorBox = document.getElementById('gridColorBox');
    const lineColorBox = document.getElementById('lineColorBox');
    const drawColorBox = document.getElementById('drawColorBox');
    const defaultButton = document.getElementById('default');
    const enter = document.getElementById('enter');
    const nameBox = document.getElementById("nameBox");
    const saveButton = document.getElementById('save');
    const openText = document.getElementById('openText');
    const openButton = document.getElementById('openButton');
    inside.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    setDefault();
    let currentSquares = [];
    let everything = [];

    saveButton.onclick = () => {
        everything = [];
        everything.push(currentSquares);
        everything.push(lineColorBox.value);
        everything.push(gridColorBox.value);

        localStorage.setItem(nameBox.value, JSON.stringify(everything));
    }

    openButton.onclick = () => {
        try {
            let everythingArray = JSON.parse(localStorage.getItem(openText.value));
            ctx.fillStyle = everythingArray[1];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            console.log(everythingArray[1]);
            console.log(everythingArray[2]);
            for (let x = 0; x < 50; x++) {
                for (let y = 0; y < 50; y++) {
                    drawSquare(x, y, 10, 1, everythingArray[2]);
                }
            }
            for (const coord of everythingArray[0]) {
                drawSquare(coord[0], coord[1], 10, 1, drawColorBox.value);
            }
        } catch (err) {
            console.log("Error:", err.name)
        }  
    }

    //Customize grid color
    enter.addEventListener('mousedown', () => {
        ctx.fillStyle = lineColorBox.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                drawSquare(x, y, 10, 1, gridColorBox.value);
            }
        }
    })

    function setDefault () {
        ctx.fillStyle = "#000000";
        lineColorBox.value = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                drawSquare(x, y, 10, 1, "#FFFFFF");
            }
        }
        gridColorBox.value = "#FFFFFF"
    }

    //Default event listener
    defaultButton.addEventListener('mousedown', setDefault);

    function coordInList(coord, list) {
        return list.find((elem) => (elem[0] === coord[0] && elem[1] === coord[1]));
    }

    //Function to draw squares
    function drawSquare(x, y, size, space, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * size, y * size, size - space, size - space);
    }

    //Drawing the lines
    ctx.fillStyle = lineColorBox.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Drawing the grid
    for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
            drawSquare(x, y, 10, 1, gridColorBox.value);
        }
    }
    //mousedown event listener on the canvas to draw
    canvas.addEventListener('mousedown', () => {
        //Function to draw while mouse is moving
        function mouseMove (me) {
            let x = Math.floor(me.offsetX / 10);
            let y = Math.floor(me.offsetY / 10);
            drawSquare(x, y, 10, 1, drawColorBox.value);
            if (!(coordInList([x, y], currentSquares))) {
                currentSquares.push([x, y]);
                console.log([x, y] in currentSquares);
            }
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