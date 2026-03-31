let habits = JSON.parse(localStorage.getItem("newHabit")) || []
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let habitNameInput = form.querySelector("#habitName")
    let habitDescInput = form.querySelector("#habitDesc")
    let newHabit = {
        habitName: habitNameInput.value,
        habitDesc: habitDescInput.value,
    }
    habits.push(newHabit)
    form.reset()
    document.querySelector("#modalOverlay").style.display = "none"
    renderHabit()
    localStorage.setItem("newHabit", JSON.stringify(habits));
})

function renderHabit() {
    document.querySelector("#habitWrapper").innerHTML = ""
    habits.forEach((habit) => {
        let habitDiv = document.createElement("div")
        habitDiv.className = "w-full h-fit bg-neutral-100/4 p-4 rounded-2xl border-2 border-neutral-200/6"
        let h1 = document.createElement("h1")
        h1.className = "text-2xl"
        h1.textContent = `${habit["habitName"]}`
        let h2 = document.createElement("h2")
        h2.textContent = `${habit["habitDesc"]}`
        habitDiv.appendChild(h1)
        habitDiv.appendChild(h2)
        document.querySelector("#habitWrapper").appendChild(habitDiv)
    })
}

document.querySelector("#clearBtn").addEventListener("click", () => {
    form.reset()
    modalOverlay.style.display = "none"
})

document.querySelector("#newHabitBtn").addEventListener("click", () => {
    modalOverlay.style.display = "flex"
})
console.log(habits)
renderHabit()