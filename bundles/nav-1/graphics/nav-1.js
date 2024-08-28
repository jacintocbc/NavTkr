// Shared --------------------------------------------------------------------------- //

function showHideParentContainers(id) {
  const parents = ['nav-1', 'nav-2', 'nav-3'];
  parents.forEach((parentId, index) => {
    const parent = document.getElementById(parentId);
    parent.style.display = (index + 1) === id ? 'block' : 'none';
  });
}

// Navbar -------------------------------------------------------------------------- //

let navbarItems = [
  {
    img: 'cbc-logo.png',
    title: 'Athletics',
    time1: '11:30',
    time2: 'AM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'tsn-logo.png',
    title: 'Rugby Sevens',
    time1: '2:30',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'sn-logo.png',
    title: 'Water Polo',
    time1: '3:30',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'sn1-logo.png',
    title: 'Athletics',
    time1: '5:30',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'ici-tele-logo.png',
    title: 'Athletics',
    time1: '11:30',
    time2: 'AM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'rds-logo.png',
    title: 'Rugby Sevens',
    time1: '2:30',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    img: 'rds2-logo.png',
    title: 'Water Polo',
    time1: '3:30',
    time2: 'PM',
    time3: 'ET',
    footer: 'CBC.CA/PARIS2024'
  }
];

let navbarItemIndex = 0;
let navbarOutTransitionId;

// Function to create a single navbar item
function createNavbarItem(item, index) {
  // Create the wrapper for this navbar item
  const navbarItem = document.createElement('div');
  navbarItem.className = 'navbar-wrapper';
  navbarItem.id = `navbar-${index}`;

  // Create and append the header container and image
  const headerContainer = document.createElement('div');
  headerContainer.className = 'nav-header';
  const image = document.createElement('img');
  image.src = `../shared/assets/logos/${item.img}`;
  image.alt = 'Broadcast Logo';
  image.className = 'broadcast-logo';
  headerContainer.appendChild(image);
  navbarItem.appendChild(headerContainer);

  // Create and append the content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'nav-content';

  // Create and append the title
  const titleSpan = document.createElement('span');
  titleSpan.className = 'nav-title';
  if (item.squeeze === true || item.squeeze === false) {
    if (item.squeeze === true) titleSpan.className = 'nav-title squeeze';
  }
  const titleText = document.createElement('span');
  titleText.className = 'text';
  if (item.title && item.title.startsWith('A')) {
    titleText.classList.add('more-left-margin');
  }
  titleText.id = 'title-text';
  titleText.textContent = item.title;
  titleSpan.appendChild(titleText);
  contentContainer.appendChild(titleSpan);

  // Create and append the time elements
  const timeSpan = document.createElement('span');
  timeSpan.className = 'nav-time';
  ['time1', 'time2', 'time3'].forEach((time, idx) => {
    const timeTextPart = document.createElement('span');
    timeTextPart.className = 'time-text-part';
    timeTextPart.id = `time-${idx + 1}`;
    timeTextPart.textContent = item[time];
    timeSpan.appendChild(timeTextPart);
  });
  contentContainer.appendChild(timeSpan);

  // Create and append the footer text
  const footerText = document.createElement('span');
  footerText.className = 'text footer-text';
  if (item.squeeze === true || item.squeeze === false) {
    if (item.squeeze === true) footerText.className = 'text footer-text footer-squeeze';
  }
  footerText.id = 'nav-footer-text';
  footerText.textContent = item.footer;
  contentContainer.appendChild(footerText);
  navbarItem.appendChild(contentContainer);

  // Create and append the footer container and image
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer';
  const footerImage = document.createElement('img');
  footerImage.src = '../shared/assets/background-bar.png';
  footerImage.alt = 'CBC Gem line pattern';
  footerContainer.appendChild(footerImage);
  navbarItem.appendChild(footerContainer);

  return navbarItem;
}

// Create and append navbar items
function initializeNavbar() {
  const navContainer = document.getElementById('nav-1');
  navContainer.innerHTML = '';
  navbarItems.forEach((item, index) => {
    const navbarElement = createNavbarItem(item, index);
    // Set display to none for all but the first promoElement
    if (index !== 0) {
      navbarElement.style.display = 'none';
    }
    navContainer.appendChild(navbarElement);
  });
}

// Clear existing timeouts
function clearNavbarTimeouts() {
  if (navbarOutTransitionId) clearTimeout(navbarOutTransitionId);
}

// Animate In Navbar
function animateInNavbar() {
  showHideParentContainers(1);
  clearNavbarTimeouts();
  // Build elements
  initializeNavbar();
  // Initial Animation
  const navbarContainer = document.getElementById('nav-1');
  navbarContainer.style.animation = 'stage1 .25s forwards, stage2 .1s .25s forwards ease-out, stage3 .4s .35s forwards ease-out, stage4 .6s .75s forwards ease-out';
  setTimeout(() => {
    navbarContainer.style.clipPath = 'inset(0 0 0 0)';
  }, 2000);
  // Reset Index & display first navbar item
  navbarItemIndex = 0;
  const currentNavbar = document.getElementById(`navbar-${navbarItemIndex}`);
  if (currentNavbar) {
    currentNavbar.style.display = 'block';
    const broadcastLogo = currentNavbar.querySelector('.broadcast-logo');
    const navbarTitle = currentNavbar.querySelector('.nav-title');
    const navbarTime = currentNavbar.querySelector('.nav-time');
    const footerText = currentNavbar.querySelector('.footer-text');
    const footerImage = currentNavbar.querySelector('.footer img');
    broadcastLogo.style.animation = 'fadeInLeftMore .5s ease-out forwards .3s';
    navbarTitle.style.animation = 'fadeInUpText .35s ease-in-out forwards .55s';
    navbarTime.style.animation = 'fadeInUpText .35s ease-in-out forwards .65s';
    footerText.style.animation = 'fadeInLeft .65s ease-out forwards .9s';
    footerImage.style.animation = 'fadeInLeftMore 1.5s ease-out forwards .8s';
    setTimeout(() => {
      footerImage.style.opacity = '1';
      footerImage.style.transform = 'translateX(0)';
    }, 2300);
  }
  // Set animation for every other navbar
  const allNavbarItems = document.querySelectorAll('.navbar-wrapper');
  if (allNavbarItems) {
    allNavbarItems.forEach((navbar) => {
      if (navbar.id !== 'navbar-0') {
        const broadcastLogo = navbar.querySelector('.broadcast-logo');
        const navbarTitle = navbar.querySelector('.nav-title');
        const navbarTime = navbar.querySelector('.nav-time');
        broadcastLogo.style.animation = 'fadeInUpText .5s ease-out forwards .3s';
        navbarTitle.style.animation = 'fadeInUpText .35s ease-in-out forwards .55s';
        navbarTime.style.animation = 'fadeInUpText .35s ease-in-out forwards .65s';
      }
    });
  }
}

// Transition between navbar items
function transitionToNextNavbar() {
  clearNavbarTimeouts();
  // Hide Current Navbar
  const currentNavbar = document.getElementById(`navbar-${navbarItemIndex}`);
  if (currentNavbar) {
    // Extract the numerical part of the ID
    const currentNavbarIndex = parseInt(currentNavbar.id.replace('navbar-', ''), 10);
    // If not the last image, add image fade out animation
    if (currentNavbarIndex + 1 !== navbarItems.length) {
      const broadcastLogo = currentNavbar.querySelector('.broadcast-logo');
      const navbarTitle = currentNavbar.querySelector('.nav-title');
      const navbarTime = currentNavbar.querySelector('.nav-time');
      navbarTitle.style.opacity = '1';
      navbarTime.style.opacity = '1';
      broadcastLogo.style.animation = 'fadeOutUpText .3s ease forwards';
      navbarTitle.style.animation = 'fadeOutUpText .2s ease forwards .05s';
      navbarTime.style.animation = 'fadeOutUpText .2s ease forwards .05s';
      navbarOutTransitionId = setTimeout(() => {
        currentNavbar.style.display = 'none';
      }, 100);
    }
  }

  // Check if we've gone through all navbars
  if (navbarItemIndex < navbarItems.length - 1) {
    // Increment the group index
    navbarItemIndex++;

    const navbar = document.getElementById(`navbar-${navbarItemIndex}`);
    if (navbar) {
      navbar.style.display = 'block';
      const footerText = navbar.querySelector('.footer-text');
      footerText.style.opacity = '1';
      footerText.style.transform = 'translateX(0)';
      const footerImage = navbar.querySelector('.footer img');
      footerImage.style.opacity = '1';
      footerImage.style.transform = 'translateX(0)';
    }
  } else {
    // If we've displayed all navbars, animate out
    hideNavbar();
  }
}

function hideNavbar() {
  playAudioOut();
  const navbarContainer = document.getElementById('nav-1');
  const navbar = document.getElementById(`navbar-${navbarItemIndex}`);
  if (navbar) {
    const broadcastLogo = navbar.querySelector('.broadcast-logo');
    const navbarTitle = navbar.querySelector('.nav-title');
    const navbarTime = navbar.querySelector('.nav-time');
    const footerText = navbar.querySelector('.footer-text');
    const footerContainer = navbar.querySelector('.footer');
    const footerImage = navbar.querySelector('.footer img');
    broadcastLogo.style.animation = 'fadeOutDownText .5s ease-out forwards';
    navbarTitle.style.animation = 'fadeOut .5s ease forwards';
    navbarTime.style.animation = 'fadeOut .5s ease forwards';
    footerText.style.animation = 'fadeOut .5s ease forwards';
    footerContainer.style.animation = 'fadeOut .5s ease forwards .2s';
    footerImage.style.animation = 'outLeft 1s ease forwards .1s';
    navbarContainer.style.animation = 'hideAnimation .3s ease-in forwards .1s';
  }
}

function animateOutNavbar() {
  hideNavbar();
}

function animateNextNavbar() {
  clearNavbarTimeouts();
  transitionToNextNavbar();
}

// Promo ---------------------------------------------------------------------------- //

let promoItems = [
  {
    type: 'Athlete',
    img: '../shared/assets/athletes/default.jpg',
    height: '196px',
    objectPosition: '-51px 3px',
    title: 'New Athlete',
    subtitle: 'Sport',
    date: 'Today',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    type: 'Picto',
    img: '../shared/assets/pictos/basketball.png',
    height: '196px',
    objectPosition: '-10px -2px',
    title: 'Jamal Murray',
    subtitle: 'Basketball',
    date: 'Coming Up',
    footer: 'CBC.CA/PARIS2024'
  },
  {
    type: 'Continue',
    img: '../shared/assets/pictos/rowing.png',
    height: '196px',
    objectPosition: '-10px -2px',
    title: 'Rowing',
    subtitle: 'Continue Watching On',
    date: 'Gem',
    footer: 'CBC.CA/PARIS2024'
  }
];

let promoItemIndex = 0;
let promoTransitionTimeoutId;

// Function to create a single promo item
function createPromoItem(item, index) {
  let isContinue = false;
  // Create the main container for this promo item
  const promoItem = document.createElement('div');
  promoItem.className = 'nav-content without-footer-promo';
  promoItem.id = `promo-${index}`;

  // Create and append the image container and image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'promo-image';
  const image = document.createElement('img');
  image.src = item.img;
  image.style.height = item.height; // Set the height
  image.style.objectPosition = item.objectPosition; // Set the object-position
  if (item.type == 'Athlete') {
    image.style.background = '#e7e7e7';
  } else {
    image.style.background = 'linear-gradient(to bottom right, #ffebb4, #ffebb4 42%, #71eda3, #71eda3)';
  }
  imageContainer.appendChild(image);
  promoItem.appendChild(imageContainer);

  // Create and append the text container
  const textContainer = document.createElement('div');
  textContainer.className = 'nav-text-container';
  const textSpan = document.createElement('span');
  textSpan.className = 'nav-text-promo';

  // Title
  const title = document.createElement('span');
  title.className = 'nav-title title-promo';
  title.textContent = item.title;
  textSpan.appendChild(title);

  // Subtitle
  const subtitle = document.createElement('span');
  subtitle.className = 'sub-title';
  subtitle.textContent = item.subtitle;
  if (item.subtitle.startsWith('Continue')) {
    subtitle.classList.add('continue');
  }
  textSpan.appendChild(subtitle);

  // Date
  const date = document.createElement('span');
  date.className = 'date';
  if (item.date === 'Gem') {
    isContinue = true;
    const img = document.createElement('img');
    img.src = '../shared/assets/logos/cbc-gem.png';
    img.alt = 'CBC Gem';
    img.className = 'gem-logo';
    date.appendChild(img);
  } else {
    date.textContent = item.date;
  }
  textSpan.appendChild(date);

  // Footer
  const footer = document.createElement('span');
  footer.className = 'text footer-text footer-text-promo';
  if (isContinue) footer.classList.add('footer-text-promo-continue');
  footer.id = 'nav-footer-text';
  footer.textContent = item.footer;
  textSpan.appendChild(footer);

  textContainer.appendChild(textSpan);
  promoItem.appendChild(textContainer);

  return promoItem;
}

// Create and append Promo elements
function initializePromo() {
  const promoContainer = document.getElementById('nav-2');
  promoContainer.innerHTML = '';
  promoItems.forEach((item, index) => {
    const promoElement = createPromoItem(item, index);
    // Set display to none for all but the first promoElement
    if (index !== 0) {
      promoElement.style.display = 'none';
    }
    promoContainer.appendChild(promoElement);
  });
}

// Animate In Promo
function animateInPromo() {
  showHideParentContainers(2);
  // Clear existing timeout
  if (promoTransitionTimeoutId) {
    clearTimeout(promoTransitionTimeoutId);
  }
  // Build elements
  initializePromo();
  // Initial Animation
  const promoContainer = document.getElementById('nav-2');
  promoContainer.style.animation = 'stage1 .25s forwards, stage2 .1s .25s forwards ease-out, stage3 .4s .35s forwards ease-out, stage4 .6s .75s forwards ease-out';
  // Reset Index & display first promo item
  promoItemIndex = 0;
  const currentPromo = document.getElementById(`promo-${promoItemIndex}`);
  if (currentPromo) {
    currentPromo.style.display = 'flex';
    const footer = currentPromo.querySelector('.footer-text-promo');
    footer.style.animation = 'fadeInLeft .6s ease-out forwards .9s';
    const promoImage = currentPromo.querySelector('.promo-image img');
    const title = currentPromo.querySelector('.title-promo');
    const subtitle = currentPromo.querySelector('.sub-title');
    const date = currentPromo.querySelector('.date');
    promoImage.style.animation = 'imageFadeUpIn .6s ease-out forwards .3s, imageFadeIn .75s ease-in-out forwards .3s';
    title.style.animation = 'fadeInUpText .3s ease-in-out forwards .55s';
    subtitle.style.animation = 'fadeInUpText .3s ease-in-out forwards .65s';
    date.style.animation = 'fadeInUpText .3s ease-in-out forwards .75s';
  }
  // Set animation for every other promo
  const allPromoItems = document.querySelectorAll('.without-footer-promo');
  if (allPromoItems) {
    allPromoItems.forEach((promo) => {
      if (promo.id !== 'promo-0') {
        const promoImage = promo.querySelector('.promo-image img');
        const title = promo.querySelector('.title-promo');
        const subtitle = promo.querySelector('.sub-title');
        const date = promo.querySelector('.date');
        promoImage.style.animation = 'imageFadeUpIn .4s ease-out forwards, imageFadeIn .75s ease-in-out forwards';
        title.style.animation = 'fadeInUpText .3s ease-in-out forwards .15s';
        subtitle.style.animation = 'fadeInUpText .3s ease-in-out forwards .25s';
        date.style.animation = 'fadeInUpText .3s ease-in-out forwards .35s';
      }
    });
  }
}

// Transition between promo items
function transitionToNextPromo() {
  // Clear existing timeout
  if (promoTransitionTimeoutId) {
    clearTimeout(promoTransitionTimeoutId);
  }

  // Hide Current Promo
  const currentPromo = document.getElementById(`promo-${promoItemIndex}`);
  if (currentPromo) {
    // Extract the numerical part of the ID
    const currentPromoIndex = parseInt(currentPromo.id.replace('promo-', ''), 10);
    // If not the last image, add image fade out animation
    if (currentPromoIndex + 1 !== promoItems.length) {
      const promoImage = currentPromo.querySelector('.promo-image img');
      promoImage.style.animation = 'imageFadeUpOut .2s ease-out forwards, imageFadeOut .2s ease-in-out forwards ';
      setTimeout(() => {
        currentPromo.style.display = 'none';
      }, 100);
    }
  }

  // Increment the group index
  promoItemIndex++;

  // Check if we've gone through all promos
  if (promoItemIndex < promoItems.length) {
    const promo = document.getElementById(`promo-${promoItemIndex}`);
    if (promo) {
      promo.style.display = 'flex';
      const footer = promo.querySelector('.footer-text-promo');
      footer.style.opacity = '1';
      footer.style.transform = 'translateX(0)';
    }
  } else {
    // If we've displayed all promos, animate out
    hidePromo();
  }
}

function hidePromo() {
  playAudioOut();
  const promoContainer = document.getElementById('nav-2');
  promoContainer.style.animation = 'hideAnimation forwards ease-in .5s';
}

function animateOutPromo() {
  hidePromo();
}

function animateNextPromo() {
  transitionToNextPromo();
}

// Results ----------------------------------------------------------------- //

let resultItems = [
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
    footer: 'CBC.CA/PARIS2024'
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
    title: 'Results',
    text: "Pierce Lepage won Canada's First Medal of the Games",
    footer: 'CBC.CA/PARIS2024'
  },
  {
    type: 'Breaking',
    title: 'Breaking',
    text: "Adam Tambellini scores a hat-trick in men's hockey",
    footer: 'CBC.CA/PARIS2024'
  },
  {
    type: 'StandingsAlt',
    gender: 'M',
    title: 'Athletics 1500M',
    resultNumber1: '1',
    resultFlag1: 'JPN',
    resultName1: 'Ingebrigtsen',
    resultNumber2: '2',
    resultFlag2: 'KOR',
    resultName2: 'Kerr',
    resultNumber3: '3',
    resultFlag3: 'FRA',
    resultName3: 'Cheruyiot',
    resultNumber4: '',
    resultFlag4: '',
    resultName4: '',
    text: "",
    footer: 'CBC.CA/PARIS2024'
  },
  {
    type: 'Standings',
    gender: '',
    title: 'Canoe Sprint',
    resultNumber1: '1',
    resultFlag1: 'CAN',
    resultName1: 'Stevens',
    resultNumber2: '2',
    resultFlag2: 'USA',
    resultName2: 'Joseph',
    resultNumber3: '3',
    resultFlag3: 'GBR',
    resultName3: 'Kensington',
    resultNumber4: '4',
    resultFlag4: 'GER',
    resultName4: 'Frank',
    text: "",
    footer: ''
  }
];

let resultItemIndex = 0;
let resultTransitionTimeoutId;
let resultOutTransitionId;

// Function to create a single result item
function createResultItem(item, index) {
  // Create the wrapper for this result item
  const resultItem = document.createElement('div');
  resultItem.className = 'result-wrapper';
  resultItem.id = `result-${index}`;

  // Creating nav-header
  const navHeader = document.createElement('div');
  const navHeaderAlt = document.createElement('div');
  if (item.gender) {
    navHeader.classList.add('nav-header-alt');
    const headerCorner = document.createElement('span');
    headerCorner.classList.add('header-corner');
    const headerCornerText = document.createElement('span');
    headerCornerText.classList.add('header-corner-text');
    headerCornerText.textContent = item.gender;
    headerCorner.appendChild(headerCornerText);
    navHeaderAlt.classList.add('header-alt');
    navHeaderAlt.appendChild(headerCorner);
  }
  if (['Results', 'Breaking'].includes(item.type)) {
    navHeader.classList.add('nav-header-alt');
    navHeaderAlt.classList.add('header-alt', `header-${item.type.toLowerCase()}`);
  } else {
    navHeader.classList.add('nav-header-alt');
    navHeaderAlt.classList.add('header-alt');
  }
  const headerText = document.createElement('span');
  headerText.classList.add('header-text');
  if (['Results', 'Breaking'].includes(item.type)) {
    headerText.classList.add('header-text-results');
  } else if (!item.gender) {
    headerText.classList.add('header-text-no-corner');
  }
  headerText.textContent = item.title;
  navHeaderAlt.appendChild(headerText);
  navHeader.appendChild(navHeaderAlt);
  resultItem.appendChild(navHeader);

  // Create and append content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'nav-content without-footer-results';

  // Creating result rows for standings type
  if (item.type === 'Standings' || item.type === 'StandingsAlt') {
    for (let i = 1; i <= 4; i++) {
      if (item[`resultNumber${i}`]) {
        const resultRow = document.createElement('div');
        resultRow.classList.add('result-row');
        if (i % 2 === 0) resultRow.classList.add('odd-row');

        const resultNumber = document.createElement('span');
        resultNumber.classList.add('result-number');
        resultNumber.textContent = item[`resultNumber${i}`];
        resultRow.appendChild(resultNumber);

        const resultFlag = document.createElement('div');
        resultFlag.classList.add('result-flag');
        const img = document.createElement('img');
        img.src = `../shared/assets/flags/${item[`resultFlag${i}`]}.jpg`;
        img.alt = item[`resultFlag${i}`];
        resultFlag.appendChild(img);
        resultRow.appendChild(resultFlag);

        const resultName = document.createElement('span');
        resultName.classList.add('result-name');
        resultName.textContent = item[`resultName${i}`];
        resultRow.appendChild(resultName);

        contentContainer.appendChild(resultRow);
      }
    }
  } else if (item.text) { // For Results or Breaking type
    const resultsText = document.createElement('div');
    resultsText.classList.add('results-text');
    resultsText.textContent = item.text;
    contentContainer.appendChild(resultsText);

    // Split Results text into two lines
    function splitAndStyleText() {
      const words = resultsText.textContent.split(' ');
      let line1 = '';
      let line2 = '';
      let testSpan = document.createElement('span'); // Create a span for measuring
      testSpan.style.visibility = 'hidden';
      testSpan.style.font = 'bold 28px "Radio-Canada", sans-serif'; // Assuming the font is set here
      testSpan.style.textTransform = 'uppercase';
      document.body.appendChild(testSpan); // Append it to body for measurement

      let isLine1Complete = false;
      words.forEach(word => {
        if (!isLine1Complete) {
          testSpan.textContent = line1 + (line1 ? ' ' : '') + word; // Add the word to test width
          if (testSpan.offsetWidth > 460) { // Check if it exceeds the max width
            if (!line1) { // Ensure at least one word in the first line
              line1 = word;
              isLine1Complete = true;
            } else {
              isLine1Complete = true;
              line2 += word; // Start populating the second line
            }
          } else {
            line1 = testSpan.textContent; // Update line1 if under max width
          }
        } else {
          line2 += (line2 ? ' ' : '') + word; // Continue adding words to line2
        }
      });

      // Cleanup test span
      document.body.removeChild(testSpan);

      // Now create and append the spans with line1 and line2
      resultsText.textContent = ''; // Clear original span
      const line1Span = document.createElement('div');
      const line2Span = document.createElement('div');
      line1Span.textContent = line1;
      line2Span.textContent = line2;

      // Append the spans to resultsText
      resultsText.appendChild(line1Span);
      if (line2) {
        resultsText.appendChild(line2Span);
      }
    }

    splitAndStyleText();
  }

  // Adding footer if it exists
  if (item.footer) {
    const footerText = document.createElement('span');
    footerText.classList.add('text', 'footer-text');
    footerText.classList.add(['Results', 'Breaking'].includes(item.type) ? 'footer-text-results-2' : 'footer-text-results-1');
    footerText.textContent = item.footer;
    contentContainer.appendChild(footerText);
  }

  resultItem.appendChild(contentContainer);

  return resultItem;
}

// Function to initialize and append all result items
function initializeResults() {
  const resultsContainer = document.getElementById('nav-3');
  resultsContainer.innerHTML = '';
  resultItems.forEach((item, index) => {
    const resultElement = createResultItem(item, index);
    // Set display to none for all but the first resultElement
    if (index !== 0) {
      resultElement.style.display = 'none';
    }
    resultsContainer.appendChild(resultElement);
  });
}

// Clear existing timeouts
function clearResultTimeouts() {
  if (resultTransitionTimeoutId) clearTimeout(resultTransitionTimeoutId);
  if (resultOutTransitionId) clearTimeout(resultOutTransitionId);
}

function animateInResults() {
  showHideParentContainers(3);
  clearResultTimeouts();
  // Build elements
  initializeResults();
  // Initial Animation
  const resultsContainer = document.getElementById('nav-3');
  resultsContainer.style.animation = 'stage1 .25s forwards, stage2 .1s .25s forwards ease-out, stage3 .4s .35s forwards ease-out, stage4 .6s .75s forwards ease-out';
  setTimeout(() => {
    resultsContainer.style.clipPath = 'inset(0 0 0 0)';
  }, 2000);
  // Reset Index & display first result item
  resultItemIndex = 0;
  const currentResult = document.getElementById(`result-${resultItemIndex}`);
  if (currentResult) {
    currentResult.style.display = 'block';
    const headerCorner = currentResult.querySelector('.header-corner');
    const headerCornerText = currentResult.querySelector('.header-corner-text');
    const headerText = currentResult.querySelector('.header-text');
    const resultRows = currentResult.querySelectorAll('.result-row');
    const footerText = currentResult.querySelector('.footer-text');
    if (headerCorner) headerCorner.style.animation = 'fadeIn .5s ease-in forwards .3s';
    if (headerCornerText) headerCornerText.style.animation = 'fadeInLeft .5s ease-out forwards .4s';
    headerText.style.animation = 'fadeInLeftMore .5s ease-out forwards .4s';
    let delay = .4;
    let delayName = .6;
    if (resultRows) {
      resultRows.forEach((row) => {
        row.style.animation = `fadeIn .5s ease-out forwards ${delay}s`;
        delay = delay + .2;
        delayName = delayName + .2;
        // Getting all child elements of the result-row
        Array.from(row.children).forEach(child => {
          child.style.opacity = '0';
          child.style.animation = `fadeIn .3s ease-out forwards ${delay}s`;
          if (child.classList.contains('result-name')) {
            child.style.animation = `fadeInLeft .5s ease-out forwards ${delayName}s`;
          }
        });
      });
    }
    const resultsTextSpans = currentResult.querySelectorAll('.results-text > div');
    if (resultsTextSpans) {
      resultsTextSpans.forEach((span, index) => {
        span.style.animation = `fadeInUpTextMore .5s ease-out forwards ${0.7 + 0.2 * index}s`;
      });
    }
    if (footerText) footerText.style.animation = 'fadeInLeft .65s ease-out forwards 1s';
  }
  // Set animation for every other result
  const allResultItems = document.querySelectorAll('.result-wrapper');
  if (allResultItems) {
    allResultItems.forEach((result) => {
      if (result.id !== 'result-0') {
        const headerCorner = result.querySelector('.header-corner');
        const headerCornerText = result.querySelector('.header-corner-text');
        if (headerCorner) headerCorner.style.animation = 'fadeIn .5s ease-in forwards .9s';
        if (headerCornerText) headerCornerText.style.animation = 'fadeInUpText .5s ease-out forwards 1s';
        const footerText = result.querySelector('.footer-text');
        if (footerText) footerText.style.animation = 'fadeInLeft .65s ease-out forwards 1.5s';
        const resultRows = result.querySelectorAll('.result-row');
        const resultNamesOther = result.querySelectorAll('.result-name');
        if (resultRows && resultRows.length > 0) {
          const headerText = result.querySelector('.header-text');
          headerText.style.animation = 'fadeInUpText .5s ease-out forwards 1s';
          if (resultNamesOther) {
            let delay = 1.1;
            resultNamesOther.forEach((resultNames) => {
              resultNames.style.animation = `fadeInLeft .5s ease-out forwards ${delay}s`;
              delay = delay + .2;
            });
          }
        } else {
          const headerResults = result.querySelector('.header-alt');
          headerResults.style.transform = 'translateX(100%)';
          headerResults.style.animation = 'fadeRightToLeft .3s ease-out forwards .9s';
          const headerText = result.querySelector('.header-text');
          headerText.style.animation = 'fadeInUpText .5s ease-out forwards 1.1s';
          const resultsTextSpans = result.querySelectorAll('.results-text > div');
          if (resultsTextSpans) {
            resultsTextSpans.forEach((span, index) => {
              span.style.animation = `fadeInUpTextMore .5s ease-out forwards ${1 + 0.2 * index}s`;
            });
          }
        }
      }
    });
  }
}

// Transition between result items
function transitionToNextResult() {
  let rowNumber = 0;
  clearResultTimeouts();
  // Hide Current Result
  const currentResult = document.getElementById(`result-${resultItemIndex}`);
  const nextResult = document.getElementById(`result-${resultItemIndex + 1}`);
  let nextResultRows;
  if (nextResult) nextResultRows = nextResult.querySelectorAll('.result-row');
  if (currentResult) {
    // Extract the numerical part of the ID
    const currentResultIndex = parseInt(currentResult.id.replace('result-', ''), 10);
    // If not last animate out elements
    if (currentResultIndex + 1 !== resultItems.length) {

      // Header Related logic
      const headerContainer = currentResult.querySelector('.header-alt');
      if (headerContainer.classList.contains('header-results') || headerContainer.classList.contains('header-breaking')) {
        headerContainer.style.animation = '';
        headerContainer.style.transform = 'translateX(0)';
        headerContainer.style.opacity = '1';
        const headerText = headerContainer.querySelector('.header-text');
        headerText.style.animation = 'imageFadeUpOut .2s ease-out forwards, imageFadeOut .2s ease-out forwards';
        if (nextResult && !nextResultRows || nextResultRows.length === 0) {
          const nextHeaderContainer = nextResult.querySelector('.nav-header-alt');
          const style = window.getComputedStyle(headerContainer);
          nextHeaderContainer.style.background = style.getPropertyValue('background-color');
        }
      } else {
        headerContainer.style.animation = 'imageFadeUpOut .7s ease-out forwards, imageFadeOut .5s ease-out forwards';
      }

      // Row Related logic
      const resultRows = currentResult.querySelectorAll('.result-row');
      if (resultRows && resultRows.length > 0) {
        if (nextResult) {
          const nextResultRows = nextResult.querySelectorAll('.result-row');
          if (nextResultRows && nextResultRows.length > 0) {
            resultRows.forEach((row, index) => {
              // Don't animate out rows
              rowNumber++;
              row.style.opacity = '1';
              row.style.animation = '';
              // Getting all child elements of the result-row
              Array.from(row.children).forEach(child => {
                child.style.opacity = '1';
                if (child.classList.contains('result-name')) {
                  child.style.transform = 'translateX(0)';
                }
                // Add the animation class to each child
                child.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
              });
            });
          } else {
            // Animate out rows if none on next result
            let delay = 0.2;
            resultRows.forEach((row, index) => {
              row.style.opacity = '1';
              // Getting all child elements of the result-row
              Array.from(row.children).forEach(child => {
                child.style.opacity = '1';
                if (child.classList.contains('result-name')) {
                  child.style.transform = 'translateX(0)';
                }
                // Add the animation class to each child
                child.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
              });
              row.style.animation = `fadeOut .3s ease-out forwards ${delay}s`;
              delay = delay + 0.2;
            });
          }
        }
        // Results text instead of rows
      } else {
        const resultsTextSpans = currentResult.querySelectorAll('.results-text > div');
        if (resultsTextSpans) {
          resultsTextSpans.forEach((span, index) => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
            span.style.animation = `fadeOut .3s ease-out forwards ${0.2 * index}s`;
          });
        }
      }

      // Footer Related
      const footer = currentResult.querySelector('.footer-text');
      if (footer) {
        footer.style.opacity = '1';
        footer.style.transform = 'translateX(0)';
        // If Next Result has footer, don't fade out
        if (nextResult) {
          const footerNext = nextResult.querySelector('.footer-text');
          if (footerNext) {
            footer.style.animation = '';
            footerNext.style.animation = '';
            footerNext.style.opacity = '1';
            footerNext.style.transform = 'translateX(0)';
          } else {
            footer.style.animation = 'fadeOut .3s ease-out forwards .5s';
          }
        }
      }

      // Set Timeout to switch to next Result
      resultOutTransitionId = setTimeout(() => {
        currentResult.style.display = 'none';
      }, 700);
    }
  }

  // Check if we've gone through all navbars
  if (resultItemIndex < resultItems.length - 1) {
    // Increment the group index
    resultItemIndex++;

    // Bring in next Result
    const result = document.getElementById(`result-${resultItemIndex}`);
    if (result) {
      result.style.display = 'block';

      // Result Row related logic
      const resultRows = result.querySelectorAll('.result-row');
      if (resultRows && resultRows.length > 0) {
        // If previous rowNumber was 3, animate in 4th if exists
        if (rowNumber === 3) {
          let delay = 1;
          let delayName = 1;
          resultRows.forEach((row, index) => {
            if (index <= 2) {
              row.style.opacity = '1';
              row.style.animation = '';
              delay = delay + .2;
              delayName = delayName + .2;
              // Getting all child elements of the result-row
              Array.from(row.children).forEach(child => {
                child.style.opacity = '0';
                child.style.animation = `fadeIn .3s ease-out forwards ${delay}s`;
                if (child.classList.contains('result-name')) {
                  child.style.animation = `fadeInLeft .5s ease-out forwards ${delayName}s`;
                }
              });
            } else {
              row.style.opacity = '0';
              row.style.animation = 'fadeIn .6s ease-out forwards 1.7s';
            }
          });
          // If previous rowNumber was 4, don't animate any
        } else if (rowNumber === 4) {
          let delay = 1;
          let delayName = 1;
          resultRows.forEach((row) => {
            row.style.opacity = '1';
            row.style.animation = '';
            delay = delay + .2;
            delayName = delayName + .2;
            // Getting all child elements of the result-row
            Array.from(row.children).forEach(child => {
              child.style.opacity = '0';
              child.style.animation = `fadeIn .3s ease-out forwards ${delay}s`;
              if (child.classList.contains('result-name')) {
                child.style.animation = `fadeInLeft .5s ease-out forwards ${delayName}s`;
              }
            });
          });
          // If previous result had no rows, but this one does
        } else {
          let delay = 1;
          let delayName = 1;
          resultRows.forEach((row) => {
            row.style.animation = `fadeIn .5s ease-out forwards ${delay}s`;
            delay = delay + .2;
            delayName = delayName + .2;
            Array.from(row.children).forEach(child => {
              child.style.opacity = '0';
              child.style.animation = `fadeIn .3s ease-out forwards ${delay}s`;
              if (child.classList.contains('result-name')) {
                child.style.animation = `fadeInLeft .5s ease-out forwards ${delayName}s`;
              }
            });
          });
        }
      } else {
        // Adjust Header Results
        const headerResults = result.querySelector('.header-alt');
        headerResults.style.animation = 'fadeRightToLeft .3s ease-out forwards .7s';
        // If No Next Result Rows, animate whole row out
        if (nextResult) {
          const nextResultRows = nextResult.querySelectorAll('.result-row');
          if (!nextResultRows) {
            resultRows.forEach((row, index) => {
              row.style.opacity = '1';
              row.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
              // Getting all child elements of the result-row
              Array.from(row.children).forEach(child => {
                child.style.opacity = '1';
                if (child.classList.contains('result-name')) {
                  child.style.transform = 'translateX(0)';
                }
                // Add the animation class to each child
                child.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
              });
            });
          }
        }
      }
    }
  } else {
    // If we've displayed all results, animate out
    hideResult();
  }
}

function hideResult() {
  playAudioOut();
  const resultContainer = document.getElementById('nav-3');
  const result = document.getElementById(`result-${resultItemIndex}`);
  const headerText = result.querySelector('.header-text');
  headerText.style.animation = 'fadeOutDownText .5s ease-in forwards';
  const resultRows = result.querySelectorAll('.result-row');
  const headerContainer = result.querySelector('.nav-header-alt');
  headerContainer.style.animation = 'fadeOutDown .3s ease-in forwards .2s';
  // Result Rows
  if (resultRows && resultRows.length > 0) {
    resultRows.forEach((row, index) => {
      row.style.opacity = '1';
      row.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
      // Getting all child elements of the result-row
      Array.from(row.children).forEach(child => {
        child.style.opacity = '1';
        if (child.classList.contains('result-name')) {
          child.style.transform = 'translateX(0)';
        }
        // Add the animation class to each child
        child.style.animation = `fadeOut .3s ease-out forwards ${index * 0.2}s`;
      });
    });
    // Result Text
  } else {
    const resultsTextSpans = result.querySelectorAll('.results-text > div');
    if (resultsTextSpans) {
      resultsTextSpans.forEach((span, index) => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
        span.style.animation = `fadeOut .3s ease-out forwards ${0.2 * index}s`;
      });
    }
  }
  const footer = result.querySelector('.footer-text');
  if (footer) footer.style.animation = 'fadeOut .3s ease-out forwards .3s'
  resultContainer.style.animation = 'hideAnimation .4s ease-in forwards .3s';
}

function animateOutResults() {
  hideResult();
}

function animateNextResults() {
  clearResultTimeouts();
  transitionToNextResult();
}

// NodeCG Related ------------------------------------------ 
const netCBCRep = nodecg.Replicant('netCBC');
const netTSNRep = nodecg.Replicant('netTSN');
const netSNRep = nodecg.Replicant('netSN');
const navbarItemsReplicant = nodecg.Replicant('navbarItems');
const promoItemsReplicant = nodecg.Replicant('promoItems');
const resultItemsReplicant = nodecg.Replicant('resultItems');
const networkReplicants = { netCBCRep, netTSNRep, netSNRep };

// Handle Instance of Network
function handleInstanceAction(instanceId, replicants, action, logMessage, audioAction) {
  const instanceActions = {
    'CBC': { replicant: replicants.netCBCRep, logPrefix: 'CBC' },
    'TSN': { replicant: replicants.netTSNRep, logPrefix: 'TSN' },
    'SN': { replicant: replicants.netSNRep, logPrefix: 'SN' },
    'PREVIEW': { replicant: 'true', logPrefix: 'PREVIEW' }
  };

  const currentInstance = instanceActions[instanceId];
  if (currentInstance && currentInstance.replicant.value === 'true' || currentInstance.replicant === 'true') {
    action();
    console.log(`${currentInstance.logPrefix} ${logMessage}`);
    if (audioAction) audioAction();
  }
}

// Get instance ID from URL
function getParameterByName(name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const instanceId = getParameterByName('instance');
console.log('instanceId', instanceId);

document.addEventListener('DOMContentLoaded', function () {
  document.title = `Navbar - ${instanceId}`;
});

// Play Audio In
function playAudioIn() {
  const audio = document.getElementById('audioIn');
  if (audio) audio.play();
}

// Play Audio Out
function playAudioOut() {
  const audio = document.getElementById('audioOut');
  if (audio) audio.play();
}

// Navbar -------------------------------------

// Update Items
navbarItemsReplicant.on('change', (newValue) => {
  if (newValue) {
    navbarItemsReplicant.value = newValue;
    navbarItems = newValue;
    console.log('navbar Items', navbarItemsReplicant.value, navbarItems);
    initializeNavbar();
  }
});

// Animate In with audio
nodecg.listenFor('play1', () => {
  handleInstanceAction(instanceId, networkReplicants, animateInNavbar, 'in', playAudioIn);
});

// Animate Out with audio
nodecg.listenFor('stop1', () => {
  handleInstanceAction(instanceId, networkReplicants, animateOutNavbar, 'out', playAudioOut);
});

// Animate Next without specific audio
nodecg.listenFor('next1', () => {
  handleInstanceAction(instanceId, networkReplicants, transitionToNextNavbar, 'next');
});

// Promo -------------------------------------

// Update Items
promoItemsReplicant.on('change', (newValue) => {
  if (newValue) {
    promoItemsReplicant.value = newValue;
    promoItems = newValue;
    console.log('promo Items', promoItemsReplicant.value, promoItems);
    initializePromo();
  }
});

// Animate In with audio
nodecg.listenFor('play2', () => {
  handleInstanceAction(instanceId, networkReplicants, animateInPromo, 'in', playAudioIn);
});

// Animate Out with audio
nodecg.listenFor('stop2', () => {
  handleInstanceAction(instanceId, networkReplicants, animateOutPromo, 'out', playAudioOut);
});

// Animate Next without specific audio
nodecg.listenFor('next2', () => {
  handleInstanceAction(instanceId, networkReplicants, transitionToNextPromo, 'next');
});

// Result -----------------------------------

// Update Items
resultItemsReplicant.on('change', (newValue) => {
  if (newValue) {
    resultItemsReplicant.value = newValue;
    resultItems = newValue;
    console.log('result Items', resultItemsReplicant.value, resultItems);
    initializeResults();
  }
});

// Animate In with audio
nodecg.listenFor('play3', () => {
  handleInstanceAction(instanceId, networkReplicants, animateInResults, 'in', playAudioIn);
});

// Animate Out with audio
nodecg.listenFor('stop3', () => {
  handleInstanceAction(instanceId, networkReplicants, animateOutResults, 'out', playAudioOut);
});

// Animate Next without specific audio
nodecg.listenFor('next3', () => {
  handleInstanceAction(instanceId, networkReplicants, transitionToNextResult, 'next');
});
