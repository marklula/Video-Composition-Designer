// Grab necessary DOM elements
const canvas = document.getElementById('canvas');
const codecSelector = document.getElementById('codec-selector');
const layoutSelector = document.getElementById('layout-selector');
const leftMenu = document.getElementById('left-menu');
const resetButton = document.getElementById('reset-button');  // Reset button element
const itemList = document.getElementById('item-list');  // Right menu item list
let printed = false;
let droppedItems = [];

// Make the items draggable
leftMenu.querySelectorAll('.input-item').forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', item.innerText);
  });
});

// Handle dropping items on the canvas
canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const itemName = e.dataTransfer.getData('text');
  const droppedItem = document.createElement('div');
  
  droppedItem.classList.add('dropped-item');
  droppedItem.innerText = itemName;

  if (droppedItems.length > 3)  {
    alert ('You can only composite a maximum of four inputs (two for PiP). Please select "Clear Canvas" to reset.');
  }
  else   {
    canvas.appendChild(droppedItem);
    droppedItems.push(droppedItem);
    updateItemList(); // Update the right-hand menu with the new order
    applyLayout(); // Apply the selected layout after an item is dropped

    //update xCommand Output
    document.getElementById('xcommand').insertAdjacentText("beforeend"," ConnectorId: " + itemName);
  }
});

// Handle layout change
layoutSelector.addEventListener('change', applyLayout);

function applyCodec() {
  const codecType = codecSelector.value;

  if (codecType === 'Codec Pro') {
    document.getElementById('5').style.display = 'inherit';   
  }
  else if (codecType === 'Codec EQ') {
    document.getElementById('5').style.display = 'none';
  }
}


// Apply layout based on selected option
function applyLayout() {
  const layoutType = layoutSelector.value;
  const itemCount = droppedItems.length;

  // Reset styles for all dropped items
  droppedItems.forEach((item) => {
    item.style.width = '';
    item.style.height = '';
    item.style.top = '';
    item.style.left = '';
  });

  if (layoutType === 'equal') {    
    if (itemCount === 1) {
      // Single item takes up the entire canvas
      positionItems([{ top: '0', left: '0', width: '100%', height: '100%' }]);
    } else if (itemCount === 2) {
      // Two items side by side, centered vertically
      positionItems([
        { top: '20%', left: '0', width: '50%', height: '50%' },
        { top: '20%', left: '50%', width: '50%', height: '50%' }
      ]);
    } else if (itemCount === 3) {
      // Three items: first two side by side in the top row, third in the second row centered
      positionItems([
        { top: '0', left: '0', width: '50%', height: '50%' },
        { top: '0', left: '50%', width: '50%', height: '50%' },
        { top: '51%', left: '25%', width: '50%', height: '50%' }
      ]);
    } else if (itemCount === 4) {
      // Four items in a 2x2 grid
      positionItems([
        { top: '0', left: '0', width: '50%', height: '50%' },
        { top: '0', left: '50%', width: '50%', height: '50%' },
        { top: '50%', left: '0', width: '50%', height: '50%' },
        { top: '50%', left: '50%', width: '50%', height: '50%' }
      ]);
    }
  }
  if (layoutType === 'prominent') {

    if (itemCount === 1) {
      // Single item takes up the entire canvas
      positionItems([{ top: '0', left: '0', width: '100%', height: '100%' }]);
    } else if (itemCount === 2) {
      // Two items side by side, centered vertically
      positionItems([
        { top: '0', left: '12.5%', width: '75%', height: '80%' },
        { top: '81%', left: '42.5%', width: '15%', height: '20%' }
      ]);
    } else if (itemCount === 3) {
      // Three items: first two side by side in the top row, third in the second row centered
      positionItems([
        { top: '0', left: '12.5%', width: '75%', height: '80%' },
        { top: '81%', left: '34.75%', width: '15%', height: '20%' },
        { top: '81%', left: '50.25%', width: '15%', height: '20%' }
      ]);
    } else if (itemCount === 4) {
      // Four items in a 2x2 grid
      positionItems([
        { top: '0', left: '12.5%', width: '75%', height: '80%' },
        { top: '81%', left: '27.25%', width: '15%', height: '20%' },
        { top: '81%', left: '42.75%', width: '15%', height: '20%' },
        { top: '81%', left: '58.25%', width: '15%', height: '20%' }
      ]);
    }
  }
  if (layoutType === 'small pip') {

    if (itemCount === 1) {
      // Single item takes up the entire canvas
      positionItems([{ top: '0', left: '0', width: '100%', height: '100%' }]);
    } else if (itemCount === 2) {
      // Two items side by side, centered vertically
      positionItems([
        { top: '0', left: '0', width: '100%', height: '100%' },
        { top: '72.5%', left: '73.5%', width: '25%', height: '25%' }
      ]);
    }
  }
  if (layoutType === 'large pip') {
    
    if (itemCount === 1) {
      // Single item takes up the entire canvas
      positionItems([{ top: '0', left: '0', width: '100%', height: '100%' }]);
    } else /*if(itemCount === 2)*/ {
      // Two items side by side, centered vertically
      positionItems([
        { top: '0', left: '0', width: '100%', height: '100%' },
        { top: '62.5%', left: '63.5%', width: '35%', height: '35%' }
      ]);
    }
  }
}

// Function to position the dropped items based on the layout
function positionItems(positions) {
  positions.forEach((pos, index) => {
    const item = droppedItems[index];
    item.style.position = 'absolute';
    item.style.top = pos.top;
    item.style.left = pos.left;
    item.style.width = pos.width;
    item.style.height = pos.height;
  });
}

// Update the right-hand menu with the list of dropped items
function updateItemList() {
  itemList.innerHTML = '';  // Clear the current list

  droppedItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `Input: ${item.innerText}`;
    itemList.appendChild(listItem);      
  });
}

// Event listener for the reset button
resetButton.addEventListener('click', () => {
  // Remove all dropped items from the canvas
  droppedItems.forEach((item) => {
    item.remove();
  });
  droppedItems = [];  // Clear the dropped items array
  canvas.innerHTML = '';  // Clear the canvas
  itemList.innerHTML = '';  // Clear the right-hand menu list

  //Reset xCommand Output to default
  document.getElementById('xcommand').innerText = "xCommand Video Input SetMainVideoSource ";
  document.getElementById('layout-selector').value = "select";
  printed = false;
});

layoutSelector.addEventListener('change', () => {

  droppedItems = [];  // Clear the dropped items array
  canvas.innerHTML = '';  // Clear the canvas
  itemList.innerHTML = '';  // Clear the right-hand menu list

  document.getElementById('xcommand').innerText = "xCommand Video Input SetMainVideoSource ";
  printed = false;

  const layoutType = layoutSelector.value;

  if (layoutType === 'equal' && printed == false){
    //Set xcommand text
    document.getElementById('xcommand').insertAdjacentText("beforeend","Layout: Equal");
    printed = true;
  } else if (layoutType === 'prominent' && printed == false) {
    //Set xcommand text
    document.getElementById('xcommand').insertAdjacentText("beforeend","Layout: Prominent");
    printed = true;
  } else if (layoutType === 'small pip' && printed == false) {
    //Set xcommand text
    document.getElementById('xcommand').insertAdjacentText("beforeend","Layout: PIP PIPPositon:Lowerright PIPSize: Auto");
    printed = true;
  } else if (layoutType === 'large pip' && printed == false) {
    //Set xcommand text
    document.getElementById('xcommand').insertAdjacentText("beforeend","Layout: PIP PIPPositon:Lowerright PIPSize: Large");
    printed = true;
  }
});