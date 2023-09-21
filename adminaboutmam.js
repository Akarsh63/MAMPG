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
    const delIds = [];
    const pointIds = [];

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

    const about = document.querySelector('#about');
    const container = document.querySelector('.container');
    const box = document.querySelector('.box');

    // about.addEventListener('blur', function() {
    //     const updatedText = this.innerText;
    //     Updateabout.push(updatedText);
    // });

    // container.addEventListener('blur', function() {
    //     const updatedText = this.innerText;
    //     Updatecontainer.push(updatedText);
    // });

    // box.addEventListener('blur', function() {
    //     const updatedText = this.innerText;
    //     Updatebox.push(updatedText);
    // });

    const Aims = document.querySelectorAll('.about p');
    const Aims1 = document.querySelectorAll('.container p');
    const Aims2 = document.querySelectorAll('.box ul');
    const points = document.querySelectorAll('.point');
    const deleteButtons = document.querySelectorAll('.delete-button');

    // Aims.forEach((aim) => {
    //     aim.addEventListener('blur', function() {
    //         idabout.push(this.id);
    //     });
    // });

    // Aims1.forEach((aim) => {
    //     aim.addEventListener('blur', function() {
    //         idcontainer.push(this.id);
    //     });
    // });

    // Aims2.forEach((aim) => {
    //     aim.addEventListener('blur', function() {
    //         idbox.push(this.id);
    //     });
    // });

    points.forEach((point) => {
        point.addEventListener('click', function() {
            // delId = this.querySelector('.delete-button').id
            if(!pointIds.includes(this.id)){
                pointIds.push(this.id);
                console.log(pointIds);
            }
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent <li> and remove it when the delete button is clicked
            const listItem = this.parentNode;
            delIds.push(this.id);
            console.log(this.parentElement.id);
            if(pointIds.includes(this.parentElement.id)){
                console.log(this.parentElement.id);
                console.log(pointIds.indexOf(this.parentElement.id));
                console.log(pointIds);
                pointIds.splice(0, 1);
                console.log(pointIds);
            }
            this.parentElement.style.display = "none";
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
        // for (let i = 0; i < idabout.length; i++) {
        //     const editableText = document.getElementById(idabout[i]);
        //     const updatedText = Updateabout[i];
        //     editableText.innerText = updatedText;
        // }

        // for (let i = 0; i < idcontainer.length; i++) {
        //     const editableText = document.getElementById(idcontainer[i]);
        //     const updatedText = Updatecontainer[i];
        //     editableText.innerText = updatedText;
        // }

        // for (let i = 0; i < idbox.length; i++) {
        //     const editableText = document.getElementById(idbox[i]);
        //     const updatedText = Updatebox[i];
        //     editableText.innerText = updatedText;
        // }
        console.log(delIds);
        console.log(pointIds);
        const newPoints = [];
        const modifiedPoints = [];
        addedPoints.forEach((point) =>{
            newPoints.push([point.innerText, point.parentElement.id]);
        });
        pointIds.forEach((point)=>{
            modifiedPoints.push(document.getElementById(point).innerText);
        })
        console.log(newPoints);
        console.log(modifiedPoints);
        

        const about = document.getElementById('aboutP').innerText;
        const why = document.getElementById('whyP').innerText;
        const vision = document.getElementById('visionP').innerText;
        const quality = document.getElementById('qualityP').innerText;
        
        json_details = {'about':about, 'why': why, 'vision':vision, 'quality':quality, 'newPoints': newPoints, 'delIds': delIds, 'modifiedIds':pointIds, 'modifiedPoints': modifiedPoints};

        console.log(json_details);
        json_details = JSON.stringify(json_details);

        var photoFile = document.createElement("input");
        photoFile.setAttribute("name", 'photoFile');
        photoFile.setAttribute("type", "file");
        photoFile.files = photoInput.files;
        photoFile.hidden =true;

        var json_body = document.createElement("input");
        json_body.setAttribute("name", 'json_details');
        json_body.setAttribute("type", "json");
        json_body.setAttribute("value", json_details);

        // photoFile.files = photoInput.files;
        json_body.hidden = true;
        
        document.getElementById('main-form').appendChild(photoFile);
        document.getElementById('main-form').appendChild(json_body);
        // document.getElementById('submitButton').click();
         

        // Append added points to the respective boxes
        // const box1 = document.querySelector('.box1 ul');
        // addedPoints.forEach(point => {
        //     box1.appendChild(point);
        // });

        // console.log(idabout);
        // console.log(idcontainer);
        // console.log(idbox);
        // console.log(Updateabout);
        // console.log(Updatecontainer);
        // console.log(Updatebox);
        // console.log(addedPoints);
    });
});
