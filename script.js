window.onload = () => {
    //getting HTML elements
    const drawing = document.getElementById('drawing');
    const gridColorBox = document.getElementById('gridColorBox');
    const lineColorBox = document.getElementById('lineColorBox');
    const drawColorBox = document.getElementById('drawColorBox');
    const defaultButton = document.getElementById('default');
    const enter = document.getElementById('enter');
    const nameBox = document.getElementById("nameBox");
    const saveButton = document.getElementById('save');
    const openText = document.getElementById('openText');
    const openButton = document.getElementById('openButton');
    const lengthText = document.getElementById('length');
    const pngExportButton = document.getElementById('pngExportButton');
    //creating canvas in which user will draw on and storing context in ctx
    const canvas = document.createElement('canvas');
    drawing.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    //setting the canvas size
    canvas.width = 500;
    canvas.height = 500;

    let currentSquares = []; //making a variable for the program to remember what squares are on the screen
    let lengthValue = 50; //making a variable that holds the width and height of the grid (i.e 3 x 3 or 50 x 50)

    setDefault(); //calling a function to set the default "Grid Color" and "Line Color"

    //PixelFormat variables
    let currentPF;

    class ExportImport {
        
    }

    pngExportButton.onclick = () => {
        const a = document.createElement('a');
        a.download = `${nameBox.value}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
    }

    saveButton.onclick = () => {
        currentPF = [];
        currentPF.push(currentSquares);
        currentPF.push(lineColorBox.value);
        currentPF.push(gridColorBox.value);

        localStorage.setItem(nameBox.value, JSON.stringify(currentPF));
    }

    openButton.onclick = () => {
        try {
            let currentPFArray = JSON.parse(localStorage.getItem(openText.value));
            ctx.fillStyle = currentPFArray[1];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            console.log(currentPFArray[1]);
            console.log(currentPFArray[2]);
            for (let x = 0; x < 50; x++) {
                for (let y = 0; y < 50; y++) {
                    drawSquare(x, y, 10, 1, currentPFArray[2]);
                }
            }
            for (const coord of currentPFArray[0]) {
                drawSquare(coord[0], coord[1], 10, 1, drawColorBox.value);
            }
        } catch (err) {
            console.log("Error1:", err.name)
        }  
    }

    //Customize grid color
    enter.addEventListener('mousedown', () => {
        currentPF = [];
        currentPF.push(currentSquares);
        currentPF.push(lineColorBox.value);
        currentPF.push(gridColorBox.value);
        //console.log(currentPF);

        lengthValue = lengthText.value;
        const size = Math.floor(canvas.width / lengthValue);
        makeBorder(lineColorBox.value, 1);
        ctx.fillStyle = lineColorBox.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < lengthValue; x++) {
            for (let y = 0; y < lengthValue; y++) {
                drawSquare(x, y, size, 1, gridColorBox.value);
            }
        }
        try {
            for (const coord of currentPF[0]) {
                drawSquare(coord[0], coord[1], size, 1, coord[2]);
            }
        } catch(err) {
            console.log("Error2:", err.name);
        }
    })

    function makeBorder(color, thickness) {
        canvas.style.borderTop = `${thickness}px solid ${color}`;
        canvas.style.borderLeft = `${thickness}px solid ${color}`;
    }

    function setDefault () {
        makeBorder("black", 1);
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


    //Function to check if a coordinate is in a list
    function coordInList(coord, list) {
        const arrayToFind = list.find((elem) => (elem[0] === coord[0] && elem[1] === coord[1]));
        const index = list.findIndex(element => element === arrayToFind);
        return index;
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



    /////////////////////////
    // DRAW EVENT LISTENER //
    /////////////////////////
    canvas.addEventListener('mousedown', () => {
        //Function to draw while mouse is moving
        function mouseMove (me) {
            const x = Math.floor(me.offsetX / (canvas.width / lengthValue));
            const y = Math.floor(me.offsetY / (canvas.width / lengthValue));
            drawSquare(x, y, canvas.width / lengthValue, 1, drawColorBox.value);
            if (coordInList([x, y], currentSquares) === -1) {
                currentSquares.push([x, y, drawColorBox.value]);
                //console.log([x, y] in currentSquares);
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



    //////////////////////////
    // ERASE EVENT LISTENER //
    //////////////////////////
    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        function mouseDownErase (me) {
            const x = Math.floor(me.offsetX / (canvas.width / lengthValue));
            const y = Math.floor(me.offsetY / (canvas.width / lengthValue));
            drawSquare(x, y, canvas.width / lengthValue, 1, gridColorBox.value);
            if (coordInList([x, y], currentSquares)) {
                const index = coordInList([x, y], currentSquares);
                if (index != -1) {
                    currentSquares.splice(index, 1);
                }
                //console.log([x, y] in currentSquares);
            }
        }
        function mouseUpErase () {
            window.removeEventListener('mousemove', mouseDownErase);
            window.removeEventListener('mouseup', mouseUpErase);
        }
        window.addEventListener('mousemove', mouseDownErase);
        window.addEventListener('mouseup', mouseUpErase);
    })
}