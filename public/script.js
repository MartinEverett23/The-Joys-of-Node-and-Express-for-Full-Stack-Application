
const list = document.getElementById("noteList");
const input = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");

function loadNotes() {
    fetch("/api/notes")
        .then(res => res.json())
        .then(notes => {
            list.innerHTML = "";

            for (let note of notes) {
                list.innerHTML += `
                <li class="task-item" id="${note.id}">
                    <span>${note.text}</span>
                    <div class="task-buttons">
                        <button class="edit-btn" onclick="editNote(${note.id}, '${note.text}')">Edit</button>
                        <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
                    </div>
                </li>`;
            }
        });
}

function addNote() {
    if (input.value == "") return;

    fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    }).then(() => {
        input.value = "";
        loadNotes();
    });
}

function editNote(id, text) {
    let li = document.getElementById(id);

    li.innerHTML = `
        <input id="edit${id}" value="${text}">
        <button class="save-btn" onclick="saveNote(${id})">Save</button>`;
}

function saveNote(id) {
    let text = document.getElementById("edit" + id).value;

    fetch("/api/notes/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    }).then(loadNotes);
}

function deleteNote(id) {
    fetch("/api/notes/" + id, {
        method: "DELETE"
    }).then(loadNotes);
}

addBtn.onclick = addNote;
loadNotes();