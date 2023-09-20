function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const photoInput = document.getElementsByClassName("photoInput");
var eventHeadingId = "name";
var p = 0;
const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Access the form elements and their values
  const eventName = document.getElementById(eventHeadingId);
  const fileInput = document.getElementById("photoInput-5");
  eventHeadingId = `name${p}`;
  p = p + 1;
  eventHeadingIdArray.push(eventName.id);
  eventHeadingNameArray.push(eventName.value);
  const newTrashId = generateUniqueTrashId(eventName.id);
  // console.log(newTrashId);
  // `${eventName.id}-trash-1`;
  trashIconIdArray.push(newTrashId);
  // console.log(eventHeadingNameArray);

  if (fileInput.files.length > 0) {
    for (let i = 0; i < fileInput.files.length; i++) {
      const f = fileInput.files[i];
      const uniqueId = generateUniqueImageId(eventName.id);
      const uniqueTrashId = generateUniqueTrashId(eventName.id);
      const imageSource = URL.createObjectURL(f);

      imagesIdArray.push(uniqueId);
      trashIconIdArray.push(uniqueTrashId);
      // console.log("Image ID:", uniqueId);
      // console.log("Image Source:", imageSource);
    }
  }
  eventName.id = eventHeadingId;
  form.reset();
});

function uploadImage(id) {
  const input = document.getElementById(id);
  if (input.files.length > 0) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const imageId = generateUniqueImageId(input.parentElement.id);
      // console.log(imageId);
      const trashId = generateUniqueTrashId(input.parentElement.id);
      // console.log(trashId);
      // console.log(file);
      // console.log(URL.createObjectURL(file));
      imagesIdArray.push(imageId);
      trashIconIdArray.push(trashId);

      const newImageDiv = document.createElement("div");
      newImageDiv.className = "single-image";
      const newImage = document.createElement("img");
      newImage.src = URL.createObjectURL(file);
      newImage.id = imageId;
      newImage.className = "qi";
      const newITag = document.createElement("i");
      newITag.id = trashId;
      newITag.className = "fa-solid fa-trash icon";
      // newITag.onclick = deleteEvent(newITag);
      newImageDiv.appendChild(newImage);
      newImageDiv.appendChild(newITag);
      const gallery = document.getElementById(input.parentElement.id);
      // console.log(gallery.querySelector(".photo-album-1"));
      gallery.querySelector(".photo-album-1").appendChild(newImageDiv);
    }
    input.value = "";
  }
}
function generateUniqueImageId(id) {
  var p = 1;
  for (let index = 0; index < imagesIdArray.length; index++) {
    if (imagesIdArray[index].slice(0, id.length) == id) {
      p = p + 1;
    }
  }
  return `${id}-img-${p}`;
}

function generateUniqueTrashId(id) {
  var p = 1;
  for (let index = 0; index < trashIconIdArray.length; index++) {
    if (trashIconIdArray[index].slice(0, id.length) == id) {
      p = p + 1;
    }
  }
  return `${id}-trash-${p}`;
}

function deleteCard(deleteIcon) {
  deleteIcon.parentElement.querySelectorAll(".qi").forEach((e) => {
    deleteDataIdArray.push(e.id);
  });
  deleteIcon.parentElement.querySelectorAll(".icon").forEach((e) => {
    deleteDataIdArray.push(e.id);
    // console.log(e.id);
  });
  deleteIcon.parentElement.style.display = "none";
}

function deleteEvent(deleteIcon) {
  deleteDataIdArray.push(deleteIcon.parentElement.parentElement.id);
  deleteIcon.parentElement.parentElement.style.display = "none";
}

const imagesIdArray = [];
const imagesSourceArray = [];
const eventHeadingIdArray = [];
const eventHeadingNameArray = [];
const trashIconIdArray = [];
const updateEventHeadingsArray = [];
const deleteDataIdArray = [];

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const events = document.querySelectorAll(".photo-1");
  // console.log(events);

  events.forEach((element) => {
    eventHeadingIdArray.push(element.firstElementChild.firstElementChild.id);
    eventHeadingNameArray.push(element.firstElementChild.innerText);
    // console.log(eventHeadingNameArray);
    // console.log(element.firstElementChild.innerText);
    element.querySelectorAll(".qi").forEach((e) => {
      imagesIdArray.push(e.id);
      imagesSourceArray.push(e.src);
    });

    element.querySelectorAll(".icon").forEach((e) => {
      trashIconIdArray.push(e.id);
    });
  });

  saveButton.addEventListener("click", function () {
    for (let i = 0; i < eventHeadingNameArray.length; i++) {
      var editableText = document.getElementById(eventHeadingIdArray[i]);
      updateEventHeadingsArray.push(editableText.innerText);
    }
    //deleteDataIdArray
    //updateEventHeadingsArray
    //imagesIdArray
    //imagesSourceArray
    // eventHeadingIdArray
    // eventHeadingNameArray
    // trashIconIdArray
  });
});
