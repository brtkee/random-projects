// get all needed HTML elements
const buttons = document.querySelectorAll("#buttons button")
const operationScreen = document.querySelector("#operation-screen")

// loop for all buttons elements
buttons.forEach((button) => {
    // add to them eventlistener
    button.addEventListener('click', (e) => {
        // check if targetClassName is number or operator(+, -, *, /)
        if(e.target.className == "number"){
            operationScreen.innerText += e.target.innerText
        } else if(e.target.className == "operator"){
            // code to only show one operator
            const currentOperation = operationScreen.innerText;
            const hasOperator = currentOperation.includes('+') || 
                                currentOperation.includes('-') || 
                                currentOperation.includes('*') || 
                                currentOperation.includes('/');
            if (hasOperator && e.target.classList.contains('operator')) {
                return;
            }
            operationScreen.innerText += e.target.innerText;

            // if target is result  
        }else if(e.target.id == "result") {
            // simple code to check if result is Integer if not return toFixed(2) to not have 3.4214421412421421412 numbers
            const result = eval(operationScreen.innerText)
            Number.isInteger(result) ? operationScreen.innerText = result : operationScreen.innerText = result.toFixed(2)

            // clear the screen 
        } else if(e.target.className == "clear"){
            operationScreen.innerText = ''
        }

    })
})
