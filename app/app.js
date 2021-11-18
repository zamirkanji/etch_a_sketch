const x = document.getElementById("myRange");
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


//on page load run default grid 
document.addEventListener('DOMContentLoaded', defaultGrid);
document.addEventListener('DOMContentLoaded', getHW);

//on window resize, get height and width;
window.onresize = getHW;
window.addEventListener('resize', getHW);

//returns array with height and width of box (when responsive)
function getHW () {
    const gridHeight = grid.clientHeight;
    const gridWidth = grid.clientWidth;
    console.log(gridHeight, gridWidth);
    const s = [gridWidth, gridHeight];
    console.log(s);
    return s;
}


//need to figur out how to take return from getHW (array) and then run default grid using client width and height
//on dom load, or resize event (default, or resize), get height and width and call default grid (getHW is arg when calling default grid)
//once size is positioned on input change of slider will adjust the box sizes further 


//gets current value from slider, creates area, finds width and height from client, and creates grid
// ---> then calls hoverGrid() 
function defaultGrid (s) {
    const cv = x.value; 
    const a = cv * cv;
    const wd = gridWidth / cv;
    const hd = gridHeight /cv;
    for (let i = 0; i < a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        box.style.width = `${wd}px`;
        box.style.height = `${hd}px`;
        grid.appendChild(box);
    }  
    hoverGrid();
}



function checkValue (v) {
    console.log(v);
    movedSlider = true; 
    function removeAllNodes(parent) {
        if (movedSlider) {
            while (grid.firstChild) {
                grid.removeChild(parent.firstChild)
            }
        }
    }
    removeAllNodes(grid);
    document.getElementById('min-label').value = v;
    console.log(`current value: ${x.value}`);
    const defaultVal = x.defaultValue;
    const currentVal = v; //need to make a global variable to find current value 
    gridText.textContent = `(${v} x ${v})`;
    console.log(`default value ${defaultVal}`);
    getArea(currentVal);
    // return currentVal;
}

function getArea (v) {
    const w = gridHeight / v;
    const h = gridWidth / v;
    createGrid(w, h, v);  
}
 
function createGrid(w, h, v) {
    run = true;
    console.log(w, h);
    const a = v * v;
    for (let i = 0; i < a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        box.style.width = `${w}px `;
        box.style.height = `${h}px`;
        grid.appendChild(box);
    }
    hoverGrid();
}






function hoverGrid() {
    let counter = 0;
    const cv = x.value; //default grid value 
    const a = cv * cv;
    console.log(a, cv);
    const divsAll = document.querySelectorAll('.boxes');
// shouldnt be in hover grid
    rgbBtn.addEventListener('click', () => {
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
              console.log("forEach worked");
              d.style.backgroundColor = "#" + randomColor;
            //   color.innerHTML = "#" + randomColor;
            });
        });
    });
// shouldnt be in hover grid
    blackBtn.addEventListener('click', () => {
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
              console.log("forEach worked");
              d.style.backgroundColor = "black";
            });
        }); 
    })
    divsAll.forEach((d) => {
        d.addEventListener('mouseenter', () => {
            const style = getComputedStyle(d);
            const backgroundColor = style.backgroundColor;
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
        //   console.log("forEach worked");
          d.style.backgroundColor = "white";
        });
      });                                                    
}

//EVENT LISTENERS OUTSIDE OF FUNCS
clearBtn.addEventListener('click', (e) => {
    console.log(e);
    run = false;
    window.location.reload();
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
});

