//load data
window.onload = function () {
  showData();
};
// addItem
function addItem() {
  ulId = document.getElementById("id-box-to-add").getAttribute("value");
  title = document.getElementById("titel").value;
  description = document.getElementById("description").value;
  const ulItem = document.getElementById(ulId);
  const liItem = document.createElement("li");
  const uniqueId = `item-${Date.now()}`;
  liItem.setAttribute("draggable", "true");
  liItem.setAttribute("ondragstart", "drag(event)");
  liItem.setAttribute("id", uniqueId);
  liItem.classList.add("backlog-item");
  liItem.textContent = title;
  ulItem.appendChild(liItem);
  storeData(uniqueId, ulId);
  closeForm();
}
function openForm(ulId, formTitleContent) {
  clearInput();
  const idBoxToAdd = document.getElementById("id-box-to-add");
  idBoxToAdd.value = ulId;
  const formTitle = document.getElementById("form-title");
  formTitle.textContent = "Add Item To " + formTitleContent;
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function clearInput() {
  document.getElementById("id-box-to-add").value = "";
  document.getElementById("description").value = "";
  document.getElementById("titel").value = "";
}
//storeData
function storeData(uniqueId, ulId) {
  console.log("storedata");
  const obj = {
    id: uniqueId,
    title: title,
    description: description,
    ulId: ulId,
  };
  let items = localStorage.getItem("items");
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  console.log(items);
  items.push(obj);
  localStorage.setItem("items", JSON.stringify(items));
}
//show items
function showData() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.forEach((item) => {
    const ulItem = document.getElementById(item.ulId);
    const liItem = document.createElement("li");
    liItem.setAttribute("draggable", "true");
    liItem.setAttribute("ondragstart", "drag(event)");
    liItem.setAttribute("id", item.id);
    liItem.classList.add("backlog-item");
    liItem.textContent = item.ulId;
    ulItem.appendChild(liItem);
  });
}
//drag and drop

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  if (ev.target.tagName === "UL") {
    ev.target.appendChild(draggedElement);
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const foundItem = items.find((item) => item.id === draggedElement.id);
    foundItem.ulId = ev.target.id;
    console.log(foundItem);
    localStorage.setItem("items", JSON.stringify(items));
    console.log(items);
  } else {
    console.warn("Drop target is not a valid <ul>.");
  }
}
