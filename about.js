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
  start: "13% top",
  end: () => "+=" + (images.length + 1) * window.innerHeight,
  invalidateOnRefresh: true,
});

const split = new SplitType(".wrapper p");
const char = document.querySelectorAll(".wrapper p .line .word .char")
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
    char,
    {
      opacity: 1,
      stagger: 0.1,
    },
    0.1
  );

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
    duration: 1.5,
    y: 0,
    ease: "power4.out",
    stagger: -0.2,
  });

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

function shouldShowLoader() {
  const lastVisit = localStorage.getItem("lastAboutTime");
  if (!lastVisit) {
    return true; // Pas de visite précédente enregistrée, donc on affiche le loader
  }

  const currentTime = new Date().getTime();
  const oneHour = 30 * 60 * 1000; // 1/2 heure en millisecondes

  return currentTime - lastVisit > oneHour; // Affiche le loader si plus 1/2 heure s'est écoulée
}

document.addEventListener("DOMContentLoaded", () => {
  if (shouldShowLoader()) {
    const childSplit = new SplitType(".instruction p");
    const charLoad = document.querySelectorAll(".instruction p .line .word")
  
    gsap.from(charLoad, {
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
    gsap.to(".loader_title_carpe", {
      opacity: 1,
      duration: 2,
      ease: "ease",
      delay: 5,
    });
    gsap.to(".loader_title_carpe", {
      opacity: 0,
      duration: 1,
      ease: "ease",
      delay: 7,
    });
    gsap
      .to(".loader_title_carpe", {
        display: "none",
        duration: 0.1,
        delay: 8,
      })
      .then(() => {
        window.scrollTo(0, 0);
      });
  
    gsap.to(".loader", {
      top: "-100%",
      ease: "power4.inOut",
      duration: 2,
      delay: 8.5,
    });
    gsap.to(".loader", {
      display: "none",
      duration: 0.1,
      delay: 11,
    });
    localStorage.setItem("lastAboutTime", new Date().getTime());
  } else {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
  }
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const squareSize = 50;
const canvas = document.getElementById("canvas");
canvas.style.position = "absolute";
const context = canvas.getContext("2d");
let hoveredSquare = { x: -1, y: -1 }; // Pour stocker la position du carré survolé
let animationSquares = []; // Pour stocker les couleurs des carrés avec leur progression

const easingDuration = 300; // Durée de l'animation (en ms)

// Fonction pour redimensionner le canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawSquares();
}

// Fonction d'animation pour l'effet d'easing
function easeOutQuad(t) {
  return t * (2 - t);
}

// Fonction pour démarrer la transition de couleur
function startColorTransition(x, y, fromColor, toColor) {
  const startTime = Date.now();
  const square = { x, y, fromColor, toColor, startTime };
  animationSquares.push(square);
}

// Fonction pour dessiner tous les carrés
function drawSquares() {
  const width = canvas.width;
  const height = canvas.height;

  context.clearRect(0, 0, width, height); // Nettoyer le canvas

  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      const squareColor = getSquareColor(x, y);
      context.fillStyle = `rgb(${squareColor.r}, ${squareColor.g}, ${squareColor.b})`;
      context.fillRect(x, y, squareSize, squareSize);
    }
  }

  updateAnimations(); // Mettre à jour les carrés en animation
  requestAnimationFrame(drawSquares); // Boucle de dessin continue
}

// Fonction pour obtenir la couleur actuelle d'un carré
function getSquareColor(x, y) {
  // Vérifier si un carré est en train d'être animé
  const animatingSquare = animationSquares.find(
    (square) => square.x === x && square.y === y
  );
  if (animatingSquare) {
    const { fromColor, toColor, startTime } = animatingSquare;
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / easingDuration, 1);
    const easedProgress = easeOutQuad(progress);

    return {
      r: Math.round(fromColor.r + (toColor.r - fromColor.r) * easedProgress),
      g: Math.round(fromColor.g + (toColor.g - fromColor.g) * easedProgress),
      b: Math.round(fromColor.b + (toColor.b - fromColor.b) * easedProgress),
    };
  }

  return { r: 255, g: 255, b: 255 }; // Couleur de base : #ebebeb
}

// Fonction pour mettre à jour les animations de carrés
function updateAnimations() {
  // Supprimer les animations terminées
  animationSquares = animationSquares.filter((square) => {
    const elapsedTime = Date.now() - square.startTime;
    return elapsedTime < easingDuration;
  });
}

// Fonction pour détecter la position de la souris et gérer la transition de couleur
function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Trouver les coordonnées du carré correspondant à la position de la souris
  const x = Math.floor(mouseX / squareSize) * squareSize;
  const y = Math.floor(mouseY / squareSize) * squareSize;

  // Si la souris passe sur un nouveau carré, lancer la transition de couleur
  if (hoveredSquare.x !== x || hoveredSquare.y !== y) {
    hoveredSquare = { x, y };
    startColorTransition(
      x,
      y,
      { r: 235, g: 235, b: 235 },
      { r: 65, g: 64, b: 64 }
    ); // De #ebebeb à #414040
  }
}

// Ajouter un listener pour redimensionner et gérer le mouvement de la souris
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousemove", handleMouseMove);

// Démarrer la boucle de dessin
drawSquares();
