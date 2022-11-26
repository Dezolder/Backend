const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        await printNotes();
    },
});

yargs.command({
    command: "remove",
    describe: "Remove note by ID",
    builder: {
        id: {
            type: "string",
            describe: "ID of removed note",
            demandOption: true,
        },
    },
    async handler(id) {
        await removeNote(id);
    },
});

yargs.command({
    command: "edit",
    describe: "Edit Note by ID",
    builder: {
        id: {
            type: "string",
            describe: "ID of the Note to be edited",
            demandOption: true,
        },
        newName: {
            type: "string",
            describe: "New Name of the Note",
            demandOption: true,
        },
    },
    async handler({ id, newName }) {
        editNote(id, newName);
    },
});

yargs.parse();
