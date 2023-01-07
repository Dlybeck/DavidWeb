let transTime = 250;

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
            let destX = e.target.getAttribute("x")
            let destY = e.target.getAttribute("y")

            transition_el.classList.add('is-active');

            //from home to other page
            if(transition_el.classList.contains("transition-1")){
                let id = null;
                let x = 3000;
                let y = 2000;
                endX = destX;
                endY = destY;

                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==endX && y==endY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=endX){
                            if(destX > 3000){x+=5}
                            else{x-=5}
                        }
                        if(y!=endY){
                            if(destY > 2000){y+=5}
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
            if(transition_el.classList.contains("transition-2")){
                let id = null;
                let x = 0;
                let y = 0;
                endX = 3000;
                endY = 2000;
                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==endX && y==endY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=endX){
                            if(endX > 0){x+=5}
                            else{x-=5}
                        }
                        if(y!=endY){
                            if(endY > 0){y+=5}
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
            if(transition_el.classList.contains("transition-3")){
                let id = null;
                let x = 5000;
                let y = 3000;
                endX = 3000;
                endY = 2000;
                clearInterval(id);
                id = setInterval(move, 1);
                function move(){
                    if(x==endX && y==endY){
                        clearInterval(id);
                        finish();
                    }
                    else{
                        if(x!=endX){
                            if(endX > 3000){x+=5}
                            else{x-=5}
                        }
                        if(y!=endY){
                            if(endY > 2000){y+=5}
                            else{y-=5}
                        }
                        transition_el.style.backgroundPosition = x+"px "+ y+"px";
                        if(x%10 == 0){
                            console.log("x = " + x)
                        }
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