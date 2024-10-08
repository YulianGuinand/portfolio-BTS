const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

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

function sendEmail() {
  const body = `[PORTFOLIO-EMAIL] Name : ${name.value} <br>Email : ${email.value} <br>Sujet : ${subject.value} <br>Message : ${message.value}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "yulianguinand365@gmail.com",
    Password: "D0502270E8F25604C116DD5D972ACA365BB4",
    To: "yulianguinand365@gmail.com",
    From: "yulianguinand365@gmail.com",
    Subject: "Portfolio-Email",
    Body: body,
  }).then((message) => {
    if (message) {
      Swal.fire({
        title: "Succès!",
        text: "Email envoyé!",
        icon: "success",
      });
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});

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

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue + "%";

    let delay = Math.floor(Math.random() * 25) + 37;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

// Fonction pour vérifier si plus d'une heure s'est écoulée
function shouldShowLoader() {
  const lastVisit = localStorage.getItem("lastLoaderTime");
  if (!lastVisit) {
    return true; // Pas de visite précédente enregistrée, donc on affiche le loader
  }

  const currentTime = new Date().getTime();
  const oneHour = 30 * 60 * 1000; // 1/2 heure en millisecondes

  return currentTime - lastVisit > oneHour; // Affiche le loader si plus 1/2 s'est écoulée
}

if (shouldShowLoader()) {
  startLoader();

  // gsap.from(".circles", 2, {
  //   top: "-100%",
  //   ease: "elastic.out",
  //   duration: 1,
  //   delay: 0.1,
  // });

  // gsap.to(".circle-inner-rotator", 1, {
  //   width: "50%",
  //   height: "40%",
  //   ease: "power4.inOut",
  //   delay: 0.5,
  // });
  // gsap.to(".circle-inner-rotator", 1, {
  //   left: "0%",
  //   transform: "translateX(0)",
  //   ease: "power4.inOut",
  //   delay: 1,
  // });
  // gsap.to(".circle-inner-rotator", 1, {
  //   bottom: 0,
  //   ease: "power4.inOut",
  //   delay: 1.5,
  // });
  // gsap.to(".circle-inner-rotator", 1, {
  //   transform: "translateX(-100%)",
  //   left: "calc(100%)",
  //   ease: "power4.inOut",
  //   delay: 2,
  // });
  // gsap.to(".circle-inner-rotator", 1, {
  //   top: "0",
  //   ease: "power4.inOut",
  //   delay: 2.5,
  // });
  // gsap.to(".circle-inner-rotator", 1, {
  //   transform: "translateX(-50%)",
  //   top: "0",
  //   left: "50%",
  //   ease: "power4.inOut",
  //   delay: 3,
  // });
  // gsap.to(".circle-content", 1, {
  //   height: "100%",
  //   ease: "power4.inOut",
  //   delay: 1,
  // });

  gsap.to(".loader", {
    top: "-100%",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 1.5,
  });
  gsap.to(".loader", {
    display: "none",
    duration: 0.1,
    delay: 4.5,
  });
  localStorage.setItem("lastLoaderTime", new Date().getTime());
} else {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}

gsap.from(".footer", {
  y: -50000,
  scrollTrigger: {
    start: "bottom bottom",
    scrub: true,
  },
});

gsap.registerPlugin(ScrollTrigger);
gsap.fromTo(
  "#competencesSection .competences_container_one",
  { x: "-150%" },
  {
    x: "-100%",
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#competencesSection",
    },
  }
);
gsap.fromTo(
  "#competencesSection .competences_container_three",
  { x: "20%" },
  {
    x: "-20%",
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#competencesSection",
    },
  }
);
gsap.fromTo(
  "#competencesSection .competences_container_two",
  { x: "0" },
  {
    x: "-90%",
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#competencesSection",
    },
  }
);
