const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notePath = path.join(__dirname, "db.json");

async function addNote(title) {
    // const notes = require('./db.json')
    // const notes = Buffer.from(buffer).toString("utf-8")

    const notes = await getNotes();
    // console.log`("notes:", notes);
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);
    await fs.writeFile(notePath, JSON.stringify(notes));
    console.log("note was added");
}
// addNote("Test!!!");

async function getNotes() {
    const notes = await fs.readFile(notePath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log("There a list of notes:");
    notes.forEach((element) => {
        console.log(chalk.gray(element.id), chalk.yellowBright(element.title));
    });
}

async function removeNote({ id }) {
    const notes = await getNotes();
    const notest = notes.filter((item) => item.id !== id);
    await fs.writeFile(notePath, JSON.stringify(notest));
    console.log("Deleted id:", chalk.red(id));
}

// removeNote("1669341821954");

module.exports = {
    addNote,
    printNotes,
    removeNote,
};
