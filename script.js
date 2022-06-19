const calculatedScreen = document.querySelector('.calculated-screen');
const calculationScreen = document.querySelector('.calculation-screen');
let prevNumber = '';
let calculationOperator = '';
let curentNumber = '';
const updateCalculatedScreen = (number) => {
    calculatedScreen.value = number;
};
const updateCalculationScreen = (curentNumber, calculationOperator, prevNumber) => {
    calculationScreen.value = `${prevNumber} ${calculationOperator} ${curentNumber} =`
}
const resetCalculationScreen = () => calculationScreen.value = '';
const inputNumber = (number) => {
    if (number === '0' && !curentNumber){
        curentNumber = '';
        updateCalculatedScreen('0');
    }else if ((typeof curentNumber) === 'number'){
        curentNumber = number;
        updateCalculatedScreen(curentNumber);
    }else {
        curentNumber += number;
        updateCalculatedScreen(curentNumber);
    }
    resetCalculationScreen();
};

const backSpace = document.querySelector('.backspace');
backSpace.addEventListener("click", () => {
    curentNumber = curentNumber.slice(0, -1);
    updateCalculatedScreen(curentNumber);
    if(!curentNumber){
        updateCalculatedScreen('0');
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
        updateCalculatedScreen(curentNumber);
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
    updateCalculatedScreen(curentNumber);
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
    updateCalculationScreen(curentNumber,calculationOperator,prevNumber);
    curentNumber = result;
    calculationOperator = '';
}

const allClear = document.querySelector('.all-clear');
allClear.addEventListener('click', () =>{
    prevNumber= '',
    calculationOperator= '';
    curentNumber= '';
    updateCalculatedScreen('0');
    resetCalculationScreen();
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
        updateCalculatedScreen(curentNumber);
    }else {
        curentNumber += dot;
        updateCalculatedScreen(curentNumber);
    }
}

const percentage = document.querySelector('.percentage');
percentage.addEventListener('click', () => {
    if(!(!curentNumber)){
        curentNumber = parseFloat(curentNumber) / 100;
        updateCalculatedScreen(curentNumber);
    };
});

const fraction = document.querySelector('.fraction');
fraction.addEventListener('click', () => {
    if(!(!curentNumber)){
        console.log(curentNumber);
        curentNumber = 1 / parseFloat(curentNumber);
        console.log(curentNumber);
        updateCalculatedScreen(curentNumber.toString());
    };
});

const xSquared = document.querySelector('.x-squared');
xSquared.addEventListener('click', () => {
    if(!(!curentNumber)){
        curentNumber = parseFloat(curentNumber) ** 2;
        updateCalculatedScreen(curentNumber);
    };
});

const squareRoot = document.querySelector('.squared-root') ;
squareRoot.addEventListener('click', () =>{
    if(!(!curentNumber)){
        curentNumber = Math.sqrt(parseFloat(curentNumber));
        updateCalculatedScreen(curentNumber);
    };
});