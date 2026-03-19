const StartBtn = document.querySelector("#StartBtn");
const PauseBtn = document.querySelector("#PauseBtn");
const ResumeBtn = document.querySelector("#ResumeBtn");
const StopBtn = document.querySelector("#StopBtn");
const TimerDisplay = document.querySelector("#TimerDisplay");

let CurrentState = "focus";
let sessionCount = 0;
let RemainingTime = 0;
let IntervalId = null;

function getDuration(state, count) {
    if (state === "focus") return 5 * 60;
    if (count % 3 === 0) return 3 * 60;
    return 1 * 60;
}

function renderTime() {
    const minutes = Math.floor(RemainingTime / 60);
    const seconds = RemainingTime % 60;
    TimerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function switchState() {
    if (CurrentState === "focus") {
        sessionCount++;
        CurrentState = "break";
    } else {
        CurrentState = "focus";
    }
    RemainingTime = getDuration(CurrentState, sessionCount);
    renderTime();
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
        renderTime();
    }
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
    RemainingTime = getDuration(CurrentState, sessionCount);
    renderTime();
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