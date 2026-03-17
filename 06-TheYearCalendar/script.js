const YearBoxes = document.querySelector("#YearBoxes");
const modal = document.getElementById("modal");

YearBoxes.className = "grid w-full grid-cols-31 gap-2 mt-6 max-md:grid-cols-14 max-lg:grid-cols-14 max-xl:grid-cols-28 max-sm:grid-cols-7";

function getDateFromDayNumber(dayNumber) {
    const year = new Date().getFullYear();
    const date = new Date(year, 0, dayNumber);
    return date;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getWeekday(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date.getDay()];
}

for (let i = 1; i <= 365; i++) {
    const box = document.createElement("div");
    box.className = "w-full h-10 bg-neutral-800 border border-neutral-700 rounded flex items-center justify-center text-xs hover:bg-neutral-700 cursor-pointer transition";
    if (i === 182) {
        box.classList.add("text-purple-600")
    }
    box.textContent = i;
    YearBoxes.appendChild(box);
    box.addEventListener("click", () => {
        const dayNumber = i;
        const date = getDateFromDayNumber(dayNumber);
        const formattedDate = formatDate(date);
        const weekday = getWeekday(date);
        
        modal.innerHTML = `
        <div class="bg-neutral-100/2 border-2 border-neutral-100/12 backdrop-blur-[52px] rounded-2xl shadow-2xl h-96 max-w-md w-full flex items-center justify-center transform scale-95 transition-all duration-300 opacity-0">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-neutral-100 mb-6">Day ${dayNumber}</h2>
            <p class="text-2xl text-neutral-300">${formattedDate}</p>
            <p class="text-lg text-neutral-400">${weekday}</p>
          </div>
        </div>
        `;
        
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        setTimeout(() => {
            modal.classList.add("opacity-100");
            modal.querySelector("div").classList.remove("scale-95", "opacity-0");
            modal.querySelector("div").classList.add("scale-100", "opacity-100");
        }, 10);
    })
}

const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

const boxes = YearBoxes.children;
for (let i = 0; i < dayOfYear && i < boxes.length; i++) {
    boxes[i].style.backgroundColor = "#8E24AA";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove("opacity-100");
    modal.querySelector("div").classList.remove("scale-100", "opacity-100");
    modal.querySelector("div").classList.add("scale-95", "opacity-0");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}