const fadeTime = 250;
const fadeTimeS = '0.25s';
const moveTime = 2000;
const moveTimeS = '2s';

const factor = 20
const offset = 350

window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('[link=true]');

    let coords = checkCoords(document.body, "body");
    printCoords(coords, "body")
    let coordsPct = checkCoords(transition_el);
    printCoords(coordsPct, "transition_el");


    const canvas = document.querySelectorAll('#canvas');

    console.log("deserializing")
    deserializeCanvas(canvas[0])
    console.log("deserialized")

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

                //Update map for new location
                coords[0] = parseInt(coords[0], 10)
                coords[1] = parseInt(coords[1], 10)

                //initial drawing coords
                let drawX = offset - (coords[0]/factor)
                let drawY = offset - (coords[1]/factor)
                //new drawing coords
                let drawX2 = offset - (x/factor)
                let drawY2 = offset - (y/factor)

                console.log("Drawing from [" + (drawX) + ", " + (drawY) + "] to [" + (drawX2) + ", " + (drawY2) + "]")
                const ctx = canvas[0].getContext('2d');
                drawLine(ctx, [drawX, drawY], [drawX2, drawY2], 'black', 5);
                console.log("Drew Line")

                serializeCanvas(canvas[0])

                //wait for fade to happen then start moving background
                setTimeout(() => {
                    //change to movement trans time
                    transition_el.style.transition = "ease-in-out " + moveTimeS;
                    transition_el.style.backgroundPosition = x + "px " + y + "px"

                    //wait for background movement to happen then start changing pages
                    setTimeout(() => {
                        //return to fade trans time
                        transition_el.style.transition = "ease-out " + fadeTimeS;

                        window.location.href = target;
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