const yargs = require("yargs");
const { editNote } = require("./notes.controller");

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
