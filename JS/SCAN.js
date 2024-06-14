function scan() {
  var dummy = document.querySelector(".track-sequence").value.split(" ").map(Number);
  var ctrack = parseInt(document.querySelector(".current-track").value, 10);
  var dir = document.querySelector(".direction-dropdown").value;
  var disk_size = 200;

  var left = [];
  var right = [];

  if (dir == "left") {
    left.push(0);
  } else if (dir == "right") {
    right.push(disk_size - 1);
  }

  for (var i = 0; i < dummy.length; i++) {
    if (dummy[i] < ctrack) left.push(dummy[i]);
    if (dummy[i] > ctrack) right.push(dummy[i]);
  }

  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  var seek_sequence = [];

  // If the direction is left, the arm will move left first
  if (dir == "left") {
    // Add tracks to the seek sequence from right to left
    for (var i = left.length - 1; i >= 0; i--) {
      seek_sequence.push(left[i]);
    }
    // Then add tracks from left to right
    for (var i = 0; i < right.length; i++) {
      seek_sequence.push(right[i]);
    }
  }
  // If the direction is right, the arm will move right first
  else if (dir == "right") {
    // Add tracks to the seek sequence from left to right
    for (var i = 0; i < right.length; i++) {
      seek_sequence.push(right[i]);
    }
    // Then add tracks from right to left
    for (var i = left.length - 1; i >= 0; i--) {
      seek_sequence.push(left[i]);
    }
  }

  seek_sequence.unshift(ctrack);

  var seek = 0;
  for (i = 1; i < seek_sequence.length; i++) {
    seek += Math.abs(seek_sequence[i] - seek_sequence[i - 1]);
  }

  document.querySelector(".order").innerHTML = "Urutan Eksekusi = " + seek_sequence.join(", ");
  document.querySelector(".time").innerHTML = "Total Waktu Pencarian = " + seek;

  var chartDataPoints = seek_sequence.map((track) => ({ y: track }));

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 5000,
    theme: "dark2",
    title: {
      text: "",
      backgroundColor: "#2F303A",
      fontSize: 16,
      fontFamily: "sans-serif",
      fontWeight: "medium",
      horizontalAlign: "left",
    },
    axisY: {
      includeZero: false,
      labelAngle: 0,
      gridThickness: 0.5,
    },
    axisX: {
      interval: 1,
      gridThickness: 0.5,
    },
    data: [
      {
        type: "line",
        dataPoints: chartDataPoints,
      },
    ],
  });
  chart.render();
}

var subButton1 = document.getElementById("addbtn");
subButton1.addEventListener("click", scan, false);
