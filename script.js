//load data
window.onload = function () {
  showData();
};
// addItem
function addItem(ulId, textAreaId, btnAddId, btnStoreId) {
  title = document.getElementById(textAreaId).value;
  const ulItem = document.getElementById(ulId);
  const liItem = document.createElement("li");
  const uniqueId = `item-${Date.now()}`;
  liItem.setAttribute("draggable", "true");
  liItem.setAttribute("ondragstart", "drag(event)");
  liItem.setAttribute("id", uniqueId);
  liItem.classList.add("backlog-item");
  liItem.textContent = title;
  ulItem.appendChild(liItem);
  storeData(uniqueId, ulId, title);
  closeForm(btnAddId, btnStoreId, textAreaId);
}
function openForm(btnAdd, btnStore, idToShow) {
  document.getElementById(btnAdd).style.display = "none";
  document.getElementById(btnStore).style.display = "block";
  document.getElementById(idToShow).value = "";
  document.getElementById(idToShow).style.display = "block";
  document.getElementById(idToShow).focus();
}

function closeForm(btnAddId, btnStoreId, textAreaId) {
  document.getElementById(btnStoreId).style.display = "none";
  document.getElementById(textAreaId).style.display = "none";
  document.getElementById(btnAddId).style.display = "block";
}

//storeData
function storeData(uniqueId, ulId, title) {
  const obj = {
    id: uniqueId,
    title: title,
    ulId: ulId,
  };
  let items = localStorage.getItem("items");
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
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
    liItem.textContent = item.title;
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
