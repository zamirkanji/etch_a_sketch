//need to figure out how to take return from getHW (array) and then run default grid using client width and height
//on dom load, or resize event (default, or resize), get height and width and call default grid (getHW is arg when calling default grid)
//once size is positioned on input change of slider will adjust the box sizes further

// const val = document.getElementById("myRange");
const gridRange = document.querySelector('input[name="gridRange"]');
const slider = document.getElementById("myRange");

const grid = document.querySelector(".grid");
const clearBtn = document.querySelector(".clear-canvas");
const gridText = document.querySelector(".grid-txt");
// const percentage = document.querySelector('.perc-txt');
const colorBtn = document.querySelectorAll(".color-btn");
const blackBtn = document.querySelector(".black-color");
const rgbBtn = document.querySelector(".rgb-color");
const percTxt = document.querySelector(".perc-txt");

percTxt.textContent = "";

const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;

let counter = 0;

function getHW(checkValue) {
  const gridWidth = grid.clientWidth;
  const gridHeight = grid.clientHeight;
  const s = [gridWidth, gridHeight];
  checkValue(s);
}

function checkValue(s) {
  const val = document.getElementById("myRange");
  const cv = val.value;
  gridText.textContent = `(${cv} x ${cv})`;
  const w = s[0] / cv;
  const h = s[1] / cv;
  const a = cv * cv;
  createGrid(w, h, a);
}

function createGrid(w, h, a) {
  for (let i = 0; i < a; i++) {
    const box = document.createElement("div");
    box.classList.add("boxes");
    box.style.width = `${w}px `;
    box.style.height = `${h}px`;
    grid.appendChild(box);
  }
  // return hoverGrid();
  hoverGrid();
}

function hoverGrid() {
  const val = document.getElementById("myRange");
  const cv = val.value;
  const a = cv * cv;

  const divsAll = document.querySelectorAll(".boxes");

  percTxt.textContent = `0%`;

  //background color black by default - on mouseenter (Each div element)
  divsAll.forEach((d) => {
    d.addEventListener("mouseenter", () => {
      const style = getComputedStyle(d);
      const backgroundColor = style.backgroundColor;
      //how does this reset everytime slider is moved????
      if (backgroundColor === "rgb(255, 255, 255)") {
        d.style.backgroundColor = "black";
        counter++;
        let completion = (counter / a) * 100;
        percTxt.textContent = `${Math.floor(completion)}%`;
      }
    });
  });

  // divsAll.forEach((d) => {
  //     d.addEventListener('dblclick', () => {
  //         d.style.backgroundColor = "white";
  //     });
  // });

  rgbBtn.addEventListener("click", () => rgbColor(divsAll));
  blackBtn.addEventListener("click", () => blackColor(divsAll));
}

const rgbColor = (divsAll) => {
  divsAll.forEach((d) => {
    d.addEventListener("mouseenter", () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      d.style.backgroundColor = "#" + randomColor;
    });
  });
};

const blackColor = (divsAll) => {
  divsAll.forEach((d) => {
    d.addEventListener("mouseenter", () => {
      d.style.backgroundColor = "black";
    });
  });
};

//EVENT LISTENERS OUTSIDE OF FUNCS
myRange.onchange = () => sliderChange();

const sliderChange = () => {
  function removeAllNodes(parent) {
    while (grid.firstChild) {
      grid.removeChild(parent.firstChild);
    }
  }
  removeAllNodes(grid);
  getHW(checkValue);
};

clearBtn.addEventListener("click", (e) => {
  document
    .querySelectorAll(".boxes")
    .forEach((pixel) => (pixel.style.backgroundColor = "white"));
});

getHW(checkValue);
