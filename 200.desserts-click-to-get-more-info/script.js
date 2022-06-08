window.onload = () => {
    document.querySelectorAll('.item').forEach(
        item => item.addEventListener("click", handleClick)
    )

    document.querySelector('.close').addEventListener("click", () => {
        document.querySelector(".big-panel").classList.remove("show")
    })
    
}

const handleClick = (event) => {
    if (event.target.src) {
        document.querySelector(".big-panel img").src = event.target.src
        document.querySelector(".big-panel").classList.add("show")        
    }

}