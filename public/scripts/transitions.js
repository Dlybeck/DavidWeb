let transTime = 250;
let homeX = 0;
let homeY = 0;

window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('a');

    setTimeout(() => {
        transition_el.classList.remove('is-active');
    }, transTime);

    for(let i=0; i<anchors.length; i++){
        const anchor = anchors[i]

        anchor.addEventListener('click', e=>{
            e.preventDefault();
            let target = e.target.href;

            transition_el.classList.add('is-active');

            //from home to destination
            if(transition_el.classList.contains("transition-Home")){
                let id = null;
                let x = 0;
                let y = 0;
                let destX = e.target.getAttribute('x');
                let destY = e.target.getAttribute('y');

                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==destX && y==destY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=destX){
                            if(destX > x){x+=5}
                            else{x-=5}
                        }
                        if(y!=destY){
                            if(destY > y){y+=5}
                            else{y-=5}
                        }
                        transition_el.style.backgroundPosition = x+"px "+ y+"px";
                        
                    }
                }
                function finish(){
                    setTimeout(() => {
                        window.location.href = target;
                    }, transTime);
                }
            } 
            //from tic tac toe to home
            if(transition_el.classList.contains("transition-1")){
                let id = null;
                let x = -2000;
                let y = -2000;
                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==homeX && y==homeY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=homeX){
                            if(homeX > x){x+=5}
                            else{x-=5}
                        }
                        if(y!=homeY){
                            if(homeY > y){y+=5}
                            else{y-=5}
                        }
                        transition_el.style.backgroundPosition = x+"px "+ y+"px";
                        
                    }
                }
                function finish(){
                    setTimeout(() => {
                        window.location.href = target;
                    }, transTime);
                }
            } 
            //from test page to home
            if(transition_el.classList.contains("transition-2")){
                let id = null;
                let x = 2000;
                let y = 2000;
                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==homeX && y==homeY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=homeX){
                            if(homeX > x){x+=5}
                            else{x-=5}
                        }
                        if(y!=homeY){
                            if(homeY > y){y+=5}
                            else{y-=5}
                        }
                        transition_el.style.backgroundPosition = x+"px "+ y+"px";
                        
                    }
                }
                function finish(){
                    setTimeout(() => {
                        window.location.href = target;
                    }, transTime);
                }
            } 
        });
    }
}