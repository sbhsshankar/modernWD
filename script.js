const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


var timeout;

function circleFluff(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollow(xscale, yscale)

        timeout = setTimeout(function(){
            document.querySelector("#min-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${1}, ${1})`
        }, 100)

    })
}

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
    .to(".boundingchild", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        dealy: -.5,
        ease: Expo.easeInOut
    })
}

function circleMouseFollow(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
       document.querySelector("#min-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

circleFluff();
circleMouseFollow();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffOther = 0;

    elem.addEventListener("mouseleave", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffOther = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffOther = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffOther * 0.5)
            
        })
    })
})
