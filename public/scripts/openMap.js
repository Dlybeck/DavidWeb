let button = document.querySelector("#map");
let map = document.querySelector("#canvasWrap")
button.onclick = function(e) {
    if(map.style.opacity == "1"){
        map.style.opacity = "0"
    }
    else{
        map.style.opacity = "1"
    }
}