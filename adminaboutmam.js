document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const photoDisplay = document.getElementById("photoDisplay");
    const saveButton = document.getElementById('saveButton');
    const addInfoButtons = document.querySelectorAll('.addInfoButton');
    const pointLists = document.querySelectorAll('.pointList'); // Use querySelectorAll to select all point lists

    const idabout = [];
    const idcontainer = [];
    const idbox = [];
    const Updateabout = [];
    const Updatecontainer = [];
    const Updatebox = [];
    const addedPoints = [];

    photoInput.addEventListener('change', (event) => {
        const selectedPhoto = event.target.files[0];
        if (selectedPhoto) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoDisplay.src = e.target.result;
            };
            reader.readAsDataURL(selectedPhoto);
        }
    });

    photoDisplay.addEventListener('click', function() {
        photoInput.click();
    });

    const about = document.querySelector('.about');
    const container = document.querySelector('.container');
    const box = document.querySelector('.box');

    about.addEventListener('blur', function() {
        const updatedText = this.innerText;
        Updateabout.push(updatedText);
    });

    container.addEventListener('blur', function() {
        const updatedText = this.innerText;
        Updatecontainer.push(updatedText);
    });

    box.addEventListener('blur', function() {
        const updatedText = this.innerText;
        Updatebox.push(updatedText);
    });

    const Aims = document.querySelectorAll('.about p');
    const Aims1 = document.querySelectorAll('.container p');
    const Aims2 = document.querySelectorAll('.box ul');
    const deleteButtons = document.querySelectorAll('.delete-button');

    Aims.forEach((aim) => {
        aim.addEventListener('blur', function() {
            idabout.push(this.id);
        });
    });

    Aims1.forEach((aim) => {
        aim.addEventListener('blur', function() {
            idcontainer.push(this.id);
        });
    });

    Aims2.forEach((aim) => {
        aim.addEventListener('blur', function() {
            idbox.push(this.id);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent <li> and remove it when the delete button is clicked
            const listItem = this.parentNode;
            listItem.parentNode.removeChild(listItem);
        });
    });

    // Add points to the respective lists
    addInfoButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const pointList = pointLists[index]; // Get the corresponding point list
            const textArea = this.previousElementSibling;
            const pointText = textArea.value;
            if (pointText.trim() !== '') {
                // Create a new list item
                const listItem = document.createElement('li');
                listItem.innerHTML = `${pointText} <button class="delete-button"><i class="fas fa-trash"></i></button>`;
                addedPoints.push(listItem);

                // Add the new list item to the list
                pointList.appendChild(listItem);

                // Attach a click event handler to the delete button of the new point
                const deleteButton = listItem.querySelector('.delete-button');
                deleteButton.addEventListener('click', function() {
                    // Remove the clicked list item and remove it from the array
                    pointList.removeChild(listItem);
                    addedPoints.splice(addedPoints.indexOf(listItem), 1);
                });

                // Clear the text area
                textArea.value = '';
            }
        });
    });

    saveButton.addEventListener('click', function() {
        for (let i = 0; i < idabout.length; i++) {
            const editableText = document.getElementById(idabout[i]);
            const updatedText = Updateabout[i];
            editableText.innerText = updatedText;
        }

        for (let i = 0; i < idcontainer.length; i++) {
            const editableText = document.getElementById(idcontainer[i]);
            const updatedText = Updatecontainer[i];
            editableText.innerText = updatedText;
        }

        for (let i = 0; i < idbox.length; i++) {
            const editableText = document.getElementById(idbox[i]);
            const updatedText = Updatebox[i];
            editableText.innerText = updatedText;
        }

        // Append added points to the respective boxes
        const box1 = document.querySelector('.box1 ul');
        addedPoints.forEach(point => {
            box1.appendChild(point);
        });

        console.log(idabout);
        console.log(idcontainer);
        console.log(idbox);
        console.log(Updateabout);
        console.log(Updatecontainer);
        console.log(Updatebox);
        console.log(addedPoints);
    });
});
