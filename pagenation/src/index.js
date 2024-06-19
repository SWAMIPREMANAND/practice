const adduserbtn = document.getElementById("Adduser");
const btntext = adduserbtn.innerText;
const usernametextfield = document.getElementById("inputbox");
const recodeDisplay = document.getElementById("record");
const record_size = document.getElementById("record_size");

let userArray = [];
let edit_id = null;

let objstr = localStorage.getItem("users");
if (objstr !== null) {
  userArray = JSON.parse(objstr);
}
Displayinfo();
adduserbtn.onclick = () => {
  const name = usernametextfield.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
  } else {
    userArray.push({ name: name });
  }

  saveinfo();
  usernametextfield.value = "";

  adduserbtn.innerText = btntext;
};

function saveinfo() {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  Displayinfo();
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
  edit_id = id;
  usernametextfield.value = userArray[id].name;
  adduserbtn.innerText = "save changes";
}

function Deletainfo(id) {
  userArray.splice(id, 1);
  saveinfo();
}

const alltr = document.querySelectorAll("#record tr");
const searchfield = document.querySelector("#search");

searchfield.addEventListener("input", (e) => {
  const searchStr = e.target.value.toLowerCase();
  recodeDisplay.innerHTML = "";
  alltr.forEach((tr) => {
    const td_in_tr = tr.querySelectorAll("td");
    if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1) {
      recodeDisplay.appendChild(tr);
    }
  });
  if (recodeDisplay.innerHTML == "") {
    recodeDisplay.innerHTML = "No Recodes Found";
  }
});

const total_records_tr = document.querySelectorAll("#record tr");
let records_per_page = 10;
let page_number = 1;
const total_records = total_records_tr.length;
console.log(total_records);
let total_page = Math.ceil(total_records / records_per_page);
console.log(total_page);
generatepage();
DisplayRecords();

function DisplayRecords() {
  let start_index = (page_number - 1) * records_per_page;
  let end_index = start_index + records_per_page - 1;
  if (end_index >= total_records) {
    end_index = total_records - 1;
  }
  let statement = "";
  for (let i = start_index; i <= end_index; i++) {
    statement += `<tr> ${total_records_tr[i].innerHTML} </tr> `;
  }
  recodeDisplay.innerHTML = statement;
  document.querySelectorAll(".dynamic-item").forEach((item) => {
    item.classList.remove("active");
  });
  document.getElementById(`page${page_number}`).classList.add("active");
  if (page_number == 1) {
    document.getElementById("prevBtn").parentElement.classList.add("disabled");
  } else {
    document
      .getElementById("prevBtn")
      .parentElement.classList.remove("disabled");
  }
  if (page_number == total_page) {
    document.getElementById("nextBtn").parentElement.classList.add("disabled");
  } else {
    document
      .getElementById("nextBtn")
      .parentElement.classList.remove("disabled");
  }

  document.getElementById("page-details").innerHTML = `Showing ${
    start_index + 1
  } to ${end_index + 1} of ${total_records}`;
}

function generatepage() {
  // disabled
  let prevBtn = ` <li class="page-item ">
  <a class="page-link" id="prevBtn" onclick="prevBtn()" href="javascript:void(0)">previous</a>
   </li>`;

  let nextBtn = ` <li class="page-item">
  <a class="page-link" id="nextBtn" onclick="nextBtn()" href="javascript:void(0)">Next</a>
  </li>`;
  let buttons = "";
  let activeClass = "";
  for (let i = 1; i <= total_page; i++) {
    if (i == 1) {
      activeClass = "active";
    } else {
      activeClass = "";
    }
    buttons += `<li class="page-item dynamic-item ${activeClass}" id="page${i}"><a class="page-link"onclick="page(${i})" href="javascript:void(0)">${i}</a></li>`;
  }
  document.getElementById(
    "pagination"
  ).innerHTML = `${prevBtn} ${buttons} ${nextBtn}`;
}

function prevBtn() {
  page_number--;
  DisplayRecords();
}

function nextBtn() {
  page_number++;
  DisplayRecords();
}

function page(index) {
  page_number = parseInt(index);
  DisplayRecords();
}

record_size.addEventListener("change", (event) => {
  records_per_page = parseInt(record_size.value);
  total_page = Math.ceil(total_records / records_per_page);
  page_number = 1;
  generatepage();
  DisplayRecords();
});
