const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
    getNotes,
    addNote,
    removeNote,
    editNote,
} = require("./notes.controller");

const port = 3000;
// const basePath = path.join(__dirname, "pages");

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true,
    });
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.put("/:id", async (req, res) => {
    console.log('req.body:', req.body)
    await editNote(req.params.id, req.body.newNote);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.listen(port, () =>
    console.log(chalk.green(`Server is Listening on port: ${port}`))
);
