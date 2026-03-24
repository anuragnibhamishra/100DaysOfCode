const form = document.querySelector("#bmiForm");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const resultBox = document.querySelector("#result");
const suggestionBox = document.querySelector("#suggestion");
const historyList = document.querySelector("#history");
const clearContainer = document.querySelector("#clear");
const clearBtn = document.querySelector("#clearHistory");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!isValidInput(height, weight)) {
    showResult("Please enter valid height and weight.", "text-red-500");
    return;
  }

  const bmi = calculateBMI(weight, height);
  const { category, color } = getBMICategory(bmi);

  showResult(`Your BMI is ${bmi.toFixed(2)} (${category}).`, color);
  showSuggestion(height);

  saveToHistory(bmi, category);
  renderHistory();
});

const isValidInput = (h, w) => h > 0 && w > 0;

const calculateBMI = (weight, height) =>
  weight / ((height / 100) ** 2);

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-yellow-400" };
  if (bmi < 24.9) return { category: "Normal weight", color: "text-green-400" };
  if (bmi < 29.9) return { category: "Overweight", color: "text-orange-400" };
  return { category: "Obesity", color: "text-red-500" };
};

const showResult = (text, colorClass) => {
  resultBox.textContent = text;
  resultBox.className = `mt-6 text-center text-lg font-medium ${colorClass}`;
};

const showSuggestion = (height) => {
  const min = 18.5 * ((height / 100) ** 2);
  const max = 24.9 * ((height / 100) ** 2);

  suggestionBox.textContent =
    `Ideal weight range: ${min.toFixed(1)}kg – ${max.toFixed(1)}kg`;
};

const getTimestamp = () =>
  new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const saveToHistory = (bmi, category) => {
  const entry = {
    bmi: bmi.toFixed(2),
    category,
    timestamp: getTimestamp(),
  };

  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

  history.unshift(entry);
  if (history.length > 5) history.pop();

  localStorage.setItem("bmiHistory", JSON.stringify(history));
};

const renderHistory = () => {
  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

  historyList.innerHTML = "";

  clearContainer.style.display = history.length ? "block" : "none";

  if (!history.length) {
    historyList.innerHTML =
      `<li class="text-neutral-500">No history available.</li>`;
    return;
  }

  history.forEach(({ bmi, category, timestamp }) => {
    const li = document.createElement("li");
    li.textContent = `${bmi} (${category}) – ${timestamp}`;
    historyList.appendChild(li);
  });
};

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("bmiHistory");
  renderHistory();
});

renderHistory();