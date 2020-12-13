// Set our main variables


var xPosition = 0; // x-coordinate of gaze location
var yPosition = 0; //y-coordinate of gaze location
var gazeArea = []; // array to store eye-gaze coordinates
var area; // area of eye-gaze
var stressCounter = 0; // focus tracker

function buttonOperations(button) {
  document.getElementById("start").style.display = "none";
  document.getElementById("button_container").style.display = "block";
  document.getElementById("description").style.display = "none";
  document.getElementById("tip").style.display = "block";
  webgazer
    .setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      xPosition = data.x;
      yPosition = data.y;

      document.getElementById("rect").style.top = yPosition + "px";
      document.getElementById("rect").style.left = xPosition + "px";

      setInterval(gazeArea.push([xPosition, yPosition]), 500);
    })
    .begin();
}

// update gaze-area array with new position data
function updateGA() {
  while (gazeArea.length > 10) {
    gazeArea.shift();
  }
  console.log("update GA")
}

// calculate the maximum gaze area
function findArea() {
  // separate gazeArea into arrays of xs and ys
  var xs = gazeArea.map(x => x[0]);
  var ys = gazeArea.map(y => y[1]);

  //find minx, maxx, miny, maxy
  var minX = Math.min.apply(Math, xs);
  var maxX = Math.max.apply(Math, xs);
  var minY = Math.min.apply(Math, ys);
  var maxY = Math.max.apply(Math, ys);

  //find difference of x and y
  var difX = maxX - minX;
  var difY = maxY - minY;
  console.log("X: " + difX + " Y: " + difY);

  //find area
  area = difX * difY;
  console.log("area" + area);
}

// compare maximum area to threshold
function showResult() {
    if (area <= 400000) {
    stressCounter++;
    changeBg();
  }
}

// increment opacity of background
function changeBg() {
  var colorStr = "rgba(255,0,0," + stressCounter * 0.001 + ")";
//   console.log(colorStr);
//   console.log("stressCounter: " + stressCounter);
  $("body").css("background-color", colorStr);
}

// display total reading time
function displayTime() {
  var timeDisplay = document.getElementById("time-display");
  var timeArray = timeDisplay.innerHTML.split(":");
  var hr = parseInt(timeArray[0]);
  var min = parseInt(timeArray[1]);
  if (min == 59) {
    hr++;
    min = 0;
    if (hr == 23) {
      hr = 0;
    }
  }
  else {
    min++;
  }
  var minString = "" + min + "";
  timeDisplay.innerHTML = hr + ":" + minString.padStart(2, '0');
}
