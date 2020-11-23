class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }
    delete() {

    }
    appendNum(number) {
        if(number==='.' && this.currentOperand.includes('.')){
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    operationSelected(operation) {

    }
    calc() {

    }

    updateDisplay() {
        this.current.innerText = this.currentOperand
    }
}




var printer = [];
var order = [];
var x = [];
input = document.getElementById('input');
var output = [];
output = document.getElementById('output');

const numButtons = document.querySelectorAll('[data-numbers]');
const opsButtons = document.querySelectorAll('[data-operators]');
const equalButton = document.querySelector('[data-equal]');
const delButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-ac');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

const calculator = new Calculator(previous, current);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})