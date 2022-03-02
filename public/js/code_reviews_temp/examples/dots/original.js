import React from "../../snowpack/pkg/react.js";
import Playground from "../../snowpack/pkg/@agney/playground.js";
import "../../snowpack/pkg/@reach/tabs/styles.css.proxy.js";
const improvedCSS = `body,canvas{
    background: -moz-radial-gradient(center, ellipse cover, rgba(255, 153, 153, 1) 0%, rgba(255, 100, 100, 1) 100%);
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255, 153, 153, 1)), color-stop(100%,rgba(255, 100, 100, 1)));
  background: -webkit-radial-gradient(center, ellipse cover, rgba(255, 153, 153, 1) 0%,rgba(255, 100, 100, 1) 100%);
  background: -o-radial-gradient(center, ellipse cover, rgba(255, 153, 153, 1) 0%,rgba(255, 100, 100, 1) 100%);
  background: -ms-radial-gradient(center, ellipse cover, rgba(255, 153, 153, 1) 0%,rgba(255, 100, 100, 1) 100%);
  background: radial-gradient(ellipse at center, rgba(255, 153, 153, 1) 0%,rgba(255, 100, 100, 1) 100%);
    overflow-y:hidden;
    overflow-x:hidden;
    width:100%;
    margin:0;
  }
  
  #desc{
  font-size:85%;
  font-family:tahoma;
  color:#222;
  width:250px;
  float:left;
  position:absolute;
  margin:5px;
  background-color:rgba(255, 255, 255, 0.5);
  
  }
  `;
const improvedJS = 'window.onload = init();\nfunction init() {\n  canvas = document.getElementById("canvas");\n  context = canvas.getContext("2d");\n  canvas.height = window.innerHeight;\n  canvas.width = window.innerWidth;\n  mouse = { x: 0, y: 0 };\n  colors = [\n    "#af0",\n    "#7CD14E",\n    "#1CDCFF",\n    "#FFFF00",\n    "#FF0000",\n    "#aee137",\n    "#bef202",\n    "#00b2ff",\n    "#7fff24",\n    "#13cd4b",\n    "#c0fa38",\n    "#f0a",\n    "#a0f",\n    "#0af",\n    "#000000",\n  ];\n  canvas.addEventListener("mousemove", MouseMove, false);\n  canvas.addEventListener("mousedown", MouseDown, false);\n  canvas.addEventListener("mouseup", MouseUp, false);\n  window.addEventListener("resize", canvasResize, false);\n  dotsHolder = [];\n  mouseMove = false;\n  mouseDown = false;\n  for (i = 0; i < 1000; i++) {\n    dotsHolder.push(new dots());\n  }\n\n  /*REQUEST ANIMATION FRAME*/\n  (function () {\n    var lastTime = 0;\n    var vendors = ["ms", "moz", "webkit", "o"];\n    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {\n      window.requestAnimationFrame =\n        window[vendors[x] + "RequestAnimationFrame"];\n      window.cancelAnimationFrame =\n        window[vendors[x] + "CancelAnimationFrame"] ||\n        window[vendors[x] + "CancelRequestAnimationFrame"];\n    }\n\n    if (!window.requestAnimationFrame)\n      window.requestAnimationFrame = function (callback, element) {\n        var currTime = new Date().getTime();\n        var timeToCall = Math.max(0, 16 - (currTime - lastTime));\n        var id = window.setTimeout(function () {\n          callback(currTime + timeToCall);\n        }, timeToCall);\n        lastTime = currTime + timeToCall;\n        return id;\n      };\n\n    if (!window.cancelAnimationFrame)\n      window.cancelAnimationFrame = function (id) {\n        clearTimeout(id);\n      };\n  })();\n}\nfunction canvasResize(event) {\n  canvas.height = window.innerHeight;\n  canvas.width = window.innerWidth;\n  cancelAnimationFrame(animate);\n}\nfunction MouseUp(event) {\n  if (mouseMove) {\n    mouseMove = false;\n  }\n  if (mouseDown) {\n    mouseDown = false;\n  }\n}\nfunction MouseDown(event) {\n  mouseDown = true;\n}\nfunction MouseMove(event) {\n  mouse.x = event.pageX - canvas.offsetLeft;\n  mouse.y = event.pageY - canvas.offsetTop;\n  if (mouseMove) {\n    context.lineTo(mouseX, mouseY);\n    context.stroke();\n  }\n}\nfunction dots() {\n  this.xPos = Math.random() * canvas.width;\n  this.yPos = Math.random() * canvas.height;\n  this.color = colors[Math.floor(Math.random() * colors.length)];\n  this.radius = Math.random() * 10;\n  this.vx = Math.cos(this.radius);\n  this.vy = Math.sin(this.radius);\n  this.stepSize = Math.random() / 10;\n  this.step = 0;\n  this.friction = 7;\n  this.speedX = this.vx;\n  this.speedY = this.vy;\n}\n\ndots.draw = function () {\n  context.clearRect(0, 0, canvas.width, canvas.height);\n  for (var c = 0; c < dotsHolder.length; c++) {\n    dot = dotsHolder[c];\n    context.beginPath();\n    distanceX = dot.xPos - mouse.x;\n    distanceY = dot.yPos - mouse.y;\n    var particleDistance = Math.sqrt(\n      distanceX * distanceX + distanceY * distanceY\n    );\n    var particleMouse = Math.max(\n      Math.min(75 / (particleDistance / dot.radius), 7),\n      1\n    );\n    context.fillStyle = dot.color;\n    dot.xPos += dot.vx;\n    dot.yPos += dot.vy;\n    if (dot.xPos < -50) {\n      dot.xPos = canvas.width + 50;\n    }\n    if (dot.yPos < -50) {\n      dot.yPos = canvas.height + 50;\n    }\n    if (dot.xPos > canvas.width + 50) {\n      dot.xPos = -50;\n    }\n    if (dot.yPos > canvas.height + 50) {\n      dot.yPos = -50;\n    }\n    context.arc(\n      dot.xPos,\n      dot.yPos,\n      (dot.radius / 2.5) * particleMouse,\n      0,\n      2 * Math.PI,\n      false\n    );\n    context.fill();\n    if (mouseDown) {\n      var minimumDistance = 164,\n        distance = Math.sqrt(\n          (dot.xPos - mouse.x) * (dot.xPos - mouse.x) +\n            (dot.yPos - mouse.y) * (dot.yPos - mouse.y)\n        ),\n        distanceX = dot.xPos - mouse.x,\n        distanceY = dot.yPos - mouse.y;\n      if (distance < minimumDistance) {\n        var forceFactor = minimumDistance / (distance * distance),\n          xforce = ((mouse.x - dot.xPos) % distance) / 7,\n          yforce = ((mouse.y - dot.yPos) % distance) / dot.friction,\n          forceField = (forceFactor * 2) / dot.friction;\n        dot.vx -= forceField * xforce;\n        dot.vy -= forceField * yforce;\n      }\n      if (dot.vx > dot.speed) {\n        dot.vx = dot.speed / dot.friction;\n        dot.vy = dot.speed / dot.friction;\n      } else if (dot.vy > dot.speed) {\n        dot.vy = dot.speed / dot.friction;\n      }\n    }\n  }\n};\nfunction animate() {\n  requestAnimationFrame(animate);\n  dots.draw();\n}\nanimate();\n';
const improvedHTML = `
<html>
  <head>
    <link rel="stylesheet" href="./css.css" />
  </head>
  <body>
    <div id="desc">
      <b>Interactive Dots:</b>Mouse over them to see them grow and mouse down to
      activate force field!
    </div>
    <canvas id="canvas"></canvas>
    <script src="./script.js"></script>
  </body>
</html>
`;
const DotsOriginal = () => {
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
export default DotsOriginal;
