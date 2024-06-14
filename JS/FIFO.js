function fifo() {
  var trackSequence = document.querySelector(".track-sequence").value.split(" ").map(Number);
  var currentTrack = parseInt(document.querySelector(".current-track").value);
  var direction = document.querySelector(".direction-dropdown").value; // Get direction
  var orderOfExecution = [];
  var totalSeekTime = 0;

  // Copy track numbers into orderOfExecution
  for (var i = 0; i < trackSequence.length; i++) {
    orderOfExecution.push(trackSequence[i]);
  }

  // Add initial track position to the beginning
  orderOfExecution.unshift(currentTrack);

  // Reverse the order if direction is right
  if (direction === "right") {
    orderOfExecution.reverse();
  }

  // Calculate total seek time
  for (var i = 1; i < orderOfExecution.length; i++) {
    totalSeekTime += Math.abs(orderOfExecution[i] - orderOfExecution[i - 1]);
  }

  // Display results in HTML
  document.querySelector(".order").innerHTML = "Urutan Eksekusi: " + orderOfExecution.join(", ");
  document.querySelector(".time").innerHTML = "Total Waktu Pencarian: " + totalSeekTime;

  // Render chart
  var chartDataPoints = [];
  for (var i = 0; i < orderOfExecution.length; i++) {
    chartDataPoints.push({ y: orderOfExecution[i] });
  }

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
subButton1.addEventListener("click", fifo, false);
