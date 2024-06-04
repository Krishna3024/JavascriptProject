const form = document.getElementById("form-container");
const submitButton = document.getElementsByName("submit-button")[0];
const updateButton = document.getElementsByName("update-button")[0];
const cancelButton = document.getElementsByName("cancel-button")[0];
const resetButton = document.getElementsByName("reset-button")[0];

let userData = []; //Store user data

let static_data = [
  { name: "user1", email: "user1@gmail.com",gender: "Male",hobby: "Travelling, Dancing",country: "India",state: "Maharashtra",city: "Pune",
    createdTime: new Date().toLocaleString(),},
  { name: "user2",email: "user2@gmail.com",gender: "Female",hobby: "Sports",country: "India",state: "Gujarat",city: "Vadodara",
    createdTime: new Date().toLocaleString(),},
];

function static_user_data() {
  userData = static_data; 
  displayTable(userData);
}

function displayTable(userData) {
    let table = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // Clear all rows in table

    userData.forEach((data, index) => {
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = data.name;
        row.insertCell(1).innerHTML = data.email;
        row.insertCell(2).innerHTML = data.gender;
        row.insertCell(3).innerHTML = data.hobby;
        row.insertCell(4).innerHTML = data.country;
        row.insertCell(5).innerHTML = data.state;
        row.insertCell(6).innerHTML = data.city;
        row.insertCell(7).innerHTML = '<button type="button" onclick="editData(' +index +')">Edit</button>' +
                '<button type="button" style="background-color: #f44336;" onclick="deleteData(' + index +')">Delete</button>';
    });
}

function select_states_cities(value) {
  const states_cities = {
    Gujarat: ["Surat", "Vadodara", "Ahmedabad"],
    Maharashtra: ["Mumbai", "Pune", "Jalgaon"],
    Rajasthan: ["Udaipur", "Jaipur"],
  };

  let citiesOptions =
    "<option value='' selected disabled hidden>Choose City</option>";

  for (let city of states_cities[value]) {
    citiesOptions += "<option>" + city + "</option>";
  }

  document.getElementsByName("city")[0].innerHTML = citiesOptions;
}

function addRow(event) {
  event.preventDefault();

  if (validateForm()) {
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let gender = document.querySelector('input[name="gender"]:checked')?.value;
    let hobbies = document.getElementsByName("hobby");
    let country = document.getElementsByName("country")[0].value;
    let state = document.getElementsByName("state")[0].value;
    let city = document.getElementsByName("city")[0].value;

    let hobbyList = [];
    for (let i = 0; i < hobbies.length; i++) {
      if (hobbies[i].checked) {
        hobbyList.push(hobbies[i].value);
      }
    }

    let newData = {
      name: name,
      email: email,
      gender: gender,
      hobby: hobbyList.join(", "),
      country: country,
      state: state,
      city: city,
      createdTime: new Date().toLocaleString(),
    };

    userData.push(newData); 
    displayTable(userData);
    clearInputs(); 
  }
}

function clearInputs() {
  document.getElementsByName("name")[0].value = "";
  document.getElementsByName("email")[0].value = "";
  document.querySelectorAll('input[name="gender"]').forEach((item) => (item.checked = false));
  document.querySelectorAll('input[name="hobby"]').forEach((item) => (item.checked = false));
  document.getElementsByName("country")[0].value = "";
  document.getElementsByName("state")[0].value = "";
  document.getElementsByName("city")[0].innerHTML ="<option value='' selected disabled hidden>Choose City</option>";

  document.getElementsByName("nameError")[0].textContent = "";
  document.getElementsByName("emailError")[0].textContent = "";
  document.getElementsByName("genderError")[0].textContent = "";
  document.getElementsByName("hobbyError")[0].textContent = "";
  document.getElementsByName("countryError")[0].textContent = "";
  document.getElementsByName("stateError")[0].textContent = "";
  document.getElementsByName("cityError")[0].textContent = "";
}

function editData(index) {
  let data = userData[index];

  document.getElementsByName("name")[0].value = data.name;
  document.getElementsByName("email")[0].value = data.email;
  document.querySelector('input[name="gender"][value="' + data.gender + '"]').checked = true;

  let hobbyList = data.hobby.split(", ");
  document.querySelectorAll('input[name="hobby"]').forEach((item) => {
    if (hobbyList.includes(item.value)) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });

  document.getElementsByName("country")[0].value = data.country;
  document.getElementsByName("state")[0].value = data.state;
  select_states_cities(data.state);
  document.getElementsByName("city")[0].value = data.city;

  submitButton.style.display = "none";
  updateButton.style.display = "inline";
  cancelButton.style.display = "inline";
  resetButton.style.display= "none";

  updateButton.setAttribute("indexNo", index);
}

updateButton.addEventListener("click", function () {
  const index = updateButton.getAttribute("indexNo");
  if (index !== null) {
    updateRow(index);
  }
});

function updateRow(index) {
  if (validateForm()) {
    let name = document.getElementsByName("name")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let gender = document.querySelector('input[name="gender"]:checked')?.value;
    let hobbies = document.getElementsByName("hobby");
    let country = document.getElementsByName("country")[0].value;
    let state = document.getElementsByName("state")[0].value;
    let city = document.getElementsByName("city")[0].value;

    let hobbyList = [];
    for (let i = 0; i < hobbies.length; i++) {
      if (hobbies[i].checked) {
        hobbyList.push(hobbies[i].value);
      }
    }

    let updatedData = {
      name: name,
      email: email,
      gender: gender,
      hobby: hobbyList.join(", "),
      country: country,
      state: state,
      city: city,
      createdTime: userData[index].createdTime, 
    };

    userData[index] = updatedData; 
    displayTable(userData);
    clearInputs(); 

    submitButton.style.display = "inline";
    updateButton.style.display = "none";
    cancelButton.style.display = "none";
    resetButton.style.display = "inline";
  }
}

resetButton.addEventListener("click", function (event) {
    clearInputs();
  });
  

function cancelUpdate() {
    clearInputs();
    submitButton.style.display = "inline";
    resetButton.style.display = "inline";
    updateButton.style.display = "none";
    cancelButton.style.display = "none";
}

function deleteData(index) {
  userData.splice(index,1); 
  displayTable(userData);
}

function validateForm() {
  let isValid = true;

  const nameInput = document.getElementsByName("name")[0].value;
  const emailInput = document.getElementsByName("email")[0].value;
  const genderInput = document.querySelector('input[name="gender"]:checked')?.value;
  const hobbyInput = document.getElementsByName("hobby");
  const countryInput = document.getElementsByName("country")[0].value;
  const stateInput = document.getElementsByName("state")[0].value;
  const cityInput = document.getElementsByName("city")[0].value;

  const nameElement = document.getElementsByName("nameError")[0];
  const emailElement = document.getElementsByName("emailError")[0];
  const genderElement = document.getElementsByName("genderError")[0];
  const hobbyElement = document.getElementsByName("hobbyError")[0];
  const countryElement = document.getElementsByName("countryError")[0];
  const stateElement = document.getElementsByName("stateError")[0];
  const cityElement = document.getElementsByName("cityError")[0];

  if (nameInput === "") {
    nameElement.textContent = "Please enter a valid name.";
    isValid = false;
  } else {
    nameElement.textContent = " ";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailInput)) {
    emailElement.textContent = ""; 
  } else {
    emailElement.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (genderInput == null) {
    genderElement.textContent = "Please select your gender";
    isValid = false;
  } else {
    genderElement.textContent = "";
  }

  let hobbySelected = false;
  for (let i = 0; i < hobbyInput.length; i++) {
    if (hobbyInput[i].checked) {
      hobbySelected = true;
      break;
    }
  }

  if (!hobbySelected) {
    hobbyElement.textContent = "Please select at least one hobby";
    isValid = false;
  } else {
    hobbyElement.textContent = "";
  }

  if (countryInput === "") {
    countryElement.textContent = "Please enter a country.";
    isValid = false;
  } else {
    countryElement.textContent = " ";
  }

  if (stateInput === "") {
    stateElement.textContent = "Please enter a state.";
    isValid = false;
  } else {
    stateElement.textContent = " ";
  }

  if (cityInput === "") {
    cityElement.textContent = "Please enter a city.";
    isValid = false;
  } else {
    cityElement.textContent = " ";
  }

  return isValid;
}

function searchfunction()
{
    const defaultdata = userData;
    const input = document.getElementsByName("searchinput")[0].value.toLowerCase();

    if(input === ''){
        displayTable(userData);
    }
    if(input !== ''){
        console.log('pass2');
        filterdata = defaultdata.filter(user => user.name.toLowerCase().includes(input));
        displayTable(filterdata);
    }
}

function sortFunction(){

    const option = document.getElementsByName("sortOrder")[0].value;

    if(option=="asc"){
        userData.sort((a,b) => a.name.localeCompare(b.name));
    }else if(option=="desc"){
        userData.sort((a,b) => b.name.localeCompare(a.name));
    }

    displayTable(userData);
}