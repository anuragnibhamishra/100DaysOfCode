let minus = document.querySelector("#minus");
let countButton = document.querySelector("#reset");
let plus = document.querySelector("#plus");
let count = 0;

function render() {
  reset.textContent = `Count is ${count}`;
  minus.disabled = count === 0;
  minus.classList.toggle("opacity-50", count === 0);
}

plus.addEventListener("click", function plusClick() {
  count++;
  render();
});

minus.addEventListener("click", function minusClick() {
  if (count > 0) {
    count--;
    render();
  }
});

countButton.addEventListener("click", function resetClick() {
  count = 0;
  render();
});

window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;

  let handled = true;
  let step = getStep(e);

  switch (e.key) {
    case "ArrowRight":
    case "+":
      count += step;
      break;

    case "ArrowLeft":
    case "-":
      count = Math.max(0, count - step);
      break;

    case "r":
    case "R":
    case "0":
    case " ":
      count = 0;
      break;

    default:
      handled = false;
  }

  if (handled) {
    e.preventDefault();
    render();
  }
});

function getStep(e) {
  if (e.ctrlKey) return 10;
  if (e.shiftKey) return 5;
  return 1;
}

render();
