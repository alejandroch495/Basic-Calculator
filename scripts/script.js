const numButtons = document.querySelectorAll('[data-numbers]');
const opsButtons = document.querySelectorAll('[data-operators]');
const equalButton = document.querySelector('[data-equal]');
const delButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-ac');
const previous = document.querySelector('[data-previous]');
const current = document.querySelector('[data-current]');

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
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    operationSelected(operation) {
        if(this.currentOperand===""){
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
        this.previous.innerText = this.previousOperand;
    }
}

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
    calculator.updateDisplay();
})

acButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
