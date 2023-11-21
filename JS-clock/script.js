// get the HTML element
const timer = document.querySelector("#time")

// set internaval for 1 second
setInterval(() => {
    // get current date
    let date = new Date()
    // display as a text locale time 
    timer.innerText = date.toLocaleTimeString()
},1000)
