const StartBtn = document.querySelector("#StartBtn");
const PauseBtn = document.querySelector("#PauseBtn");
const ResumeBtn = document.querySelector("#ResumeBtn");
const StopBtn = document.querySelector("#StopBtn");
const TimerDisplay = document.querySelector("#TimerDisplay");
const longPomodoro = document.querySelector("#longPomodoro");
const mediumPomodoro = document.querySelector("#mediumPomodoro");
const shortPomodoro = document.querySelector("#shortPomodoro");
const loopDisplay = document.querySelector("#LoopDisplay");
const sessionDisplay = document.querySelector("#sessionDisplay");

let mode = "long";
let CurrentState = "focus";
let sessionCount = 0;
let RemainingTime = 0;
let IntervalId = null;
let loopCount = 1;
const totalLoops = 3;
let lastBreakWasLong = false;

const modes = {
  long: { focus: 50, short: 10, long: 30 },
  medium: { focus: 45, short: 15, long: 20 },
  short: { focus: 25, short: 5, long: 15 }
};

function updateModeButtonsDisabled(disabled) {
  [longPomodoro, mediumPomodoro, shortPomodoro].forEach((btn) => {
    btn.disabled = disabled;
    btn.classList.toggle("opacity-50", disabled);
    btn.classList.toggle("cursor-not-allowed", disabled);
  });
}

function updateActiveModeButton() {
  longPomodoro.classList.remove("border-purple-300", "bg-purple-700/20");
  mediumPomodoro.classList.remove("border-purple-300", "bg-purple-700/20");
  shortPomodoro.classList.remove("border-purple-300", "bg-purple-700/20");

  const activeButton = mode === "medium" ? mediumPomodoro : mode === "short" ? shortPomodoro : longPomodoro;
  activeButton.classList.add("border-purple-300", "bg-purple-700/20");
}

function updateLoopDisplay() {
  loopDisplay.textContent = `Loop ${loopCount}/${totalLoops}`;
}

function updateSessionDisplay() {
  sessionDisplay.textContent = CurrentState === "focus" ? "Focus" : "Break";
}

function updateUI() {
  renderTime();
  updateSessionDisplay();
  updateLoopDisplay();
}

function setMode(selected) {
  if (IntervalId) return;
  mode = selected;
  updateActiveModeButton();
  RemainingTime = getDuration(CurrentState, sessionCount);
  updateUI();
}

longPomodoro.addEventListener("click", () => setMode("long"));
mediumPomodoro.addEventListener("click", () => setMode("medium"));
shortPomodoro.addEventListener("click", () => setMode("short"));

function getDuration(state, count) {
  const config = modes[mode];
  if (state === "focus") return config.focus * 60;
  return (count % 3 === 0 ? config.long : config.short) * 60;
}

function renderTime() {
  const m = Math.floor(RemainingTime / 60);
  const s = RemainingTime % 60;
  TimerDisplay.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function switchState() {
  if (CurrentState === "focus") {
    sessionCount++;
    CurrentState = "break";
    lastBreakWasLong = sessionCount % 3 === 0;
    RemainingTime = getDuration("break", sessionCount);
  } else {
    CurrentState = "focus";
    if (lastBreakWasLong && loopCount < totalLoops) {
      loopCount++;
    }
    RemainingTime = getDuration("focus", sessionCount);
  }
  updateUI();
}

function UpdateTimer() {
  if (RemainingTime > 0) {
    RemainingTime--;
    renderTime();
  } else {
    switchState();
  }
}

function StartTimer() {
  if (IntervalId) return;
  if (RemainingTime === 0) {
    RemainingTime = getDuration(CurrentState, sessionCount);
  }
  updateModeButtonsDisabled(true);
  updateUI();
  IntervalId = setInterval(UpdateTimer, 1000);
}

function PauseTimer() {
  clearInterval(IntervalId);
  IntervalId = null;
}

function StopTimer() {
  PauseTimer();
  CurrentState = "focus";
  sessionCount = 0;
  loopCount = 1;
  lastBreakWasLong = false;
  RemainingTime = getDuration(CurrentState, sessionCount);
  updateModeButtonsDisabled(false);
  updateUI();
}

StartBtn.addEventListener("click", () => {
  StartBtn.classList.add("hidden");
  PauseBtn.classList.remove("hidden");
  PauseBtn.classList.add("flex");
  StartTimer();
});

PauseBtn.addEventListener("click", () => {
  PauseBtn.classList.add("hidden");
  PauseBtn.classList.remove("flex");
  ResumeBtn.classList.remove("hidden");
  ResumeBtn.classList.add("flex");
  StopBtn.classList.remove("hidden");
  StopBtn.classList.add("flex");
  PauseTimer();
});

ResumeBtn.addEventListener("click", () => {
  ResumeBtn.classList.add("hidden");
  ResumeBtn.classList.remove("flex");
  StopBtn.classList.add("hidden");
  StopBtn.classList.remove("flex");
  PauseBtn.classList.remove("hidden");
  PauseBtn.classList.add("flex");
  StartTimer();
});

StopBtn.addEventListener("click", () => {
  ResumeBtn.classList.add("hidden");
  ResumeBtn.classList.remove("flex");
  StopBtn.classList.add("hidden");
  StopBtn.classList.remove("flex");
  StartBtn.classList.remove("hidden");
  StartBtn.classList.add("flex");
  StopTimer();
});

updateActiveModeButton();
RemainingTime = getDuration(CurrentState, sessionCount);
updateUI();
