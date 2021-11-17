const x = document.getElementById("myRange");
const grid = document.querySelector(".grid");
const clearBtn = document.querySelector('.clear-btn');
const gridText = document.querySelector('.grid-txt');
const colorBtn = document.querySelectorAll('.color-btn');
const blackBtn = document.querySelector('.black-color');
const rgbBtn = document.querySelector('.rgb-color');

// colorBtn.forEach((b) => {
//     b.addEventListener('click', () => {
//         console.log("test");
//         // if (blackBtn)
//     })
// })
const randomColor = Math.floor(Math.random()*16777215).toString(16);


let movedSlider = false; //onpage load

const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;

// window.addEventListener('load', defaultGrid);

// function getHW () {
// const gridHeight = grid.clientHeight;
// const gridWidth = grid.clientWidth;
// console.log(gridHeight, gridWidth);
// const s = [gridWidth, gridHeight];
// console.log(s);
// return s;
// }

let run = false;


defaultGrid();



function defaultGrid (s) {
    // console.log(s);
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
    const currentVal = v;
    gridText.textContent = `(${v} x ${v})`;
    console.log(`default value ${defaultVal}`);
    getArea(currentVal);
}

function getArea (v) {
    const w = gridHeight / v;
    const h = gridWidth / v;
    // console.log(w, h);
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
    const divsAll = document.querySelectorAll('.boxes');

    rgbBtn.addEventListener('click', () => {
        divsAll.forEach((d) => {
            d.addEventListener('mouseenter', () => {
              console.log("forEach worked");
              d.style.backgroundColor = "#" + randomColor;
            //   color.innerHTML = "#" + randomColor;
            });
        });
    });

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
          console.log("forEach worked");
          d.style.backgroundColor = "black";
        });
      });                                                    
    divsAll.forEach((d) => {
        d.addEventListener('dblclick', () => {
          console.log("forEach worked");
          d.style.backgroundColor = "white";
        });
      });                                                    
}

clearBtn.addEventListener('click', (e) => {
    console.log(e);
    run = false;
    window.location.reload();
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
});

