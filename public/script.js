const elButton = document.getElementById('add_button');
const elInput = document.getElementById('add_input');
const elList = document.getElementById('list');

elButton.addEventListener('click', AddItem);

async function getShoppingList() {
  const response = await fetch('http://localhost:3000/getShoppingList');
  let shoppingList = await response.json();
  return shoppingList;
}

function DeleteItem(itemName) {
  fetch(`http://localhost:3000/deleteItem/${itemName}`, {
    method: 'DELETE',
  });

  PopulateList();
}

function AddItem() {
  const newItem = {
    AddedItem: elInput.value
  };

  fetch('http://localhost:3000/addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the Content-Type header for JSON data
    },
    body: JSON.stringify(newItem)
  });

  elInput.value = '';
  PopulateList();
}

function Init() {
  PopulateList();
}

async function PopulateList() {
  elList.innerHTML = '';
  let list = await getShoppingList();

  Object.values(list.List).forEach((val) => {
    elList.appendChild(CreateItem(val));
  });
}

function CreateItem(itemName) {
  let liElement = document.createElement('li');
  liElement.id = 'listItem';
  liElement.className = 'list-item';
  let divElement = document.createElement('div');
  divElement.className = 'list-item-container'
  let spanElement = document.createElement('span');
  spanElement.textContent = itemName;
  let buttonElement = document.createElement('button');
  buttonElement.addEventListener('click', function () {
    DeleteItem(itemName);
  });

  let iElement = document.createElement('i');
  iElement.className = "fa-solid fa-xmark"

  buttonElement.appendChild(iElement);
  liElement.appendChild(divElement);
  divElement.appendChild(spanElement);
  divElement.appendChild(buttonElement);

  return liElement;
}

function clickMethod() {
  console.log('Click');
}

Init();
