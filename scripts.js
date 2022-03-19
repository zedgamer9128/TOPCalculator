let num1 = null;
let num2 = null;
let op = null;
let result = null;
let btn = document.querySelectorAll("button");
let scr = document.querySelector('#screen')
let pointBtn = document.querySelector("#point");
btn.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log(btn.textContent)
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
            result1 = Math.round(result1 * 100) / 100;
            scr.textContent = result1;
            num1 = result1;
            scr.textContent += btn.textContent;
            op = btn.textContent;
            num2 = null;
            pointBtn.disabled = false;
        } else if (btn.classList.contains('op')) {
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
            }
        } else if (btn.classList.contains('c')) {
            scr.textContent = scr.textContent.slice(0, -1);
        }
    })
})

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