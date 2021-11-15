const x = document.getElementById("myRange");
const gridCont = document.querySelector(".grid-container");

function checkValue (v) {
    document.getElementById('min-label').value = v;

    // console.log(`current value: ${x.value}`);
    const defaultVal = x.defaultValue;
    const currentVal = v;
    console.log(`default value ${defaultVal}`);
    
    getArea(currentVal);

    function getArea (cv) {
        const a = cv * cv;
        createGrid(a);
    }
}

function createGrid(a) {
    console.log(`test create grid get ${a}`);
    for (let i = 0; i <= a; i++) {
        const box = document.createElement("div");
        box.classList.add('boxes');
        gridCont.appendChild(box);
    }
}
