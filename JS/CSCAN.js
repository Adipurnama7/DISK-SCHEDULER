function cscan() {
  var dummy = document.querySelector(".track-sequence").value.split(" ").map(Number);
  var ctrack = parseInt(document.querySelector(".current-track").value, 10);
  var dir = document.querySelector(".direction-dropdown").value;
  var disk_size = 200;

  var left = [];
  var right = [];

  left.push(0);
  right.push(disk_size - 1);

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
  var run = 2;

  // If the direction is right, restrict scanning to the right direction only
  if (dir === "right") {
    while (run--) {
      for (var i = 0; i < right.length; i++) {
        seek_sequence.push(right[i]);
      }
      // After reaching the last track in one direction, return to the opposite end
      seek_sequence.push(disk_size - 1);
      seek_sequence.push(0);
    }
  }
  // If the direction is left, restrict scanning to the left direction only
  else if (dir === "left") {
    while (run--) {
      for (var i = left.length - 1; i >= 0; i--) {
        seek_sequence.push(left[i]);
      }
      // After reaching the last track in one direction, return to the opposite end
      seek_sequence.push(0);
      seek_sequence.push(disk_size - 1);
    }
  }

  seek_sequence.unshift(ctrack);

  var seek = 0;
  for (var i = 1; i < seek_sequence.length; i++) {
    seek += Math.abs(seek_sequence[i] - seek_sequence[i - 1]);
  }

  document.querySelector(".order").innerHTML = "Urutan Waktu Eksekusi = " + seek_sequence.join(", ");
  document.querySelector(".time").innerHTML = "Total Waktu Pencarian = " + seek;

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 5000,
    theme: "dark2", //"light1", // "dark1", "dark2" "dark1",
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
        dataPoints: seek_sequence.map((track) => ({ y: track })),
      },
    ],
  });
  chart.render();
}

var subButton1 = document.getElementById("addbtn");
subButton1.addEventListener("click", cscan, false);
