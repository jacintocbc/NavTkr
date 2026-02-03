// Button Elements - 1 Navbar
const buttonPlay1 = document.getElementById('in_btn_1');
const buttonClear1 = document.getElementById('out_btn_1');
const buttonAuto1 = document.getElementById('auto_btn_1');
const buttonNext1 = document.getElementById('next_btn_1');
const intervalInput1 = document.getElementById('interval_input_1');
const buttonUpdateInterval1 = document.getElementById('update_interval_btn_1');
const countdown1 = document.getElementById('countdown_1');
// Button Elements - 2 Promo
const buttonPlay2 = document.getElementById('in_btn_2');
const buttonClear2 = document.getElementById('out_btn_2');
const buttonAuto2 = document.getElementById('auto_btn_2');
const buttonNext2 = document.getElementById('next_btn_2');
const intervalInput2 = document.getElementById('interval_input_2');
const buttonUpdateInterval2 = document.getElementById('update_interval_btn_2');
const countdown2 = document.getElementById('countdown_2');
// Button Elements - 3 Results
const buttonPlay3 = document.getElementById('in_btn_3');
const buttonClear3 = document.getElementById('out_btn_3');
const buttonAuto3 = document.getElementById('auto_btn_3');
const buttonNext3 = document.getElementById('next_btn_3');
const intervalInput3 = document.getElementById('interval_input_3');
const buttonUpdateInterval3 = document.getElementById('update_interval_btn_3');
const countdown3 = document.getElementById('countdown_3');
// Replicants
const navbarItemsReplicant = nodecg.Replicant('navbarItems', { defaultValue: [] });
const promoItemsReplicant = nodecg.Replicant('promoItems', { defaultValue: [] });
const resultItemsReplicant = nodecg.Replicant('resultItems', { defaultValue: [] });

// Interval Navbar ------------------ 
let isNavbarAuto;
let isNavbarPlaying;
let navbarAutoNextInterval;
let navbarCountdownValue;
let navbarCountdownTimerId;
let navbarCount;

loadIsNavbarAuto();

function loadIsNavbarAuto() {
  if (localStorage.getItem('isNavbarAuto')) {
    isNavbarAuto = localStorage.getItem('isNavbarAuto');
    setIsNavbarAuto();
  } else {
    isNavbarAuto = false;
  }
}

function setIsNavbarAuto() {
  buttonAuto1.className = isNavbarAuto ? 'btn sm-btn auto-on' : 'btn sm-btn auto-off';
  localStorage.setItem('isNavbarAuto', isNavbarAuto);
}

buttonAuto1.onclick = () => {
  isNavbarAuto = !isNavbarAuto;
  setIsNavbarAuto();
  if (isNavbarAuto === false) stopAllNavbarIntervals();
}

if (localStorage.getItem('navbarInterval')) intervalInput1.value = localStorage.getItem('navbarInterval');

buttonUpdateInterval1.onclick = () => {
  const intervalSeconds = parseInt(intervalInput1.value);
  localStorage.setItem('navbarInterval', intervalSeconds);
  if (isNavbarPlaying) startNavbarTransitions();
};

function startNavbarTransitions() {
  isNavbarAuto = true;
  navbarCount = sendableNavbarItems.length;  // Total number of transitions to make
  setIsNavbarAuto();
  clearInterval(navbarAutoNextInterval);
  clearInterval(navbarCountdownTimerId);
  const intervalSeconds = parseInt(intervalInput1.value);
  navbarCountdownValue = intervalSeconds;

  if (intervalSeconds > 0 && navbarCount > 0) {
    navbarAutoNextInterval = setInterval(() => {
      if (navbarCount > 0) {
        nodecg.sendMessage('next1');
        navbarCount--;  // Decrement the count of items left
        navbarCountdownValue = intervalSeconds;  // Reset countdown value
        if (navbarCount === 0) {
          stopAllNavbarIntervals();  // Stop intervals and clear the display if no items left
        }
      }
    }, intervalSeconds * 1000);
  }

  // Start countdown timer
  startNavbarCountdownTimer();
}

function stopAllNavbarIntervals() {
  clearInterval(navbarAutoNextInterval);
  clearInterval(navbarCountdownTimerId);
  countdown1.textContent = '';  // Clear the countdown display
}

function startNavbarCountdownTimer() {
  navbarCountdownTimerId = setInterval(() => {
    navbarCountdownValue -= 1;
    updateNavbarCountdownDisplay(navbarCountdownValue);
  }, 1000);
}

function updateNavbarCountdownDisplay(value) {
  countdown1.textContent = `${value}s`;
}

// Interval Promo ----------------------
let isPromoAuto;
let isPromoPlaying;
let promoAutoNextInterval;
let promoCountdownValue;
let promoCountdownTimerId;
let promoCount;

loadIsPromoAuto();

function loadIsPromoAuto() {
  if (localStorage.getItem('isPromoAuto')) {
    isPromoAuto = localStorage.getItem('isPromoAuto');
    setIsPromoAuto();
  } else {
    isPromoAuto = false;
  }
}

function setIsPromoAuto() {
  buttonAuto2.className = isPromoAuto ? 'btn sm-btn auto-on' : 'btn sm-btn auto-off';
  localStorage.setItem('isPromoAuto', isPromoAuto);
}

buttonAuto2.onclick = () => {
  isPromoAuto = !isPromoAuto;
  setIsPromoAuto();
  if (isPromoAuto === false) stopAllPromoIntervals();
}

if (localStorage.getItem('promoInterval')) intervalInput2.value = localStorage.getItem('promoInterval');

buttonUpdateInterval2.onclick = () => {
  const intervalSeconds = parseInt(intervalInput2.value);
  localStorage.setItem('promoInterval', intervalSeconds);
  if (isPromoPlaying) startPromoTransitions();
};

function startPromoTransitions() {
  isPromoAuto = true;
  promoCount = sendablePromoItems.length;  // Total number of transitions to make
  setIsPromoAuto();
  clearInterval(promoAutoNextInterval);
  clearInterval(promoCountdownTimerId);
  const intervalSeconds = parseInt(intervalInput2.value);
  promoCountdownValue = intervalSeconds;

  if (intervalSeconds > 0 && promoCount > 0) {
    promoAutoNextInterval = setInterval(() => {
      if (promoCount > 0) {
        nodecg.sendMessage('next2');
        promoCount--;  // Decrement the count of items left
        promoCountdownValue = intervalSeconds;  // Reset countdown value
        if (promoCount === 0) {
          stopAllPromoIntervals();  // Stop intervals and clear the display if no items left
        }
      }
    }, intervalSeconds * 1000);
  }

  // Start countdown timer
  startPromoCountdownTimer();
}

function stopAllPromoIntervals() {
  clearInterval(promoAutoNextInterval);
  clearInterval(promoCountdownTimerId);
  countdown2.textContent = '';  // Clear the countdown display
}

function startPromoCountdownTimer() {
  promoCountdownTimerId = setInterval(() => {
    promoCountdownValue -= 1;
    updatePromoCountdownDisplay(promoCountdownValue);
  }, 1000);
}

function updatePromoCountdownDisplay(value) {
  countdown2.textContent = `${value}s`;
}

// Interval Results -------------------
let isResultAuto;
let isResultPlaying;
let resultAutoNextInterval;
let resultCountdownValue;
let resultCountdownTimerId;
let resultCount;

loadIsResultAuto();

function loadIsResultAuto() {
  if (localStorage.getItem('isResultAuto')) {
    isResultAuto = localStorage.getItem('isResultAuto');
    setIsResultAuto();
  } else {
    isResultAuto = false;
  }
}

function setIsResultAuto() {
  buttonAuto3.className = isResultAuto ? 'btn sm-btn auto-on' : 'btn sm-btn auto-off';
  localStorage.setItem('isResultAuto', isResultAuto);
}

buttonAuto3.onclick = () => {
  isResultAuto = !isResultAuto;
  setIsResultAuto();
  if (isResultAuto === false) stopAllResultIntervals();
}

if (localStorage.getItem('resultsInterval')) intervalInput3.value = localStorage.getItem('resultsInterval');

buttonUpdateInterval3.onclick = () => {
  const intervalSeconds = parseInt(intervalInput3.value);
  localStorage.setItem('resultsInterval', intervalSeconds);
  if (isResultPlaying) startResultTransitions();
};

function startResultTransitions() {
  isResultAuto = true;
  resultCount = sendableResultItems.length;  // Total number of transitions to make
  setIsResultAuto();
  clearInterval(resultAutoNextInterval);
  clearInterval(resultCountdownTimerId);
  const intervalSeconds = parseInt(intervalInput3.value);
  resultCountdownValue = intervalSeconds;

  if (intervalSeconds > 0 && resultCount > 0) {
    resultAutoNextInterval = setInterval(() => {
      if (resultCount > 0) {
        nodecg.sendMessage('next3');
        resultCount--;  // Decrement the count of items left
        resultCountdownValue = intervalSeconds;  // Reset countdown value
        if (resultCount === 0) {
          stopAllResultIntervals();  // Stop intervals and clear the display if no items left
        }
      }
    }, intervalSeconds * 1000);
  }

  // Start countdown timer
  startResultCountdownTimer();
}

function stopAllResultIntervals() {
  clearInterval(resultAutoNextInterval);
  clearInterval(resultCountdownTimerId);
  countdown3.textContent = '';  // Clear the countdown display
}

function startResultCountdownTimer() {
  resultCountdownTimerId = setInterval(() => {
    resultCountdownValue -= 1;
    updateResultCountdownDisplay(resultCountdownValue);
  }, 1000);
}

function updateResultCountdownDisplay(value) {
  countdown3.textContent = `${value}s`;
}

// Play / Stop / Next / Submit Navbar ----------------------
buttonPlay1.onclick = () => {
  updateNavbarItems();
  setTimeout(() => {
    if (isNavbarAuto) startNavbarTransitions();
    console.log('play navbar');
    nodecg.sendMessage('play1');
    isNavbarPlaying = true;
  }, 100);
};

buttonClear1.onclick = () => {
  stopAllNavbarIntervals();
  console.log('stop navbar');
  nodecg.sendMessage('stop1');
  isNavbarPlaying = false;
};

buttonNext1.onclick = () => {
  console.log('next navbar');
  nodecg.sendMessage('next1');
};

// Play / Stop / Next / Submit Promo -----------------------
buttonPlay2.onclick = () => {
  updatePromoItems();
  setTimeout(() => {
    if (isPromoAuto) startPromoTransitions();
    console.log('play promo');
    nodecg.sendMessage('play2');
    isPromoPlaying = true;
  }, 100);
};

buttonClear2.onclick = () => {
  stopAllPromoIntervals();
  console.log('stop promo');
  nodecg.sendMessage('stop2');
  isPromoPlaying = false;
};

buttonNext2.onclick = () => {
  console.log('next promo');
  nodecg.sendMessage('next2');
};

// Play / Stop / Next / Submit Result -----------------------
buttonPlay3.onclick = () => {
  updateResultItems();
  setTimeout(() => {
    if (isResultAuto) startResultTransitions();
    console.log('play results');
    nodecg.sendMessage('play3');
    isResultPlaying = true;
  }, 100);
};

buttonClear3.onclick = () => {
  stopAllResultIntervals();
  console.log('stop results');
  nodecg.sendMessage('stop3');
  isResultPlaying = false;
};

buttonNext3.onclick = () => {
  console.log('next result');
  nodecg.sendMessage('next3');
};

// Load Replicant value for checkboxes
const netCBCRep = nodecg.Replicant('netCBC');
const netTSNRep = nodecg.Replicant('netTSN');
const netSNRep = nodecg.Replicant('netSN');
const CBCcheck = document.getElementById('netCBC');
const TSNcheck = document.getElementById('netTSN');
const SNcheck = document.getElementById('netSN');
const netCBCStoredValue = localStorage.getItem('navCBC');
const netTSNStoredValue = localStorage.getItem('navTSN');
const netSNStoredValue = localStorage.getItem('navSN');

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

  localStorage.setItem('navCBC', CBCcheck.checked);
  localStorage.setItem('navTSN', TSNcheck.checked);
  localStorage.setItem('navSN', SNcheck.checked);
}

// Tab related logic ----------------------------------------
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
  
  // If Results tab is opened, check heights
  if (tabName === 'Tab3') {
    const table = document.getElementById('results-table');
    if (table) {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        if (row.checkHeight) {
          row.checkHeight();
        }
      });
    }
  }
}

document.getElementsByClassName('tablinks')[0].click();

// Navbar Items --------------------------------------------------------------------

function addNavbarTableRow(item, table, isAddedFromDropdown) {
  const index = navbarItems.indexOf(item);
  const tr = document.createElement('tr');
  tr.setAttribute('data-index', index);
  tr.id = `navbar-row-${index}`;

  const td = document.createElement('td');
  const rowWrapper = document.createElement('div');
  rowWrapper.className = 'row-wrapper';

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const navMain = document.createElement('div');
  navMain.className = 'nav-main';
  navMain.id = `navbar-${index + 1}`;

  const navbarWrapper = document.createElement('div');
  navbarWrapper.className = 'navbar-wrapper';

  // Header
  const navHeader = document.createElement('div');
  navHeader.className = 'nav-header';
  const img = document.createElement('img');
  img.src = `../shared/assets/logos/${item.img}`;
  img.alt = 'Broadcast Logo';
  img.className = 'broadcast-logo';
  navHeader.appendChild(img);

  const navContent = document.createElement('div');
  navContent.className = 'nav-content';

  // Title
  const navTitle = document.createElement('span');
  navTitle.className = 'nav-title';
  if (item.squeeze === true || item.squeeze === false) {
    if (item.squeeze === true) navTitle.className = 'nav-title squeeze';
  }
  const titleText = document.createElement('span');
  titleText.className = 'text';
  titleText.id = `title-text-${index + 1}`;
  titleText.contentEditable = 'true';
  titleText.textContent = item.title;
  navTitle.appendChild(titleText);

  // Time
  const navTime = document.createElement('span');
  navTime.className = 'nav-time';

  const time1 = document.createElement('span');
  time1.className = 'time-text-part time-1';
  time1.contentEditable = 'true';
  time1.textContent = item.time1;

  const time2 = document.createElement('span');
  time2.className = 'time-text-part time-2';
  time2.contentEditable = 'true';
  time2.textContent = item.time2;

  const time3 = document.createElement('span');
  time3.className = 'time-text-part time-3';
  time3.contentEditable = 'true';
  time3.textContent = item.time3;

  navTime.appendChild(time1);
  navTime.appendChild(time2);
  navTime.appendChild(time3);

  // Footer
  const footerText = document.createElement('span');
  footerText.className = 'text footer-text';
  if (item.squeeze === true || item.squeeze === false) {
    if (item.squeeze === true) footerText.className = 'text footer-text footer-squeeze';
  }
  footerText.id = `nav-footer-text-${index + 1}`;
  footerText.contentEditable = 'true';
  footerText.textContent = item.footer;

  navContent.appendChild(navTitle);
  navContent.appendChild(navTime);
  navContent.appendChild(footerText);

  const footer = document.createElement('div');
  footer.className = 'footer';
  const footerImg = document.createElement('img');
  footerImg.src = '../shared/assets/background-bar.png';
  footerImg.alt = 'CBC Gem line pattern';
  footer.appendChild(footerImg);

  navbarWrapper.appendChild(navHeader);
  navbarWrapper.appendChild(navContent);
  navbarWrapper.appendChild(footer);

  navMain.appendChild(navbarWrapper);
  navWrapper.appendChild(navMain);

  const settings = document.createElement('div');
  settings.className = 'settings';

  // Delete
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa fa-trash-o';
  trashIcon.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this item?')) {
      const rowIndex = parseInt(tr.getAttribute('data-index'), 10);
      navbarItems.splice(rowIndex, 1);  // Remove the item from the array
      table.removeChild(tr);  // Remove the row from the table
      updateNavbarRowIndices(table);  // Update indices after deletion
    }
  });

  // Visibility
  const visibilityIcon = document.createElement('i');
  visibilityIcon.className = item.visible ? 'fa fa-eye visibility-icon' : 'fa fa-eye-slash visibility-icon';
  visibilityIcon.style.cursor = 'pointer';
  navWrapper.style.opacity = item.visible ? '1' : '0.5';
  visibilityIcon.onclick = () => toggleNavbarVisibility(visibilityIcon);

  // Squeeze Font
  const squeezeIcon = document.createElement('i');
  if (item.squeeze === true || item.squeeze === false) squeezeIcon.className = item.squeeze ? 'fa fa-compress squeeze-icon' : 'fa fa-expand squeeze-icon';
  if (item.squeeze === true || item.squeeze === false) squeezeIcon.title = item.squeeze ? 'Click to Expand Title' : 'Click to Squeeze Title';
  squeezeIcon.style.cursor = 'pointer';
  squeezeIcon.onclick = () => toggleFontSqueeze(squeezeIcon);

  // Drag and Drop
  const barsIcon = document.createElement('i');
  barsIcon.className = 'fa fa-bars';

  settings.appendChild(trashIcon);
  settings.appendChild(visibilityIcon);
  if (item.squeeze === true || item.squeeze === false) settings.appendChild(squeezeIcon);
  settings.appendChild(barsIcon);

  rowWrapper.appendChild(navWrapper);
  rowWrapper.appendChild(settings);

  td.appendChild(rowWrapper);
  tr.appendChild(td);

  addNavbarDragAndDropHandlers(tr, table);

  if (table.firstChild && isAddedFromDropdown) {
    table.insertBefore(tr, table.firstChild);
  } else {
    table.appendChild(tr);
  }
}

// Update Row Indexes
function updateNavbarRowIndices(table) {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.setAttribute('data-index', index);
    row.id = `navbar-row-${index}`;
  });
}

// Add Button functionality
function addNewNavbarFromDropdown() {
  const dropdown = document.getElementById('dropdown_1');
  const selectedOption = dropdown.options[dropdown.selectedIndex].text.toLowerCase().replace(/\s+/g, '-');
  const newItem = {
    img: `${selectedOption}-logo.png`,
    title: 'New Event',
    time1: '12:00',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/MILANOCORTINA2026'
  };

  newItem.visible = true;
  newItem.squeeze = false;
  navbarItems.unshift(newItem);
  const table = document.getElementById('navbar-table');
  addNavbarTableRow(newItem, table, true);
}

// Toggle Row Visibility
function toggleNavbarVisibility(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = rows.indexOf(tr);
  const navWrapper = tr.querySelector('.nav-wrapper');
  const item = navbarItems[index];

  item.visible = !item.visible;
  if (!item.visible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    navWrapper.style.opacity = '0.5';  // Dim the row by reducing opacity
    // Remove the item from sendableNavbarItems
    sendableNavbarItems = sendableNavbarItems.filter(x => x !== item);
    item.visible = false;
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    navWrapper.style.opacity = '1';  // Restore full opacity
    item.visible = true;
    // Add the item back to sendableNavbarItems if it's not already included
    if (!sendableNavbarItems.includes(item)) {
      sendableNavbarItems.splice(index, 0, item);
    }
  }
}

// Toggle Font Squeeze
function toggleFontSqueeze(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = rows.indexOf(tr);
  const navWrapper = tr.querySelector('.nav-wrapper');
  const navTitle = navWrapper.querySelector('.nav-title');
  const item = navbarItems[index];

  if (item.squeeze === true || item.squeeze === false) {
    item.squeeze = !item.squeeze;
    if (!item.squeeze) {
      icon.classList.remove('fa-compress');
      icon.classList.add('fa-expand');
      icon.title = 'Click to Squeeze Title';
      navTitle.className = 'nav-title';
      item.squeeze = false;
    } else {
      icon.classList.remove('fa-expand');
      icon.classList.add('fa-compress');
      icon.title = 'Click to Expand Title';
      navTitle.className = 'nav-title squeeze';
      item.squeeze = true;
    }
  }
}

// Add Drag and Drop Handlers
function addNavbarDragAndDropHandlers(row, table) {
  row.setAttribute('draggable', true);
  let dragCounter = 0;

  row.ondragstart = (event) => {
    const index = Array.from(table.children).indexOf(row);
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
    const targetIndex = Array.from(table.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = table.removeChild(table.children[originIndex]);
      table.insertBefore(elementToMove, table.children[targetIndex] || null);

      // Update navbarItems based on the new order
      const movedItem = navbarItems.splice(originIndex, 1)[0];
      navbarItems.splice(targetIndex, 0, movedItem);

      // Update sendableNavbarItems to reflect the new order
      updateNavbarRowIndices(table);
    }
    Array.from(table.children).forEach(child => child.classList.remove('highlight'));
  };
}

// Update Navbar Items
function updateNavbarItems() {
  const rows = document.querySelectorAll('#navbar-table tr');
  rows.forEach((row, index) => {
    const titleText = row.querySelector('.nav-title .text').textContent;
    const time1Text = row.querySelector('.nav-time .time-1').textContent;
    const time2Text = row.querySelector('.nav-time .time-2').textContent;
    const time3Text = row.querySelector('.nav-time .time-3').textContent;
    const footerText = row.querySelector('.footer-text').textContent;

    if (navbarItems[index]) {
      navbarItems[index].title = titleText;
      navbarItems[index].time1 = time1Text;
      navbarItems[index].time2 = time2Text;
      navbarItems[index].time3 = time3Text;
      navbarItems[index].footer = footerText;
    }
  });
  updateSendableNavbarItems();
  saveNavbarItems();
  // Update navbarItems in graphic
  nodecg.sendMessage('update navbarItems');
  navbarItemsReplicant.value = sendableNavbarItems;
  updateTimestampMessage('navbar-time');
}

// Generate Navbar Table Rows
function generateNavbarTableRows() {
  const table = document.getElementById('navbar-table');
  table.innerHTML = ''; // Clear the table first

  navbarItems.forEach((item) => {
    addNavbarTableRow(item, table, false); // Adjust index for IDs
  });
}

// Update sendableNavbarItems
function updateSendableNavbarItems() {
  sendableNavbarItems = navbarItems.filter(item => item.visible);
}

// Initial Setup Save / Load
let navbarItems = [];
let sendableNavbarItems = [];

function saveNavbarItems() {
  localStorage.setItem('navbarItems', JSON.stringify(navbarItems));
  localStorage.setItem('sendableNavbarItems', JSON.stringify(sendableNavbarItems.filter(item => navbarItems.includes(item))));
}

function loadNavbarItems() {
  const storedNavbarItems = localStorage.getItem('navbarItems');
  const storedSendableNavbarItems = localStorage.getItem('sendableNavbarItems');

  if (storedNavbarItems && storedNavbarItems.length > 0) {
    navbarItems = JSON.parse(storedNavbarItems);
    sendableNavbarItems = JSON.parse(storedSendableNavbarItems);
    if (!sendableNavbarItems || sendableNavbarItems.length === 0) updateSendableNavbarItems();
  } else {
    navbarItems = [
      {
        img: 'cbc-logo.png',
        title: 'Athletics',
        time1: '11:30',
        time2: 'AM',
        time3: 'ET',
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        img: 'tsn-logo.png',
        title: 'Rugby Sevens',
        time1: '2:30',
        time2: 'PM',
        time3: 'ET',
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        img: 'sn-logo.png',
        title: 'Water Polo',
        time1: '3:30',
        time2: 'PM',
        time3: 'ET',
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        img: 'sn-1-logo.png',
        title: 'Athletics',
        time1: '5:30',
        time2: 'PM',
        time3: 'ET',
        footer: 'CBC.CA/MILANOCORTINA2026'
      }
    ];
    navbarItems.forEach((item) => {
      item.visible = true;
      item.squeeze = false;
    })
    sendableNavbarItems = [...navbarItems];
    saveNavbarItems();
  }
  generateNavbarTableRows();
}

loadNavbarItems();

// Promo Items ---------------------------------------------------------------------

function addPromoTableRow(item, table, isAddedFromDropdown) {
  const index = promoItems.indexOf(item);
  const tr = document.createElement('tr');
  tr.setAttribute('data-index', index);
  tr.id = `promo-row-${index}`;

  const td = document.createElement('td');
  const rowWrapper = document.createElement('div');
  rowWrapper.className = 'row-wrapper';

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const navContent = document.createElement('div');
  navContent.className = 'nav-content without-footer-promo';
  navContent.id = `promo-${index + 1}`;

  // Promo Image
  const promoImage = document.createElement('div');
  promoImage.className = 'promo-image';
  const img = document.createElement('img');
  img.src = item.img;
  const fileName = item.img.split('/').pop();
  img.alt = `Can't find ${fileName}`;
  img.style.height = item.height;
  img.style.objectPosition = item.objectPosition;
  promoImage.appendChild(img);

  // Text Container
  const navTextContainer = document.createElement('div');
  navTextContainer.className = 'nav-text-container';
  const navTextPromo = document.createElement('span');
  navTextPromo.className = 'nav-text-promo';
  if (item.squeeze === true || item.squeeze === false) { 
    if (item.squeeze === true) navTextPromo.className = 'nav-text-promo squeeze-promo-text'; 
  } 

  // Title
  const navTitle = document.createElement('span');
  navTitle.className = 'nav-title title-promo';
  if (item.squeeze === true || item.squeeze === false) { 
    if (item.squeeze === true) navTitle.className = 'nav-title title-promo squeeze-promo-title'; 
  } 
  navTitle.contentEditable = 'true';
  navTitle.textContent = item.title;

  // Sub Title
  const subTitle = document.createElement('span');
  subTitle.className = 'sub-title';
  subTitle.contentEditable = 'true';
  subTitle.textContent = item.subtitle;
  if (item.type === 'Continue') {
    subTitle.classList.add('continue');  // Adds 'continue' class if the type is 'Continue'
  }

  // Date
  const date = document.createElement('span');
  date.className = 'date';
  if (item.type === 'Continue') {
    const logoImg = document.createElement('img');
    logoImg.src = `../shared/assets/logos/cbc-gem.png`;  // Gem Logo
    logoImg.alt = 'CBC Gem';
    logoImg.className = 'gem-logo';
    date.appendChild(logoImg);
  } else {
    date.textContent = item.date;
    date.contentEditable = 'true';
  }

  // Footer
  // const footerText = document.createElement('span');
  // footerText.className = 'text footer-text footer-text-promo';
  // footerText.id = `nav-footer-text-${index + 1}`;
  // footerText.contentEditable = 'true';
  // footerText.textContent = item.footer;

  navTextPromo.appendChild(navTitle);
  navTextPromo.appendChild(subTitle);
  navTextPromo.appendChild(date);
  // navTextPromo.appendChild(footerText);

  navTextContainer.appendChild(navTextPromo);
  navContent.appendChild(promoImage);
  navContent.appendChild(navTextContainer);
  navWrapper.appendChild(navContent);

  // Image Edit Container
  const imageEditContainer = document.createElement('div');
  imageEditContainer.className = 'image-edit-container';

  const imgDropdown = document.createElement('select');
  if (item.type === 'Athlete') {
    imgDropdown.id = `athlete_img_dropdown_${index + 1}`;
  } else {
    imgDropdown.id = `picto_img_dropdown_${index + 1}`;
  }

  const imgHeightInput = document.createElement('input');
  imgHeightInput.type = 'number';
  imgHeightInput.className = 'img-input';
  imgHeightInput.id = `img_height_${index + 1}`;
  imgHeightInput.setAttribute('data-min', '196');
  imgHeightInput.setAttribute('data-max', '5000');
  imgHeightInput.value = '200';
  imgHeightInput.title = 'Height';
  imgHeightInput.addEventListener('mousedown', (event) => {
    mouseDown(event);
  });

  const imgXInput = document.createElement('input');
  imgXInput.type = 'number';
  imgXInput.className = 'img-input';
  imgXInput.id = `img_x_${index + 1}`;
  imgXInput.setAttribute('data-min', '-1000');
  imgXInput.setAttribute('data-max', '1000');
  imgXInput.value = '50';
  imgXInput.title = 'X Axis';
  imgXInput.addEventListener('mousedown', (event) => {
    mouseDown(event);
  });

  const imgYInput = document.createElement('input');
  imgYInput.type = 'number';
  imgYInput.className = 'img-input';
  imgYInput.id = `img_y_${index + 1}`;
  imgYInput.setAttribute('data-min', '-1000');
  imgYInput.setAttribute('data-max', '1000');
  imgYInput.value = '50';
  imgYInput.title = 'Y Axis';
  imgYInput.addEventListener('mousedown', (event) => {
    mouseDown(event);
  });

  imageEditContainer.appendChild(imgDropdown);
  imageEditContainer.appendChild(imgHeightInput);
  imageEditContainer.appendChild(imgXInput);
  imageEditContainer.appendChild(imgYInput);

  rowWrapper.appendChild(navWrapper);
  rowWrapper.appendChild(imageEditContainer);

  // Settings
  const settings = document.createElement('div');
  settings.className = 'settings';

  // Delete
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa fa-trash-o';
  trashIcon.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this item?')) {
      const rowIndex = parseInt(tr.getAttribute('data-index'), 10);
      promoItems.splice(rowIndex, 1);  // Remove the item from the array
      table.removeChild(tr);  // Remove the row from the table
      updatePromoRowIndices(table);  // Update indices after deletion
    }
  });

  // Visibility
  const visibilityIcon = document.createElement('i');
  visibilityIcon.className = 'fa fa-eye visibility-icon';
  visibilityIcon.className = item.visible ? 'fa fa-eye visibility-icon' : 'fa fa-eye-slash visibility-icon';
  visibilityIcon.style.cursor = 'pointer';
  navWrapper.style.opacity = item.visible ? '1' : '0.5';
  visibilityIcon.onclick = () => togglePromoVisibility(visibilityIcon);

  // Squeeze Font
  const squeezeIcon = document.createElement('i');
  if (item.squeeze === true || item.squeeze === false) squeezeIcon.className = item.squeeze ? 'fa fa-compress squeeze-icon' : 'fa fa-expand squeeze-icon';
  if (item.squeeze === true || item.squeeze === false) squeezeIcon.title = item.squeeze ? 'Click to Expand Title' : 'Click to Squeeze Title';
  squeezeIcon.style.cursor = 'pointer';
  squeezeIcon.onclick = () => toggleFontSqueezePromo(squeezeIcon);

  // Drag and Drop
  const barsIcon = document.createElement('i');
  barsIcon.className = 'fa fa-bars';

  settings.appendChild(trashIcon);
  settings.appendChild(visibilityIcon);
  if (item.squeeze === true || item.squeeze === false) settings.appendChild(squeezeIcon);
  settings.appendChild(barsIcon);

  rowWrapper.appendChild(settings);
  td.appendChild(rowWrapper);
  tr.appendChild(td);

  if (table.firstChild && isAddedFromDropdown) {
    table.insertBefore(tr, table.firstChild);
  } else {
    table.appendChild(tr);
  }

  addPromoDragAndDropHandlers(tr, table);
  updatePromoRowIndices(table);
}

const imageClickHandler = function () {
  const closestTd = this.closest('td');
  const editContainer = closestTd.querySelector('.image-edit-container');
  if (closestTd.style.paddingBottom === '50px') {
    closestTd.style.paddingBottom = '';
    editContainer.style.display = 'none';
  } else {
    closestTd.style.paddingBottom = '50px';
    editContainer.style.display = 'flex';
  }
};

let updateDropdownValues;

// Add Image Selection Controls
function addImageSelectionControls() {
  // Toggle Image Edit -----------------------
  const images = document.querySelectorAll('.promo-image img');
  images.forEach(function (image) {
    // Remove any existing listeners
    image.removeEventListener('click', imageClickHandler);
    // Add new listener
    image.addEventListener('click', imageClickHandler);
  });

  // Image Dropdown & Selection --------------
  function setupDropdownListeners(type, message, basePath) {
    let previousLength = {};  // Cache to store previous length of image files for each type
    updateDropdownValues = false;

    nodecg.listenFor(message, (imageFiles) => {
      const dropdowns = document.querySelectorAll(`select[id^='${type}_img_dropdown_']`);
      updateDropdownValues = false;

      // Only update the dropdowns if the length of the array has changed
      if (!previousLength[type] || previousLength[type] !== imageFiles.length) {
        updateDropdownValues = true;
        dropdowns.forEach(dropdown => {
          populateDropdown(dropdown, imageFiles);
          // Attach event listener only once (avoid adding multiple listeners)
          if (!dropdown.hasAttribute('data-initialized')) {
            dropdown.addEventListener('change', function () {
              updateImageSource(this, this.value, basePath);
            });
            dropdown.setAttribute('data-initialized', 'true');
          }
        });

        // Update the stored length for this type
        previousLength[type] = imageFiles.length;
      }
    });
  }

  // Populate image dropdown
  function populateDropdown(dropdown, imageFiles) {
    // Prevent clearing options if already initialized
    if (!dropdown.hasAttribute('data-populated') || updateDropdownValues) {
      const selectedValue = dropdown.value;
      dropdown.innerHTML = '';  // Clear existing options first if not populated
      imageFiles.forEach(file => {
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file;
        dropdown.appendChild(option);
      });
      if (selectedValue) dropdown.value = selectedValue;
      dropdown.setAttribute('data-populated', 'true');
    }

    promoItems.forEach((item, index) => {
      const dropdown = document.querySelector(`#promo-row-${index} select`);
      const filename = getFilenameFromPath(item.img);

      if (dropdown && filename) {
        // If a dropdown with the correct ID exists, set its value to the filename
        dropdown.value = filename;
      }
    });
  }

  // Get Filename from Path
  function getFilenameFromPath(filePath) {
    return filePath.split('/').pop();
  }

  // Update image with selection
  function updateImageSource(dropdown, value, basePath) {
    const rowWrapper = dropdown.closest('.row-wrapper');
    const imageElement = rowWrapper.querySelector('.promo-image img');
    if (imageElement && value) {
      const newImagePath = `${basePath}${value}`;
      imageElement.src = newImagePath;
      dropdown.value = value;
    }
  }

  // Setup listeners for both athlete and picto images
  setupDropdownListeners('picto', 'updatePictoImages', '../shared/assets/pictos/');
  setupDropdownListeners('athlete', 'updateAthleteImages', '../shared/assets/athletes/');

  // Send initial requests for images
  nodecg.sendMessage('requestPictoImages');
  nodecg.sendMessage('requestAthleteImages');

  // Image Property Settings -----------------------------
  const rowWrappers = document.querySelectorAll('#promo-table .row-wrapper');
  rowWrappers.forEach(setInitialInputValues);

  function setInitialInputValues(rowWrapper) {
    const img = rowWrapper.querySelector('.promo-image img');
    if (!img) return;

    // Get CSS properties from the image
    const style = window.getComputedStyle(img);
    const height = style.height.slice(0, -2); // Remove 'px' to get the numerical value
    const objectPosition = style.objectPosition.split(' ');

    const inputs = rowWrapper.querySelectorAll('.img-input');
    if (inputs.length >= 1) inputs[0].value = height; // Set height
    if (inputs.length >= 2) inputs[1].value = objectPosition[0].replace('px', ''); // Set x-axis percentage
    if (inputs.length >= 3) inputs[2].value = objectPosition[1].replace('px', ''); // Set y-axis in pixels
  }

  addInputListeners();
}

// Add Input Listeners for dragging numbers on inputs
function addInputListeners() {
  document.querySelectorAll('#promo-table .img-input').forEach(input => {
    input.addEventListener('mousedown', (event) => {
      event.stopPropagation();  // Stop the mousedown event from bubbling up to the row
    });

    input.addEventListener('click', (event) => {
      event.stopPropagation();  // Stop the click event from bubbling up to the row
    });

    input.addEventListener('focus', (event) => {
      const row = input.closest('tr');
      row.draggable = false;  // Disable dragging for this row when input is focused
    });

    input.addEventListener('blur', (event) => {
      const row = input.closest('tr');
      row.draggable = true;  // Re-enable dragging for this row when input loses focus
    });
  });
}

// Image Resizing Controls ----------------------------
let mouseDownStatus = false;
let oldX;
const sensitivity = 0.5;
let target, minVal, maxVal;

function mouseDown(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'number' && e.target.closest('#promo-table')) {
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
    updateImageStyle(target);
  }
}

function updateImageStyle(inputElement) {
  const rowWrapper = inputElement.closest('.row-wrapper');
  if (!rowWrapper) return;

  const img = rowWrapper.querySelector('.promo-image img');
  const inputs = rowWrapper.querySelectorAll('.img-input');
  const heightInput = inputs[0];
  const xInput = inputs[1];
  const yInput = inputs[2];

  img.style.height = `${heightInput.value}px`;
  img.style.objectPosition = `${xInput.value}px ${yInput.value}px`;
}

// Update Row Indexes
function updatePromoRowIndices(table) {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.setAttribute('data-index', index);
    row.id = `promo-row-${index}`;
  });
}

// Add Button functionality
function addNewPromoFromDropdown() {
  const dropdown = document.getElementById('dropdown_2');
  const optionValue = dropdown.options[dropdown.selectedIndex].value;
  let newItem;

  switch (optionValue) {
    case 'option1': // Athlete
      newItem = {
        type: 'Athlete',
        img: '../shared/assets/athletes/1_default.png',
        height: '216px',
        objectPosition: '-95px -13px',
        title: 'New Athlete',
        subtitle: 'Sport',
        date: 'Today',
        footer: 'CBC.CA/MILANOCORTINA2026'
      };
      break;
    case 'option2': // Picto
      newItem = {
        type: 'Picto',
        img: '../shared/assets/pictos/Ski-Mountaineering-Picto.png',
        height: '196px',
        objectPosition: '-10px -2px',
        title: 'New Athlete',
        subtitle: 'Ski Mountaineering',
        date: 'Coming Up',
        footer: 'CBC.CA/MILANOCORTINA2026'
      };
      break;
    case 'option3': // Continue
      newItem = {
        type: 'Continue',
        img: '../shared/assets/pictos/Snowboard-Picto.png',
        height: '196px',
        objectPosition: '-10px -2px',
        title: 'Snowboarding',
        subtitle: 'Continue Watching On',
        date: 'Gem',
        footer: 'CBC.CA/MILANOCORTINA2026'
      };
      break;
  }

  newItem.visible = true;
  newItem.squeeze = false;
  promoItems.unshift(newItem);
  const table = document.getElementById('promo-table');
  addPromoTableRow(newItem, table, true);
  addImageSelectionControls();
}

// Toggle Row Visibility
function togglePromoVisibility(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = rows.indexOf(tr);
  const navWrapper = tr.querySelector('.nav-wrapper');
  const item = promoItems[index];

  item.visible = !item.visible;
  if (!item.visible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    navWrapper.style.opacity = '0.5';  // Dim the row by reducing opacity
    // Remove the item from sendablePromoItems
    sendablePromoItems = sendablePromoItems.filter(x => x !== item);
    item.visible = false;
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    navWrapper.style.opacity = '1';  // Restore full opacity
    item.visible = true;
    // Add the item back to sendablePromoItems if it's not already included
    if (!sendablePromoItems.includes(item)) {
      sendablePromoItems.splice(index, 0, item);
    }
  }
}

// Toggle Font Squeeze 
function toggleFontSqueezePromo(icon) { 
  const tr = icon.closest('tr'); 
  const table = tr.closest('table'); 
  const rows = Array.from(table.querySelectorAll('tr')); 
  const index = rows.indexOf(tr); 
  const navWrapper = tr.querySelector('.nav-wrapper'); 
  const navTitle = navWrapper.querySelector('.nav-title');
  const navTextPromo = navWrapper.querySelector('.nav-text-promo');
  const item = promoItems[index]; 
 
  if (item.squeeze === true || item.squeeze === false) { 
    item.squeeze = !item.squeeze; 
    if (!item.squeeze) { 
      icon.classList.remove('fa-compress'); 
      icon.classList.add('fa-expand'); 
      icon.title = 'Click to Squeeze Title'; 
      navTitle.className = 'nav-title title-promo'; 
      navTextPromo.className = 'nav-text-promo';
      item.squeeze = false; 
    } else { 
      icon.classList.remove('fa-expand'); 
      icon.classList.add('fa-compress'); 
      icon.title = 'Click to Expand Title'; 
      navTitle.className = 'nav-title title-promo squeeze-promo-title';
      navTextPromo.className = 'nav-text-promo squeeze-promo-text';
      item.squeeze = true; 
    }
  } 
}

// Add Drag and Drop Handlers
function addPromoDragAndDropHandlers(row, table) {
  row.setAttribute('draggable', true);
  let dragCounter = 0;

  row.ondragstart = (event) => {
    const index = Array.from(table.children).indexOf(row);
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
    const targetIndex = Array.from(table.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = table.removeChild(table.children[originIndex]);
      table.insertBefore(elementToMove, table.children[targetIndex] || null);

      // Update promoItems based on the new order
      const movedItem = promoItems.splice(originIndex, 1)[0];
      promoItems.splice(targetIndex, 0, movedItem);

      // Update sendablePromoItems to reflect the new order
      updatePromoRowIndices(table);
    }
    Array.from(table.children).forEach(child => child.classList.remove('highlight'));
  };
}

// Update Promo Items
function updatePromoItems() {
  const rows = document.querySelectorAll('#promo-table tr');
  rows.forEach((row, index) => {
    const titleText = row.querySelector('.nav-title').textContent;
    const subtitleText = row.querySelector('.sub-title').textContent;
    let dateText;
    if (row.querySelector('.date').textContent) dateText = row.querySelector('.date').textContent;
    // const footerText = row.querySelector('.footer-text').textContent;
    const dropdown = row.querySelector('select');
    const dropdownValue = dropdown.value;
    const imageInputs = row.querySelectorAll('.img-input');
    const height = imageInputs[0].value;
    const imgX = imageInputs[1].value;
    const imgY = imageInputs[2].value;

    if (promoItems[index]) {
      promoItems[index].title = titleText;
      promoItems[index].subtitle = subtitleText;
      if (!dateText) dateText = 'Gem';
      promoItems[index].date = dateText;
      // promoItems[index].footer = footerText;
      if (dropdownValue) {
        if (promoItems[index].type === 'Athlete') {
          promoItems[index].img = `../shared/assets/athletes/${dropdownValue}`;
        } else {
          promoItems[index].img = `../shared/assets/pictos/${dropdownValue}`;
        }
      }
      promoItems[index].height = `${height}px`;
      promoItems[index].objectPosition = `${imgX}px ${imgY}px`;
    }
  });
  updateSendablePromoItems();
  savePromoItems();
  // Update promoItems in graphic
  nodecg.sendMessage('update promoItems');
  promoItemsReplicant.value = sendablePromoItems;
  updateTimestampMessage('promo-time');
}

// Generate Promo Table Rows
function generatePromoTableRows() {
  const table = document.getElementById('promo-table');
  table.innerHTML = ''; // Clear existing rows

  promoItems.forEach((item) => {
    addPromoTableRow(item, table, false);
  });
}

// Update sendablePromoItems
function updateSendablePromoItems() {
  sendablePromoItems = promoItems.filter(item => item.visible);
}

// Initial Setup Save / Load
let promoItems = [];
let sendablePromoItems = [];

function savePromoItems() {
  localStorage.setItem('promoItems', JSON.stringify(promoItems));
  localStorage.setItem('sendablePromoItems', JSON.stringify(sendablePromoItems.filter(item => promoItems.includes(item))));
}

function loadPromoItems() {
  const storedPromoItems = localStorage.getItem('promoItems');
  const storedSendablePromoItems = localStorage.getItem('sendablePromoItems');

  if (storedPromoItems && storedPromoItems.length > 0) {
    promoItems = JSON.parse(storedPromoItems);
    sendablePromoItems = JSON.parse(storedSendablePromoItems);
    if (!sendablePromoItems || sendablePromoItems.length === 0) updateSendablePromoItems();
  } else {
    promoItems = [
      {
        type: 'Athlete',
        img: '../shared/assets/athletes/1_default.png',
        height: '216px',
        objectPosition: '-95px -13px',
        title: 'New Athlete',
        subtitle: 'Sport',
        date: 'Today',
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        type: 'Picto',
        img: '../shared/assets/pictos/Ski-Mountaineering-Picto.png',
        height: '196px',
        objectPosition: '-10px -2px',
        title: 'New Athlete',
        subtitle: 'Ski Mountaineering',
        date: 'Coming Up',
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        type: 'Continue',
        img: '../shared/assets/pictos/Snowboard-Picto.png',
        height: '196px',
        objectPosition: '-10px -2px',
        title: 'Snowboarding',
        subtitle: 'Continue Watching On',
        date: 'Gem',
        footer: 'CBC.CA/MILANOCORTINA2026'
      }
    ];
    promoItems.forEach((item) => {
      item.visible = true;
      item.squeeze = false;
    })
    sendablePromoItems = [...promoItems];
    savePromoItems();
  }
  generatePromoTableRows();
  addImageSelectionControls();
}

loadPromoItems();

// Results Items -------------------------------------------------------------------

function addResultTableRow(item, table, isAddedFromDropdown) {
  const generateUniqueId = () => 'id-' + Math.random().toString(36).substr(2, 16);

  const index = resultItems.indexOf(item);
  const tr = document.createElement('tr');
  tr.setAttribute('data-index', index);
  tr.id = `result-row-${index}`;

  const td = document.createElement('td');
  const rowWrapper = document.createElement('div');
  rowWrapper.className = 'row-wrapper';

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';

  const resultWrapper = document.createElement('div');
  resultWrapper.className = 'result-wrapper';

  const navHeaderAlt = document.createElement('div');
  navHeaderAlt.className = 'nav-header-alt';

  const headerAlt = document.createElement('div');
  headerAlt.className = 'header-alt';
  if (item.type === 'Results') headerAlt.classList.add('header-results');
  if (item.type === 'Breaking') headerAlt.classList.add('header-breaking');

  const headerText = document.createElement('span');
  headerText.className = item.type === 'StandingsAlt' ? 'header-text' : 'header-text header-text-results';
  if (item.squeeze === true || item.squeeze === false) { 
    if (item.squeeze === true) headerText.classList.add('result-squeeze'); 
  } 
  headerText.contentEditable = 'true';
  headerText.textContent = item.title;

  if (item.type === 'StandingsAlt') {
    const headerCorner = document.createElement('span');
    headerCorner.className = 'header-corner';
    const headerCornerText = document.createElement('span');
    headerCornerText.className = 'header-corner-text';
    headerCornerText.contentEditable = 'true';
    headerCornerText.textContent = item.gender;
    headerCorner.appendChild(headerCornerText);
    headerAlt.appendChild(headerCorner);
  }

  headerAlt.appendChild(headerText);
  navHeaderAlt.appendChild(headerAlt);
  resultWrapper.appendChild(navHeaderAlt);

  const navContent = document.createElement('div');
  navContent.className = 'nav-content without-footer-results';

  const flagInputContainer = document.createElement('div');
  flagInputContainer.className = 'flag-input-container';

  let resultCount = 0;  // Track the number of results
  if (item.type === 'Standings' || item.type === 'StandingsAlt') {
    for (let i = 1; i <= 4; i++) {
      if (item[`resultNumber${i}`]) {
        resultCount++;
        const uniqueId = generateUniqueId();
        const resultRow = document.createElement('div');
        resultRow.className = 'result-row' + (i % 2 === 0 ? ' odd-row' : '');

        const resultNumber = document.createElement('span');
        resultNumber.className = 'result-number';
        resultNumber.contentEditable = 'true';
        resultNumber.textContent = item[`resultNumber${i}`];

        const resultFlag = document.createElement('div');
        resultFlag.className = 'result-flag';
        const flagImg = document.createElement('img');
        flagImg.src = `../shared/assets/flags/${item[`resultFlag${i}`]}.jpg`;
        flagImg.alt = 'Flag';
        flagImg.id = uniqueId;
        resultFlag.appendChild(flagImg);

        const resultName = document.createElement('span');
        resultName.className = 'result-name';
        resultName.contentEditable = 'true';
        resultName.textContent = item[`resultName${i}`];

        resultRow.appendChild(resultNumber);
        resultRow.appendChild(resultFlag);
        resultRow.appendChild(resultName);
        navContent.appendChild(resultRow);

        const flagInput = document.createElement('div');
        flagInput.className = 'flag-input';
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = uniqueId;
        flagInput.appendChild(inputField);
        flagInputContainer.appendChild(flagInput);

        // Change flag based on input
        inputField.addEventListener('blur', () => updateFlag(inputField));
        inputField.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            updateFlag(inputField);
          }
        });
      }
    }
  } else if (item.type === 'Results' || item.type === 'Breaking') {
    const resultsText = document.createElement('span');
    resultsText.className = 'results-text';
    resultsText.contentEditable = 'true';
    resultsText.textContent = item.text;
    navContent.appendChild(resultsText);
  }

  resultWrapper.appendChild(navContent);

  // Append flag inputs if they exist
  if (flagInputContainer.hasChildNodes()) {
    navWrapper.appendChild(flagInputContainer);
  }

  navWrapper.appendChild(resultWrapper);
  rowWrapper.appendChild(navWrapper);

  // Append footer conditionally
  if (item.type === 'Results' || item.type === 'Breaking' || resultCount < 4) {
    const footerText = document.createElement('span');
    footerText.className = 'text footer-text';
    if (item.type === 'Results' || item.type === 'Breaking') {
      footerText.classList.add('footer-text-results-2');
    } else {
      footerText.classList.add('footer-text-results-1');
    }
    footerText.id = `footer-text-${index}`;
    footerText.contentEditable = 'true';
    if (item.footer) footerText.textContent = item.footer;
    navContent.appendChild(footerText);
  }

  // Settings
  const settings = document.createElement('div');
  settings.className = 'settings';

  // Delete
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa fa-trash-o';
  trashIcon.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this item?')) {
      const rowIndex = parseInt(tr.getAttribute('data-index'), 10);
      resultItems.splice(rowIndex, 1);  // Remove the item from the array
      table.removeChild(tr);  // Remove the row from the table
      updateResultRowIndices(table);  // Update indices after deletion
    }
  });

  // Visibility
  const visibilityIcon = document.createElement('i');
  visibilityIcon.className = 'fa fa-eye visibility-icon';
  visibilityIcon.className = item.visible ? 'fa fa-eye visibility-icon' : 'fa fa-eye-slash visibility-icon';
  visibilityIcon.style.cursor = 'pointer';
  navWrapper.style.opacity = item.visible ? '1' : '0.5';
  visibilityIcon.onclick = () => toggleResultVisibility(visibilityIcon);

    // Squeeze Font 
    const squeezeIcon = document.createElement('i'); 
    if (item.squeeze === true || item.squeeze === false) squeezeIcon.className = item.squeeze ? 'fa fa-compress squeeze-icon' : 'fa fa-expand squeeze-icon'; 
    if (item.squeeze === true || item.squeeze === false) squeezeIcon.title = item.squeeze ? 'Click to Expand Title' : 'Click to Squeeze Title'; 
    squeezeIcon.style.cursor = 'pointer'; 
    squeezeIcon.onclick = () => toggleFontSqueezeResult(squeezeIcon); 

  // Drag and Drop
  const barsIcon = document.createElement('i');
  barsIcon.className = 'fa fa-bars';

  settings.appendChild(trashIcon);
  settings.appendChild(visibilityIcon);
  if (item.squeeze === true || item.squeeze === false) settings.appendChild(squeezeIcon);
  settings.appendChild(barsIcon);

  rowWrapper.appendChild(settings);
  td.appendChild(rowWrapper);
  tr.appendChild(td);

  if (table.firstChild && isAddedFromDropdown) {
    table.insertBefore(tr, table.firstChild);
  } else {
    table.appendChild(tr);
  }

  // Check height for Results/Breaking
  if (item.type === 'Results' || item.type === 'Breaking') {
    const resText = tr.querySelector('.results-text');
    const footerText = tr.querySelector('.footer-text');
    if (resText && footerText) {
      const checkHeight = () => {
        if (resText.offsetHeight > 100) {
          footerText.style.display = 'none';
        } else {
          footerText.style.display = '';
        }
      };
      resText.addEventListener('input', checkHeight);
      // Attach checkHeight to the element so we can call it later
      tr.checkHeight = checkHeight;
      // Initial check after render
      setTimeout(checkHeight, 0); 
    }
  }

  addResultDragAndDropHandlers(tr, table);

  // Update Flag from Input
  function updateFlag(input) {
    const code = input.value.toUpperCase();
    if (code.length === 3) {
      const img = document.querySelector(`img#${input.id}`);
      const imgPath = `../shared/assets/flags/${code}.jpg`;

      fetch(imgPath, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            img.src = imgPath;
            input.value = '';
          } else {
            console.log(`Image not found for code: ${code}`);
          }
        })
        .catch(err => console.log('Error:', err));
    }
  }
}

// Update Row Indexes
function updateResultRowIndices(table) {
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    row.setAttribute('data-index', index);
    row.id = `result-row-${index}`;
  });
}

// Add Button functionality
function addNewResultFromDropdown() {
  const dropdown = document.getElementById('dropdown_3');
  const optionValue = dropdown.options[dropdown.selectedIndex].value;
  const optionText = dropdown.options[dropdown.selectedIndex].text;
  const typeInfo = optionValue.split('-');
  const typeBase = typeInfo[0];  // 'standings', 'results', or 'breaking'
  const resultCount = typeInfo.length > 1 && !isNaN(parseInt(typeInfo[1], 10)) ? parseInt(typeInfo[1], 10) : 0; // number of results if applicable
  const hasGender = optionValue.includes('alt'); // Check if it includes gender

  // Prepare a new item based on type
  let newItem = {
    type: hasGender ? 'StandingsAlt' : typeBase.charAt(0).toUpperCase() + typeBase.slice(1),
    title: `${optionText.split(' ')[0]}`,
    footer: 'CBC.CA/MILANOCORTINA2026'
  };

  // Handle different types
  if (typeBase === 'standings' || typeBase === 'standingsalt') {
    newItem.gender = hasGender ? 'M' : '';
    for (let i = 1; i <= resultCount; i++) {
      newItem[`resultNumber${i}`] = i.toString();
      newItem[`resultFlag${i}`] = 'CAN';
      newItem[`resultName${i}`] = `Athlete ${i}`;
    }
  } else if (typeBase === 'results' || typeBase === 'breaking') {
    newItem.text = typeBase === 'results' ? 'Result details will be shown here.' : 'Breaking news details will be shown here.';
  }

  newItem.visible = true;
  newItem.squeeze = false;
  resultItems.unshift(newItem);
  const table = document.getElementById('results-table');
  addResultTableRow(newItem, table, true);
}

// Toggle Row Visibility
function toggleResultVisibility(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = rows.indexOf(tr);
  const navWrapper = tr.querySelector('.nav-wrapper');
  const item = resultItems[index];

  item.visible = !item.visible;
  if (!item.visible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    navWrapper.style.opacity = '0.5';  // Dim the row by reducing opacity
    // Remove the item from sendableResultItems
    sendableResultItems = sendableResultItems.filter(x => x !== item);
    item.visible = false;
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    navWrapper.style.opacity = '1';  // Restore full opacity
    item.visible = true;
    // Add the item back to sendableResultItems if it's not already included
    if (!sendableResultItems.includes(item)) {
      sendableResultItems.splice(index, 0, item);
    }
  }
}

// Toggle Font Squeeze 
function toggleFontSqueezeResult(icon) { 
  const tr = icon.closest('tr'); 
  const table = tr.closest('table'); 
  const rows = Array.from(table.querySelectorAll('tr')); 
  const index = rows.indexOf(tr); 
  const navWrapper = tr.querySelector('.nav-wrapper'); 
  const headerTitle = navWrapper.querySelector('.header-text');
  const item = resultItems[index]; 
 
  if (item.squeeze === true || item.squeeze === false) { 
    item.squeeze = !item.squeeze; 
    if (!item.squeeze) { 
      icon.classList.remove('fa-compress'); 
      icon.classList.add('fa-expand'); 
      icon.title = 'Click to Squeeze Title'; 
      headerTitle.classList.remove('result-squeeze'); 
      item.squeeze = false; 
    } else { 
      icon.classList.remove('fa-expand'); 
      icon.classList.add('fa-compress'); 
      icon.title = 'Click to Expand Title'; 
      headerTitle.classList.add('result-squeeze'); 
      item.squeeze = true; 
    }
  } 
}

// Add Drag and Drop Handlers
function addResultDragAndDropHandlers(row, table) {
  row.setAttribute('draggable', true);
  let dragCounter = 0;

  row.ondragstart = (event) => {
    const index = Array.from(table.children).indexOf(row);
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
    const targetIndex = Array.from(table.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = table.removeChild(table.children[originIndex]);
      table.insertBefore(elementToMove, table.children[targetIndex] || null);

      // Update resultItems based on the new order
      const movedItem = resultItems.splice(originIndex, 1)[0];
      resultItems.splice(targetIndex, 0, movedItem);

      // Update sendableResultItems to reflect the new order
      updateResultRowIndices(table);
    }
    Array.from(table.children).forEach(child => child.classList.remove('highlight'));
  };
}

// Update Result Items
function updateResultItems() {
  const rows = document.querySelectorAll('#results-table tr');
  rows.forEach((row, index) => {
    const headerText = row.querySelector('.header-text').textContent;
    const headerCornerText = row.querySelector('.header-corner-text');
    const resultNumbers = row.querySelectorAll('.result-number');
    const resultFlags = row.querySelectorAll('.result-flag img');
    const resultNames = row.querySelectorAll('.result-name');
    let resultNumber1;
    let resultNumber2;
    let resultNumber3;
    let resultNumber4;
    let resultFlag1;
    let resultFlag2;
    let resultFlag3;
    let resultFlag4;
    let resultName1;
    let resultName2;
    let resultName3;
    let resultName4;
    if (resultNumbers && resultNumbers.length > 0) {
      resultNumber1 = resultNumbers[0].textContent;
      resultNumber2 = resultNumbers[1].textContent;
      resultNumber3 = resultNumbers[2].textContent;
      if (resultNumbers[3] && resultNumbers[3].textContent) {
        resultNumber4 = resultNumbers[3].textContent;
      }
    }
    if (resultFlags && resultFlags.length > 0) {
      resultFlag1 = resultFlags[0].src.split('/').pop().split('.')[0];
      resultFlag2 = resultFlags[1].src.split('/').pop().split('.')[0];
      resultFlag3 = resultFlags[2].src.split('/').pop().split('.')[0];
      if (resultFlags[3] && resultFlags[3].src) {
        resultFlag4 = resultFlags[3].src.split('/').pop().split('.')[0];
      }
    }
    if (resultNames && resultNames.length > 0) {
      resultName1 = resultNames[0].textContent;
      resultName2 = resultNames[1].textContent;
      resultName3 = resultNames[2].textContent;
      if (resultNames[3] && resultNames[3].textContent) {
        resultName4 = resultNames[3].textContent;
      }
    }
    const resultsText = row.querySelector('.results-text');
    const footerText = row.querySelector('.footer-text');

    if (resultItems[index]) {
      resultItems[index].title = headerText;
      if (headerCornerText) resultItems[index].gender = headerCornerText.textContent;
      if (resultNumber1) resultItems[index].resultNumber1 = resultNumber1;
      if (resultNumber2) resultItems[index].resultNumber2 = resultNumber2;
      if (resultNumber3) resultItems[index].resultNumber3 = resultNumber3;
      if (resultNumber4) resultItems[index].resultNumber4 = resultNumber4;
      if (resultFlag1) resultItems[index].resultFlag1 = resultFlag1;
      if (resultFlag2) resultItems[index].resultFlag2 = resultFlag2;
      if (resultFlag3) resultItems[index].resultFlag3 = resultFlag3;
      if (resultFlag4) resultItems[index].resultFlag4 = resultFlag4;
      if (resultName1) resultItems[index].resultName1 = resultName1;
      if (resultName2) resultItems[index].resultName2 = resultName2;
      if (resultName3) resultItems[index].resultName3 = resultName3;
      if (resultName4) resultItems[index].resultName4 = resultName4;
      if (resultsText) resultItems[index].text = resultsText.textContent;
      if (footerText) resultItems[index].footer = footerText.textContent;
    }
  });
  updateSendableResultItems();
  saveResultItems();
  // Update resultItems in graphic
  nodecg.sendMessage('update resultItems');
  resultItemsReplicant.value = sendableResultItems;
  updateTimestampMessage('result-time');
}

// Generate Result Table Rows
function generateResultTableRows() {
  const table = document.getElementById('results-table');
  table.innerHTML = ''; // Clear existing rows

  resultItems.forEach((item, index) => {
    addResultTableRow(item, table, false);
  });
}

// Update sendableResultItems
function updateSendableResultItems() {
  sendableResultItems = resultItems.filter(item => item.visible);
}

// Initial Setup Save / Load
let resultItems = [];
let sendableResultItems = [];

function saveResultItems() {
  localStorage.setItem('resultItems', JSON.stringify(resultItems));
  localStorage.setItem('sendableResultItems', JSON.stringify(sendableResultItems.filter(item => resultItems.includes(item))));
}

function loadResultItems() {
  const storedResultItems = localStorage.getItem('resultItems');
  const storedSendableResultItems = localStorage.getItem('sendableResultItems');

  if (storedResultItems && storedResultItems.length > 0) {
    resultItems = JSON.parse(storedResultItems);
    sendableResultItems = JSON.parse(storedSendableResultItems);
    if (!sendableResultItems || sendableResultItems.length === 0) updateSendableResultItems();
  } else {
    resultItems = [
      {
        type: 'StandingsAlt',
        gender: 'M',
        title: 'Athletics 1500M',
        resultNumber1: '1',
        resultFlag1: 'USA',
        resultName1: 'Ingebrigtsen',
        resultNumber2: '2',
        resultFlag2: 'GBR',
        resultName2: 'Kerr',
        resultNumber3: '3',
        resultFlag3: 'CAN',
        resultName3: 'Cheruyiot',
        resultNumber4: '',
        resultFlag4: '',
        resultName4: '',
        text: "",
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        type: 'Standings',
        gender: '',
        title: 'Canoe Sprint',
        resultNumber1: '1',
        resultFlag1: 'USA',
        resultName1: 'Austin',
        resultNumber2: '2',
        resultFlag2: 'GER',
        resultName2: 'Frank',
        resultNumber3: '3',
        resultFlag3: 'DEN',
        resultName3: 'Brand',
        resultNumber4: '4',
        resultFlag4: 'AUS',
        resultName4: 'Philson',
        text: "",
        footer: ''
      },
      {
        type: 'Results',
        gender: '',
        title: 'Results',
        resultNumber1: '',
        resultFlag1: '',
        resultName1: '',
        resultNumber2: '',
        resultFlag2: '',
        resultName2: '',
        resultNumber3: '',
        resultFlag3: '',
        resultName3: '',
        resultNumber4: '',
        resultFlag4: '',
        resultName4: '',
        text: "Pierce Lepage won Canada's First Medal of the Games",
        footer: 'CBC.CA/MILANOCORTINA2026'
      },
      {
        type: 'Breaking',
        gender: '',
        title: 'Breaking',
        resultNumber1: '',
        resultFlag1: '',
        resultName1: '',
        resultNumber2: '',
        resultFlag2: '',
        resultName2: '',
        resultNumber3: '',
        resultFlag3: '',
        resultName3: '',
        resultNumber4: '',
        resultFlag4: '',
        resultName4: '',
        text: "Adam Tambellini scores a hat-trick in men's hockey",
        footer: 'CBC.CA/MILANOCORTINA2026'
      }
    ];
    resultItems.forEach((item) => {
      item.visible = true;
      item.squeeze = false;
    })
    sendableResultItems = [...resultItems];
    saveResultItems();
  }
  generateResultTableRows();
}

loadResultItems();

// Shared
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