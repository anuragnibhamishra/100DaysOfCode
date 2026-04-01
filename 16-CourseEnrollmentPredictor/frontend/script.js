const form = document.getElementById("form");
const resultDiv = document.getElementById("result");

let chartInstance = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const initial_students = document.getElementById("initial").value;
  const growth_rate = document.getElementById("rate").value;
  const max_capacity = document.getElementById("capacity").value;
  const days = document.getElementById("days").value;

  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      initial_students,
      growth_rate,
      max_capacity,
      days
    })
  });

  const data = await response.json();

  resultDiv.innerHTML = `
    <p class="text-lg font-semibold">Final Students: ${data.final_count}</p>
    <p class="${data.status === "FULL" ? "text-red-500" : "text-green-500"} font-bold">
      Status: ${data.status}
    </p>
  `;

  const ctx = document.getElementById("chart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.predictions.map((_, i) => `Day ${i}`),
      datasets: [{
        label: "Student Growth",
        data: data.predictions,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true
    }
  });
});

const resultDisplay = document.querySelector("#resultDisplay");
const btn = document.querySelector("#btn")
btn.addEventListener("click", ()=> {
  resultDisplay.style.display = "flex"
})