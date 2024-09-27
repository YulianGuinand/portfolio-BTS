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

const videos = document.querySelectorAll(".videos");

videos.forEach((video) => {
  window.addEventListener("scroll", () => {
    video.pause();
  });
});

gsap.from(".footer", {
  y: -500,
  scrollTrigger: {
    trigger: ".content",
    start: "bottom bottom",
    scrub: true,
  },
});

gsap.registerPlugin(ScrollTrigger);

gsap.set(".panel", {
  zIndex: (i, target, targets) => targets.length - i,
});

var images = gsap.utils.toArray(".panel:not(.blue)");

images.forEach((image, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "section.s-about",
      start: () => "top -" + window.innerHeight * (i + 0.5),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true,
    },
  });

  tl.to(image, { height: 0 });
});

ScrollTrigger.create({
  trigger: "section.s-about",
  scrub: true,
  pin: true,
  start: "6% top",
  end: () => "+=" + (images.length + 1) * window.innerHeight,
  invalidateOnRefresh: true,
});

const split = new SplitText(".wrapper p", {
  type: "words",
  wordsClass: "word",
});

const scrollBar = document.querySelector(".scrollBar");

const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#textSection",
      start: "top top",
      end: "+=150%",
      scrub: true,
      pin: true,
    },
  })
  .set(
    split.words,
    {
      opacity: 1,
      stagger: 0.1,
    },
    0.1
  )
  .set(scrollBar, {
    innerHeight: "+50%",
  });

document.addEventListener("DOMContentLoaded", function () {
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
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
    duration: 1.5,
    y: 0,
    ease: "power4.out",
    stagger: -0.2,
  });

  timeline.to(
    activeItemIndicator,
    {
      width: "100%",
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
    },
    "<"
  );

  timeline.to(
    ".sub-nav",
    {
      bottom: "10%",
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
    },
    "<"
  );

  toggleButton.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("click");
      if (isOpen) {
        timeline.reverse();
        burger.classList.toggle("active");
      } else {
        burger.classList.toggle("active");
        timeline.play();
      }
      isOpen = !isOpen;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const childSplit = new SplitText(".instruction p", {
    type: "words",
    wordsClass: "word",
  });

  gsap.from(childSplit.words, {
    duration: 1.5,
    yPercent: 150,
    opacity: 0,
    ease: "power4",
    stagger: 0.1,
  });

  gsap.to(".loader svg", {
    opacity: 0,
    delay: 3.5,
    duration: 1,
  });
  gsap.to(".loader .instruction", {
    opacity: 0,
    delay: 3.5,
    duration: 1,
  });
  gsap.to(".loader svg", {
    display: "none",
    delay: 4.5,
    duration: 0.1,
  });
  gsap.to(".loader .instruction", {
    display: "none",
    delay: 4.5,
    duration: 0.1,
  });

  gsap.from(".loader_title", {
    opacity: 0,
    duration: 2,
    ease: "ease",
    delay: 5,
  });
  gsap.to(".loader_title", {
    opacity: 0,
    duration: 1,
    ease: "ease",
    delay: 6.5,
  });
  gsap.to(".loader_title", {
    display: "none",
    duration: 0.1,
    delay: 7.5,
  });
  gsap.from(".loader_title_carpe", {
    opacity: 0,
    duration: 2,
    ease: "ease",
    delay: 8,
  });
  gsap.to(".loader_title_carpe", {
    opacity: 0,
    duration: 1,
    ease: "ease",
    delay: 10,
  });
  gsap
    .to(".loader_title_carpe", {
      display: "none",
      duration: 0.1,
      delay: 11,
    })
    .then(() => {
      window.scrollTo(0, 0);
    });

  gsap.to(".loader", {
    top: "-100%",
    ease: "power4.inOut",
    duration: 2,
    delay: 10.5,
  });
  gsap.to(".loader", {
    display: "none",
    duration: 0.1,
    delay: 12.5,
  });
});
