const updateSection = document.querySelector(".update-status");
const activityStatusOfWork = document.querySelector("#activityStatusOfWork");

document.querySelector(".list").addEventListener('click', function (event) {
    if (event.target.className === "pencilButton")
        handleEditStatus(event.target.dataset.id);
});

function handleEditStatus(id) {
    updateSection.hidden = false;
    document.querySelector("#editStatus").dataset.id = id;
    activityStatusOfWork.dataset.id = id;
    const editButton = document.querySelector("#editButton");

    editButton.onclick = function () {
        const updateStatusInput = document.querySelector("#editStatus");
        if (updateStatusInput.value == "") {
            alert('Cannot be empty!');
            return false;
        }
        console.log(updateStatusInput);
        fetch('/updateTask', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: updateStatusInput.dataset.id,
                statusOfWork: updateStatusInput.value
            })
        })
            .then(response => response.json(),
                location.reload(),
                updateSection.hidden = true,
                console.log(activityStatusOfWork),
            )
            .catch(error => console.log(error));
    };
}

