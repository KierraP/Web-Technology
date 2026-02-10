function makechoice(choice) {
  const story = document.getElementById("story");
  const image = document.getElementById("cat-pic");


  if (choice === "jump") {
    story.textContent =
      "You eye the tall lamp in the living room. Jumping at it would probably knock it over. Do you do it?";
    image.src = "images/lamp.png";
    morechoices(["Yes! I am chaos incarnate.", "No, too much effort."]);
  } 

  else if (choice === "knockover") {
    story.textContent =
      "You jump on the kitchen counter and see your human's boba tea. Are you sure you want to knock it over?";
    image.src = "images/bobatea.PNG";
    morechoices(["Yes! A mess we must make!", "No, too boring."]);
  } 

  else if (choice === "sleep") {
    story.textContent =
      "You find a cardboard box to sleep in. You push the cat that is already in the box out. The box is yours now. Sleep now?";
    image.src = "images/othercat.png";
    morechoices(["Yes, I claim victory and this box is my prize.", "No, I don't think I want the box anymore."]);
  }
}


function morechoices(options) {
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  for (let i = 0; i < options.length; i++) {
    const button = document.createElement("button");
    button.textContent = options[i];
    button.onclick = function () {
      end(options[i]);
    };
    choicesDiv.appendChild(button);
  }
}



function end(decision) {
  const story = document.getElementById("story");
  const choicesDiv = document.getElementById("choices");

  story.textContent =
    "Congratulations, you displayed typical cat behavior today.";
  choicesDiv.innerHTML = "<button onclick='restart()'>Play Again</button>";
}

function restart() {
  location.reload();
}