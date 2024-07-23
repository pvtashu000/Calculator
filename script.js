let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');

let calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    waitingForSecondOperand: false,
};

function updateDisplay() {
    display.value = calculator.displayValue;
}

function handleNumber(button) {
    const number = button.textContent;
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue === '0' ? calculator.displayValue = number : calculator.displayValue += number;
    }
    updateDisplay();
}

function handleOperator(button) {
    const operator = button.textContent;
    calculator.firstOperand = parseFloat(calculator.displayValue);
    calculator.operator = operator;
    calculator.waitingForSecondOperand = true;
    calculator.displayValue = '0';
    updateDisplay();
}

function handleEquals() {
    calculator.secondOperand = parseFloat(calculator.displayValue);
    let result = 0;
    switch (calculator.operator) {
        case '+':
            result = calculator.firstOperand + calculator.secondOperand;
            break;
        case '-':
            result = calculator.firstOperand - calculator.secondOperand;
            break;
        case '*':
            result = calculator.firstOperand * calculator.secondOperand;
            break;
        case '/':
            result = calculator.firstOperand / calculator.secondOperand;
            break;
    }
    calculator.displayValue = result.toString();
    updateDisplay();
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function handleClear() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '=') {
            handleEquals();
        } else if (button.textContent === '+' || button.textContent === '-' || button.textContent === '*' || button.textContent === '/') {
            handleOperator(button);
        } else if (button.textContent === 'AC') {
            handleClear();
        } else {
            handleNumber(button);
        }
    });
});