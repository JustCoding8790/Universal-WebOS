function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#TimeElement");
    timeText.innerHTML = currentTime
}
setInterval(updateTime, 1000);

var biggestIndex = 0;
var selectedIcon = undefined
var bottombar = document.querySelector("#top");

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenOpen = document.querySelector("#welcomeopen");
var welcomeScreenClose = document.querySelector("#welcomeclose");

var prevEntry = 1;
var entryNum = 1;
var notebook = document.querySelector("#notebook");
var notebookOpen = document.querySelector("#notebookopen");
var notebookClose = document.querySelector("#notebookclose");
var notebookNextButton = document.querySelector("#notebooknextbutton")
var notebookBackButton = document.querySelector("#notebookbackbutton")
var voidEntry = document.querySelector("#voidentry")
var plainsEntry = document.querySelector("#plainsentry")
var coastEntry = document.querySelector("#coastentry")

// Selecting icons
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element, window) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(window);
  } else {
    if (selectedIcon != undefined) {
      deselectIcon(selectedIcon);
    }
    selectIcon(element);
  }
}

welcomeScreenOpen.addEventListener("click", function() {
  handleIconTap(welcomeScreenOpen, welcomeScreen);
});

notebookOpen.addEventListener("click", function() {
  handleIconTap(notebookOpen, notebook);
});

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

notebookClose.addEventListener("click", function() {
  closeWindow(notebook);
});

// Natural Notebook Entry Management

function changeEntry() {
  if (prevEntry == 0) {
    voidEntry.style.display = "none"
  }
  else if (prevEntry == 1) {
    plainsEntry.style.display = "none"
  }
  else if (prevEntry == 2) {
    coastEntry.style.display = "none"
  }
  if (entryNum == 0) {
    voidEntry.style.display = "block"
    notebook.style.backgroundColor = "rgb(106, 68, 150)"
    notebookBackButton.style.backgroundColor = "rgb(208, 158, 255)";
    notebookNextButton.style.backgroundColor = "rgb(208, 158, 255)";
  }
  else if (entryNum == 1) {
    plainsEntry.style.display = "block"
    notebook.style.backgroundColor = "rgb(68, 150, 86)"
    notebookBackButton.style.backgroundColor = "rgb(100, 255, 108)";
    notebookNextButton.style.backgroundColor = "rgb(100, 255, 108)";
  }
  else if (entryNum == 2) {
    coastEntry.style.display = "block"
    notebook.style.backgroundColor = "rgb(68, 110, 150)"
    notebookBackButton.style.backgroundColor = "rgb(100, 211, 255)";
    notebookNextButton.style.backgroundColor = "rgb(100, 211, 255)";
  }
}

notebookNextButton.addEventListener("click", function() {
  prevEntry = entryNum;
  entryNum += 1;
  if (entryNum > 2) {
    entryNum = 0;
  }
  changeEntry();
});

notebookBackButton.addEventListener("click", function() {
  prevEntry = entryNum;
  entryNum -= 1;
  if (entryNum < 0) {
    entryNum = 2;
  }
  changeEntry();
});

// Moving windows to top
function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  taskbar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon);
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(notebook);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notebook"));

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  taskbar.style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
  element.style.display = "none"
}

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}