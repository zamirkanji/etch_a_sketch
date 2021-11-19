//need to figure out how to take return from getHW (array) and then run default grid using client width and height
//on dom load, or resize event (default, or resize), get height and width and call default grid (getHW is arg when calling default grid)
//once size is positioned on input change of slider will adjust the box sizes further 

// const val = document.getElementById("myRange");
const gridRange = document.querySelector('input[name="gridRange"]');

const grid = document.querySelector(".grid");
const clearBtn = document.querySelector('.clear-btn');
const gridText = document.querySelector('.grid-txt');
const percentage = document.querySelector('.perc-txt');
const colorBtn = document.querySelectorAll('.color-btn');
const blackBtn = document.querySelector('.black-color');
const rgbBtn = document.querySelector('.rgb-color');

const randomColor = Math.floor(Math.random()*16777215).toString(16);

let movedSlider = false; //onpage load

const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;

let run = false;
let counter = 0;
 

//on page load run default grid 
document.addEventListener('DOMContentLoaded', function () {
    movedSlider = false;
    getHW();
    checkValue();
    // hoverGrid();
});


//on window resize, get height and width;
// window.onresize = getHW;
// window.addEventListener('resize', function () {
//     getHW();
//     checkValue();
// });

//returns array with height and width of box (when responsive)
function getHW () {
    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;

    const s = [gridWidth, gridHeight];
    console.log(s);
    return s; //returns client height and width in px 
}

// function removeChildren () {
//     movedSlider = true; 
//     console.log("moved test");
//     function removeAllNodes(parent) {
//         if (movedSlider) {
//             while (grid.firstChild) {
//                 grid.removeChild(parent.firstChild);
                
//             }
//         }
//     }
//     removeAllNodes(grid);
// }

function checkValue () {
    const val = document.getElementById("myRange");
    
    const cv = val.value;
    const hw = getHW(); //is this the second time it is run/checked?
    gridText.textContent = `(${cv} x ${cv})`;
    const w = hw[0] / cv;
    const h = hw[1] / cv;
    const a = cv * cv;

    createGrid(w, h, a); 
    
    // return [w, h, a];
}

function createGrid(w, h, a) {
    run = true;
    for (let i = 0; i < a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        box.style.width = `${w}px `;
        box.style.height = `${h}px`;
        grid.appendChild(box);
    }
    hoverGrid();
}

// const whA = checkValue();


function hoverGrid(checkValue) {
    const val = document.getElementById("myRange");
    const cv = val.value;
    const a = cv * cv;
    
    const divsAll = document.querySelectorAll('.boxes');


    //one of the buttons has to be run == true or active 
    rgbBtn.addEventListener('click', () => {
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
                d.style.backgroundColor = "#" + randomColor;
            });
        });
    });
    blackBtn.addEventListener('click', () => {
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
              d.style.backgroundColor = "black";
            });
        }); 
    })
    divsAll.forEach((d) => {
        d.addEventListener('mouseenter', () => {
            const style = getComputedStyle(d);
            const backgroundColor = style.backgroundColor;
            //how does this reset everytime slider is moved????
            if (backgroundColor === "rgb(255, 255, 255)") {
                d.style.backgroundColor = "black";
                counter++;
                let completion = ((counter / a) * 100);
                percentage.textContent = `${Math.floor(completion)}%`;
            }
        });
      });                                                    
    divsAll.forEach((d) => {
        d.addEventListener('dblclick', () => {
          d.style.backgroundColor = "white";
        });
      });                                                    
}

const sliderChange = () => {
    movedSlider = true; 
    console.log("moved test");
    function removeAllNodes(parent) {
        if (movedSlider) {
            while (grid.firstChild) {
                grid.removeChild(parent.firstChild);
                
            }
        }
    }
    removeAllNodes(grid);
    checkValue();
}


//EVENT LISTENERS OUTSIDE OF FUNCS

//delete current grid and create new one 
// gridRange.addEventListener('change', function() {
//     console.log("slider changes");
//     movedSlider = true;
//     removeChildren();
//     checkValue();
//     hoverGrid();
//     // hoverGrid(checkValue());
// });
//
clearBtn.addEventListener('click', (e) => {
    console.log(e);
    run = false;
    movedSlider = false;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    window.location.reload();
});

