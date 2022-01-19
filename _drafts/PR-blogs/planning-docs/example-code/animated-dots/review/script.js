// Request animation frame polyfill for old browsers
const rafPolyfill = () => {
  const vendors = ["ms", "moz", "webkit", "o"];
  let lastTime = 0;

  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;

      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  }
};

// Accessibility features

const initAccessibilityFeatures = () => {
  const setPrefersReducedMotion = (preference) => {
    if (preference === true) {
      animationsActive = false;
    }

    if (preference === false) {
      animationsActive = true;
    }
  };

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!mediaQuery || mediaQuery.matches) {
    setPrefersReducedMotion(true);
  } else {
    setPrefersReducedMotion(false);
  }

  mediaQuery.addEventListener("change", () => {
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    } else {
      setPrefersReducedMotion(false);
    }
  });

  document.getElementById("element-width").addEventListener("change", (e) => {
    const container = document.getElementsByClassName("canvas-container")[0];
    const curWidth = document.getElementsByClassName("current-width")[0];
    container.style.width = `${e.target.value}%`;
    curWidth.innerText = `Current canvas width: ${e.target.value}%`;
    handleCanvasResize();
  });

  document.getElementById("animation-speed").addEventListener("change", (e) => {
    FPS = e.target.value;
    const curSpeed = document.getElementsByClassName("current-speed")[0];
    curSpeed.innerText = `Current animation speed: ${e.target.value} frames per second`;
  });

  document
    .getElementById("toggle-animations")
    .addEventListener("click", (e) => {
      animationsActive = !animationsActive;
      const animationStatus =
        document.getElementsByClassName("animation-status")[0];
      animationStatus.innerText =
        animationsActive === true
          ? "Animations are: on"
          : "Animations are: off";
    });
};


// App
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// innaccessible .. or are they?
const colors = [
  "#af0", // #324D00
  "#7CD14E", // #294D14
  "#1CDCFF", // #004E5C
  "#FFFF00", // #474747
  "#FF0000", // #940000
  "#aee137", // #3B4D0A
  "#bef202", // #454545
  "#00b2ff", // #004B6B
  "#7fff24", // #474747
  "#13cd4b", // #06511C
  "#c0fa38", // #474747
  "#f0a", // #474747
  "#a0f", // #474747
  "#0af", // #474747
  "#000000",
];

// State
let mouse = { x: 0, y: 0 };
let mouseMove = false;
let mouseDown = false;
let distanceX = null;
let distanceY = null;
const dotsHolder = [];
let animationsActive = false;

// Canvas events
const handleMouseUp = () => {
  if (mouseMove) {
    mouseMove = false;
  }
  if (mouseDown) {
    mouseDown = false;
  }
};

const handleMouseDown = () => {
  mouseDown = true;
};

const handleMouseMove = (event) => {
  mouse.x = event.pageX - canvas.offsetLeft;
  mouse.y = event.pageY - canvas.offsetTop;

  if (mouseMove) {
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
  }
};

const handleCanvasResize = () => {
  const container = document.getElementsByClassName("canvas-container")[0];

  canvas.height = container.getBoundingClientRect().height;
  canvas.width = container.getBoundingClientRect().width;
  cancelAnimationFrame(animate);
};

const makeDot = () => {
  const radius = Math.random() * 10;

  return {
    xPos: Math.random() * canvas.width,
    yPos: Math.random() * canvas.height,

    radius: radius,
    speedX: Math.cos(radius),
    speedY: Math.sin(radius),

    stepSize: Math.random() / 10,
    step: 0,
    friction: 7,

    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

const drawDots = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const updateDotCoords = (dot) => {
    dot.xPos += dot.speedX;
    dot.yPos += dot.speedY;

    if (dot.xPos < -50) {
      dot.xPos = canvas.width + 50;
    }
    if (dot.yPos < -50) {
      dot.yPos = canvas.height + 50;
    }
    if (dot.xPos > canvas.width + 50) {
      dot.xPos = -50;
    }
    if (dot.yPos > canvas.height + 50) {
      dot.yPos = -50;
    }
  };

  const drawDot = (dot) => {
    const particleDistance = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY
    );
    const particleMouse = Math.max(
      Math.min(75 / (particleDistance / dot.radius), 7),
      1
    );
    const arcConfig = {
      x: dot.xPos,
      y: dot.yPos,
      radius: (dot.radius / 2.5) * particleMouse,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      drawCounterClockwise: false,
    };
    const outlineConfig = {
      ...arcConfig,
      radius: (dot.radius / 2) * particleMouse,
    };

    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(...Object.values(outlineConfig));
    context.fill();

    context.beginPath();
    context.fillStyle = dot.color;
    context.arc(...Object.values(arcConfig));
    context.fill();
  };

  const handleForceField = (dot) => {
    if (mouseDown) {
      const minimumDistance = 164;
      const distance = Math.sqrt(
        (dot.xPos - mouse.x) * (dot.xPos - mouse.x) +
          (dot.yPos - mouse.y) * (dot.yPos - mouse.y)
      );

      if (distance < minimumDistance) {
        const forceFactor = minimumDistance / (distance * distance);
        const xforce = ((mouse.x - dot.xPos) % distance) / 7;
        const yforce = ((mouse.y - dot.yPos) % distance) / dot.friction;
        const forceField = (forceFactor * 2) / dot.friction;

        dot.speedX -= forceField * xforce;
        dot.speedY -= forceField * yforce;
      }

      if (dot.speedX > dot.speed) {
        dot.speedX = dot.speed / dot.friction;
        dot.speedY = dot.speed / dot.friction;
      } else if (dot.speedY > dot.speed) {
        dot.speedY = dot.speed / dot.friction;
      }
    }
  };

  dotsHolder.forEach((dot) => {
    distanceX = dot.xPos - mouse.x;
    distanceY = dot.yPos - mouse.y;

    if (animationsActive === true) {
      updateDotCoords(dot);
    }

    handleForceField(dot);
    drawDot(dot);
  });
};

let FPS = 100;
let lastTimestamp = 0;

const animate = (timestamp) => {
  requestAnimationFrame(animate);

  if (timestamp - lastTimestamp < 1000 / FPS) return;
  drawDots();
  lastTimestamp = timestamp;
};

const initialize = () => {
  rafPolyfill();
  initAccessibilityFeatures();

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);
  window.addEventListener("resize", handleCanvasResize, false);

  for (i = 0; i < 1000; i++) {
    dotsHolder.push(makeDot());
  }

  animate();
};

initialize();
