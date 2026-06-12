var tl = gsap.timeline()
tl.from("#navpart1 h4",{
    // x:300,
    y:-100,  
    duration:0.5,
    delay:1,
    scale:0.5,
    opacity:1,
    stagger:0.3,
})
tl.from("#navpart2 h2",{
    y:-100,  
    duration:1,
    scale:0.5,
    opacity:1,
    stagger:0.3,
    rotate:360,
})

tl.from("#new-2022 h3",{
    x:-50,  
    scale:0,
    opacity:1,
    stagger:0.3,
})

gsap.from("#mini h1",{
    duration:1,
    x:50,  
    scale:0,
    opacity:1,
})
gsap.from("#mini-2 h1",{
    duration:1,
    y:50,  
    scale:0,
    opacity:1,
    stagger:0.3,

})
gsap.from("#mini-3 h1 ",{
    duration:1,
    y:50,  
    scale:0,
    opacity:1,
    stagger:0.3,
})
gsap.from("#green",{
    duration:3,
    y:1000,  
    scale:0,
    opacity:1,
    stagger:0.3,
})

gsap.from("#green2",{
    duration:3,
    y:1000,  
    scale:0,
    opacity:1,
    stagger:0.3,
})

gsap.from("#paragraph h1 , p",{
    delay:3,
    x:-50,   
    scale:0,
    opacity:1,
    stagger:0.1,
})