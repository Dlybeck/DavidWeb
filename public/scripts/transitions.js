const fadeTime = 250;
const fadeTimeS = '0.25s';
const moveTime = 2000;
const moveTimeS = '2s';

const factor = 50
const offset = 200

let img = new Image();
img.src = '/img/Location25.png'

window.onpageshow = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('[link=true]');

    let coords = checkCoords(document.body, "body");
    printCoords(coords, "body")
    let coordsPct = checkCoords(transition_el);
    printCoords(coordsPct, "transition_el");


    let canvas = document.querySelectorAll('#canvas');
    let ctx = canvas[0].getContext('2d');


    coords[0] = parseInt(coords[0], 10)
    coords[1] = parseInt(coords[1], 10)

    deserializeCanvas(canvas[0])

    ctx.fillStyle = "#bfbf9f";
    ctx.fillRect(0, 0, canvas[0].width, canvas[0].height);
    let location = document.querySelector("#location").innerHTML
    setTimeout(() => {
        //location name
        ctx.font = "12px serif"
        ctx.fillStyle = "black"
        ctx.fillText(location, offset - (coords[0]/factor) + 10, offset - (coords[1]/factor - 5))
        //dot
        ctx.beginPath();
        ctx.arc( offset - (coords[0]/factor), offset - (coords[1]/factor), 5, 0, 2 * Math.PI);
        ctx.fill();

        serializeCanvas(canvas[0])

        //Current Location Stuff
        setTimeout(() => {
            //Current Location
            //border
            ctx.lineWidth = 8
            ctx.fillStyle = "#006699"
            ctx.arc( offset - (coords[0]/factor), offset - (coords[1]/factor), 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = "black"
        }, 50)

    }, 50)
    

    setTimeout(() => {
        //set transition state
        transition_el.classList.remove('is-active');
    }, fadeTime);

    for(let i=0; i<anchors.length; i++){
        const anchor = anchors[i]

        anchor.addEventListener('click', e=>{
            //console.log(e.target.getAttribute('href'))
            e.preventDefault();
            let target = e.target.getAttribute('href');
            //set transition state
            transition_el.classList.add('is-active');

            //if it is a transition
            if(transition_el.classList.contains("transition-page")){
                let x = e.target.getAttribute('x')
                let y = e.target.getAttribute('y')
                console.log("going to (" + x + ", " + y + ")")

                //wait for fade to happen then start moving background
                setTimeout(() => {
                    //change to movement trans time
                    transition_el.style.transition = "ease-in-out " + moveTimeS;
                    transition_el.style.backgroundPosition = x + "px " + y + "px"

                    //wait for background movement to happen then start changing pages
                    setTimeout(() => {
                        //return to fade trans time
                        transition_el.style.transition = "ease-out " + fadeTimeS;

                        //Update map for new location
                        //initial drawing coords
                        let drawX = offset - (x/factor)
                        let drawY = offset - (y/factor)
                        //new drawing coords
                        let drawX2 = offset - (coords[0]/factor)
                        let drawY2 = offset - (coords[1]/factor)
                        //erase Canvas
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Load in saved Map
                        deserializeCanvas(canvas[0])
                        setTimeout(() => {
                            //if jumping back to home, don't draw line
                            if(x!=0 || y!=0){
                                console.log("Drawing from [" + (drawX) + ", " + (drawY) + "] to [" + (drawX2) + ", " + (drawY2) + "]")
                                drawLine(ctx, [drawX, drawY], [drawX2, drawY2], 'black', 3);
                            }
                            serializeCanvas(canvas[0])
                            window.location.href = target;
                        }, 50)
                    }, moveTime);
                }, fadeTime);
            } 
        });
    }
}

function drawLine(ctx, begin, end, stroke = 'black', width = 10) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function checkCoords(element){
    return(window.getComputedStyle(element).getPropertyValue('background-position').split(/\s+/));

}

function printCoords(coords, elName){
    console.log(elName +  " is currently at " + coords);
}

function serializeCanvas(canvas) {
    localStorage.setItem('map', canvas.toDataURL());
}

function deserializeCanvas(canvas) {
    let data = localStorage.getItem('map');
    var img = new Image();
    img.onload = function() {
        canvas.getContext("2d").drawImage(img, 0, 0);
    };
    img.src = data;
}