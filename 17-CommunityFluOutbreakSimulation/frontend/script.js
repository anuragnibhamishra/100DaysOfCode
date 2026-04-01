// frontend/script.js

let chart;

async function runSimulation() {
  const data = {
    population: document.getElementById("population").value,
    initial_infected: document.getElementById("initial_infected").value,
    beta: document.getElementById("beta").value,
    gamma: document.getElementById("gamma").value,
    vaccination_rate: document.getElementById("vaccination_rate").value,
    days: document.getElementById("days").value,
    closure_day: document.getElementById("closure_day").value || null
  };

  const response = await fetch("http://127.0.0.1:5000/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  renderChart(result);
  showInsights(result);
}

function renderChart(data) {
  const ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.susceptible.map((_, i) => i),
      datasets: [
        {
          label: "Susceptible",
          data: data.susceptible,
          borderWidth: 2
        },
        {
          label: "Infected",
          data: data.infected,
          borderWidth: 2
        },
        {
          label: "Recovered",
          data: data.recovered,
          borderWidth: 2
        }
      ]
    }
  });
}

function showInsights(data) {
  const div = document.getElementById("insights");
  div.innerHTML = `
    Peak Infected: ${data.peak_infected.toFixed(0)} <br>
    Peak Day: ${data.peak_day}
  `;
}