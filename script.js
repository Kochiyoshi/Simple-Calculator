const calculatorScreen = document.querySelector('.calculator-screen');
let prevNumber = '';
let calculationOperator = '';
let curentNumber = '';
const updateScreen = (number) => {
    calculatorScreen.value = number;
};
const inputNumber = (number) => {
    if (number === '0' && !curentNumber){
        curentNumber = '';
        updateScreen('0')
    }else if ((typeof curentNumber) === 'number'){
        curentNumber = number;
        updateScreen(curentNumber);
    }else {
        curentNumber += number;
        updateScreen(curentNumber);
    }
};

const backSpace = document.querySelector('.backspace');
backSpace.addEventListener("click", () => {
    curentNumber = curentNumber.slice(0, -1);
    updateScreen(curentNumber);
    if(!curentNumber){
        updateScreen('0');
    }
});


const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener("click", (event) =>{
        inputNumber(event.target.value);
    });
});

const operators = document.querySelectorAll('.operator');
const inputOperator = operator => {
    curentNumber = curentNumber.toString();
    if (!calculationOperator){
        if (!curentNumber){
            prevNumber = '0';
        }else{
            prevNumber = curentNumber;
        }
        calculationOperator = operator;
        curentNumber = '';
    }
    if (!(!curentNumber) && !(!prevNumber) && !(!calculationOperator)){
        calculate();
        updateScreen(curentNumber);
        prevNumber = curentNumber;
        calculationOperator = operator;
    }
}
operators.forEach(operator => {
    operator.addEventListener("click", (event) =>{
        inputOperator(event.target.value);
    })
})

const equalSign = document.querySelector('.equal-sign')
equalSign.addEventListener('click', () => {
    calculate();
    updateScreen(curentNumber);
})

const calculate = () => {
    let result = '';
    if(!curentNumber){
        curentNumber = '0';
    }
    switch(calculationOperator){
        case "+":
            result = parseFloat(prevNumber) + parseFloat(curentNumber);
            break;
        case '-':
            result = parseFloat(prevNumber) - parseFloat(curentNumber);
            break;
        case '/':
            result = parseFloat(prevNumber) / parseFloat(curentNumber);
            break;
        case '*':
            result = parseFloat(prevNumber) * parseFloat(curentNumber);
            break;
        default:
            return;
    }
    curentNumber = result;
    calculationOperator = '';
}

const allClear = document.querySelector('.all-clear');
allClear.addEventListener('click', () =>{
    prevNumber= '',
    calculationOperator= '';
    curentNumber= '';
    updateScreen('0');
})

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value);
})
const inputDecimal = (dot) => {
    if(curentNumber.includes('.')){
        return;
    }
    if ((!curentNumber) || ((typeof curentNumber) === 'number')){
        curentNumber = `0${dot}`;
        updateScreen(curentNumber);
    }else {
        curentNumber += dot;
        updateScreen(curentNumber);
    }
}

const percentage = document.querySelector('.percentage');
percentage.addEventListener('click', () => {
    if(!(!curentNumber)){
        curentNumber = parseFloat(curentNumber) / 100;
        updateScreen(curentNumber);
    };
});

const fraction = document.querySelector('.fraction');
fraction.addEventListener('click', () => {
    if(!(!curentNumber)){
        console.log(curentNumber);
        curentNumber = 1 / parseFloat(curentNumber);
        console.log(curentNumber);
        updateScreen(curentNumber.toString());
    };
});

const xSquared = document.querySelector('.x-squared');
xSquared.addEventListener('click', () => {
    if(!(!curentNumber)){
        curentNumber = parseFloat(curentNumber) ** 2;
        updateScreen(curentNumber);
    };
});

const squareRoot = document.querySelector('.squared-root') ;
squareRoot.addEventListener('click', () =>{
    if(!(!curentNumber)){
        curentNumber = Math.sqrt(parseFloat(curentNumber));
        updateScreen(curentNumber);
    };
});