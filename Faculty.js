const addFacultyBtn = document.getElementsByClassName("add-faculty-btn");
const removeFacultyBtn = document.getElementsByClassName("remove-faculty-btn");
// removeFacultyBtn.forEach(btn => {
//   btn.disabled = true;
// });
for (let i = 0; i < addFacultyBtn.length; i++) {
  const element = addFacultyBtn[i];
  const removeBtn = removeFacultyBtn[i];
  const classes = element.classList;
  element.addEventListener("click", () => {
    // removeBtn.removeAttribute("disabled");
    // element.setAttribute("disabled", "true");
    document.getElementsByClassName(classes[1])[2].style.display = "block";
  });
  document.getElementsByClassName(classes[2])[1].addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const previewImage = document.getElementsByClassName(classes[3])[1];
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
      };
  
      reader.readAsDataURL(file);
    }
  });
}

for (let i = 0; i < removeFacultyBtn.length; i++) {
  const addBtn = addFacultyBtn[i];
  const element = removeFacultyBtn[i];
  const classes = element.classList;
  element.addEventListener("click", () => {
    // addBtn.removeAttribute("disabled");
    // element.setAttribute("disabled", "true");
    document.getElementsByClassName(classes[1])[2].style.display = "none";
  });
}

const editedid = [];
const deletedata = [];

function deleteCard(deleteIcon) {
  const card = deleteIcon.closest(".card");
  const cardId = card.id;

  deletedata.push(cardId);
  card.style.display = "none"; 
}

function editCard(cardId) {
  if (!editedid.includes(cardId)) {
    editedid.push(cardId);
  }
}

const cards = document.querySelectorAll(".cardd");

function handleParagraphClick(event) {
  const cardId = event.currentTarget.closest(".cardd").id;
  editCard(cardId);
}

cards.forEach(card => {
  const paragraphs = card.querySelectorAll("p[contenteditable='true']");
  paragraphs.forEach(paragraph => {
    paragraph.addEventListener("click", handleParagraphClick);
  });
});

const Images = document.getElementsByClassName("facultyprofileimage");
const imageContainers = document.getElementsByClassName("image-input");

for (let i = 0; i < Images.length; i++) {
  Images[i].removeEventListener('click', handleImageClick);
  Images[i].addEventListener('click', handleImageClick);
}

for (let i = 0; i < imageContainers.length; i++) {
  imageContainers[i].removeEventListener('change', handleImageChange);
  imageContainers[i].addEventListener('change', handleImageChange);
}

function handleImageClick() {
  const cardId = this.closest(".card").id;
  editCard(cardId);
  const imageContainer = this.nextElementSibling;
  imageContainer.click();
}

function handleImageChange() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewImage = this.parentElement.getElementsByClassName("facultyprofileimage")[0];
      previewImage.src = e.target.result;
    }.bind(this);

    reader.readAsDataURL(file);
  }
}

function submitChanges() {
  const cards = document.querySelectorAll(".cardd");
  const dataToSubmit = [];
  const deleteddata=[];
  cards.forEach(card => {
    const cardId = card.id;

    if (editedid.includes(cardId)) {
      const inputs = card.querySelectorAll("p");
      const newData = {};

      inputs.forEach(input => {
        const label = input.previousElementSibling.textContent.trim();
        newData[label] = input.innerText;
      });
      const fileInput = card.querySelector(".image-input");
      const file = fileInput.files[0];

      if (file) {
        newData['ImageSrc'] = file; 
      }
      else{
        newData['ImageSrc'] = "Default Image only"; 
      }
      dataToSubmit.push({
        cardId,
        newData
      });
    }
  });
  deleteddata.push({
    "DeletedId":
    deletedata
  });
  console.log(deleteddata)
  console.log(dataToSubmit);
}
