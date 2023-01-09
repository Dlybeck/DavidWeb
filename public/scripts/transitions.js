const fadeTime = 250;
const fadeTimeS = '0.25s';
const moveTime = 2000;
const moveTimeS = '2s';

window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('a');

    setTimeout(() => {
        //set transition state
        transition_el.classList.remove('is-active');
    }, fadeTime);

    for(let i=0; i<anchors.length; i++){
        const anchor = anchors[i]

        anchor.addEventListener('click', e=>{
            e.preventDefault();
            let target = e.target.href;
            //set transition state
            transition_el.classList.add('is-active');

            //if it is a transition
            if(transition_el.classList.contains("transition-page")){
                let x = e.target.getAttribute('x')
                let y = e.target.getAttribute('y')
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