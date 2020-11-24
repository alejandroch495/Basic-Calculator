const numButtons = document.querySelectorAll('[data-numbers]');
const opsButtons = document.querySelectorAll('[data-operators]');
const equalButton = document.querySelector('[data-equal]');
const delButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-ac');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');
const negPos = document.querySelector('[data-negPos]');

let usedEqual = false;

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
        this.currentOperand = this.currentOperand.slice(0,-1);
    }
    appendNum(number) {
        if(number==='.' && this.currentOperand.includes('.')){
            return
        }
        if(usedEqual){
            this.currentOperand = number.toString();
            usedEqual = false;
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    negPos(){
        if(!this.currentOperand.includes('-')){
            this.currentOperand = "-" + this.currentOperand;
            return
        }
        this.currentOperand = this.currentOperand.substring(1);
    }

    operationSelected(operation) {
        if(this.currentOperand===""){
            this.operation = operation;
            return
        }
        if(this.previousOperand !==''){
            this.calc();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calc() {
        let equals = '';
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(current) || isNaN(previous)){
            return
        }
        switch(this.operation){
            case '+':
                equals = previous + current;
                break;
            case '-':
                equals = previous - current;
                break;
            case '*':
                equals = previous * current;
                break;
            case '/':
                equals = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = equals;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.current.innerText = this.currentOperand;
        if(this.operation != undefined){
            this.previous.innerText = `${this.previousOperand} ${this.operation}`
        }else{
            this.previous.innerText = ``;
        }
    }
}

//initializes the calculator
const calculator = new Calculator(previous, current);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

delButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
})

opsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationSelected(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', ()=>{
    calculator.calc();
    usedEqual = true;
    calculator.updateDisplay();
})

acButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

negPos.addEventListener('click', ()=>{
    calculator.negPos();
    calculator.updateDisplay();
})