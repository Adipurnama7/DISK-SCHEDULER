function sstf() {
  var dummy = document.querySelector(".track-sequence").value.split(" ").map(Number);
  var ctrack = parseInt(document.querySelector(".current-track").value, 10);
  var direction = document.querySelector(".direction-dropdown").value;

  var arr = [...dummy];
  var f = ctrack;
  var ans = [];

  while (arr.length > 0) {
    var distances = arr.map(function (v) {
      return Math.abs(v - f);
    });
    var minDistance = Math.min(...distances);
    var closestTrack = arr[distances.indexOf(minDistance)];
    arr = arr.filter((item) => item !== closestTrack);
    ans.push(closestTrack);
    f = closestTrack;
  }

  // Sort based on direction (if left, sort in descending order)
  if (direction === "left") {
    ans.sort((a, b) => b - a);
  }

  var seek = 0;
  var totalOrder = [ctrack, ...ans];
  for (var i = 1; i < totalOrder.length; i++) {
    seek += Math.abs(totalOrder[i] - totalOrder[i - 1]);
  }

  document.querySelector(".order").innerHTML = "Urutan Eksekusi: " + totalOrder.join(", ");
  document.querySelector(".time").innerHTML = "Total Waktu Pencarian: " + seek;

  var chartDataPoints = totalOrder.map((track) => ({ y: track }));

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
subButton1.addEventListener("click", sstf, false);
