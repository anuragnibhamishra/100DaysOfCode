const todo = document.querySelector("#todo")
const inProgress = document.querySelector("#inProgress")
const completed = document.querySelector("#completed")
const modal = document.querySelector(".modalOverlay")
const closeBtn = document.querySelector("#closeBtn")



let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let draggedItem = null

const columns = {
    todo,
    inProgress,
    completed
}

function toast(config) {
    return function (str) {
        let parent = document.querySelector("#toastParent");
        let div = document.createElement("div");
        div.className = `toast inline-block px-4 py-2 rounded-lg pointer-events-none ${config.theme === "dark" ? "bg-neutral-800 text-neutral-100" : "bg-neutral-100 text-neutral-900"}`;
        div.textContent = str;
        div.style.setProperty("--toast-stay", `${Math.max(0.1, config.duration - 0.25)}s`);
        parent.appendChild(div);
        parent.className = "fixed z-50 p-10 gap-2 items-end bottom-5 right-5 flex flex-col w-fit";

        if (config.PositionX !== "right" || config.PositionY !== "bottom") {
            parent.className += `${config.PositionX === "left" ? " left-5 items-start" : " right-5 items-end"} ${config.PositionY === "top" ? " top-5" : " bottom-5"}`;
        }

        setTimeout(() => {
            if (parent.contains(div)) {
                parent.removeChild(div);
            }
        }, config.duration * 1000 + 250);
    }
}

let toaster = toast({
    duration: 3,
    theme: "dark",
    PositionX: "right",
    PositionY: "bottom",
});

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
    if (!title.trim()) {
        toaster(`Title should not be empty`)
        return
    }
    if (!desc.trim()) {
        toaster("Description should not be empty")
        return
    }
    tasks.push({ id: Date.now().toString(), title, desc, status: "todo" })
    save()
    e.target.reset()
    modal.classList.replace("flex", "hidden")
    render()
})
closeBtn.addEventListener("click", () => {
    document.querySelector("form").reset()
    modal.classList.replace("flex", "hidden")
})

function render() {
    const counts = { todo: 0, inProgress: 0, completed: 0 }
    tasks.forEach(t => counts[t.status]++)

    Object.entries(columns).forEach(([key, col]) => {
        col.innerHTML = `
        <div class="flex items-center justify-between">
            <h2 class=${key === "todo" ? "text-blue-600" : key === "inProgress" ? "text-yellow-600" : "text-green-600"}>${key === "todo" ? "To-do" : key === "inProgress" ? "In Progress" : "Completed"}</h2>
            <span>${counts[key]}</span>
        </div>`
    })

    const fragment = {
        todo: document.createDocumentFragment(),
        inProgress: document.createDocumentFragment(),
        completed: document.createDocumentFragment()
    }
    let taskToDelete = null
    tasks.forEach(t => {
        const el = document.createElement("div")
        el.className = "task w-full h-fit cursor-grab rounded-2xl bg-neutral-100/4 p-4 border-2 border-neutral-200/4"
        el.draggable = true
        el.dataset.id = t.id
        el.innerHTML = `
            <h1 class="text-2xl">${t.title}</h1>
            <p class="text-neutral-400">${t.desc}</p>
            <div class="flex items-center justify-between">
                <div class="text-sm text-neutral-500 mt-2">${new Date(+t.id).toLocaleString()}</div>
                <button class="text-sm text-red-100 rounded-md mt-2 px-6 py-2 bg-red-600">Delete</button>
            </div>
        `
        el.querySelector("button").addEventListener("click", () => {
            taskToDelete = t.id
            document.querySelector(".confirmModal").classList.remove("hidden")
            document.querySelector(".confirmModal").classList.add("flex")
        })
        const confirmModal = document.querySelector(".confirmModal")
        const confirmBtn = confirmModal.querySelector("#confirmBtn")
        const cancelBtn = confirmModal.querySelector("#cancelConfirm")

        confirmBtn.onclick = () => {
            if (!taskToDelete) return
            tasks = tasks.filter(task => task.id !== taskToDelete)
            save()
            render()
            confirmModal.classList.add("hidden")
            taskToDelete = null
        }

        cancelBtn.onclick = () => {
            confirmModal.classList.add("hidden")
            taskToDelete = null
        }
        el.addEventListener("dragstart", () => draggedItem = el)
        fragment[t.status].appendChild(el)
    })

    Object.entries(fragment).forEach(([key, frag]) => {
        columns[key].appendChild(frag)
    })
}

render()