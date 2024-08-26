// Button Elements
const nextBtn = document.getElementById('next_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');
const countdown = document.getElementById('countdown');
// Replicants
const tickerItemsReplicant = nodecg.Replicant('tickerItems', { defaultValue: [] });
const sponsorDetailsReplicant = nodecg.Replicant('sponsorDetails', { defaultValue: {} });
const refreshIntervalReplicant = nodecg.Replicant('refreshInterval');

// Animate In
buttonPlay.onclick = () => {
  updateItems();
  setTimeout(() => {
    console.log('play');
    nodecg.sendMessage('play');
    runCountdown();
  }, 100);
};

// Animate Out
buttonClear.onclick = () => {
  console.log('stop');
  nodecg.sendMessage('stop');
  stopAllIntervals();
};

// Next Page
nextBtn.onclick = () => {
  console.log('next');
  nodecg.sendMessage('next');
  stopAllIntervals();
};

// Interval Ticker ---------------------------------
let tickerInterval;
let tickerCountdownTimerId;
let tickerCount;

// Update Interval
const intervalInput = document.getElementById('interval_input');
const updateIntervalBtn = document.getElementById('update_interval_btn');

updateIntervalBtn.onclick = () => {
  const intervalSeconds = parseInt(intervalInput.value);
  refreshIntervalReplicant.value = intervalSeconds;
  localStorage.setItem('tickerInterval', intervalSeconds);
};

if (localStorage.getItem('tickerInterval')) intervalInput.value = localStorage.getItem('tickerInterval');

function runCountdown() {
  tickerCount = sendableTickerItems.length;
  clearInterval(tickerInterval);
  clearInterval(tickerCountdownTimerId);
  const intervalSeconds = parseInt(intervalInput.value);
  startCountdownTimer(intervalSeconds);
  
  tickerInterval = setInterval(() => {
    tickerCount--;
    if (tickerCount === 0) {
      stopAllIntervals();
    } else {
      startCountdownTimer(intervalSeconds);
    }
  }, intervalSeconds * 1000);
}

function stopAllIntervals() {
  clearInterval(tickerInterval);
  clearInterval(tickerCountdownTimerId);
  countdown.textContent = '';  // Clear the countdown display
}

function startCountdownTimer(duration) {
  clearInterval(tickerCountdownTimerId); // Clear any previous countdown timers
  let timeRemaining = duration;
  tickerCountdownTimerId = setInterval(() => {
    timeRemaining -= 1;
    updateCountdownDisplay(timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(tickerCountdownTimerId); // Clear the timer when it reaches 0
    }
  }, 950);
}

function updateCountdownDisplay(value) {
  countdown.textContent = `${value}s`;
}

// Load Replicant value for checkboxes
const CBCcheck = document.getElementById('netCBC');
const TSNcheck = document.getElementById('netTSN');
const SNcheck = document.getElementById('netSN');
const netCBCStoredValue = localStorage.getItem('tickerCBC');
const netTSNStoredValue = localStorage.getItem('tickerTSN');
const netSNStoredValue = localStorage.getItem('tickerSN');
const netCBCRep = nodecg.Replicant('netCBC');
const netTSNRep = nodecg.Replicant('netTSN');
const netSNRep = nodecg.Replicant('netSN');

if (netCBCStoredValue !== null) {
  CBCcheck.checked = netCBCStoredValue === 'true';
}

if (netTSNStoredValue !== null) {
  TSNcheck.checked = netTSNStoredValue === 'true';
}

if (netSNStoredValue !== null) {
  SNcheck.checked = netSNStoredValue === 'true';
}

// Save Checkbox Value
function netCheck() {
  // Get the checkbox
  if (CBCcheck.checked == true) {
    netCBCRep.value = 'true';
  } else {
    netCBCRep.value = 'false';
  }

  if (TSNcheck.checked == true) {
    netTSNRep.value = 'true';
  } else {
    netTSNRep.value = 'false';
  }

  if (SNcheck.checked == true) {
    netSNRep.value = 'true';
  } else {
    netSNRep.value = 'false';
  }

  localStorage.setItem('tickerCBC', CBCcheck.checked);
  localStorage.setItem('tickerTSN', TSNcheck.checked);
  localStorage.setItem('tickerSN', SNcheck.checked);
}

// Populate the table with tickerItems ------------------------------------------
const tableBody = document.getElementById('table-body');

function addTableRow(item, isAddedFromDropdown) {
  const index = tickerItems.indexOf(item);
  const row = document.createElement('tr');
  row.setAttribute('data-index', index);
  row.id = `ticker-row-${index}`;

  // Create Drag / Drop Handle
  const handleCell = document.createElement('td');
  const handleIcon = document.createElement('i');
  handleIcon.className = 'fa fa-bars';
  handleCell.appendChild(handleIcon);
  row.appendChild(handleCell);

  // Type Cell with dropdown
  const typeCell = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'type-cell';
  const options = ['Results', 'Breaking', 'Promo', 'News', 'Free', 'Ignite'];
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
  select.value = item.type; // Set the initial value based on item's current type

  // Append the select element to the cell
  typeCell.appendChild(select);
  row.appendChild(typeCell);

  // Message cell with contenteditable
  const messageCell = document.createElement('td');
  const message = document.createElement('span');
  message.className = 'message-cell';
  message.setAttribute('contenteditable', true);
  message.innerHTML = item.message;
  message.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      toggleFormat('b');
    } else if (e.ctrlKey && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
      toggleFormat('i');
    }
  });
  messageCell.appendChild(message);
  row.appendChild(messageCell);

  // Delete Column
  const deleteCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash-o';
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.onclick = () => {
    if (confirm('Are you sure you want to delete this row?')) {
      row.remove();
      tickerItems.splice(index, 1);
      sendableTickerItems = sendableTickerItems.filter((_, sendableIndex) => sendableIndex !== index);
    }
  };
  deleteCell.appendChild(deleteIcon);
  row.appendChild(deleteCell);

  // Visibility Column
  const hideCell = document.createElement('td');
  const hideIcon = document.createElement('i');
  hideIcon.className = item.visible ? 'fa fa-eye visibility-icon' : 'fa fa-eye-slash visibility-icon';
  hideIcon.style.cursor = 'pointer';
  select.style.opacity = item.visible ? '1' : '0.5';
  message.style.opacity = item.visible ? '1' : '0.5';
  hideIcon.onclick = () => toggleVisibility(hideIcon);

  hideCell.appendChild(hideIcon);
  row.appendChild(hideCell);

  // Drag and Drop functionality
  addDragAndDropHandlers(row);

  if (tableBody.firstChild && isAddedFromDropdown) {
    tableBody.insertBefore(row, tableBody.firstChild);
  } else {
    tableBody.appendChild(row);
  }
}

// Add Button functionality ------------------------------------------------------------------
function addNewTableRow() {
  const newItem = { type: 'Free', message: 'New message' };
  newItem.visible = true;
  tickerItems.unshift(newItem);
  addTableRow(newItem, true);
}

// Toggle visibility function ------------------------------------------------------------
function toggleVisibility(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = (rows.indexOf(tr) - 1);
  const item = tickerItems[index];
  const typeSelect = tr.querySelector('.type-cell');
  const message = tr.querySelector('.message-cell');

  item.visible = !item.visible;
  if (!item.visible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    typeSelect.style.opacity = '0.5';
    message.style.opacity = '0.5';
    // Remove the item from sendableTickerItems
    sendableTickerItems = sendableTickerItems.filter(x => x !== item);
    item.visible = false;
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    typeSelect.style.opacity = '1';
    message.style.opacity = '1';
    item.visible = true;
    // Add the item back to sendableTickerItems if it's not already included
    if (!sendableTickerItems.includes(item)) {
      sendableTickerItems.splice(index, 0, item);
    }
  }
}

// Drag and Drop functionality -----------------------------------------------------------
function addDragAndDropHandlers(row) {
  row.setAttribute('draggable', true);
  let dragCounter = 0;

  row.ondragstart = (event) => {
    const index = Array.from(tableBody.children).indexOf(row);
    event.dataTransfer.setData('text/plain', index.toString());
    event.dataTransfer.effectAllowed = 'move';
    row.classList.add('dragging');
  };

  row.ondragend = (event) => {
    row.classList.remove('dragging');
    dragCounter = 0;  // Reset counter when drag ends
  };

  row.ondragover = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  row.ondragenter = (event) => {
    event.preventDefault();
    if (dragCounter++ === 0) {  // Increment and check if it's the first entry
      row.classList.add('highlight');
    }
  };

  row.ondragleave = (event) => {
    if (--dragCounter === 0) {  // Decrement and check if it matches zero
      row.classList.remove('highlight');
    }
  };

  row.ondrop = (event) => {
    event.preventDefault();
    const originIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const targetIndex = Array.from(tableBody.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = tableBody.removeChild(tableBody.children[originIndex]);
      tableBody.insertBefore(elementToMove, tableBody.children[targetIndex] || null);

      // Update tickerItems based on the new order
      const movedItem = tickerItems.splice(originIndex, 1)[0];
      tickerItems.splice(targetIndex, 0, movedItem);
    }
    Array.from(tableBody.children).forEach(child => child.classList.remove('highlight'));
  };
}

// Update Group / Sendable Items
function updateItems() {
  const rows = document.querySelectorAll('#table-body tr');
  rows.forEach((row, index) => {
    const dropdown = row.querySelector('td select');
    const dropdownValue = dropdown.value;
    const typeValue = dropdownValue;
    const messageText = row.querySelector('.message-cell').innerHTML;

    if (tickerItems[index]) {
      tickerItems[index].type = typeValue;
      tickerItems[index].message = messageText;
    }
  });
  updateSendableTickerItems();
  saveItems();
  // Update items in Ticker graphic
  nodecg.sendMessage('update');
  tickerItemsReplicant.value = sendableTickerItems;
  updateTimestampMessage('time-stamp');
}

// Generate Table Rows
function generateTableRows() {
  tableBody.innerHTML = ''; // Clear the table first

  tickerItems.forEach((item) => {
    addTableRow(item, false); // Adjust index for IDs
  });
}

// Update sendableTickerItems
function updateSendableTickerItems() {
  sendableTickerItems = tickerItems.filter(item => item.visible);
}

// Function to wrap or unwrap selected text with a given tag
function toggleFormat(tag) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const parentNode = range.commonAncestorContainer.parentNode;

    // Check if the selected text is already wrapped with the tag
    if (parentNode.nodeName.toLowerCase() === tag) {
      const unwrappedText = document.createTextNode(selectedText);
      parentNode.replaceChild(unwrappedText, parentNode.firstChild);
      parentNode.parentNode.replaceChild(unwrappedText, parentNode);
    } else {
      const wrapper = document.createElement(tag);
      wrapper.textContent = selectedText;
      range.deleteContents();
      range.insertNode(wrapper);
      selection.removeAllRanges();
    }
  }
}

// Sponsor Related -------------------------------------------------------------
let isShowSponsor = false;
let sponsorImgSrc = '';
let sponsorFilename = '';
let sponsorImgHeight = '';
let sponsorImgPosition = '';
let isDisplaySponsor = false;

function showSponsor() {
  const sponsorContainer = document.querySelector('.sponsor-container');
  sponsorContainer.style.display = sponsorContainer.style.display === 'none' ? 'block' : 'none';
  isShowSponsor = sponsorContainer.style.display === 'block';
  // If Show Sponsor, change ticker-table max-height
  const tickerTable = document.querySelector('.ticker-table');
  tickerTable.style.maxHeight = isShowSponsor ? '494px' : '662px';
  saveSponsorDetails();
}

// Image Dropdown and selection 
document.addEventListener('DOMContentLoaded', function () {
  function setupDropdownListeners(message, basePath) {
    nodecg.listenFor(message, (imageFiles) => {
      const dropdown = document.querySelector(`select[id^="sponsor-dropdown"]`);
      populateDropdown(dropdown, imageFiles);
      dropdown.addEventListener('change', function () {
        updateImageSource(this.value, basePath);
      });
    });
  }

  // Populate Dropdown
  function populateDropdown(dropdown, imageFiles) {
    dropdown.innerHTML = '';  // Clear existing options first'
    imageFiles.forEach(file => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      dropdown.appendChild(option);
    });
    dropdown.value = sponsorFilename ? sponsorFilename : 'sportchek.png';
  }

  // Update Image with selection
  function updateImageSource(value, basePath) {
    const imageElement = document.querySelector('.sponsor-image');
    if (imageElement) {
      const newImagePath = `${basePath}${value}`;
      imageElement.src = newImagePath;
      sponsorImgSrc = newImagePath;
    }
  }

  // Setup listeners for sponsor images 
  setupDropdownListeners('updateSponsorImages', '../shared/assets/sponsor/');

  // Send initial requests for images 
  nodecg.sendMessage('requestSponsorImages');
});

// Image Resizing Controls
let mouseDownStatus = false;
let oldX;
const sensitivity = 0.5;
let target, minVal, maxVal;

const imageHeight = document.getElementById('img-height');
const imageX = document.getElementById('img-x');
const imageY = document.getElementById('img-y');

imageHeight.addEventListener('mousedown', (event) => {
  mouseDown(event);
});

imageX.addEventListener('mousedown', (event) => {
  mouseDown(event);
});

imageY.addEventListener('mousedown', (event) => {
  mouseDown(event);
});

function mouseDown(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
    mouseDownStatus = true;
    target = e.target;
    minVal = parseInt(target.dataset.min, 10);
    maxVal = parseInt(target.dataset.max, 10);
    oldX = e.pageX;
    target.style.userSelect = 'none';  // Prevent text selection during drag

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }
}

function mouseUp() {
  if (mouseDownStatus) {
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    mouseDownStatus = false;
    if (target) {
      target.style.userSelect = '';
    }
    target = null;
  }
}

function mouseMove(e) {
  if (mouseDownStatus && target) {
    let deltaX = (e.pageX - oldX) / sensitivity;
    let newValue = parseInt(target.value, 10) + deltaX;
    newValue = Math.max(minVal, Math.min(newValue, maxVal));
    target.value = Math.round(newValue);
    oldX = e.pageX;
    updateImageStyle();
  }
}

// Update Sponsor Image Preview 
function updateImageStyle() {
  const img = document.querySelector('.sponsor-image');
  img.style.height = `${imageHeight.value}px`;
  sponsorImgHeight = img.style.height;
  img.style.top = `${imageY.value}px`;
  img.style.right = `${imageX.value}px `;
  sponsorImgY = img.style.top;
  sponsorImgX = img.style.right;
}

// Save Sponsor Details
function saveSponsorDetails() {
  sponsorImgSrc = document.querySelector('.sponsor-image').src;
  sponsorImgHeight = `${imageHeight.value}px`;
  sponsorImgX = `${imageX.value}px`;
  sponsorImgY = `${imageY.value}px`;
  sponsorDetails = {
    imgHeight: sponsorImgHeight,
    imgSrc: sponsorImgSrc,
    imgX: sponsorImgX,
    imgY: sponsorImgY,
    isDisplay: isDisplaySponsor
  }
  // Update Sponsor Replicant
  nodecg.sendMessage('update');
  sponsorDetailsReplicant.value = sponsorDetails;
  // Local Storage
  localStorage.setItem('sponsorDetails', JSON.stringify(sponsorDetails));
}

loadSponsorDetails();

// Load Sponsor Details
function loadSponsorDetails() {
  if (localStorage.getItem('sponsorDetails')) {
    sponsorDetails = JSON.parse(localStorage.getItem('sponsorDetails'));
    const sponsorImage = document.querySelector('.sponsor-image');
    sponsorImage.src = sponsorDetails.imgSrc;
    sponsorFilename = getFilenameFromPath(sponsorImage.src);
    imageHeight.value = +sponsorDetails.imgHeight.split('px')[0];
    imageX.value = +sponsorDetails.imgX.split('px')[0];
    imageY.value = +sponsorDetails.imgY.split('px')[0];
    updateImageStyle();
    isDisplaySponsor = sponsorDetails.isDisplay;
    setToggleSponsor();
  }
}

// Get Filename from Path
function getFilenameFromPath(filePath) {
  return filePath.split('/').pop();
}

// Show / Hide Sponsor
function toggleSponsor() {
  isDisplaySponsor = !isDisplaySponsor;
  setToggleSponsor();
  saveSponsorDetails();
}

// Set Toggle Sponsor Button
function setToggleSponsor() {
  const showHideSponsorBtn = document.getElementById('show_hide_sponsor');
  showHideSponsorBtn.classList = isDisplaySponsor ? 'btn sm-btn sponsor-on' : 'btn sm-btn sponsor-off';
  showHideSponsorBtn.textContent = isDisplaySponsor ? 'ON' : 'OFF';
}

// Initial Setup Save / Load -----------------------------------------------------------
let tickerItems = [];
let sendableTickerItems = [];

function saveItems() {
  localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  localStorage.setItem('sendableTickerItems', JSON.stringify(sendableTickerItems));
}

function loadItems() {
  if (localStorage.getItem('tickerItems') && localStorage.getItem('sendableTickerItems')) {
    // Parse the stored JSON data
    tickerItems = JSON.parse(localStorage.getItem('tickerItems'));
    sendableTickerItems = JSON.parse(localStorage.getItem('sendableTickerItems'));
  } else {
    // Default values if nothing is in localStorage
    tickerItems = [
      { type: 'Ignite', message: 'Support Canadian Paralympians' },
      { type: 'Ignite', message: 'Buy a $25 virtual seat at *URL and help fill our stadium with pride' },
      { type: 'Ignite', message: 'Help raise $1M for our Paralympic athletes' },
      { type: 'Ignite', message: 'join IGNITE the Light today at *URL' },
      { type: 'Results', message: '100 Meter World Record Holder' },
      { type: 'News', message: 'There is news from earlier today' },
      { type: 'Breaking', message: 'New Marathon Record' },
      { type: 'Promo', message: 'Upcoming: World Championship' },
      { type: 'Free', message: 'Tension as Paralympics approach' },
    ];
    tickerItems.forEach((item) => {
      item.visible = true;
    });
    sendableTickerItems = [...tickerItems];
    saveItems();
  }
  generateTableRows();
}

loadItems();

function updateTimestampMessage(className) {
  const now = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const day = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestampMessage = `<i>Updated</i> &nbsp; ${month} ${day} - ${hours}:${minutes}:${seconds}`;

  // Find the element with the specified class name and update its text content
  const element = document.querySelector(`.${className}`);
  if (element) {
      element.innerHTML = timestampMessage;
  } else {
      console.warn(`Element with class '${className}' not found.`);
  }
}