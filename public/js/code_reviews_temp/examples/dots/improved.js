import React from "../../snowpack/pkg/react.js";
import Playground from "../../snowpack/pkg/@agney/playground.js";
import "../../snowpack/pkg/@reach/tabs/styles.css.proxy.js";
const improvedCSS = `canvas {
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(255, 153, 153, 1) 0%,
      rgba(255, 100, 100, 1) 100%
    );
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(255, 153, 153, 1)),
      color-stop(100%, rgba(255, 100, 100, 1))
    );
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(255, 153, 153, 1) 0%,
      rgba(255, 100, 100, 1) 100%
    );
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(255, 153, 153, 1) 0%,
      rgba(255, 100, 100, 1) 100%
    );
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(255, 153, 153, 1) 0%,
      rgba(255, 100, 100, 1) 100%
    );
    background: radial-gradient(
      ellipse at center,
      rgba(255, 153, 153, 1) 0%,
      rgba(255, 100, 100, 1) 100%
    );
    width: 100%;
    margin: 0;
  }
  
  #desc {
    font-size: 85%;
    font-family: tahoma;
    color: #222;
    width: 250px;
    float: left;
    position: absolute;
    margin: 5px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  `;
const improvedJS = '// Request animation frame polyfill for old browsers\nconst rafPolyfill = () => {\n  const vendors = ["ms", "moz", "webkit", "o"];\n  let lastTime = 0;\n\n  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {\n    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];\n    window.cancelAnimationFrame =\n      window[vendors[x] + "CancelAnimationFrame"] ||\n      window[vendors[x] + "CancelRequestAnimationFrame"];\n  }\n\n  if (!window.requestAnimationFrame) {\n    window.requestAnimationFrame = (callback) => {\n      let currTime = new Date().getTime();\n      let timeToCall = Math.max(0, 16 - (currTime - lastTime));\n      let id = window.setTimeout(() => {\n        callback(currTime + timeToCall);\n      }, timeToCall);\n\n      lastTime = currTime + timeToCall;\n\n      return id;\n    };\n  }\n\n  if (!window.cancelAnimationFrame) {\n    window.cancelAnimationFrame = (id) => clearTimeout(id);\n  }\n};\n\n// Accessibility features\n\nconst initAccessibilityFeatures = () => {\n  const setPrefersReducedMotion = (preference) => {\n    if (preference === true) {\n      animationsActive = false;\n    }\n\n    if (preference === false) {\n      animationsActive = true;\n    }\n  };\n\n  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");\n\n  if (!mediaQuery || mediaQuery.matches) {\n    setPrefersReducedMotion(true);\n  } else {\n    setPrefersReducedMotion(false);\n  }\n\n  mediaQuery.addEventListener("change", () => {\n    if (mediaQuery.matches) {\n      setPrefersReducedMotion(true);\n    } else {\n      setPrefersReducedMotion(false);\n    }\n  });\n\n  document.getElementById("element-width").addEventListener("change", (e) => {\n    const container = document.getElementsByClassName("canvas-container")[0];\n    const curWidth = document.getElementsByClassName("current-width")[0];\n    container.style.width = `${e.target.value}%`;\n    curWidth.innerText = `Current canvas width: ${e.target.value}%`;\n    handleCanvasResize();\n  });\n\n  document.getElementById("animation-speed").addEventListener("change", (e) => {\n    FPS = e.target.value;\n    const curSpeed = document.getElementsByClassName("current-speed")[0];\n    curSpeed.innerText = `Current animation speed: ${e.target.value} frames per second`;\n  });\n\n  document\n    .getElementById("toggle-animations")\n    .addEventListener("click", (e) => {\n      animationsActive = !animationsActive;\n      const animationStatus =\n        document.getElementsByClassName("animation-status")[0];\n      animationStatus.innerText =\n        animationsActive === true\n          ? "Animations are: on"\n          : "Animations are: off";\n    });\n};\n\n\n// App\nconst canvas = document.getElementById("canvas");\nconst context = canvas.getContext("2d");\n\nconst colors = [\n  "#af0", \n  "#7CD14E", \n  "#1CDCFF", \n  "#FFFF00", \n  "#FF0000", \n  "#aee137", \n  "#bef202", \n  "#00b2ff", \n  "#7fff24", \n  "#13cd4b", \n  "#c0fa38", \n  "#f0a", \n  "#a0f", \n  "#0af", \n  "#000000",\n];\n\n// State\nlet mouse = { x: 0, y: 0 };\nlet mouseMove = false;\nlet mouseDown = false;\nlet distanceX = null;\nlet distanceY = null;\nconst dotsHolder = [];\nlet animationsActive = false;\n\n// Canvas events\nconst handleMouseUp = () => {\n  if (mouseMove) {\n    mouseMove = false;\n  }\n  if (mouseDown) {\n    mouseDown = false;\n  }\n};\n\nconst handleMouseDown = () => {\n  mouseDown = true;\n};\n\nconst handleMouseMove = (event) => {\n  mouse.x = event.pageX - canvas.offsetLeft;\n  mouse.y = event.pageY - canvas.offsetTop;\n\n  if (mouseMove) {\n    context.lineTo(mouse.x, mouse.y);\n    context.stroke();\n  }\n};\n\nconst handleCanvasResize = () => {\n  const container = document.getElementsByClassName("canvas-container")[0];\n\n  canvas.height = container.getBoundingClientRect().height;\n  canvas.width = container.getBoundingClientRect().width;\n  cancelAnimationFrame(animate);\n};\n\nconst makeDot = () => {\n  const radius = Math.random() * 10;\n\n  return {\n    xPos: Math.random() * canvas.width,\n    yPos: Math.random() * canvas.height,\n\n    radius: radius,\n    speedX: Math.cos(radius),\n    speedY: Math.sin(radius),\n\n    stepSize: Math.random() / 10,\n    step: 0,\n    friction: 7,\n\n    color: colors[Math.floor(Math.random() * colors.length)],\n  };\n};\n\nconst drawDots = () => {\n  context.clearRect(0, 0, canvas.width, canvas.height);\n\n  const updateDotCoords = (dot) => {\n    dot.xPos += dot.speedX;\n    dot.yPos += dot.speedY;\n\n    if (dot.xPos < -50) {\n      dot.xPos = canvas.width + 50;\n    }\n    if (dot.yPos < -50) {\n      dot.yPos = canvas.height + 50;\n    }\n    if (dot.xPos > canvas.width + 50) {\n      dot.xPos = -50;\n    }\n    if (dot.yPos > canvas.height + 50) {\n      dot.yPos = -50;\n    }\n  };\n\n  const drawDot = (dot) => {\n    const particleDistance = Math.sqrt(\n      distanceX * distanceX + distanceY * distanceY\n    );\n    const particleMouse = Math.max(\n      Math.min(75 / (particleDistance / dot.radius), 7),\n      1\n    );\n    const arcConfig = {\n      x: dot.xPos,\n      y: dot.yPos,\n      radius: (dot.radius / 2.5) * particleMouse,\n      startAngle: 0,\n      endAngle: 2 * Math.PI,\n      drawCounterClockwise: false,\n    };\n    const outlineConfig = {\n      ...arcConfig,\n      radius: (dot.radius / 2) * particleMouse,\n    };\n\n    context.beginPath();\n    context.fillStyle = "#000000";\n    context.arc(...Object.values(outlineConfig));\n    context.fill();\n\n    context.beginPath();\n    context.fillStyle = dot.color;\n    context.arc(...Object.values(arcConfig));\n    context.fill();\n  };\n\n  const handleForceField = (dot) => {\n    if (mouseDown) {\n      const minimumDistance = 164;\n      const distance = Math.sqrt(\n        (dot.xPos - mouse.x) * (dot.xPos - mouse.x) +\n          (dot.yPos - mouse.y) * (dot.yPos - mouse.y)\n      );\n\n      if (distance < minimumDistance) {\n        const forceFactor = minimumDistance / (distance * distance);\n        const xforce = ((mouse.x - dot.xPos) % distance) / 7;\n        const yforce = ((mouse.y - dot.yPos) % distance) / dot.friction;\n        const forceField = (forceFactor * 2) / dot.friction;\n\n        dot.speedX -= forceField * xforce;\n        dot.speedY -= forceField * yforce;\n      }\n\n      if (dot.speedX > dot.speed) {\n        dot.speedX = dot.speed / dot.friction;\n        dot.speedY = dot.speed / dot.friction;\n      } else if (dot.speedY > dot.speed) {\n        dot.speedY = dot.speed / dot.friction;\n      }\n    }\n  };\n\n  dotsHolder.forEach((dot) => {\n    distanceX = dot.xPos - mouse.x;\n    distanceY = dot.yPos - mouse.y;\n\n    if (animationsActive === true) {\n      updateDotCoords(dot);\n    }\n\n    handleForceField(dot);\n    drawDot(dot);\n  });\n};\n\nlet FPS = 100;\nlet lastTimestamp = 0;\n\nconst animate = (timestamp) => {\n  requestAnimationFrame(animate);\n\n  if (timestamp - lastTimestamp < 1000 / FPS) return;\n  drawDots();\n  lastTimestamp = timestamp;\n};\n\nconst initialize = () => {\n  rafPolyfill();\n  initAccessibilityFeatures();\n\n  canvas.height = window.innerHeight;\n  canvas.width = window.innerWidth;\n\n  canvas.addEventListener("mousemove", handleMouseMove, false);\n  canvas.addEventListener("mousedown", handleMouseDown, false);\n  canvas.addEventListener("mouseup", handleMouseUp, false);\n  window.addEventListener("resize", handleCanvasResize, false);\n\n  for (i = 0; i < 1000; i++) {\n    dotsHolder.push(makeDot());\n  }\n\n  animate();\n};\n\ninitialize();\n';
const improvedHTML = `
<html>
  <head>
    <link rel="stylesheet" href="./css.css" />
  </head>
  <body>
    <!-- <div id="desc">
      <b>Interactive Dots:</b>Mouse over them to see them grow and mouse down to
      activate force field!
    </div> -->
    <div class="accessibility-controls">
      <h1>Accessibility controls</h1>
      <div class="prefers-reduced-motion">
        <p>This demo features animations that may disturb visitors with vestibular disorders. By default, these animations have been turned off and substituted with alternative interactive effects.</p>
        <p>If you would like to see these animations, click the "Toggle Animations" button. Animation controls have been included to reduce the size and animation speed of the demo, which may reduce any vestibular disturbances.</p>
        <fieldset aria-live="polite">
          <button id="toggle-animations">Toggle Animations</button>
          <p class="animation-status">Animations are: off</p>
        </fieldset>
      </div>
      <fieldset aria-live="polite">
        <label for="element-width">Canvas width</label>
        <input type="range" id="element-width" name="element-width" min="10" max="100" value="100" step="5"></input>
        <p class="current-width">Current canvas width: 100%</p>
      </fieldset>
      <fieldset aria-live="polite">
        <label for="animation-speed">Animation speed</label>
        <input type="range" id="animation-speed" name="animation-speed" min="10" max="100" value="100" step="5"></input>
        <p class="current-speed">Current animation speed: 100 frames per second</p>
      </fieldset>
      
    </div>

    <div class="canvas-container">
      <canvas id="canvas"></canvas>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
`;
const DotsImproved = () => {
  const snippet = {
    markup: improvedHTML,
    css: improvedCSS,
    javascript: improvedJS
  };
  return /* @__PURE__ */ React.createElement(Playground, {
    initialSnippet: snippet,
    defaultEditorTab: "javascript"
  });
};
export default DotsImproved;
