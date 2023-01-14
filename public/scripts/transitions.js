const fadeTime = 250;
const fadeTimeS = '0.25s';
const moveTime = 2000;
const moveTimeS = '2s';

window.onload = () => {
    var pos = window.getComputedStyle(document.body).getPropertyValue('background-position');
    //console.log(pos)
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('[link=true]');

    setTimeout(() => {
        //set transition state
        transition_el.classList.remove('is-active');
    }, fadeTime);

    var pos = window.getComputedStyle(document.body).getPropertyValue('background-position');

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
                //console.log("going to (" + x + ", " + y + ")")
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