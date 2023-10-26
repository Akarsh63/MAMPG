// document.addEventListener('DOMContentLoaded', function() {
const photoInput = document.getElementById("photoInput");
const photoDisplay = document.getElementById("photoDisplay");
const Info = document.getElementById("Info");
const saveButton = document.getElementById("saveButton");
const addPointButtons = document.querySelectorAll(".add-point");
const addedPoints = []
const idAims = [];
const idProvides = [];
const UpdateAims = [];
const UpdateProvides = [];
const iddels = [];
const idImage = [];
const ListImage = [];
const idInfo = [];
const TextChnageInfo = [];
const changedPoints = [];

photoInput.addEventListener("change", (event) => {
  const selectedPhoto = event.target.files[0];
  ListImage.push(selectedPhoto);
  if (selectedPhoto) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoDisplay.src = e.target.result;
    };
    reader.readAsDataURL(selectedPhoto);
  }
});

photoDisplay.addEventListener("click", function () {
  idImage.push(photoDisplay);
  photoInput.click();
});

const Aims = document.querySelectorAll(".aim-point");
const Provides = document.querySelectorAll(".provides-point");
const Points = document.querySelectorAll(".point");

Aims.forEach((aim) => {
  aim.addEventListener("blur", function () {
    idAims.push(this.id);
    var editableText = document.getElementById(this.id).innerText;
    UpdateAims.push(editableText);
  });
});

Provides.forEach((provide) => {
  provide.addEventListener("click", function () {
    idProvides.push(this.id);
    var editableText = document.getElementById(this.id).innerText;
    UpdateProvides.push(editableText);
  });
});

Points.forEach((point)=>{
  console.log(point);
  point.addEventListener("click", function(){
    console.log(point.id);
    if(!changedPoints.includes(point.id)){
      changedPoints.push(point.id);     
    }
  } )
})


addPointButtons.forEach((button, index) => {
  button.addEventListener('click', function(event) {
      // const pointList = pointLists[index]; // Get the corresponding point list
      const pointType = button.id.split('-')[1];
      const pointList = document.getElementById(pointType+'-col');
      const textArea = this.previousElementSibling;
      const pointText = textArea.value;
      
      if (pointText.trim() !== '') {
          // Create a new list item
          const listPoint = document.createElement('div');
        
          listPoint.setAttribute('class', `row-point new-${pointType}`);
          listPoint.innerHTML = `<i class="fa-solid fa-hand-point-right i"></i>
                                  <p contenteditable="true" >
                                    ${pointText}
                                  </p>
                                  <i
                          
                                    class="fa-solid fa-trash del-new"
                                  ></i>`; 
          addedPoints.push(listPoint);
          
          // Add the new list item to the list
          // pointList.appendChild(listPoint);
          pointList.insertBefore(listPoint, button.parentNode)

          // Attach a click event handler to the delete button of the new point
          const deleteButton = listPoint.querySelector('.del-new');
          deleteButton.addEventListener('click', function() {
              // Remove the clicked list item and remove it from the array
              addedPoints.splice(addedPoints.indexOf(listPoint), 1);
              pointList.removeChild(listPoint);
          });

          // Clear the text area
          textArea.value = '';
          event.preventDefault();
      }
  });
});

function DeleteBtn(element) {
  console.log(element);
  const Id = element.id;
  const X = document.getElementById(Id);
  console.log(X);
  changedPoints.splice(changedPoints.indexOf(Id), 1);
  iddels.push(Id);
  X.style.visibility = "hidden";
  X.style.height = 0 + "px";
  X.style.display = "none";

}

saveButton.addEventListener("click", function () {
  // const formData = [
  //   {
  //     idAims,
  //     idProvides,
  //     iddels,
  //     UpdateAims,
  //     UpdateProvides,
  //     idImage,
  //     ListImage,
  //     idInfo,
  //     TextChnageInfo,
  //     changedPoints
  //   },
  // ];
  // console.log(formData);
  const updatedPoints = {};
  for(var i=0; i< changedPoints.length; i++){
    updatedPoints[changedPoints[i]] = document.getElementById(changedPoints[i]).innerText;
  }
  
  var newPoints = {'aim':[], 'provides':[]};
  for(var i=0; i<addedPoints.length; i++){
    newPoints[addedPoints[i].classList[1].split('-')[1]].push(addedPoints[i].querySelector('p').innerText);
  }
  var details = {'updatedPoints': updatedPoints, 'mainText': Info.innerText, 'newPoints': newPoints, 'deletedIds': iddels};
  details = JSON.stringify(details);
  const submitForm = document.getElementById('main-form');
  json_body = document.createElement('input');
  json_body.setAttribute('name', 'json_details');
  json_body.setAttribute('type', 'json');
  json_body.setAttribute('value', details);
  json_body.hidden = true;
  submitForm.appendChild(json_body)
  

  if(photoInput.files){
    var displayPhoto = document.createElement('input');
    displayPhoto.setAttribute('name', 'photoFile');
    displayPhoto.setAttribute('type', 'file');
    displayPhoto.files = photoInput.files;
    displayPhoto.hidden = true;
    submitForm.appendChild(displayPhoto);
  }
  console.log(details);
  // document.getElementById('submitButton').click();




});

// })
