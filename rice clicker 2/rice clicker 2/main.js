const localcounter = localStorage.getItem("rice.rice")
const counter = document.getElementById("counter")
let count = 0

let fall = `<img src="img/fall.png" alt="" class="ricesmall">`

function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}


async function play() {
  var sfx = new Audio("https://www.myinstants.com/media/sounds/coin-drop-1.mp3")
  sfx.volume = randInRange(0.5,1)
  sfx.play();
}

async function fallrice() {
  const bg = document.getElementById("bg");
  
  // Create the faller element
  const faller = document.createElement("img");
  faller.src = "img/fall.png";
  faller.alt = "";
  faller.classList.add("ricesmall");

  // Set random X position
  const randomX = Math.floor(Math.random() * (bg.clientWidth - 30));
  faller.style.left = randomX + "px";

  // Set initial Y position (start above the screen)
  let y = -10; // Start just above the visible screen
  faller.style.top = y + "px";

  // Add the rice element to the bg
  bg.appendChild(faller);

  // Fall loop (move the rice down)
  while (y < bg.clientHeight - 30) {
    y += 30; // Fall speed (2px per 50ms)
    faller.style.top = y + "px";

    await new Promise(r => setTimeout(r, 50)); // Wait 50ms before next frame
  }

  // Once the rice hits the ground, remove it from the DOM
  bg.removeChild(faller);
}


if (localcounter !== null) {
  count = parseInt(localcounter);
  alert("save loaded");
} else {
  alert("creating new save");
  localStorage.setItem("rice.rice", "0");
}
counter.innerText = count

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  document.getElementById("img").addEventListener("click", async function () {
    this.classList.add("shrink");
    count += 1
    counter.innerText = count
    play()
    fallrice()
    localStorage.setItem("rice.rice", count.toString())
    await wait(130);
    this.classList.remove("shrink");
  });
  

