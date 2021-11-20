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



let movedSlider = false; //onpage load

const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;

let run = false;
let counter = 0;
 

document.addEventListener('DOMContentLoaded', function () {
    movedSlider = false;
    getHW(checkValue);
})

function getHW (checkValue) {
    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;
    const s = [gridWidth, gridHeight];
    checkValue(s);
}

function checkValue (s) {
    const val = document.getElementById("myRange");
    const cv = val.value;
    gridText.textContent = `(${cv} x ${cv})`;
    const w = s[0] / cv;
    const h = s[1] / cv;
    const a = cv * cv;
    createGrid(w, h, a); 
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
    return hoverGrid();
}

function hoverGrid() {
    const val = document.getElementById("myRange");
    const cv = val.value;
    const a = cv * cv;
    
    const divsAll = document.querySelectorAll('.boxes');

    //background color black by default - on mouseenter (Each div element)
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

    //one of the buttons has to be run == true or active 
    const rgbColor = () => { 
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
                d.style.backgroundColor = "#" + randomColor;
            });
        });
    }
    
    
    const blackColor = () => {
        blackBtn.addEventListener('click', () => {
            divsAll.forEach((d) => {
                d.addEventListener('mouseenter', () => {
                    d.style.backgroundColor = "black";
                });
            }); 
        })
    }
    
    // divsAll.forEach((d) => { 
    //     d.addEventListener('dblclick', () => {
    //         d.style.backgroundColor = "white";
    //     });
    // });
    
    
    rgbBtn.addEventListener('click', rgbColor);
    blackBtn.addEventListener('click', blackColor);
}

const sliderChange = (v) => {
    console.log(v);
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
    getHW(checkValue);
}


//EVENT LISTENERS OUTSIDE OF FUNCS
clearBtn.addEventListener('click', (e) => {
    console.log(e);
    run = false;
    movedSlider = false;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    window.location.reload();
});

