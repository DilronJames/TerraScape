/* Fieldnote is a private, single-page garden planner. Photo analysis, local
   plant references, and garden concepts run in this browser. */

const imageFiles = {
  serviceberry: 'Amelanchier canadensis (Canadian serviceberry).jpg',
  allegheny: 'A21-2-Amelanchier laevis (Allegheny Serviceberry).JPG',
  pawpaw: 'Asimina triloba 552976269.jpg',
  strawberry: 'Fragaria virginiana - fruit.jpg',
  blueberry: 'Blueray Blueberry Bush.JPG',
  bergamot: 'Monarda fistulosa - Wild Bergamot (28687679226).jpg',
  mountainmint: 'Pycnanthemum virginianum - Virginia Mountain Mint 01.jpg',
  susan: 'Black-Eyed Susan (Rudbeckia hirta) (551be533-155d-451f-6776-38be37f4b4bc).jpg',
  aster: 'Symphyotrichum novae-angliae NRCS-01.jpg',
  cedar: 'Juniperus virginiana NRCS-1.jpg',
  holly: 'American Holly (Ilex opaca) - Wyckoff, New Jersey 2023-01-15.jpg',
  winterberry: 'Ilex verticillata 7zz.jpg',
  viburnum: 'Viburnum dentatum 24zz.jpg'
};

const plants = [
  {
    id: 'serviceberry', name: 'Serviceberry', latin: 'Amelanchier canadensis',
    category: 'fruit', kind: 'Edible fruit · Native shrub/tree', form: 'shrub',
    light: 'Sun to part shade', water: 'Low to moderate water', heightFt: 18, widthFt: 12,
    description: 'White spring bloom, summer berries, and red-orange fall color. A small native tree with three seasons of interest.',
    credit: 'Robert H. Mohlenbrock · USDA NRCS · public domain', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Amelanchier_canadensis_(Canadian_serviceberry).jpg'
  },
  {
    id: 'allegheny', name: 'Allegheny serviceberry', latin: 'Amelanchier laevis',
    category: 'fruit', kind: 'Edible fruit · Native small tree', form: 'shrub',
    light: 'Sun to part shade', water: 'Low to moderate water', heightFt: 25, widthFt: 15,
    description: 'A small flowering tree with edible early-summer berries and excellent fall color. Birds may reach the fruit first.',
    credit: 'Sherief Saleh · CC BY-SA 3.0', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:A21-2-Amelanchier_laevis_(Allegheny_Serviceberry).JPG'
  },
  {
    id: 'pawpaw', name: 'Pawpaw', latin: 'Asimina triloba',
    category: 'fruit', kind: 'Edible fruit · Native understory tree', form: 'shrub',
    light: 'Part shade to sun', water: 'Moderate water', heightFt: 20, widthFt: 15,
    description: 'Large tropical-tasting fruit grows on a small native tree. Plant two genetically different trees for reliable pollination.',
    credit: 'Alex Abair · CC BY 4.0', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Asimina_triloba_552976269.jpg'
  },
  {
    id: 'blueberry', name: 'Highbush blueberry', latin: 'Vaccinium corymbosum',
    category: 'fruit', kind: 'Edible fruit · Shrub', form: 'shrub',
    light: 'Full sun', water: 'Regular water', heightFt: 6, widthFt: 5,
    description: 'Spring flowers, summer berries, and vivid fall foliage. Best fruiting in sun and acidic, evenly moist soil.',
    credit: 'OHWiki · public domain dedication', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Blueray_Blueberry_Bush.JPG'
  },
  {
    id: 'strawberry', name: 'Wild strawberry', latin: 'Fragaria virginiana',
    category: 'fruit', kind: 'Edible fruit · Groundcover', form: 'groundcover',
    light: 'Sun to part shade', water: 'Moderate water', heightFt: 1, widthFt: 3,
    description: 'A low, spreading native with spring flowers and small sweet fruits. Let runners fill a sunny bed edge.',
    credit: 'Sebaz · CC BY-SA 4.0', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Fragaria_virginiana_-_fruit.jpg'
  },
  {
    id: 'bergamot', name: 'Wild bergamot', latin: 'Monarda fistulosa',
    category: 'flowers', kind: 'Pollinator flower · Native perennial', form: 'perennial',
    light: 'Sun to part shade', water: 'Low to moderate water', heightFt: 4, widthFt: 2,
    description: 'Fragrant lavender blooms draw native bees and butterflies through summer. Give the clump room to spread.',
    credit: 'N. Lewis · Shenandoah National Park', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Monarda_fistulosa_-_Wild_Bergamot_(28687679226).jpg'
  },
  {
    id: 'mountainmint', name: 'Common mountain mint', latin: 'Pycnanthemum virginianum',
    category: 'flowers', kind: 'Pollinator flower · Native perennial', form: 'perennial',
    light: 'Sun to part shade', water: 'Moderate water', heightFt: 3, widthFt: 3,
    description: 'Clusters of small white blooms are a magnet for native bees and beneficial insects. Spreads into a fragrant, easy-care clump.',
    credit: 'Jasper Shide · CC0', license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Pycnanthemum_virginianum_-_Virginia_Mountain_Mint_01.jpg'
  },
  {
    id: 'susan', name: 'Black-eyed Susan', latin: 'Rudbeckia hirta',
    category: 'flowers', kind: 'Pollinator flower · Native perennial', form: 'perennial',
    light: 'Full sun', water: 'Low water', heightFt: 2.5, widthFt: 1.5,
    description: 'Golden summer flowers are easy to grow and useful to pollinators. Often short-lived; allow some seed to set.',
    credit: 'NPS Photo · public domain', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Black-Eyed_Susan_(Rudbeckia_hirta)_(551be533-155d-451f-6776-38be37f4b4bc).jpg'
  },
  {
    id: 'aster', name: 'New England aster', latin: 'Symphyotrichum novae-angliae',
    category: 'flowers', kind: 'Pollinator flower · Native perennial', form: 'perennial',
    light: 'Full sun', water: 'Moderate water', heightFt: 5, widthFt: 2,
    description: 'Purple fall flowers extend nectar into the late season. Pinch in early summer for a shorter, fuller plant.',
    credit: 'Robert H. Mohlenbrock · USDA SCS', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Symphyotrichum_novae-angliae_NRCS-01.jpg'
  },
  {
    id: 'cedar', name: 'Eastern red cedar', latin: 'Juniperus virginiana',
    category: 'privacy', kind: 'Privacy · Native evergreen', form: 'conifer',
    light: 'Full sun', water: 'Low water once established', heightFt: 30, widthFt: 15,
    description: 'A durable evergreen screen with wildlife value. Allow generous mature spacing and avoid crowding overhead wires.',
    credit: 'USDA NRCS · public domain', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Juniperus_virginiana_NRCS-1.jpg'
  },
  {
    id: 'holly', name: 'American holly', latin: 'Ilex opaca',
    category: 'privacy', kind: 'Privacy · Native evergreen', form: 'conifer',
    light: 'Sun to part shade', water: 'Moderate water', heightFt: 30, widthFt: 18,
    description: 'A broad, evergreen native screen with wildlife value. Use a male and female plant to support berries and leave room for its mature spread.',
    credit: 'Ryan Hodnett · CC BY-SA 4.0', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:American_Holly_(Ilex_opaca)_-_Wyckoff,_New_Jersey_2023-01-15.jpg'
  },
  {
    id: 'winterberry', name: 'Winterberry holly', latin: 'Ilex verticillata',
    category: 'privacy', kind: 'Privacy · Native deciduous shrub', form: 'shrub',
    light: 'Sun to part shade', water: 'Moist soil', heightFt: 10, widthFt: 8,
    description: 'A multi-stem shrub with vivid winter berries and useful seasonal screening. Plant a compatible male nearby for fruit.',
    credit: 'David J. Stang · CC BY-SA 4.0', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Ilex_verticillata_7zz.jpg'
  },
  {
    id: 'viburnum', name: 'Arrowwood viburnum', latin: 'Viburnum dentatum',
    category: 'privacy', kind: 'Privacy · Native deciduous shrub', form: 'shrub',
    light: 'Sun to part shade', water: 'Moderate water', heightFt: 10, widthFt: 8,
    description: 'A dense, adaptable native hedge with spring flowers and berries for birds. Use several plants for a leafy screen.',
    credit: 'David J. Stang · CC BY-SA 4.0', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Viburnum_dentatum_24zz.jpg'
  }
];

const demos = {
  '07054': { id: 'parsippany', name: 'Parsippany–Troy Hills, NJ', badge: 'Parsippany · 07054', region: 'North Jersey · Mid-Atlantic' },
  '20420': { id: 'washington', name: 'Washington, DC', badge: 'Washington, DC demo · 20420', region: 'Washington, DC · Mid-Atlantic' }
};

const plantsByDemo = {
  parsippany: ['serviceberry', 'blueberry', 'strawberry', 'bergamot', 'susan', 'aster', 'cedar', 'holly', 'viburnum'],
  washington: ['allegheny', 'blueberry', 'pawpaw', 'mountainmint', 'susan', 'aster', 'holly', 'winterberry', 'viburnum']
};

const growthStages = [
  { name: 'Today', years: 0, description: 'New transplants. Each plant begins in an open spot estimated from your garden photo.' },
  { name: '1 year', years: 1, description: 'Perennials fill in quickly. Woody plants stay modest while their roots establish.' },
  { name: '3 years', years: 3, description: 'Flowering clumps widen, groundcover spreads, and shrubs gain more height and canopy.' },
  { name: '5 years', years: 5, description: 'An established concept with different mature forms and spacing for each recommended species.' }
];

const $ = function (selector) { return document.querySelector(selector); };
const $$ = function (selector) { return Array.from(document.querySelectorAll(selector)); };
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const state = {
  goal: 'all', location: '07054', demo: demos['07054'], region: 'North Jersey · Mid-Atlantic',
  photoUrl: '', photoName: '', analysis: null, lightClue: '', stage: 0, renderId: 0
};
const canvasAspect = 1.66;
const maskedPlantCache = new Map();
const plantImageCache = new Map();
let toastTimer = 0;
let photoLoadId = 0;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 3200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}

function normalizeZip(value) {
  const match = String(value).match(/(?:^|\b)(\d{5})(?:-\d{4})?(?:\b|$)/);
  return match ? match[1] : '';
}

function findDemo(value) {
  const zip = normalizeZip(value);
  if (demos[zip]) return { zip: zip, demo: demos[zip] };
  const normalized = String(value).toLowerCase();
  if (normalized.includes('parsippany')) return { zip: '07054', demo: demos['07054'] };
  if (normalized.includes('washington') || normalized.includes('district of columbia')) return { zip: '20420', demo: demos['20420'] };
  return { zip: zip, demo: null };
}

function detectBroadRegion(value) {
  const text = String(value).toLowerCase();
  const zip = normalizeZip(value);
  if (zip && zip.startsWith('0')) return 'Northeast';
  if (text.includes('new jersey') || text.includes(', nj') || /\bnj\b/.test(text)) return 'Northeast';
  if (text.includes('washington') || /\bdc\b/.test(text)) return 'Mid-Atlantic';
  if (text.includes('maryland') || /\bmd\b/.test(text) || text.includes('pennsylvania') || /\bpa\b/.test(text)) return 'Mid-Atlantic';
  return '';
}

function setLocation(value) {
  const trimmed = String(value || '').trim();
  const match = findDemo(trimmed);
  state.location = trimmed;
  state.demo = match.demo;
  state.region = match.demo ? match.demo.region : detectBroadRegion(trimmed);
  if (match.demo) $('#locationInput').value = match.zip;
  updateLocationDisplay();
  renderPlants();
}

function updateLocationDisplay() {
  const badge = $('#regionBadge');
  const hint = $('#locationHint');
  if (state.demo) {
    badge.textContent = state.demo.badge;
    hint.textContent = state.demo.id === 'washington'
      ? 'For this demo, 20420 is mapped to Washington, DC · matched on this device'
      : 'Parsippany-area native starter list · matched on this device';
  } else if (state.location && state.region) {
    badge.textContent = state.region + ' · broad match';
    hint.textContent = 'Broad regional match only. Enter 07054 or 20420 for the local demo recommendations.';
  } else if (state.location) {
    badge.textContent = 'Location not matched';
    hint.textContent = 'Try the Parsippany demo at 07054 or Washington, DC at 20420.';
  } else {
    badge.textContent = 'Choose a demo location';
    hint.textContent = 'Enter 07054 or 20420. ZIP matching happens on this device.';
  }
  $$('.demo-chip').forEach(function (button) {
    button.classList.toggle('selected', button.dataset.zip === (state.demo ? normalizeZip($('#locationInput').value) : ''));
  });
}

function currentPlants() {
  const ids = state.demo ? plantsByDemo[state.demo.id] || [] : [];
  const available = ids.map(function (id) {
    return plants.find(function (plant) { return plant.id === id; });
  }).filter(Boolean);
  if (state.goal === 'all') return available;
  return available.filter(function (plant) { return plant.category === state.goal; });
}

function getPhotoUrl(plant) {
  return 'assets/plants/' + encodeURIComponent(imageFiles[plant.id]);
}

function renderPlants() {
  const list = currentPlants();
  const goalNames = { all: 'all goals', fruit: 'fruit and food', flowers: 'flowers and pollinators', privacy: 'privacy and screening' };
  const locationText = state.demo ? state.demo.name : (state.region || 'your location');
  $('#plantsTitle').textContent = state.goal === 'all' ? 'Plants for your patch' : titleCase(goalNames[state.goal]);
  $('#resultsSubtitle').textContent = state.demo
    ? 'Locally native starter plants for ' + locationText + ', filtered for ' + goalNames[state.goal] + '. Check each card for light, water, mature size, and planting notes.'
    : 'Choose a demo location to see the complete verified native starter set for fruit, flowers, and privacy.';

  if (!list.length) {
    $('#plantGrid').innerHTML = '<div class="no-plants">Choose Parsippany 07054 or Washington, DC 20420 to load local native plant ideas.</div>';
    return;
  }

  $('#plantGrid').innerHTML = list.map(function (plant) {
    const photo = getPhotoUrl(plant);
    return '<article class="plant-card">' +
      '<div class="plant-photo"><img src="' + escapeHtml(photo) + '" alt="Real reference photo of ' + escapeHtml(plant.name) + ' (' + escapeHtml(plant.latin) + ')" loading="lazy" decoding="async" referrerpolicy="no-referrer">' +
      '<div class="plant-photo-fallback" hidden aria-hidden="true">✿</div><span class="sun-pill">☼ ' + escapeHtml(plant.light) + '</span></div>' +
      '<div class="plant-info"><div class="plant-kind">' + escapeHtml(plant.kind) + '</div><h3 class="plant-name">' + escapeHtml(plant.name) + '</h3><div class="plant-latin">' + escapeHtml(plant.latin) + '</div>' +
      '<p class="plant-desc">' + escapeHtml(plant.description) + '</p><div class="plant-meta"><span>↟ ' + escapeHtml(plant.water) + '</span><span>↕ ' + plant.heightFt + ' ft × ' + plant.widthFt + ' ft mature</span></div>' +
      '<div class="plant-photo-credit">Photo: ' + escapeHtml(plant.credit) + ' · <a href="' + escapeHtml(plant.source) + '" target="_blank" rel="noopener noreferrer">Photo source ↗</a> · <a href="' + escapeHtml(plant.licenseUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(plant.license) + '</a></div></div></article>';
  }).join('');
  $$('.plant-photo img').forEach(function (image) {
    image.addEventListener('error', function () {
      image.hidden = true;
      image.nextElementSibling.hidden = false;
    }, { once: true });
  });
}

function titleCase(value) {
  return value.split(' ').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(' ');
}

function isSupportedImage(file) {
  return Boolean(file && allowedImageTypes.has(String(file.type).toLowerCase()));
}

function handlePhoto(file) {
  if (!isSupportedImage(file)) {
    showToast('Choose a JPEG, PNG, or WebP photo.');
    return;
  }
  if (file.size > 25 * 1024 * 1024) {
    showToast('That photo is over 25 MB. Choose a smaller image to keep processing smooth.');
    return;
  }

  const requestId = ++photoLoadId;
  const nextUrl = URL.createObjectURL(file);
  const image = $('#previewImg');
  image.onload = function () {
    if (requestId !== photoLoadId) {
      URL.revokeObjectURL(nextUrl);
      return;
    }
    if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
    state.photoUrl = nextUrl;
    state.photoName = file.name || 'Pasted garden photo';
    state.analysis = analyzeGardenPhoto(image);
    state.lightClue = state.analysis.brightness < 0.36 ? 'darker photo' : 'brighter photo';
    $('#photoName').textContent = state.photoName;
    $('#photoClue').textContent = state.lightClue + (state.analysis.greenRatio > .2 ? ' · leafy color' : '');
    $('#uploadEmpty').classList.add('hidden');
    $('#photoPreview').classList.remove('hidden');
    if (!$('#visualizer').classList.contains('hidden')) renderVisualizer();
    showToast('Photo added. Its pixels stay on this device.');
  };
  image.onerror = function () {
    URL.revokeObjectURL(nextUrl);
    if (requestId === photoLoadId) showToast('This image could not be opened. Try a JPEG, PNG, or WebP photo.');
  };
  image.src = nextUrl;
}

function drawPhotoCover(context, image, width, height) {
  const targetRatio = width / height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  if (imageRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
}

function isGreenOrSoil(red, green, blue) {
  if (green > 50 && green > red * 1.06 && green > blue * 1.03) return 1;
  if (red > 75 && red > green * 1.04 && green > blue * 1.02 && blue < 185) return .55;
  return 0;
}

function analyzeGardenPhoto(image) {
  const width = 180;
  const height = 112;
  const sample = document.createElement('canvas');
  sample.width = width;
  sample.height = height;
  const context = sample.getContext('2d', { willReadFrequently: true });
  if (!context) return { groundY: .76, brightness: .5, greenRatio: 0, columns: [] };

  drawPhotoCover(context, image, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  let brightness = 0;
  let greenPixels = 0;
  let groundLine = .76;
  const rowScores = [];
  for (let y = 0; y < height; y += 1) {
    let rowTotal = 0;
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      rowTotal += isGreenOrSoil(red, green, blue);
      if (green > red * 1.06 && green > blue * 1.03 && green > 50) greenPixels += 1;
      brightness += (.2126 * red + .7152 * green + .0722 * blue) / 255;
    }
    rowScores.push(rowTotal / width);
  }

  // Use a low, persistent green/soil band as the likely planting surface.
  for (let y = 44; y < 89; y += 1) {
    const band = (rowScores[y] + rowScores[y + 1] + rowScores[y + 2] + rowScores[y + 3]) / 4;
    if (band > .25) {
      groundLine = y / height;
      break;
    }
  }

  const columns = [];
  for (let x = 8; x < width - 8; x += 2) {
    let vegetation = 0;
    let count = 0;
    const startY = Math.floor(groundLine * height);
    for (let y = startY; y < height - 2; y += 3) {
      for (let dx = -3; dx <= 3; dx += 2) {
        const index = (y * width + x + dx) * 4;
        vegetation += isGreenOrSoil(pixels[index], pixels[index + 1], pixels[index + 2]);
        count += 1;
      }
    }
    columns.push({ x: x / width, cover: count ? vegetation / count : 0, groundY: groundLine });
  }
  return { groundY: groundLine, brightness: brightness / (width * height), greenRatio: greenPixels / (width * height), columns: columns };
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function calculatePlantPositions(list, analysis) {
  const columns = analysis ? analysis.columns : [];
  const count = list.length;
  const points = [];
  for (let index = 0; index < count; index += 1) {
    const target = (index + 1) / (count + 1);
    let best = { x: target, cover: .5, groundY: analysis ? analysis.groundY : .76, score: -Infinity };
    columns.forEach(function (column) {
      if (Math.abs(column.x - target) > .16) return;
      if (points.some(function (point) { return Math.abs(point.x - column.x) < .12; })) return;
      const openSpaceScore = 1 - column.cover;
      const score = openSpaceScore - Math.abs(column.x - target) * .8;
      if (score > best.score) best = { x: column.x, cover: column.cover, groundY: column.groundY, score: score };
    });
    points.push({ x: clamp(best.x, .09, .91), y: clamp(best.groundY + .02, .70, .96), plant: list[index] });
  }
  return points;
}

function growthAmount(plant, stage) {
  const curves = {
    perennial: [.16, .54, .84, 1],
    groundcover: [.2, .55, .91, 1],
    shrub: [.13, .23, .43, .68],
    conifer: [.08, .16, .31, .49]
  };
  return curves[plant.form][stage];
}

function loadImage(url) {
  if (plantImageCache.has(url)) return plantImageCache.get(url);
  const request = new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () { resolve(image); };
    image.onerror = reject;
    image.src = url;
  });
  plantImageCache.set(url, request);
  return request;
}

function tracePlantShape(context, width, height, form) {
  context.beginPath();
  if (form === 'conifer') {
    context.moveTo(width * .5, 0);
    context.lineTo(width * .61, height * .16);
    context.lineTo(width * .55, height * .16);
    context.lineTo(width * .75, height * .34);
    context.lineTo(width * .65, height * .33);
    context.lineTo(width * .9, height * .56);
    context.lineTo(width * .76, height * .54);
    context.lineTo(width, height * .77);
    context.lineTo(width * .64, height * .76);
    context.lineTo(width * .62, height);
    context.lineTo(width * .38, height);
    context.lineTo(width * .36, height * .76);
    context.lineTo(0, height * .77);
    context.lineTo(width * .24, height * .54);
    context.lineTo(width * .1, height * .56);
    context.lineTo(width * .35, height * .33);
    context.lineTo(width * .25, height * .34);
    context.lineTo(width * .45, height * .16);
    context.lineTo(width * .39, height * .16);
  } else if (form === 'perennial') {
    context.moveTo(width * .45, height);
    context.quadraticCurveTo(width * .25, height * .78, width * .17, height * .6);
    context.quadraticCurveTo(width * .06, height * .45, width * .19, height * .3);
    context.quadraticCurveTo(width * .24, height * .07, width * .43, height * .18);
    context.quadraticCurveTo(width * .51, height * -.03, width * .62, height * .18);
    context.quadraticCurveTo(width * .89, height * .08, width * .83, height * .37);
    context.quadraticCurveTo(width * 1.02, height * .56, width * .77, height * .76);
    context.quadraticCurveTo(width * .63, height * .93, width * .57, height);
  } else if (form === 'groundcover') {
    context.ellipse(width * .5, height * .64, width * .5, height * .34, 0, 0, Math.PI * 2);
  } else {
    context.moveTo(width * .5, height);
    context.bezierCurveTo(width * .04, height * .89, width * .02, height * .39, width * .2, height * .26);
    context.bezierCurveTo(width * .29, height * .01, width * .48, height * .11, width * .53, height * .17);
    context.bezierCurveTo(width * .68, height * .02, width * .96, height * .23, width * .84, height * .43);
    context.bezierCurveTo(width * 1.02, height * .64, width * .82, height * .9, width * .5, height);
  }
  context.closePath();
}

function makeMaskedPlant(plant, photo) {
  if (!photo) return null;
  if (maskedPlantCache.has(plant.id)) return maskedPlantCache.get(plant.id);
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = 460;
  const context = canvas.getContext('2d');
  if (!context) return null;
  drawPhotoCover(context, photo, canvas.width, canvas.height);
  context.globalCompositeOperation = 'destination-in';
  tracePlantShape(context, canvas.width, canvas.height, plant.form);
  context.fill();
  context.globalCompositeOperation = 'source-over';
  maskedPlantCache.set(plant.id, canvas);
  return canvas;
}

function drawFallbackPlant(context, plant, x, groundY, width, height) {
  context.save();
  context.translate(x, groundY - height);
  context.fillStyle = plant.form === 'conifer' ? '#3d704d' : plant.category === 'flowers' ? '#67854b' : '#54784c';
  context.beginPath();
  tracePlantShape(context, width, height, plant.form);
  context.fill();
  if (plant.category === 'flowers') {
    context.fillStyle = plant.id === 'susan' ? '#f5c74a' : '#cc91be';
    for (let i = 0; i < 5; i += 1) {
      context.beginPath();
      context.arc(width * (.25 + i * .12), height * (.18 + (i % 2) * .09), width * .06, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.restore();
}

function drawPlant(context, plant, photo, position, stage, sceneWidth, sceneHeight) {
  const growth = growthAmount(plant, stage);
  const relativeHeight = plant.form === 'conifer'
    ? .14 + Math.min(plant.heightFt, 42) / 42 * .38
    : plant.form === 'shrub'
      ? .14 + Math.min(plant.heightFt, 24) / 24 * .28
      : plant.form === 'groundcover' ? .21 : .22 + Math.min(plant.heightFt, 6) / 6 * .18;
  const perspective = .82 + ((position.y - .70) / .26) * .2;
  const height = sceneHeight * relativeHeight * growth * perspective;
  const widthFloor = plant.form === 'groundcover' ? .72 : plant.form === 'perennial' ? .58 : .46;
  const widthCeiling = plant.form === 'perennial' ? 1.12 : 1.0;
  const matureWidthRatio = clamp(plant.widthFt / Math.max(plant.heightFt, 1), widthFloor, widthCeiling);
  const width = Math.max(20, height * matureWidthRatio);
  const x = position.x * sceneWidth;
  const groundY = position.y * sceneHeight;
  const shadowSize = width * (.48 + growth * .25);

  // A soft contact shadow grounds each plant on the detected planting surface.
  context.save();
  context.globalAlpha = .13 + growth * .13;
  context.fillStyle = '#18291c';
  context.shadowColor = '#172a1c88';
  context.shadowBlur = Math.max(4, width * .09);
  context.beginPath();
  context.ellipse(x + width * .04, groundY - 2, shadowSize * .5, Math.max(3, shadowSize * .11), 0, 0, Math.PI * 2);
  context.fill();
  context.restore();

  const masked = makeMaskedPlant(plant, photo);
  if (!masked) {
    drawFallbackPlant(context, plant, x, groundY, width, height);
    return;
  }

  // Later years fill out through species-specific widths and plant clusters,
  // rather than scaling a single sticker to the same mature size.
  const clusterOffsets = plant.form === 'perennial' && stage >= 2 ? [-.3, 0, .3] :
    plant.form === 'groundcover' && stage >= 1 ? [-.3, .28] : [0];
  clusterOffsets.forEach(function (offset, index) {
    const clusterScale = clusterOffsets.length === 1 ? 1 : (index === 1 && plant.form === 'perennial' ? 1 : .68);
    const clusterWidth = width * clusterScale;
    const clusterHeight = height * clusterScale;
    const clusterX = x + offset * width;
    context.save();
    context.globalAlpha = .91;
    context.filter = 'saturate(.9) contrast(.97)';
    context.drawImage(masked, clusterX - clusterWidth / 2, groundY - clusterHeight, clusterWidth, clusterHeight);
    context.restore();
  });
}

function getPlanPlants() {
  const list = currentPlants();
  if (!list.length) return [];
  if (state.goal !== 'all') return list.slice(0, 4);
  return ['fruit', 'flowers', 'privacy'].map(function (category) {
    return list.find(function (plant) { return plant.category === category; });
  }).filter(Boolean);
}

function drawPlanLabel(context, width, stage) {
  const scale = width / 1440;
  context.save();
  context.font = '700 ' + (13 * scale) + 'px Arial, sans-serif';
  context.fillStyle = '#fffdf0e8';
  context.beginPath();
  if (typeof context.roundRect === 'function') context.roundRect(18 * scale, 18 * scale, 168 * scale, 30 * scale, 15 * scale);
  else context.rect(18 * scale, 18 * scale, 168 * scale, 30 * scale);
  context.fill();
  context.fillStyle = '#46613f';
  context.fillText('FIELDNOTE  ·  ' + growthStages[stage].name.toUpperCase(), 31 * scale, 38 * scale);
  context.restore();
}

function drawPhotoCredits(context, width, height, list, photos) {
  const credited = list.filter(function (plant) { return photos[plant.id]; });
  if (!credited.length) return;
  const scale = width / 1440;
  const fontSize = 9 * scale;
  const lineHeight = 12 * scale;
  const padding = 8 * scale;
  const maxTextWidth = width - padding * 2;
  const lines = [];
  context.save();
  context.font = fontSize + 'px Arial, sans-serif';
  credited.forEach(function (plant) {
    const licenseReference = plant.licenseUrl.replace(/^https?:\/\//, '');
    const source = 'Photo: ' + plant.name + ' — ' + plant.credit + ' — ' + plant.license + ' (' + licenseReference + ') — Wikimedia Commons/File:' + encodeURIComponent(imageFiles[plant.id]) + ' — photo cropped and composited for this concept.';
    const words = source.split(' ');
    let line = '';
    words.forEach(function (word) {
      const candidate = line ? line + ' ' + word : word;
      if (line && context.measureText(candidate).width > maxTextWidth) {
        lines.push(line);
        line = word;
      } else line = candidate;
    });
    if (line) lines.push(line);
  });
  const bandHeight = lines.length * lineHeight + padding * 2;
  context.fillStyle = 'rgba(18, 39, 29, .84)';
  context.fillRect(0, height - bandHeight, width, bandHeight);
  context.fillStyle = 'rgba(255,255,245,.94)';
  context.textBaseline = 'top';
  lines.forEach(function (line, index) {
    context.fillText(line, padding, height - bandHeight + padding + index * lineHeight, maxTextWidth);
  });
  context.restore();
}

function paintGarden(context, width, height, photo, list, stage, analysis, photos) {
  drawPhotoCover(context, photo, width, height);
  const overlay = context.createLinearGradient(0, 0, 0, height);
  overlay.addColorStop(0, 'rgba(23,49,36,.05)');
  overlay.addColorStop(.58, 'rgba(27,48,33,0)');
  overlay.addColorStop(1, 'rgba(20,46,31,.12)');
  context.fillStyle = overlay;
  context.fillRect(0, 0, width, height);
  const positions = calculatePlantPositions(list, analysis).sort(function (a, b) { return a.y - b.y; });
  positions.forEach(function (position) {
    drawPlant(context, position.plant, photos[position.plant.id], position, stage, width, height);
  });
  drawPlanLabel(context, width, stage);
  drawPhotoCredits(context, width, height, list, photos);
}

async function renderGardenCanvas() {
  if (!state.photoUrl) return;
  const canvas = $('#gardenCanvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  const renderId = ++state.renderId;
  const width = 1440;
  const height = Math.round(width / canvasAspect);
  canvas.width = width;
  canvas.height = height;
  const list = getPlanPlants();
  try {
    const photoPromises = list.map(async function (plant) {
      try { return [plant.id, await loadImage(getPhotoUrl(plant))]; }
      catch { return [plant.id, null]; }
    });
    const garden = await loadImage(state.photoUrl);
    const plantPhotos = Object.fromEntries(await Promise.all(photoPromises));
    if (renderId !== state.renderId) return;
    paintGarden(context, width, height, garden, list, state.stage, state.analysis, plantPhotos);
    canvas.setAttribute('aria-label', 'Garden concept at ' + growthStages[state.stage].name + ' with ' + list.map(function (plant) { return plant.name; }).join(', '));
  } catch (error) {
    if (renderId === state.renderId) showToast('Could not create the garden concept. Try another garden photo.');
  }
}

function renderVisualizer() {
  const stage = growthStages[state.stage];
  $('#growthYear').textContent = stage.name;
  $('#growthDescription').textContent = stage.description;
  $('#growthSlider').value = state.stage;
  $$('.growth-tick').forEach(function (button) {
    button.classList.toggle('active', Number(button.dataset.stage) === state.stage);
  });
  $('#includedPlants').innerHTML = getPlanPlants().map(function (plant) {
    return '<span class="included-plant"><span>✳</span>' + escapeHtml(plant.name) + '</span>';
  }).join('');
  renderGardenCanvas();
}

function bindPhotoControls() {
  $('#choosePhoto').addEventListener('click', function () { $('#photoInput').click(); });
  $('#changePhoto').addEventListener('click', function () { $('#photoInput').click(); });
  $('#photoInput').addEventListener('change', function (event) {
    if (event.target.files && event.target.files[0]) handlePhoto(event.target.files[0]);
    event.target.value = '';
  });

  const dropOverlay = $('#dropOverlay');
  const dropZone = $('#dropZone');
  let dragDepth = 0;
  function containsFile(event) {
    return Array.from(event.dataTransfer ? event.dataTransfer.types : []).some(function (type) { return type.toLowerCase() === 'files'; });
  }
  document.addEventListener('dragenter', function (event) {
    if (!containsFile(event)) return;
    event.preventDefault();
    dragDepth += 1;
    dropOverlay.classList.add('active');
    dropZone.classList.add('dragging');
  });
  document.addEventListener('dragover', function (event) {
    if (!containsFile(event)) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  });
  document.addEventListener('dragleave', function (event) {
    if (!containsFile(event)) return;
    dragDepth = Math.max(0, dragDepth - 1);
    if (!dragDepth) {
      dropOverlay.classList.remove('active');
      dropZone.classList.remove('dragging');
    }
  });
  document.addEventListener('drop', function (event) {
    if (!containsFile(event)) return;
    event.preventDefault();
    dragDepth = 0;
    dropOverlay.classList.remove('active');
    dropZone.classList.remove('dragging');
    const files = Array.from(event.dataTransfer ? event.dataTransfer.files : []);
    const image = files.find(isSupportedImage);
    if (image) handlePhoto(image);
    else showToast('Drop a JPEG, PNG, or WebP photo.');
  });
  document.addEventListener('paste', function (event) {
    const items = Array.from(event.clipboardData ? event.clipboardData.items : []);
    const imageItem = items.find(function (item) { return allowedImageTypes.has(item.type.toLowerCase()); });
    const file = imageItem && imageItem.getAsFile();
    if (file) {
      event.preventDefault();
      handlePhoto(file);
    }
  });
}

function bindPlannerControls() {
  $$('.goal-chip').forEach(function (button) {
    button.addEventListener('click', function () {
      $$('.goal-chip').forEach(function (chip) { chip.classList.remove('selected'); });
      button.classList.add('selected');
      state.goal = button.dataset.goal;
      renderPlants();
    });
  });
  $$('.demo-chip').forEach(function (button) {
    button.addEventListener('click', function () { setLocation(button.dataset.zip); });
  });
  $('#locationInput').addEventListener('change', function (event) { setLocation(event.currentTarget.value); });
  $('#locationInput').addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    setLocation(event.currentTarget.value);
    event.currentTarget.blur();
  });
  $('#findPlants').addEventListener('click', function () {
    setLocation($('#locationInput').value);
    $('#plants').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!state.demo) showToast('Choose Parsippany 07054 or Washington, DC 20420 for the local plant demo.');
    else showToast('Showing local native ideas for ' + state.demo.name + '.');
  });
  $('#visualizeButton').addEventListener('click', function () {
    if (!state.photoUrl) {
      showToast('Add a garden photo to build a site-aware concept.');
      $('#photoInput').click();
      return;
    }
    $('#visualizer').classList.remove('hidden');
    renderVisualizer();
    $('#visualizer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#closeVisualizer').addEventListener('click', function () { $('#visualizer').classList.add('hidden'); });
  $('#growthSlider').addEventListener('input', function (event) {
    state.stage = Number(event.currentTarget.value);
    renderVisualizer();
  });
  $$('.growth-tick').forEach(function (button) {
    button.addEventListener('click', function () {
      state.stage = Number(button.dataset.stage);
      renderVisualizer();
    });
  });
  $('#downloadVisual').addEventListener('click', downloadConcept);
}

async function downloadConcept() {
  if (!state.photoUrl) {
    showToast('Add a garden photo before saving a concept.');
    return;
  }
  try {
    const list = getPlanPlants();
    const photoEntries = await Promise.all(list.map(async function (plant) {
      try { return [plant.id, await loadImage(getPhotoUrl(plant))]; }
      catch { return [plant.id, null]; }
    }));
    const photos = Object.fromEntries(photoEntries);
    const garden = await loadImage(state.photoUrl);
    const canvas = document.createElement('canvas');
    canvas.width = 2400;
    canvas.height = Math.round(canvas.width / canvasAspect);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable');
    paintGarden(context, canvas.width, canvas.height, garden, list, state.stage, state.analysis, photos);
    canvas.toBlob(function (blob) {
      if (!blob) {
        showToast('Could not save this concept image. Plant photos may be blocked by the browser.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'fieldnote-garden-' + growthStages[state.stage].years + '-years.png';
      link.click();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
      showToast('Garden concept saved as a PNG.');
    }, 'image/png');
  } catch (error) {
    showToast('Could not save the concept. Try a different photo or browser.');
  }
}

function bindDialog() {
  $('#howItWorks').addEventListener('click', function () { $('#infoDialog').showModal(); });
  $('#closeDialog').addEventListener('click', function () { $('#infoDialog').close(); });
  $('#gotIt').addEventListener('click', function () { $('#infoDialog').close(); });
  $('#infoDialog').addEventListener('click', function (event) {
    if (event.target === $('#infoDialog')) $('#infoDialog').close();
  });
}

function startApp() {
  bindPhotoControls();
  bindPlannerControls();
  bindDialog();
  setLocation('07054');
}

window.addEventListener('pagehide', function () {
  if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
});

startApp();
