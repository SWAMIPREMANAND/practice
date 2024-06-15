// import data from "./Data.json";
// import data from "./Data.json" assert { type: "json" };
// import data from "./Data.json" with { type: "json" };
const adduserbtn = document.getElementById("Adduser");
const usernametextfield = document.getElementById("inputbox");
const recodeDisplay = document.getElementById("record");
// let Editicon = document.getElementById("Editicon");
// let Deletaicon = document.getElementById("Deletaicon");
let userArray = [];

let objstr = localStorage.getItem("users");
if (objstr !== null) {
  userArray = JSON.parse(objstr);
}

adduserbtn.onclick = () => {
  const name = usernametextfield.value;
  userArray.push({ name: name });
  saveinfo();
  usernametextfield.value = "";
  Displayinfo();
};

function saveinfo() {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
}

function Displayinfo() {
  let statment = "";
  userArray.forEach((user, i) => {
    statment += `<tr>
              <th scope="row">${i + 1}</th>
              <td>${user.name}</td>
              <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick="Editinfo(${i})"></i> <i class="btn btn-danger text-white fa fa-trash-o" onclick="Deletainfo(${i})"></i></td>
            </tr>`;
  });
  recodeDisplay.innerHTML = statment;
}

function Editinfo(id) {
  console.log(id);
}
function Deletainfo(id) {}
