const todo = document.querySelector("#todo")
const inProgress = document.querySelector("#inProgress")
const completed = document.querySelector("#completed")
const modal = document.querySelector(".modalOverlay")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let draggedItem = null

const columns = {
    todo,
    inProgress,
    completed
}

const save = () => localStorage.setItem("tasks", JSON.stringify(tasks))

Object.values(columns).forEach(col => {
    col.addEventListener("dragover", e => e.preventDefault())
    col.addEventListener("dragenter", () => col.classList.add("hoverover"))
    col.addEventListener("dragleave", () => col.classList.remove("hoverover"))
    col.addEventListener("drop", e => {
        e.preventDefault()
        col.classList.remove("hoverover")
        if (!draggedItem) return
        const id = draggedItem.dataset.id
        tasks = tasks.map(t => t.id === id ? { ...t, status: col.id } : t)
        save()
        render()
    })
})

document.querySelector("#addBtn").addEventListener("click", () => {
    modal.classList.replace("hidden", "flex")
})

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    const title = document.querySelector("#title").value
    const desc = document.querySelector("#desc").value
    tasks.push({ id: Date.now().toString(), title, desc, status: "todo" })
    save()
    e.target.reset()
    modal.classList.replace("flex", "hidden")
    render()
})

function render() {
    const counts = { todo: 0, inProgress: 0, completed: 0 }
    tasks.forEach(t => counts[t.status]++)

    Object.entries(columns).forEach(([key, col]) => {
        col.innerHTML = `
        <div class="flex items-center justify-between">
            <h2>${key === "todo" ? "To-do" : key === "inProgress" ? "In Progress" : "Completed"}</h2>
            <span>${counts[key]}</span>
        </div>`
    })

    const fragment = {
        todo: document.createDocumentFragment(),
        inProgress: document.createDocumentFragment(),
        completed: document.createDocumentFragment()
    }

    tasks.forEach(t => {
        const el = document.createElement("div")
        el.className = "task w-full h-fit cursor-grab rounded-2xl bg-neutral-100/4 p-4 border-2 border-neutral-200/4"
        el.draggable = true
        el.dataset.id = t.id
        el.innerHTML = `
            <h1 class="text-2xl">${t.title}</h1>
            <p class="text-neutral-400">${t.desc}</p>
        `
        el.addEventListener("dragstart", () => draggedItem = el)
        fragment[t.status].appendChild(el)
    })

    Object.entries(fragment).forEach(([key, frag]) => {
        columns[key].appendChild(frag)
    })
}

render()