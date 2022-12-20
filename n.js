let API = "http://localhost:8000/contact";

let inpName = document.getElementsByClassName(`name`)[0];
let inpSurName = document.getElementsByClassName(`surname`)[0];
let inpNumber = document.getElementsByClassName(`number`)[0];
let inpPhoto = document.getElementsByClassName(`photo`)[0];
let addBtn = document.getElementsByClassName(`btn`)[0];
let emptyDiv = document.createElement("div");
let btnCloser = document.getElementsByClassName(`btn-closer`)[0];
let nameEdit = document.getElementsByClassName(`nameEdit`)[0];
let surnameEdit = document.getElementsByClassName(`surnameEdit`)[0];
let numberEdit = document.getElementsByClassName(`numberEdit`)[0];
let photoEdit = document.getElementsByClassName(`photoEdit`)[0];
let editDiv = document.querySelector(`.main-modal`);
let saveEdit = document.querySelector(`.saveEdit`);

addBtn.addEventListener(`click`, async function () {
  if (
    !inpName.value.trim() ||
    !inpSurName.value.trim() ||
    !inpNumber.value.trim() ||
    !inpPhoto.value.trim()
  ) {
    alert(`Заполните поле!`);
  }

  let obj = {
    name: inpName.value,
    surname: inpSurName.value,
    number: inpNumber.value,
    photo: inpPhoto.value,
  };

  let option = {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(API, option);
  render();
});
function render() {
  emptyDiv.innerHTML = "";
  fetch(API)
    .then((res) => res.json())
    .then((data) =>
      data.map((item) => {
        let contDiv = document.createElement(`div`);
        contDiv.classList.add(`container`);
        contDiv.innerHTML = `
      <h2>Данные контакта!</h2>
      <div class="imgdiv">
        
     <img src="${item.photo}">
      </div>
      <div class="xiz">
        <span>Имя </span>
        <div class="Res">: ${item.name}</div>
      </div>
      <div class="xiz">
        <span> Фамилия </span>
        <div class="Res">: ${item.surname}</div>
      </div>
      <div class="xiz">
        <span> Номер телефона</span>
      <div class="Res">: ${item.number}</div>
      </div>
      <div class="xiz">
        <button class="btnEdit btn">Edit contact</button>
      </div>
      <div class="xiz">
        <button class="btnDelete btn">delete</button>
      </div>
    </div>
      `;
        emptyDiv.append(contDiv);
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("btnDelete")) {
            fetch(`http://localhost:8000/contact/${item.id}`, {
              method: `DELETE`,
            });
            render();
          }
        });
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("btnEdit")) {
            editDiv.style.display = `block`;
            nameEdit.value = item.name;
            surnameEdit.value = item.surname;
            numberEdit.value = item.number;
            photoEdit.value = item.photo;

            saveEdit.id = item.id;
          }
        });
      })
    );
  document.body.append(emptyDiv);
}
render();
btnCloser.addEventListener(`click`, () => {
  editDiv.style.display = `none`;
});

saveEdit.addEventListener(`click`, (e) => {
  let newObj = {};
  if (nameEdit.value) {
    newObj.name = nameEdit.value;
  }
  if (surnameEdit.value) {
    newObj.surname = surnameEdit.value;
  }
  if (numberEdit.value) {
    newObj.number = numberEdit.value;
  }
  if (photoEdit.value) {
    newObj.photo = photoEdit.value;
  }
  let options = {
    method: `PATCH`,
    body: JSON.stringify(newObj),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`http://localhost:8000/contact/${e.target.id}`, options);
  editDiv.style.display = `none`;
  render();
});
