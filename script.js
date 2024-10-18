function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function addItem() {
  ulId = document.getElementById("id-box-to-add").getAttribute("value");
  title = document.getElementById("titel").getAttribute("value");
  console.log(title);
  const ulItem = document.getElementById(ulId);
  const liItem = document.createElement("li");
  liItem.classList.add("backlog-item");
  liItem.textContent = title;
  ulItem.appendChild(liItem);
  // imageContainer.appendChild(item);
  // img.addEventListener("load", imageLoaded);
}
function openForm(ulId) {
  clearInput();
  const idBoxToAdd = document.getElementById("id-box-to-add");
  idBoxToAdd.value = ulId;
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
function affectValue() {
  // const input = document.getElementById("title");
  // input.addEventListener("input", (event) => {
  //   input.setAttribute("value", event.target.value);
  // });
}
