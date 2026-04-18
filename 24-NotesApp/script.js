const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

let notes = [];

function addNote() {
    const text = noteInput.value.trim();
    if (!text) return;

    const newNote = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);
    noteInput.value = "";
    renderNotes();
}

addBtn.addEventListener("click", addNote);

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    renderNotes();
}

function editNote(id) {
    const note = notes.find(n => n.id === id);
    const newText = prompt("Edit note:", note.text);

    if (newText !== null) {
        note.text = newText.trim();
        renderNotes();
    }
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = notes.filter(note =>
        note.text.toLowerCase().includes(query)
    );

    renderNotes(filtered);
});

function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("notes");
    if (data) {
        notes = JSON.parse(data);
        renderNotes();
    }
}

function renderNotes(filteredNotes = notes) {
    notesContainer.innerHTML = "";

    filteredNotes.forEach(note => {
        const div = document.createElement("div");
        div.className = "bg-neutral-800 p-4 rounded-lg shadow-lg border border-neutral-700";

        div.innerHTML = `
            <p class="text-neutral-100 mb-2">${note.text}</p>
            <small class="text-neutral-400 text-sm block mb-4">${note.createdAt}</small>
            <div class="flex justify-end gap-2">
                <button onclick="editNote(${note.id})" class="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded transition-colors">Edit</button>
                <button onclick="deleteNote(${note.id})" class="px-3 py-1 bg-red-700 hover:bg-red-600 text-neutral-100 rounded transition-colors">Delete</button>
            </div>
        `;

        notesContainer.appendChild(div);
    });

    saveToLocalStorage();
}

loadFromLocalStorage();
