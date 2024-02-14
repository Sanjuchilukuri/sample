let displayingData = [];
let entireData = [];
let searchFilters = {
  filter: ["", "", ""],
  alaphabet: "",
};

function displayEmployeeModel() {
  let mainContentSection = document.getElementsByClassName("main-content")[0];
  let employeeModelSection =
    document.getElementsByClassName("employee-model")[0];
  if (mainContentSection.style.display === "") {
    mainContentSection.style.display = "none";
    employeeModelSection.style.display = "block";
  }
}

function updateFormImg(event) {
  let targetFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const i_path = reader.result;
    inputImg.src = i_path;
  };
  reader.readAsDataURL(targetFile);
}
let inputImg = document.getElementById("employee-img");
let newImg = document.getElementById("file");
newImg?.addEventListener("change", updateFormImg);

function validateForm() {
  const formInputs = document.querySelectorAll("form input");
  let flag = true;

  for (let ele of formInputs) {
    if (ele.parentElement.querySelector("span")) {
      flag = false;
    }
  }

  formInputs.forEach((ele) => {
    if (
      ele.nodeName == "INPUT" &&
      ele.value == "" &&
      !ele.parentElement.querySelector("span") &&
      ele.id != "dob" &&
      ele.id != "phno"
    ) {
      let err = document.createElement("span");
      err.textContent = "� This Field is required";
      err.style.color = "red";
      err.style.fontSize = ".7rem";
      err.style.fontWeight = "600";
      ele.style.border = "1px solid red";
      ele.parentElement.appendChild(err);
      flag = false;
    }
  });
  formInputs.forEach((ele) => {
    ele.addEventListener("focus", () => {
      if (ele.parentElement.querySelector("span")) {
        ele.parentElement.removeChild(ele.parentElement.querySelector("span"));
        ele.style.border = "";
      }
    });
  });
  return flag;
}

function refreshWindow() {
  location.reload();
}

class Employee {
  constructor(
    empno,
    fName,
    lName,
    dob,
    emailId,
    phNo,
    joiningDate,
    location,
    jobTitle,
    dept,
    assignManager,
    assignProject,
    img,
    active
  ) {
    this.empno = empno;
    this.firstname = fName;
    this.lastname = lName;
    this.dob = dob;
    this.mail = emailId;
    this.phno = phNo;
    this.joining = joiningDate;
    this.location = location;
    this.jobTitle = jobTitle;
    this.department = dept;
    this.manager = assignManager;
    this.project = assignProject;
    this.img = img;
    this.active = active;
  }
}

function isExistsInDB(empno) {
  let filteredData =entireData.filter((ele) => {
    return ele.empno == empno;
  })
  return filteredData.length > 0 ? true : false;
}

function fetchFormData(event) {
  event.preventDefault();
  let empno = document.getElementById("empno").value;
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let dob = document.getElementById("dob").value;
  let mail = document.getElementById("mail").value;
  let phno = document.getElementById("phno").value;
  let joining = document.getElementById("joining").value;
  let location = document.getElementById("location").value;
  let jobTitle = document.getElementById("jobTitle").value;
  let department = document.getElementById("department").value;
  let manager = document.getElementById("manager").value;
  let project = document.getElementById("project").value;
  let img = document.querySelector("label[for=file] img").src;

  if (isExistsInDB(empno)) {
    alert(` EMP NO ${empno} is already Exsisted`);
    document.getElementById("empno").value = "";
    return validateForm();
  }
  let newEmployee = new Employee(
    empno,
    firstname,
    lastname,
    dob,
    mail,
    phno,
    joining,
    location,
    jobTitle,
    department,
    manager,
    project,
    img,
    "Active"
  );
  if (entireData) {
    entireData.push(newEmployee);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(entireData));
  } else {
    let newData = [];
    newData.push(newEmployee);
    localStorage.setItem("data", JSON.stringify(newData));
  }

  displayEmployeeToaster("Employee Added", "green");
}

function displayEmployeeToaster(toasterText, bgColor) {
  let p = document.createElement("p");
  p.innerHTML = toasterText;
  p.classList.add("active-employee-toggle");
  p.style.backgroundColor=bgColor;
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(p);
  setTimeout(function () {
    p.remove();
    window.location.href = "../pages/index.html";
  }, 1500);
}

function fetchFullEmployeesData() {
  entireData = JSON.parse(localStorage.getItem("data"));
  displayEmployeesDetails(entireData);
}

function displayEmployeesDetails(tableData) {
  tableData = tableData.filter((ele) => {
    return searchFilters["alaphabet"]
      ? ele.firstname.charAt(0).toUpperCase() == searchFilters["alaphabet"]
      : 1;
  });

  let active = searchFilters["filter"][0] ? searchFilters["filter"][0] : "";
  let location = searchFilters["filter"][1] ? searchFilters["filter"][1] : "";
  let department = searchFilters["filter"][2] ? searchFilters["filter"][2] : "";

  tableData = tableData.filter((ele) => {
    return (
      (active == "" || active == ele.active) &&
      (location == "" || location == ele.location) &&
      (department == "" || department == ele.department)
    );
  });

  displayingData = tableData;
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  tableData.forEach((employee) => {
    let tr = document.createElement("tr");

    let checkboxCell = document.createElement("td");
    checkboxCell.innerHTML =
      '<input type="checkbox" name = "item-select"  onchange="inputCheckBox()"/>';
    tr.appendChild(checkboxCell);

    let userDetailsCell = document.createElement("td");
    let userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("user");

    let userImg = document.createElement("img");
    userImg.src = employee.img;

    userDetailsDiv.appendChild(userImg);
    let userDetails = document.createElement("div");
    userDetails.classList.add("user-details");

    let namePara = document.createElement("p");
    namePara.classList.add("name");
    namePara.textContent = `${employee.firstname} ${employee.lastname}`;
    userDetails.appendChild(namePara);

    let mailPara = document.createElement("p");
    mailPara.classList.add("mail");
    mailPara.textContent = employee.mail;

    userDetails.appendChild(mailPara);
    userDetailsDiv.appendChild(userDetails);
    userDetailsCell.appendChild(userDetailsDiv);
    tr.appendChild(userDetailsCell);

    let locationCell = document.createElement("td");
    locationCell.textContent = employee.location;
    tr.appendChild(locationCell);

    let departmentCell = document.createElement("td");
    departmentCell.textContent = employee.department;
    tr.appendChild(departmentCell);

    let jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = employee.jobTitle;
    tr.appendChild(jobTitleCell);

    let empnoCell = document.createElement("td");
    empnoCell.textContent = employee.empno;
    tr.appendChild(empnoCell);

    let apperanceCell = document.createElement("td");
    apperanceCell.classList.add("apperance");
    let activePara = document.createElement("p");
    activePara.textContent = "Active";
    apperanceCell.appendChild(activePara);
    tr.appendChild(apperanceCell);

    let joiningCell = document.createElement("td");
    joiningCell.textContent = employee.joining;
    tr.appendChild(joiningCell);

    let dotsCell = document.createElement("td");
    dotsCell.textContent = ". . .";
    dotsCell.classList.add("ellipsis");
    dotsCell.onclick = displayAdditionalOptions;
    tr.appendChild(dotsCell);

    tableBody.appendChild(tr);
  });
}

function collapseSidebar() {
  let sideBar = document.getElementById("aside");
  if (!sideBar.classList.contains("siderbar-collapse")) {
    sideBar.classList.add("siderbar-collapse");
    sideBar.querySelector("img[alt=Logo-image]").src =
      "../images/tezologo-minimize.svg";
    let mainSection = document.getElementsByTagName("main")[0];
    mainSection.style.width = "calc(100% - 3.0625rem - 1.6rem)";
    document.querySelector(".sidenav-role > p").innerHTML = "ROLE";
    document.querySelector(".logo img:nth-child(2)").style.rotate = "180deg";
  } else {
    sideBar.classList.remove("siderbar-collapse");
    let mainSection = document.getElementsByTagName("main")[0];
    mainSection.style.width = "";
    sideBar.querySelector("img[alt=Logo-image]").src = "../images/tezoLogo.svg";
    document.querySelector(".sidenav-role > p").innerHTML =
      "ROLE/USER MANAGEMENT";
    document.querySelector(".logo img:nth-child(2)").style.rotate = "0deg";
  }
}

let alaphabets = document.querySelectorAll(".options span");
alaphabets.forEach((ele) => {
  ele.addEventListener("click", () => {
    alaphabets.forEach((element) => {
      if (element.classList.contains("alphabet-active")) {
        element.classList.remove("alphabet-active");
      }
    });
    ele.classList.add("alphabet-active");
    let img = document.querySelector("img[alt = filter-icon]");
    img.src = "../images/filter-red.svg";
    img.onclick = () => {
      img.src = "../images/filter-black.svg";
      alaphabets.forEach((element) => {
        if (element.classList.contains("alphabet-active")) {
          element.classList.remove("alphabet-active");
        }
      });
      searchFilters["alaphabet"] = "";
      displayEmployeesDetails(entireData);
    };
    searchFilters["alaphabet"] = ele.innerText;
    displayEmployeesDetails(entireData);
  });
});

function exportDataToExcel() {
  let csv = "";
  csv += "EmpNo,";
  csv += "FirstName,";
  csv += "LastName,";
  csv += "DateofBirth,";
  csv += "Mail,";
  csv += "Phno,";
  csv += "JoinDt,";
  csv += "Location,";
  csv += "Role,";
  csv += "Department,";
  csv += "AssignManager,";
  csv += "AssignProject,";
  csv += "\n";
  for (let obj of displayingData) {
    let seperator = "";
    for (let objData in obj) {
      if (objData != "img") {
        csv += seperator + obj[objData];
        seperator = ",";
      }
    }
    csv += "\n";
  }
  let exportLink = document.createElement("a");
  exportLink.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURI(csv)
  );
  exportLink.setAttribute("download", "employeeInformation.csv");
  exportLink.click();
}

function selectAllCheckbox() {
  let tbody = document.getElementsByTagName("tbody")[0];
  let selectAllCheckBox = document.querySelector("input[name = select-all]");
  if (selectAllCheckBox.checked) {
    for (let i = 0; i < tbody.children.length; i++) {
      let tr = tbody.children[i];
      let td = tr.children[0];
      let checkbox = td.children[0];
      if (!checkbox.checked) {
        checkbox.checked = true;
      }
    }
  } else {
    for (let i = 0; i < tbody.children.length; i++) {
      let tr = tbody.children[i];
      let td = tr.children[0];
      let checkbox = td.children[0];
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    }
  }
  let itemCheckbox = document.querySelectorAll("input[name= item-select]");
  itemCheckbox.forEach((ele) => {
    ele.addEventListener("click", () => {
      selectAllCheckBox.checked = false;
    });
  });
}

let clicksMap = new Map();
clicksMap.set("USER", 0);
clicksMap.set("LOCATION", 0);
clicksMap.set("DEPARTMENT", 0);
clicksMap.set("ROLE", 0);
clicksMap.set("EMP NO", 0);
clicksMap.set("STATUS", 0);
clicksMap.set("JOIN DT", 0);
function checkboxExecption(sortingField) {
  for (let clicks of clicksMap.keys()) {
    if (clicks != sortingField) {
      clicksMap.set(clicks, 0);
    }
  }
}

function sortingByOrder(sortingField, order, data) {
  const sortOrder = order === "ASC" ? 1 : -1;
  sortingField = sortingField.toLowerCase();
  switch (sortingField) {
    case "user":
      data.sort((a, b) => {
        const nameA = (a.firstname + a.lastname).toUpperCase();
        const nameB = (b.firstname + b.lastname).toUpperCase();
        return sortOrder * nameA.localeCompare(nameB);
      });
      break;
    case "location":
    case "department":
      data.sort((a, b) => {
        return sortOrder * a[sortingField].localeCompare(b[sortingField]);
      });
      break;
    case "role":
      data.sort((a, b) => {
        return sortOrder * a.jobTitle.localeCompare(b.jobTitle);
      });
      break;
    case "emp no":
      data.sort((a, b) => sortOrder * a.empno.localeCompare(b.empno));
      break;
    case "status":
      data.sort((a, b) => sortOrder * a.active.localeCompare(b.active));
      break;
    case "join dt":
      data.sort((a, b) => sortOrder * a.joining.localeCompare(b.joining));
      break;
    default:
      break;
  }
  displayEmployeesDetails(data);
}

let allHeadingItems = document.querySelectorAll(".heading-wrapper");
allHeadingItems.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    let sortingField = ele.firstElementChild.textContent;
    if (clicksMap.get(sortingField) == 0) {
      sortingByOrder(sortingField, "ASC", displayingData);
      checkboxExecption(sortingField);
      clicksMap.set(sortingField, clicksMap.get(sortingField) + 1);
    } else {
      sortingByOrder(sortingField, "DES", displayingData);
      clicksMap.set(sortingField, (clicksMap.get(sortingField) + 1) % 2);
    }
  });
});

let applyFilterButton = document.querySelector(".filter .apply-btn");
let resetFilterButton = document.querySelector(".filter .reset-btn");
let allFilterOptions = document.querySelectorAll(".filter select");
function resetAllFilters() {
  allFilterOptions.forEach((ele) => {
    ele.value = "";
    ele.dispatchEvent(new Event('change'));
  })
}
allFilterOptions.forEach((ele) => {
  ele.addEventListener("change", (event) => {
    let flag = false;

    allFilterOptions.forEach((element) => {
      if (element.value != "") {
        flag = true;
      }
    });
    if (flag) {
      applyFilterButton.disabled = resetFilterButton.disabled = false;
      applyFilterButton.style.cursor = resetFilterButton.style.cursor = "pointer";
      applyFilterButton.style.backgroundColor = "#F44848";
    } else {
      applyFilterButton.disabled = resetFilterButton.disabled = true;
      applyFilterButton.style.cursor = resetFilterButton.style.cursor = "";
      applyFilterButton.style.backgroundColor = "";
      searchFilters["filter"] = ["", "", ""];
      displayEmployeesDetails(entireData);
    }
  });
});

applyFilterButton.onclick = () => {
  let active, location, department;
  active = allFilterOptions[0].value;
  location = allFilterOptions[1].value;
  department = allFilterOptions[2].value;
  searchFilters["filter"][0] = active;
  searchFilters["filter"][1] = location;
  searchFilters["filter"][2] = department;
  displayEmployeesDetails(entireData);
};

function deleteRecord() {
  let allInputCheckboxes = document.querySelectorAll("tbody input");
  allInputCheckboxes.forEach((ele) => {
    if (
      ele.checked ||
      ele.parentElement.parentElement.querySelector(".last-element")
    ) {
      let parent = ele.parentElement.parentElement;
      let target = parent.children[5].innerText;
      let filteredData = entireData.filter((ele) => {
        return ele.empno != target;
      });
      entireData = filteredData; 
      parent.remove();
      localStorage.removeItem("data");
      localStorage.setItem("data", JSON.stringify(entireData));
      displayEmployeesDetails(entireData);
      inputCheckBox();
      displayEmployeeToaster("Employee Deleted", "red");
    }
  });
}
function inputCheckBox() {
  let allInputCheckboxes = document.querySelectorAll(".user-data input");
  let deleteBtn = document.querySelector("button[name=delete-btn]");
  let flag = false;
  allInputCheckboxes.forEach((ele) => {
    if (ele.checked) {
      flag = true;
    }
  });
  if (flag) {
    deleteBtn.disabled = false;
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.backgroundColor = "#F44848";
  } else {
    deleteBtn.disabled = true;
    deleteBtn.style.cursor = "";
    deleteBtn.style.backgroundColor = "";
  }
}

function displayAdditionalOptions(event) {
  let ellipsisParent = event.srcElement.parentElement;
  if (ellipsisParent.querySelector(".last-element")) {
    ellipsisParent.querySelector(".last-element").remove();
  } else {
    let allEllipsis = Array.from(document.getElementsByClassName("ellipsis"));
    allEllipsis.forEach((ele) => {
      if (ele.parentElement.querySelector(".last-element")) {
        ele.parentElement.querySelector(".last-element").remove();
      }
    });
    let additionalOptions = document.createElement("div");
    additionalOptions.innerHTML =
      "<p>View</p><p>Edit</p><p onclick='deleteRecord()'>Delete</p>";
    additionalOptions.classList.add("last-element");
    event.srcElement.parentElement.appendChild(additionalOptions);
  }
}

let allSelectItems = document.querySelectorAll("select");
allSelectItems.forEach((ele) => {
  ele.addEventListener("change", (event) => {
    if (ele.value != "") {
      ele.style.fontWeight = "600";
      ele.style.color = "#000";
    } else {
      ele.style.fontWeight = "";
      ele.style.color = "";
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key == "/") {
    document.querySelector("input[name = search-bar]").focus();
  }
});