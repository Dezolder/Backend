document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }

    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const newNote = prompt(
            "What?",
            document.getElementById(id).innerText
        );
        if (newNote !== null) edit(id, newNote).then(() => {
            // console.log(
            //     "event.target:",
            //     event.target.closest("span").textContent
            // );
            document.getElementById(id).textContent = newNote
            // event.target.closest("li").textContent = newNote;
        });;
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
