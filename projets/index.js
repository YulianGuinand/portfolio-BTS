const initLenis = () => {
  const lenis = new Lenis({
    content: document.querySelector(".frame"),

    lerp: 0.08,
    smoothWheel: true,
    orientation: "vertical",
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

initLenis();

document.addEventListener("DOMContentLoaded", function () {
  
  const burger = document.querySelector(".burger");
  const toggleButton = document.querySelectorAll(".buttonLink");
  let isOpen = false;

  gsap.set(".menu-item p", { y: -225 });

  const timeline = gsap.timeline({ paused: true });

  timeline.to(".overlay", {
    duration: 1.5,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.out",
  });

  timeline.to(".menu-item p", {
    delay: -0.9,
    duration: 1,
    y: 0,
    ease: "power4.out",
    stagger: -0.2,
  });

  timeline.to(
    ".sub-nav",
    {
      bottom: "10%",
      opacity: 1,
      duration: 0.2,
      delay: 0.5,
    },
    "<"
  );

  toggleButton.forEach((button) => {
    button.addEventListener("click", function () {
      if (isOpen) {
        timeline.to(
          ".sub-nav",
          {
            bottom: "0%",
            opacity: 0,
            duration: 0.2,
            delay: 0.5,
          },
          "<"
        );
        timeline.to(".menu-item p", {
          delay: -0.1,
          duration: 1,
          y: -100,
          ease: "power4.out",
          stagger: -0.2,
        });
        timeline.to(".overlay", {
          duration: 1,
          delay: -1,
          height: "0%",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          ease: "power4.out",
        });
        
        burger.classList.toggle("active");
      
      } else {
        burger.classList.toggle("active");
        timeline.play();
      }
      isOpen = !isOpen;
    });
  });
});
