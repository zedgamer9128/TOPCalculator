let link = document.querySelector("link");
let body = document.querySelector("body");
let calculator = document.querySelector("#calculator");
let scr = document.querySelector('#screen');
let btn = document.querySelectorAll("button");
let num = document.querySelector(".num");
let colorBtn = document.querySelector("#colorScheme");
let side = document.querySelector(".side");
let pointBtn = document.querySelector("#point");
let num1 = null;
let num2 = null;
let op = null;
let result = null;

if (localStorage.getItem("theme")) {
    theme(localStorage.getItem("theme"));
} else {
    let date = new Date().getHours();
    if (date >= 19 || date <= 5) {
        theme("Dark");
    } else { 
        theme("Light");
    }
}
window.addEventListener('keydown', button => {
    btn.forEach(btn => {
        console.log(button.key);
        if (btn.textContent === button.key) {
            calculate(btn);
        } else if (button.key == "Enter") {
            if (btn.textContent === "=") {
                calculate(btn)
            }
        } else if (button.key == "Backspace") {
            if (btn.textContent === "C") {
                calculate(btn)
            }
        }
    })
})

btn.forEach(btn => {
    btn.addEventListener("click", () => {
        calculate(btn);
    })
})

function calculate(btn) {
    if (btn.classList.contains('num') && result === null) {
        scr.textContent += btn.textContent;
    } else if (btn.id == 'point') {
        scr.textContent += btn.textContent;
        btn.disabled = true;
    } else if (btn.classList.contains('num') && result !== null) {
        scr.textContent = btn.textContent;
        result = null;
    } else if (scr.textContent.slice(-1) === op) {
        if (btn.classList.contains('op') && num1 !== null && op !== null && num2 === null) {
            op = btn.textContent;
            scr.textContent = scr.textContent.slice(0, -1);
            scr.textContent += btn.textContent;
        } else {
            op = null;
            num1 = null;
            scr.textContent = scr.textContent.slice(0, -1);
        }
    } else if (btn.classList.contains('op') && num1 !== null && op !== null) {
        num2 = parseFloat(scr.textContent.substring(scr.textContent.indexOf(op) + 1));
        let result1 = operate(num1, num2, op);
        if (result1 === NaN || result1 === null || result1 === Infinity) {
            scr.textContent = "Error!"
            return;
        } 
        result1 = Math.round(result1 * 100) / 100;
        scr.textContent = result1;
        num1 = result1;
        scr.textContent += btn.textContent;
        op = btn.textContent;
        num2 = null;
        pointBtn.disabled = false;
    } else if (btn.classList.contains('op') && scr.textContent !== '') {
        if (op !== null) {
            scr.textContent = scr.textContent.slice(0, -1);
            op = btn.textContent;
            scr.textContent += op;
            result = null;
            num2 = null;
            pointBtn.disabled = false;
        } else {
            num1 = parseFloat(scr.textContent);
            op = btn.textContent;
            scr.textContent += op;
            result = null;
            num2 = null;
            pointBtn.disabled = false;
        }
    } else if (btn.classList.contains('eq') && num1 !== null && op !== null) {
        num2 = parseFloat(scr.textContent.substring(scr.textContent.indexOf(op) + 1));
        result = operate(num1, num2, op);
        if (result === NaN || result === null || result === Infinity) {
            scr.textContent = "Error!"
            return;
        } 
        result = Math.round(result * 100) / 100;
        scr.textContent = result;
        num1 = result
        num2 = null;
        op = null;
        pointBtn.disabled = false;
    } else if (btn.classList.contains('ac')) {
        scr.textContent = '';
        num1 = null;
        num2 = null;
        op = null;
        result = null;
        pointBtn.disabled = false;
    } else if (btn.classList.contains('c') && op !== null) {
        if (scr.textContent.slice(-1) === op) {
            op = null;
            num1 = null;
            scr.textContent = scr.textContent.slice(0, -1);
        } else if (scr.textContent.slice(-1) === '.') {
            pointBtn.disabled = false;
        } else {
            scr.textContent = scr.textContent.slice(0, -1);
        }
    } else if (btn.classList.contains('c')) {
        scr.textContent = scr.textContent.slice(0, -1);
    }
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            break;
    }
}


function theme(scheme) {
    if (scheme === "Light") {
        colorBtn.textContent = "Dark";
        link.href = "light-style.css";
        localStorage.setItem("theme", "Light");
    } else {
        colorBtn.textContent = "Light";
        link.href = "dark-style.css";
        localStorage.setItem("theme", "Dark");
    }
}

colorBtn.addEventListener("click", () => {
    theme(colorBtn.textContent);
})