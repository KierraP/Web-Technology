const items = {
  hair: [
    { full: "assets/hair1.PNG", thumb: "assets/hair1-thumb.PNG" },
    { full: "assets/hair2.PNG", thumb: "assets/hair2-thumb.PNG" },
    { full: "assets/hair3.png", thumb: "assets/hair3-thumb.png" },
    { full: "assets/hair4.png", thumb: "assets/hair4-thumb.png"}
  ],
  top: [
    { full: "assets/top1.PNG", thumb: "assets/top1-thumb.PNG" },
    { full: "assets/top2.PNG", thumb: "assets/top2-thumb.PNG" },
    { full: "assets/top3.PNG", thumb: "assets/top3-thumb.PNG" },
    { full: "assets/top4.png", thumb: "assets/top4-thumb.png"}
  ],
  bottom: [
    { full: "assets/bottom1.PNG", thumb: "assets/bottom1-thumb.PNG" },
    { full: "assets/bottom2.PNG", thumb: "assets/bottom2-thumb.PNG" },
    { full: "assets/bottom3.PNG", thumb: "assets/bottom3-thumb.PNG" },
    { full: "assets/bottom4.png", thumb: "assets/bottom4-thumb.png"}
  ],
  jacket: [
    { full: "assets/none.png", thumb: "assets/none-thumb.png" },
    { full: "assets/jacket2.PNG", thumb: "assets/jacket2-thumb.PNG" },
    { full: "assets/jacket3.png", thumb: "assets/jacket3-thumb.png" },
    { full: "assets/jacket4.png", thumb: "assets/jacket4-thumb.png"}
  ],
  accessory: [
    { full: "assets/none.png", thumb: "assets/none-thumb.png" },
    { full: "assets/accessory1.PNG", thumb: "assets/accessory1-thumb.PNG" },
    { full: "assets/accessory2.png", thumb: "assets/accessory2-thumb.png"},
    { full: "assets/accessory3.png", thumb: "assets/accessory3-thumb.png"}
  ],
  shoes: [
    { full: "assets/shoes1.PNG", thumb: "assets/shoes1-thumb.PNG" },
    { full: "assets/shoes3.png", thumb: "assets/shoes3-thumb.png" },
    { full: "assets/shoes4.png", thumb: "assets/shoes4-thumb.png" },
    { full: "assets/shoes2.PNG", thumb: "assets/shoes2-thumb.PNG" }
  ]
};

let currentOutfit = {
  hair: 0,
  top: 0,
  bottom: 0,
  jacket: 0,
  accessory: 0,
  shoes: 0
};


function init() {
  buildAllThumbnails();
  updateCharacter();
  
  document.getElementById("randomBtn")
    .addEventListener("click", randomizeOutfit);
    document.getElementById("screenshotBtn")
  .addEventListener("click", takeScreenshot);
}

function buildAllThumbnails() {
  Object.keys(items).forEach(cat => {
    const container = document.getElementById(`${cat}-options`);
    container.innerHTML = "";

    items[cat].forEach((item, index) => {
      const img = document.createElement("img");
      img.src = item.thumb;
      img.classList.add("thumbnail");

      img.onclick = () => {
        currentOutfit[cat] = index;
        updateCharacter();
        buildAllThumbnails();
      };

      container.appendChild(img);
    });
  });
}

function updateCharacter() {
  document.getElementById("background").src = "assets/background.png";
  document.getElementById("base").src = "assets/base.png";

  document.getElementById("hair").src = items.hair[currentOutfit.hair].full;
  document.getElementById("top").src = items.top[currentOutfit.top].full;
  document.getElementById("bottom").src = items.bottom[currentOutfit.bottom].full;
  document.getElementById("jacket").src = items.jacket[currentOutfit.jacket].full;
  document.getElementById("accessory").src = items.accessory[currentOutfit.accessory].full;
  document.getElementById("shoes").src = items.shoes[currentOutfit.shoes].full;
}

function randomizeOutfit() {
  Object.keys(items).forEach(cat => {
    currentOutfit[cat] =
      Math.floor(Math.random() * items[cat].length);
  });

  updateCharacter();
  buildAllThumbnails();
}

function takeScreenshot() {
  const character = document.getElementById("character");

  html2canvas(character).then(canvas => {
    const link = document.createElement("a");
    link.download = "princess-outfit.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
// -----------------------------
init();
// -----------------------------