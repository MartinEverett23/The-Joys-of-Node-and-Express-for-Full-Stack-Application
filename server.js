

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));

const file = path.join(__dirname, "data.json");

app.get("/api/notes", (req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) return res.sendStatus(500);
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        let notes = JSON.parse(data);
        notes.push({
            id: Date.now(),
            text: req.body.text
        });

        fs.writeFile(file, JSON.stringify(notes, null, 2), () => {
            res.sendStatus(201);
        });
    });
});

app.put("/api/notes/:id", (req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        let notes = JSON.parse(data);

        for (let note of notes) {
            if (note.id == req.params.id) {
                note.text = req.body.text;
            }
        }

        fs.writeFile(file, JSON.stringify(notes, null, 2), () => {
            res.sendStatus(200);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        let notes = JSON.parse(data);

        notes = notes.filter(note => note.id != req.params.id);

        fs.writeFile(file, JSON.stringify(notes, null, 2), () => {
            res.sendStatus(200);
        });
    });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3001");
});