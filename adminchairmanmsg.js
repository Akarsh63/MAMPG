document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const photoDisplay = document.getElementById('photoDisplay');
    const saveButton = document.getElementById('saveButton');
    // const additionalInfoTextarea = document.getElementById('additionalInfo');
    // const addInfoButton = document.getElementById('addInfoButton');

    // const idAims = [];
    // const idAim1 = [];
    // const UpdateAims = [];
    // const UpdateAim1 = [];
    
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

    // const Aims = document.querySelectorAll('.msg');
    // const aim1 = document.querySelectorAll('#aim1 p');

    // Aims.forEach((aim) => {
    //     aim.addEventListener('blur', function() {
    //         idAims.push(this.id);
    //     });
    // });

    // aim1.forEach((aim) => {
    //     aim.addEventListener('blur', function() {
    //         idAim1.push(this.id);
    //     });
    // });

    // addInfoButton.addEventListener('click', function() {
    //     const additionalInfoText = additionalInfoTextarea.value;
    //     // Handle the additional info as needed.
    // });

    saveButton.addEventListener('click', function() {
        // for (let i = 0; i < idAims.length; i++) {
        //     var editableText = document.getElementById(idAims[i]);
        //     var updatedText = editableText.innerText;
        //     UpdateAims.push(updatedText);
        // }

        // for (let i = 0; i < idAim1.length; i++) {
        //     var editableText = document.getElementById(idAim1[i]);
        //     var updatedText = editableText.innerText;
        //     UpdateAim1.push(updatedText);
        // }

        const msg = document.getElementById('msg').innerText;
        const chariman_name = document.getElementById('chairman-name').innerText;
        json_details = {'msg':msg, 'chariman_name': chariman_name}
        json_details = JSON.stringify(json_details)
        var json_body = document.createElement("input");
        json_body.setAttribute("name", 'json_details');
        json_body.setAttribute("type", "json");
        json_body.setAttribute("value", json_details);
        json_body.hidden = true;

        var photoFile = document.createElement("input");
        photoFile.setAttribute("name", 'photoFile');
        photoFile.setAttribute("type", "file");
        photoFile.files = photoInput.files;
        photoFile.hidden =true;
        
        document.getElementById('main-form').appendChild(photoFile);
        document.getElementById('main-form').appendChild(json_body);
        // document.getElementById('submitButton').click();
        console.log(json_details);

        // console.log(idAims);
        // console.log(idAim1);
        // console.log(UpdateAims);
        // console.log(UpdateAim1);
    });
});
