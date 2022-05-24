const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const details = document.querySelector('.details');
let currentDisplay = [];

buttons.forEach((button)=> {
    content = button.textContent;
    // console.log(content);


    button.addEventListener('click', ()=> {
        changeDisplay(button.textContent);
    });

});


function getType(content) {
    if (!isNaN(content)) {
        return 'number';
    }
    else if (content == 'AC') {
        return 'AC'
    }
    else if (content == '÷' || content == 'x' || content == '-' || content == '+') {
        return 'operation';
    }
    else if (content == '=') {
        return 'equals';
    }
    else if (content == '.') {
        return '.';
    }
    else if (content == 'C') {
        return 'C';
    }
}

function changeDisplay(content) {
    console.log(content);
    let emptyDisplay = false;
    let latestElement = "";
    if (currentDisplay.length == 0) {
        emptyDisplay = true;
        
    }
    else {
        latestElement = currentDisplay[currentDisplay.length - 1];
    }
    let currType = getType(content);

    if (currType == 'AC') {
        currentDisplay = [];
        result.textContent = '';
    }
    else if (currType == 'C') {
        // remove last added integer digit
        if (!emptyDisplay) {

            if (getType(latestElement) == 'number') {
                if (latestElement.length == 1) {
                    currentDisplay.pop();
                    result.textContent = '';
                }
                else {
                    latestElement = latestElement.toString();
                    latestElement = latestElement.slice(0, -1);
                    currentDisplay[currentDisplay.length - 1] = latestElement;
                    result.textContent = latestElement;
                }
            }
            else {
                // latest element is a operation, we go for prev element
                prevElement = currentDisplay[currentDisplay.length - 2];
                if (prevElement.length == 1) {
                    currentDisplay = [];
                    result.textContent = '';
                }
                else {
                    prevElement = prevElement.slice(0, -1);
                    currentDisplay[currentDisplay.length - 2] = prevElement;
                    result.textContent = prevElement;
                }
            }
            
        }
    }
    else if (currType == 'number') {
        if (emptyDisplay) {
            if (content !== 0) {
                currentDisplay.push(content);
                result.textContent = content;
            }
        }
        else if (getType(latestElement) == 'number') {
            if (parseInt(latestElement) !== 0) {
                latestElement = latestElement + "" + content;
                currentDisplay[currentDisplay.length - 1] = latestElement;
                result.textContent = latestElement;
            }
            else {
                if (latestElement.toString().includes('.')) {
                    latestElement = latestElement + "" + content;
                    currentDisplay[currentDisplay.length - 1] = latestElement;
                    result.textContent = latestElement;
                }
                else {
                    latestElement = content;
                    currentDisplay[currentDisplay.length - 1] = latestElement;
                    result.textContent = latestElement;
                }
            }
        }
        else if (getType(latestElement) == 'operation') {
            currentDisplay.push(content);
            result.textContent = content;
        }

    }
    else if (currType == 'operation') {
        if (!emptyDisplay) {
            if (currentDisplay.length == 3) {
                let operator = currentDisplay[currentDisplay.length - 2];
                firstElement = currentDisplay[0];
                res = operate(firstElement, latestElement, operator);

                if (res !== "") {
                    currentDisplay = [];
                    currentDisplay.push(res);
                    currentDisplay.push(content);
                    result.textContent = res;
                }
                else {
                    alert("Why are you dividing by 0!!");
                    currentDisplay = [];
                    result.textContent = "";
                }
            }
            else if (getType(latestElement) == 'number') {
                currentDisplay.push(content);
            }

        }

    }
    else if (currType == 'equals') {
        if (!emptyDisplay) {
            if (currentDisplay.length == 3) {
                let operator = currentDisplay[currentDisplay.length - 2];
                firstElement = currentDisplay[0];
                res = operate(firstElement, latestElement, operator);
                if (res !== "") {
                    currentDisplay = [];
                    currentDisplay.push(res);
                    result.textContent = res;
                }
                else {
                    alert("Why are you dividing by 0!!");
                    currentDisplay = [];
                    result.textContent = "";
                }
            }

        }

    }
    else if (currType == '.') {
        if (getType(latestElement) == 'number') {
            string = latestElement.toString();
            if (!(latestElement.toString().includes('.'))) {
                latestElement = latestElement + ".";
                currentDisplay[currentDisplay.length - 1] = latestElement;
                result.textContent = latestElement;
            }
        }

    }
    

    console.log(currentDisplay);
    detailContent = currentDisplay.join(" ");
    details.textContent = detailContent;


}









function add(a, b) {
    return parseInt(a)+ parseInt(b);
}
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}

function operate(a, b, operator) {
    console.log(a, b, operator);

    let result = 0;
    switch(operator) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case 'x':
            result = multiply(a,b);
            break;
        case '÷':
            result = divide(a,b);
            if (b ==0) {
                result = "";
            }
            break;
        default:
            console.log('invalid operator');
    }
    if (result !== '') {
        result = Math.round(result * 10000) / 10000;
    }
    return result;
}