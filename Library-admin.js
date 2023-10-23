// document.addEventListener('DOMContentLoaded', function() {
const photoInput = document.getElementById("photoInput");
const photoDisplay = document.getElementById("photoDisplay");
const Info = document.getElementById("Info");
const saveButton = document.getElementById("saveButton");

const idAims = [];
const idProvides = [];
const UpdateAims = [];
const UpdateProvides = [];
const iddels = [];
const idImage = [];
const ListImage = [];
const idInfo = [];
const TextChnageInfo = [];

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

const Aims = document.querySelectorAll("p");
const Provides = document.querySelectorAll("span");

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

function DeleteBtn(element) {
  console.log(element);
  const Id = element.id;
  const X = document.getElementById(Id);
  console.log(X);
  iddels.push(Id);
  X.style.visibility = "hidden";
  X.style.height = 0 + "px";
  X.style.display = "none";
}

saveButton.addEventListener("click", function () {
  const formData = [
    {
      idAims,
      idProvides,
      iddels,
      UpdateAims,
      UpdateProvides,
      idImage,
      ListImage,
      idInfo,
      TextChnageInfo,
    },
  ];
  console.log(formData);
});

// })
