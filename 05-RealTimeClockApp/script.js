const dateDisplay = document.querySelector("#date");
const timeDisplay = document.querySelector("#time");
const formatToggle = document.querySelector("#formatToggle");
const thumb = document.querySelector("#thumb");

let is24Hour = true; // Start with 24-hour format

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let timeString;
    if (is24Hour) {
        hours = hours < 10 ? "0" + hours : hours;
        timeString = `${hours}:${minutes}:${seconds}`;
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? "0" + hours : hours;
        timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    timeDisplay.textContent = timeString;

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    dateDisplay.textContent = `${day}-${month}-${year}`;
}

function toggleFormat() {
    is24Hour = !is24Hour;

    // Update thumb position based on format
    if (is24Hour) {
        thumb.classList.remove("left-2", "bg-neutral-700");
        thumb.classList.add("right-2", "bg-purple-600");
    } else {
        thumb.classList.remove("right-2", "bg-purple-600");
        thumb.classList.add("left-2", "bg-neutral-700");
    }

    updateClock();
}

formatToggle.addEventListener('click', toggleFormat);

updateClock();
setInterval(updateClock, 1000);