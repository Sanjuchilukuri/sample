let displayingRolesData = [];
function displayAddRoleModel() {
  let elements = document.getElementsByClassName("main-content")[0];
  let ele = document.getElementsByClassName("add-role-section")[0];
  if (elements.style.display === "") {
    elements.style.display = "none";
    ele.style.display = "block";
  }
}
function displaySeletedRoleEmployees(selectedData) {
  let dataWrapper = document.getElementById("displaying-data-wrapper");
  dataWrapper.innerHTML = "";
  selectedData.forEach((employee) => {
    let employeeRow = document.createElement("div");
    employeeRow.classList.add("employee-row");
    let employeeInfo = document.createElement("div");
    let userImg = document.createElement("img");
    userImg.src = employee.img;
    employeeInfo.appendChild(userImg);
    let nameParagraph = document.createElement("p");
    nameParagraph.innerText = employee.firstname + " " + employee.lastname;
    employeeInfo.appendChild(nameParagraph);
    employeeRow.appendChild(employeeInfo);
    let checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    employeeRow.appendChild(checkboxInput);

    dataWrapper.appendChild(employeeRow);
  });
}

let departmentEmployees = document.getElementById("department");
departmentEmployees.addEventListener("change", (event) => {
  let allEmployeesData = JSON.parse(localStorage.getItem("data"));
  let selectedDepartmentEmployees = allEmployeesData.filter((ele) => {
    return ele.department == event.target.value;
  });
  displayingRolesData = selectedDepartmentEmployees;
  displaySeletedRoleEmployees(selectedDepartmentEmployees);
});

let employeeSearchBar = document.getElementById("assign-employees");
employeeSearchBar?.addEventListener("keyup", () => {
  let enteredString = employeeSearchBar.value.toUpperCase();
  let filteredData = displayingRolesData.filter((ele) => {
    return ele.firstname.toUpperCase().includes(enteredString);
  });
  displaySeletedRoleEmployees(filteredData);
});
