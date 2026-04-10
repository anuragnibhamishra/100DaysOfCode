let habits = JSON.parse(localStorage.getItem("newHabit")) || []
const form = document.querySelector("form")
const modalOverlay = document.querySelector("#modalOverlay")
const analyticsCardWrapper = document.querySelector(".AnalyticsCardWrapper")
const AnalyticsCard = document.querySelector("#AnalyticsCard")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let habitNameInput = form.querySelector("#habitName")
    let habitDescInput = form.querySelector("#habitDesc")
    let newHabit = {
        habitName: habitNameInput.value,
        habitDesc: habitDescInput.value,
        statesByDate: {}
    }
    habits.push(newHabit)
    form.reset()
    modalOverlay.style.display = "none"
    renderHabit()
    saveHabits()
})

let states = [
    {
        state: "Not Checked",
        color: "neutral"
    },
    {
        state: "Success",
        color: "green",
    },
    {
        state: "Failed",
        color: "red"
    },
    {
        state: "Skipped",
        color: "yellow"
    }
]

function getDateKey(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d.toISOString().slice(0, 10)
}

function getHabitStateIndex(habit, dateKey) {
    return habit.statesByDate?.[dateKey] ?? 0
}

function setHabitStateIndex(habit, dateKey, index) {
    habit.statesByDate = habit.statesByDate || {}
    habit.statesByDate[dateKey] = index
}

function saveHabits() {
    localStorage.setItem("newHabit", JSON.stringify(habits))
}

let currentMoreModal = null;
let currentEditingHabitIndex = null;
const editModalOverlay = document.querySelector("#editModalOverlay")
const editForm = document.querySelector("#editForm")

function openEditModal(habitIndex) {
    currentEditingHabitIndex = habitIndex
    const habit = habits[habitIndex]
    document.querySelector("#editHabitName").value = habit.habitName
    document.querySelector("#editHabitDesc").value = habit.habitDesc
    editModalOverlay.style.display = "flex"
}

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editHabitName = document.querySelector("#editHabitName").value
    const editHabitDesc = document.querySelector("#editHabitDesc").value
    
    if (currentEditingHabitIndex !== null) {
        habits[currentEditingHabitIndex].habitName = editHabitName
        habits[currentEditingHabitIndex].habitDesc = editHabitDesc
        saveHabits()
        editModalOverlay.style.display = "none"
        renderHabit()
    }
})

document.querySelector("#closeEditBtn").addEventListener("click", () => {
    editForm.reset()
    editModalOverlay.style.display = "none"
    currentEditingHabitIndex = null
})

function showAnalytics(habit) {
    const overview = document.querySelector("#overview")
    const historyHeatmap = document.querySelector("#historyHeatmap")
    
    overview.innerHTML = ""
    historyHeatmap.innerHTML = ""
    
    const infoDiv = document.createElement("div")
    const h1 = document.createElement("h1")
    h1.className = "text-xl font-bold"
    h1.textContent = habit.habitName
    const p = document.createElement("p")
    p.className = "text-neutral-400 mt-2"
    p.textContent = habit.habitDesc
    infoDiv.appendChild(h1)
    infoDiv.appendChild(p)
    overview.appendChild(infoDiv)
    
    const today = new Date()
    for (let i = 59; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateKey = getDateKey(date)
        const stateIndex = getHabitStateIndex(habit, dateKey)
        const state = states[stateIndex]
        
        const dayDiv = document.createElement("div")
        dayDiv.className = `w-6 h-6 rounded-sm bg-${state.color}-600`
        dayDiv.title = `${date.toDateString()}: ${state.state}`
        historyHeatmap.appendChild(dayDiv)
    }
    
    analyticsCardWrapper.classList.remove("hidden")
    analyticsCardWrapper.classList.add("flex")
}

function renderHabit() {
    const habitWrapper = document.querySelector("#habitWrapper")
    if (habits.length === 0) {
    const habitWrapper = document.querySelector("#habitWrapper")
    habitWrapper.innerHTML = ""

    const empty = document.createElement("div")
    empty.className = "w-full flex grow items-center justify-center text-neutral-500"
    empty.textContent = "No habits yet. Start building your system."

    habitWrapper.appendChild(empty)
    return
}
    habitWrapper.innerHTML = ""
    const total = states.length;
    const dateKey = getDateKey(selectedDate)
    for (let i = 0; i < habits.length; i++) {
        const habit = habits[i]
        let habitDiv = document.createElement("div")
        habitDiv.className = "w-full relative h-fit flex items-center bg-neutral-100/4 p-4 rounded-2xl border-2 border-neutral-200/6"
        let category = document.createElement("button")
        category.className = "w-12 h-12 mr-4 bg-purple-600 rounded-2xl flex shrink-0 items-center justify-center"
        category.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-apple pointer-events-none"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692" /></svg>`
        let infoDiv = document.createElement("div")
        let h1 = document.createElement("h1")
        h1.className = "text-xl"
        h1.textContent = habit.habitName
        let p = document.createElement("p")
        p.className = "text-neutral-400"
        p.textContent = habit.habitDesc
        let state = document.createElement("button")
        function renderState() {
            const currentState = states[getHabitStateIndex(habit, dateKey)]
            state.className = `ml-auto px-6 py-2 rounded-xl bg-${currentState.color}-600`
            state.textContent = currentState.state
        }
        renderState()
        state.addEventListener("click", () => {
            const nextIndex = (getHabitStateIndex(habit, dateKey) + 1) % total;
            setHabitStateIndex(habit, dateKey, nextIndex)
            renderState()
            saveHabits()
        })
        let more = document.createElement("button")
        more.className = "ml-2"
        more.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`
        let moreModal = document.createElement("div")
        moreModal.className = "w-fit p-4 bg-neutral-100/4 border-2 backdrop-blur-xs hidden border-neutral-200/4 h-fit flex-col absolute rounded-3xl gap-2 right-6 bottom-12 z-10"
        let editBtn = document.createElement("button")
        editBtn.className = "px-6 py-2 bg-blue-700 rounded-xl flex items-center justify-center"
        editBtn.textContent = "Edit"
        editBtn.addEventListener("click", () => {
            openEditModal(i)
        })
        let deleteBtn = document.createElement("button")
        deleteBtn.className = "px-6 py-2 bg-red-600 rounded-xl flex items-center justify-center"
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", () => {
            habits.splice(i, 1)
            saveHabits()
            renderHabit()
        })
        more.addEventListener("click", (e) => {
            e.stopPropagation(); 
            if (currentMoreModal && currentMoreModal !== moreModal) {
                currentMoreModal.classList.add("hidden");
                currentMoreModal.classList.remove("flex");
            }
            moreModal.classList.toggle("hidden");
            moreModal.classList.toggle("flex");
            currentMoreModal = moreModal.classList.contains("flex") ? moreModal : null;
        })
        moreModal.appendChild(editBtn)
        moreModal.appendChild(deleteBtn)
        infoDiv.appendChild(h1)
        infoDiv.appendChild(p)
        function addUI(div) {
            div.appendChild(category)
            div.appendChild(infoDiv)
            div.appendChild(state)
        }
        addUI(habitDiv)
        habitDiv.appendChild(more)
        habitDiv.appendChild(moreModal)
        habitWrapper.appendChild(habitDiv)
        habitDiv.addEventListener("click", (e) => {
            if (e.target === state || e.target === more || moreModal.contains(e.target)) return;
            if (currentMoreModal) {
                currentMoreModal.classList.add("hidden");
                currentMoreModal.classList.remove("flex");
                currentMoreModal = null;
            }
            showAnalytics(habit);
        })
    }
}

document.querySelector("#clearBtn").addEventListener("click", () => {
    form.reset()
    modalOverlay.style.display = "none"
})

document.querySelector("#newHabitBtn").addEventListener("click", () => {
    modalOverlay.style.display = "flex"
})

const scrollRef = document.getElementById('dateScroller')
const container = document.getElementById('datesContainer')

let selectedDate = new Date()

function normalize(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d.getTime()
}

function isToday(date) {
    return normalize(date) === normalize(new Date())
}

function isSelected(date) {
    return normalize(date) === normalize(selectedDate)
}

function renderDates() {
    container.innerHTML = ''
    const today = new Date()
    const dates = []

    for (let i = -30; i <= 30; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() + i)
        dates.push(d)
    }

    dates.forEach((date) => {
        const btn = document.createElement('button')
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
        const dateNum = date.getDate()

        btn.dataset.today = isToday(date)

        btn.className = `flex flex-col items-center justify-between min-w-14 h-20 rounded-[18px] cursor-pointer ${isSelected(date)
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-neutral-900 text-neutral-300 hover:outline-purple-600 hover:outline-2'
            }`

        const top = document.createElement('span')
        top.className = 'text-xs leading-none font-medium w-full h-6 flex justify-center items-center'
        top.innerText = dayName

        const bottom = document.createElement('span')
        bottom.className = `text-lg leading-none font-medium w-full h-14 rounded-[18px] flex justify-center items-center ${isSelected(date) ? 'bg-neutral-900/40' : 'bg-neutral-800'
            } ${isToday(date) && !isSelected(date) ? 'text-[#8338EC]' : ''
            }`
        bottom.innerText = dateNum

        btn.appendChild(top)
        btn.appendChild(bottom)

        btn.onclick = () => {
            selectedDate = date
            renderDates()
            renderHabit()
        }

        container.appendChild(btn)
    })

}

requestAnimationFrame(() => {
    scrollRef.scrollLeft = (container.scrollWidth - scrollRef.clientWidth) / 2
})
renderDates()

renderHabit()

document.querySelector("#closeAnalytics").addEventListener("click", () => {
    analyticsCardWrapper.classList.add("hidden")
    analyticsCardWrapper.classList.remove("flex")
})

analyticsCardWrapper.addEventListener("click", (e) => {
    if (e.target === analyticsCardWrapper) {
        analyticsCardWrapper.classList.add("hidden")
        analyticsCardWrapper.classList.remove("flex")
    }
})