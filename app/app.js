const x = document.getElementById("myRange");
const grid = document.querySelector(".grid");
const clearBtn = document.querySelector('.clear-btn');
const gridText = document.querySelector('.grid-txt');

let movedSlider = false; //onpage load

const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;

window.addEventListener('load', defaultGrid);

function defaultGrid () {
    console.log("page is loaded test");
    // getArea();
    const a = x * x;
    const wd = gridWidth / x;
    const hd = gridHeight / x;
    for (let i = 0; i < a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        box.style.width = `${wd}px `;
        box.style.height = `${hd}px`;
        grid.appendChild(box);
    }

}

function getArea (v) {
    // const getGrid = getComputedStyle(grid);
    
    // console.log(gridHeight, gridWidth);
    
    // const borderPx = 2 * v;
    
    const w = gridHeight / v;
    const h = gridWidth / v;
    
    console.log(w, h);
    
    // const a = v * v;
    createGrid(w, h, v);
    
    // defaultGrid(w, h, v);
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


//500px 500px is fixed height and width 
//if user selects 32, then 32 x 32 to fill 500px 
    
function createGrid(w, h, v) {
    // console.log(`test create grid get ${a}`);
    console.log(w, h);
    // const area = w * h;
    const a = v * v;
    for (let i = 0; i < a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        box.style.width = `${w}px `;
        box.style.height = `${h}px`;
        grid.appendChild(box);
    }

    // const divsAll = document.querySelectorAll('.boxes');
    //     divsAll.addEventListener('mouseenter', () => {
    //         console.log("test");
    //     })                                                                 
    
}


clearBtn.addEventListener('click', (e) => {
    console.log(e);
    window.location.reload();
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
});

