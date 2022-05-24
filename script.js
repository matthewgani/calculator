











function add(a, b) {
    return a+b;
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
    let result = 0;
    switch(operator) {
        case 'add':
            result = add(a,b);
            break;
        case 'subtract':
            result = subtract(a,b);
            break;
        case 'multiply':
            result = multiply(a,b);
            break;
        case 'divide':
            result = divide(a,b);
            break;
        default:
            console.log('invalid operator');
    }

    return result
}