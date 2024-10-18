function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function addItem() {
  ulId = document.getElementById("id-box-to-add").getAttribute("value");
  title = document.getElementById("titel").value;
  const ulItem = document.getElementById(ulId);
  const liItem = document.createElement("li");
  const uniqueId = `item-${Date.now()}`;
  liItem.setAttribute("draggable", "true");
  liItem.setAttribute("ondragstart", "drag(event)");
  liItem.setAttribute("id", uniqueId);
  liItem.classList.add("backlog-item");
  liItem.textContent = title;
  ulItem.appendChild(liItem);
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
  } else {
    console.warn("Drop target is not a valid <ul>.");
  }
}
