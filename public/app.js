document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }

    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const currentNote = document.getElementById(id).innerText;
        const mainNote = event.target.closest("li");

        mainNote.innerHTML = "";

        const inputField = document.createElement("input");
        inputField.value = currentNote;
        inputField.dataset.id = id;
        inputField.name = currentNote;

        const newButtonsElement = document.createElement("div");
        const btnSave = document.createElement("button");
        btnSave.className = "btn btn-success m-1";
        btnSave.innerText = "Сохранить";
        btnSave.dataset.type = "save";
        btnSave.dataset.id = id;

        const btnCancel = document.createElement("button");
        btnCancel.className = "btn btn-danger m-1";
        btnCancel.innerText = "Отменить";
        btnCancel.dataset.type = "cancel";
        btnCancel.dataset.id = id;

        newButtonsElement.prepend(btnSave);
        newButtonsElement.append(btnCancel);

        mainNote.prepend(inputField);
        mainNote.append(newButtonsElement);

        // const newNote = prompt(
        //     "What?",
        //     document.getElementById(id).innerText
        // );

        // if (newNote !== null) edit(id, newNote).then(() => {
        //     document.getElementById(id).textContent = newNote
        // });;
    }

    if (event.target.dataset.type === "save") {
        const id = event.target.dataset.id;
        const inputText = event.target.closest("li");
        const text = inputText.querySelector("input");
        const newNote = text.getAttribute("value");
        console.log("newNote:", newNote);
        edit(id, newNote);
    }

    if (event.target.dataset.type === "cancel") {
        const id = event.target.dataset.id;
        const inputText = event.target.closest("li");
        inputText.innerHTML = ''

    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(id, newNote) {
    await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({ newNote }),
        headers: {
            "Content-Type": "application/json",
        },
    }); // body - остаётся пустой почему-то !!???
}
