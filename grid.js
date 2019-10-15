/*
* This is where most of the logic takes place, like calculating
* of all the necessary variables for the layout and generating
* the DOM from those and finally adding two event handlers.
*/
function setItUp(squaresOnSide, gridGap, minSquareLength) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let gridSideLength;
    let counterArray = new Array(squaresOnSide * squaresOnSide).fill(10);
    let maxSquares;
    let buttonDimensions;


    let divHTML = "";
    let styleHTML = "";

    let style = document.createElement("style");
    style.type = "text/css";

    if (width > height) {
        gridSideLength = Math.floor(height * 0.8);
    } else {
        gridSideLength = Math.floor(width * 0.8);
    }

    buttonDimensions = gridSideLength / 16;
    gridSideLength = gridSideLength - (gridSideLength - (squaresOnSide - 1) * gridGap) % squaresOnSide;
    squareSideLength = (gridSideLength - (squaresOnSide - 1) * gridGap) / squaresOnSide;
    styleHTML += "#container {display: grid; justify-items: center; align-items: center; width: " + width + "px; height: " + height + "px;} #grid-square { width: " + gridSideLength + "px; height: " + gridSideLength + "px; display: grid; grid-gap: " + gridGap + "px; grid-template-columns: repeat(" + squaresOnSide + ", auto); grid-template-rows: repeat(" + squaresOnSide + ", auto);} a {font-size: " + buttonDimensions + "px; padding: " + (buttonDimensions / 2) + "px " + buttonDimensions + "px;}";

    for (let i = 0; i < squaresOnSide; i++) {
        for (let j = 0; j < squaresOnSide; j++) {
            divHTML += "<div id='square-" + ((i * squaresOnSide) + (j + 1)) + "' class='square'></div>";
            styleHTML += "#square-" + ((i * squaresOnSide) + (j + 1)) + " {width: 100%; height: 100%; grid-row: " + (i + 1) + " / " + (i + 2) + "; grid-column: " + (j + 1) + " / " + (j + 2) + ";background-color: black;}";
        }
    }

    style.innerHTML = "";
    style.innerHTML += styleHTML;
    document.getElementsByTagName("head")[0].appendChild(style);
    document.querySelector("#container").innerHTML = "";
    document.querySelector("#container").innerHTML += "<div><a href='#' id='reset-button'><span></span><span></span><span></span><span></span>Reset</a></div><div id='grid-square'>" + divHTML + "</div>";

    $("#reset-button").click(function () {
        maxSquares = getMaxSquares(minSquareLength, gridGap);
        setItUp(askUser(maxSquares), gridGap, minSquareLength);
    });

    $(".square").mouseenter(function () {
        let rgbString = $(this).css("background-color");

        if (rgbString !== "rgb(0, 0, 0)") {
            let idString = $(this).attr("id");
            let index = idString.substr(idString.indexOf("-") + 1);

            rgbString = rgbString.match(/\d+/g);

            if (counterArray[index - 1] === 1) {
                rgbString[0] = 0;
                rgbString[1] = 0;
                rgbString[2] = 0;
            } else {
                rgbString[0] = Math.round(rgbString[0] - rgbString[0] / counterArray[index - 1]);
                rgbString[1] = Math.round(rgbString[1] - rgbString[1] / counterArray[index - 1]);
                rgbString[2] = Math.round(rgbString[2] - rgbString[2] / counterArray[index - 1]);
            }
            counterArray[index - 1]--;

            $(this).css("background-color", "rgb(" + rgbString[0] + ", " + rgbString[1] + ", " + rgbString[2] + ")");
        } else {
            let idString = $(this).attr("id");
            let index = idString.substr(idString.indexOf("-") + 1);

            if (counterArray[index - 1] !== 0) {
                $(this).css("background-color", "rgb(" + Math.floor((Math.random() * 256)) + ", " + Math.floor((Math.random() * 256)) + ", " + Math.floor((Math.random() * 256)) + ")");
            }
        }
    });
}

/* Function for getting the user input for the number of squares. */
function askUser(maxSquares) {
    let squaresOnSide = prompt("How many squares per side to make the new grid:");

    while (squaresOnSide > maxSquares || squaresOnSide < 2) {
        squaresOnSide = prompt("Minimum number for squares per side is 2 and maximum number for squares per side is " + maxSquares + ". How many squares per side to make the new grid:");
    }

    return squaresOnSide;
}

/* Function for finding out how many squares fits on the visible screen area. */
function getMaxSquares(minSquareLength, gridGap) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let gridSideLength;

    if (width > height) {
        gridSideLength = Math.floor(height * 0.8);
    } else {
        gridSideLength = Math.floor(width * 0.8);
    }

    return Math.floor((gridSideLength + gridGap) / (minSquareLength + gridGap));
}

/* Main function. */
$(document).ready(function () {
    let gridGap = 2;
    let minSquareLength = 10;
    let initialNumberOfSquares = 10;

    setItUp(initialNumberOfSquares, gridGap, minSquareLength);
});