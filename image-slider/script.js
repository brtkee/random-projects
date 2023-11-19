const imgContainer = document.querySelector("#img-container")
let index = 1
setInterval(() => {
    index++
    imgContainer.innerHTML = `<img src="images/image-${index}.jpg" alt="" loading="lazy">`
    index >= 5 ? index = 0 : index
}, 3000)
