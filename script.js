const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
    menuButton.focus();
  }
});

const cards = [...document.querySelectorAll('.feature-card')];
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const emptyMessage = document.querySelector('.filter-empty');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#site-search');
const searchMessage = document.querySelector('.search-message');
const animalResults = document.querySelector('#animal-results');
let activeFilter = 'all';

const animals = [
  {
    name: 'Bengal tiger', scientific: 'Panthera tigris tigris', group: 'Mammal · Cat family',
    aliases: 'tiger bengal tiger big cat', range: 'India, Bangladesh, Nepal, Bhutan and parts of China.',
    habitat: 'Forests, grasslands and mangrove landscapes; tigers need cover, water and prey.',
    diet: 'Carnivore. Tigers mainly hunt large hoofed mammals, including deer and wild pigs.',
    snapshot: 'Each tiger has a distinctive stripe pattern. The photo shown here was taken at a zoological park in Tamil Nadu.',
    status: 'Endangered · IUCN global assessment (2022)', statusUrl: 'https://doi.org/10.2305/IUCN.UK.2022-1.RLTS.T15955A214862019.en',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bengal_Tigers.jpg/960px-Bengal_Tigers.jpg',
    imageAlt: 'A group of Bengal tigers at Arignar Anna Zoological Park, Tamil Nadu',
    imageCredit: 'Shridhar.c j · CC BY 4.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Bengal_Tigers.jpg',
    factsSource: 'https://animaldiversity.org/accounts/Panthera_tigris/'
  },
  {
    name: 'Indian peafowl', scientific: 'Pavo cristatus', group: 'Bird · Pheasant family',
    aliases: 'peafowl peacock peahen bird', range: 'Native to the Indian subcontinent and nearby parts of South Asia.',
    habitat: 'Often found in open and deciduous forests, with roost trees, food and water nearby.',
    diet: 'Omnivore. Eats a mix of seeds, grains, insects and other small animals.',
    snapshot: 'The familiar “peacock” is the male; peafowl is the name for the species and includes females, called peahens.',
    status: 'Least Concern · IUCN global status', statusUrl: 'https://www.bto.org/learn/about-birds/birdfacts/indian-peafowl',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/007_Indian_peafowl.jpg/960px-007_Indian_peafowl.jpg',
    imageAlt: 'Indian peafowl standing outdoors',
    imageCredit: 'Drsssuresh1961 · CC0', imageSource: 'https://commons.wikimedia.org/wiki/File:007_Indian_peafowl.jpg',
    factsSource: 'https://animaldiversity.org/accounts/Pavo_cristatus/'
  },
  {
    name: 'Indian cobra', scientific: 'Naja naja', group: 'Reptile · Cobra family',
    aliases: 'cobra snake indian cobra spectacled cobra', range: 'Across much of the Indian subcontinent, including India and neighboring countries.',
    habitat: 'Found in several landscapes, including forests and cultivated areas.',
    diet: 'Carnivore. Its prey includes rodents, lizards and frogs.',
    snapshot: 'A cobra’s raised hood is a recognizable warning display. Observe snakes from a safe distance and never try to handle one.',
    status: '', statusUrl: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Indian_Cobra.JPG/960px-Indian_Cobra.JPG',
    imageAlt: 'Indian cobra with its hood open',
    imageCredit: 'Pavan Kumar N · CC BY-SA 3.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Indian_Cobra.JPG',
    factsSource: 'https://animaldiversity.org/accounts/Naja_naja/'
  },
  {
    name: 'Asian elephant', scientific: 'Elephas maximus', group: 'Mammal · Elephant family',
    aliases: 'elephant asian elephant asiatic elephant', range: 'Patches of South and Southeast Asia, including India.',
    habitat: 'Tropical grasslands, evergreen and deciduous forests, and scrub forests.',
    diet: 'Herbivore. Eats many kinds of plants, including grasses, leaves, fruit and bark.',
    snapshot: 'Asian elephants live in female-led family groups; adult males are often alone or in smaller groups.',
    status: 'Endangered · IUCN global assessment (2020)', statusUrl: 'https://doi.org/10.2305/IUCN.UK.2020-3.RLTS.T7140A45818198.en',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Elephant_District_of_Wayanad%2C_Kerala%2C_India.jpg/960px-Elephant_District_of_Wayanad%2C_Kerala%2C_India.jpg',
    imageAlt: 'Wild Asian elephant near Wayanad, Kerala',
    imageCredit: 'M V Satheesh Kumar · CC0', imageSource: 'https://commons.wikimedia.org/wiki/File:Elephant_District_of_Wayanad,_Kerala,_India.jpg',
    factsSource: 'https://animaldiversity.org/accounts/Elephas_maximus/'
  }
];

animals.push({"name":"Indian leopard","scientific":"Panthera pardus","group":"Mammal · Cat family","aliases":"leopard panther spotted cat big cat","range":"Leopards live across parts of Africa and Asia, including India.","habitat":"Uses a range of habitats, including forests and rocky landscapes.","diet":"Carnivore. Hunts mammals and may also take birds and reptiles.","snapshot":"A leopard’s rosette markings help distinguish it from the tiger’s stripes. Leopards may carry prey to a secluded feeding spot.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Panthera_pardus/"},{"name":"Indian rhinoceros","scientific":"Rhinoceros unicornis","group":"Mammal · Rhinoceros family","aliases":"rhino one horned rhinoceros greater one horned rhino","range":"Today, wild populations occur in northeastern India and parts of southern Nepal.","habitat":"Wet grasslands and nearby rivers, pools and wetlands are important habitats.","diet":"Herbivore. Grasses are a major food; it also eats other plants, fruit and twigs.","snapshot":"Its upper lip can curl around plant stems. Rhinos often wallow in water and mud.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Rhinoceros_unicornis/"},{"name":"Sloth bear","scientific":"Melursus ursinus","group":"Mammal · Bear family","aliases":"bear slothbear honey bear","range":"Found in India and neighboring parts of South Asia.","habitat":"Lives in tropical forests and grasslands, often in drier forest landscapes.","diet":"Omnivore. Eats insects such as termites, as well as fruit, flowers, leaves and honey.","snapshot":"Long claws and a flexible snout help it open insect nests and feed on termites.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Melursus_ursinus/"},{"name":"Snow leopard","scientific":"Panthera uncia","group":"Mammal · Cat family","aliases":"snow leopard ghost of the mountains himalayan leopard","range":"In India, snow leopards live in the northern Himalayan mountain region.","habitat":"High, rugged mountain landscapes with steep rocky slopes and alpine terrain.","diet":"Carnivore. Common prey includes wild mountain sheep and goats such as bharal and ibex.","snapshot":"Its long, thick tail helps with balance on steep ground and can wrap around the body in cold weather.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://snowleopard.org/our-work/where-we-work/india/","factsLabel":"Snow Leopard Trust"},{"name":"Red panda","scientific":"Ailurus fulgens","group":"Mammal · Ailuridae","aliases":"red panda lesser panda panda himalayan panda","range":"Found in the Himalaya, including Sikkim in India, and neighboring regions.","habitat":"Temperate mountain forests with bamboo in the understory.","diet":"Mostly bamboo leaves, with other plant foods and occasional eggs.","snapshot":"The long, ringed tail helps it balance while moving through trees.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Ailurus_fulgens/"},{"name":"Gharial","scientific":"Gavialis gangeticus","group":"Reptile · Crocodilian","aliases":"fish eating crocodile gharial crocodile","range":"Found in river systems of the northern Indian subcontinent.","habitat":"Freshwater rivers, especially deep bends and sandy riverbanks.","diet":"Adults feed mainly on fish; young gharials also eat small animals such as insects and frogs.","snapshot":"The adult’s long, narrow snout is adapted for catching fish. Males develop a rounded growth at the snout tip.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Gavialis_gangeticus/"},{"name":"Ganges river dolphin","scientific":"Platanista gangetica","group":"Mammal · River dolphin","aliases":"river dolphin susu ganga dolphin freshwater dolphin","range":"Lives in freshwater river systems including the Ganges, Brahmaputra and Meghna basins.","habitat":"Freshwater rivers and connected tributaries; river bends and confluences can provide useful feeding areas.","diet":"Carnivore. Eats fish and other aquatic animals, including crustaceans.","snapshot":"In murky river water, it uses echolocation to find prey. It must surface regularly to breathe.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Platanista_gangetica/"},{"name":"Lion-tailed macaque","scientific":"Macaca silenus","group":"Mammal · Old World monkey","aliases":"lion tailed macaque monkey liontail macaque","range":"Endemic to the Western Ghats of India.","habitat":"Evergreen and semi-evergreen rainforests and monsoon forests.","diet":"Omnivore, with fruit as a major part of its diet; also eats vegetation and some small animals.","snapshot":"A gray mane frames its face, and a dark tuft at the end of its tail gives it its name.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Macaca_silenus/"},{"name":"Chital","scientific":"Axis axis","group":"Mammal · Deer family","aliases":"spotted deer axis deer cheetal","range":"Native to India and Sri Lanka, with introduced populations elsewhere.","habitat":"Uses open grassland alongside nearby forest cover.","diet":"Herbivore. Feeds on grasses and other plant foods, including fallen fruit and leaves.","snapshot":"Its white spots remain visible through adulthood, unlike the spots of many deer fawns.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Axis_axis/"},{"name":"Sambar deer","scientific":"Rusa unicolor","group":"Mammal · Deer family","aliases":"sambar sambar deer rusa deer","range":"Native across South and Southeast Asia, including India.","habitat":"Lives in forested hills, thick forests, scrub and swamp forests.","diet":"Herbivore. Browses on leaves, fruit, grasses, bark, herbs and buds.","snapshot":"Sambar deer are capable swimmers; males grow antlers that are shed and replaced.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Rusa_unicolor/"},{"name":"Dhole","scientific":"Cuon alpinus","group":"Mammal · Wild dog family","aliases":"dhole asiatic wild dog indian wild dog whistling dog","range":"Occurs in forest landscapes across parts of South and Southeast Asia, including India.","habitat":"Uses forests, clearings, riverbeds and other wooded landscapes.","diet":"Carnivore. Packs hunt mammals such as deer and wild pigs; they also eat smaller prey.","snapshot":"Dholes live and hunt in social packs and cooperate to care for pups.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Cuon_alpinus/"},{"name":"Indian pangolin","scientific":"Manis crassicaudata","group":"Mammal · Pangolin family","aliases":"pangolin scaly anteater indian scaly anteater","range":"Occurs across much of India and neighboring parts of South Asia.","habitat":"Uses varied habitats where it can find ants, termites, water and suitable ground for burrows.","diet":"Insectivore. Feeds mainly on ants and termites.","snapshot":"Its keratin scales cover the body, and it can curl into a tight ball when threatened.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Manis_crassicaudata/"},{"name":"Indian flying fox","scientific":"Pteropus giganteus","group":"Mammal · Fruit bat family","aliases":"flying fox fruit bat giant fruit bat bat","range":"Found across tropical South and Central Asia, including India.","habitat":"Roosts in large groups in trees, often near water.","diet":"Feeds on fruit, nectar and flowers.","snapshot":"By carrying and dropping seeds, flying foxes can help spread plants across the landscape.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Pteropus_giganteus/"},{"name":"Great hornbill","scientific":"Buceros bicornis","group":"Bird · Hornbill family","aliases":"great hornbill hornbill bird","range":"Lives in parts of South and Southeast Asia, including forests in India.","habitat":"Mainly inhabits tall evergreen forests with large old trees for nesting.","diet":"Mostly fruit, especially figs; it also eats some small animals.","snapshot":"Great hornbills help disperse seeds, including seeds from large-fruited trees.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Buceros_bicornis/"},{"name":"Asiatic lion","scientific":"Panthera leo persica","group":"Mammal · Cat family","aliases":"asiatic lion indian lion gir lion big cat","range":"The remaining wild population lives in and around the Gir region of Gujarat, India.","habitat":"Uses scrubland and teak forest in the Gir landscape.","diet":"Carnivore. Lions hunt hoofed mammals and other available prey.","snapshot":"Asiatic lions are the only wild lion population in Asia.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Panthera_leo/","factsLabel":"Animal Diversity Web"});function updateCards() {
  let visibleCount = 0;
  cards.forEach((card) => {
    const categoryMatches = activeFilter === 'all' || card.dataset.category.split(/\s+/).includes(activeFilter);
    const visible = categoryMatches;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  emptyMessage.hidden = visibleCount !== 0;
  if (activeFilter) searchMessage.textContent = '';
}

function animalEntryMarkup(animal) {
  return `
    <article class="animal-entry">
      <div class="animal-entry-photo">${animal.image ? `<img src="${animal.image}" alt="${animal.imageAlt}" loading="lazy"><a href="${animal.imageSource}" target="_blank" rel="noreferrer">Photo: ${animal.imageCredit} ↗</a>` : '<div class="animal-photo-pending" role="img" aria-label="Wildlife photograph coming soon">Wildlife photo coming soon</div>'}</div>
      <div class="animal-entry-info">
        <p class="animal-entry-group">${animal.group}</p>
        <h3>${animal.name}</h3><p class="animal-scientific"><i>${animal.scientific}</i></p>
        <dl class="animal-facts">
          <div><dt>Range</dt><dd>${animal.range}</dd></div>
          <div><dt>Habitat</dt><dd>${animal.habitat}</dd></div>
          <div><dt>Diet</dt><dd>${animal.diet}</dd></div>
          <div><dt>Did you know?</dt><dd>${animal.snapshot}</dd></div>
          ${animal.status ? `<div><dt>Conservation</dt><dd>${animal.status} · <a href="${animal.statusUrl}" target="_blank" rel="noreferrer">Source ↗</a></dd></div>` : ''}
        </dl>
        <p class="animal-sources">Species facts: <a href="${animal.factsSource}" target="_blank" rel="noreferrer">${animal.factsLabel || 'Animal Diversity Web'} ↗</a></p>
      </div>
    </article>`;
}

function renderAnimalResults(query) {
  const normalized = query.trim().toLowerCase();
  animalResults.hidden = !normalized;
  if (!normalized) {
    searchMessage.textContent = '';
    animalResults.replaceChildren();
    return;
  }

  const matches = animals.filter((animal) => Object.values(animal).join(' ').toLowerCase().includes(normalized));
  searchMessage.textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? 'animal' : 'animals'} found in the field guide.`
    : 'No match yet. Try tiger, leopard, rhino, bear, snow leopard, red panda, gharial, river dolphin or macaque.';

  if (!matches.length) {
    animalResults.innerHTML = '<p class="no-animal-result">No animal matched that search. Try <button type="button" data-query="tiger">tiger</button>, <button type="button" data-query="rhino">rhino</button>, <button type="button" data-query="red panda">red panda</button> or <button type="button" data-query="gharial">gharial</button>.</p>';
  } else {
    animalResults.innerHTML = matches.map(animalEntryMarkup).join('');
  }

  animalResults.querySelectorAll('[data-query]').forEach((button) => {
    button.addEventListener('click', () => {
      searchInput.value = button.dataset.query;
      renderAnimalResults(button.dataset.query);
      searchInput.focus();
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    updateCards();
  });
});

searchInput.addEventListener('input', () => {
  renderAnimalResults(searchInput.value);
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderAnimalResults(searchInput.value);
  animalResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const photoForm = document.querySelector('#photo-form');
const photoFile = document.querySelector('#photo-file');
const photoPreview = document.querySelector('#photo-preview');
const uploadStatus = document.querySelector('#upload-status');
const identifyButton = document.querySelector('#identify-photo');
const identificationStatus = document.querySelector('#identification-status');
const identificationResults = document.querySelector('#identification-results');
let previewObjectUrl = '';
let classifierPromise = null;

function loadExternalScript(src, globalName) {
  if (window[globalName]) return Promise.resolve(window[globalName]);
  if (!window.wildScopeScriptPromises) window.wildScopeScriptPromises = new Map();
  const promises = window.wildScopeScriptPromises;
  if (promises.has(src)) return promises.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => window[globalName] ? resolve(window[globalName]) : reject(new Error('The image model library did not load.'));
    script.onerror = () => reject(new Error('Could not download the image model library. Check your internet connection and try again.'));
    document.head.append(script);
  });
  promises.set(src, promise);
  return promise;
}

async function getImageClassifier() {
  if (!classifierPromise) {
    classifierPromise = (async () => {
      await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js', 'tf');
      await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js', 'mobilenet');
      return window.mobilenet.load({ version: 2, alpha: 0.5 });
    })();
    classifierPromise.catch(() => { classifierPromise = null; });
  }
  return classifierPromise;
}

function guideEntryForPrediction(label) {
  const normalized = label.toLowerCase();
  if (normalized.includes('peacock') || normalized.includes('peafowl')) return animals.find((animal) => animal.name === 'Indian peafowl');
  if (normalized.includes('cobra')) return animals.find((animal) => animal.name === 'Indian cobra');
  if (normalized.includes('tiger') && !normalized.includes('tiger cat')) return animals.find((animal) => animal.name === 'Bengal tiger');
  if (normalized.includes('elephant') && /indian|asian|asiatic/.test(normalized)) return animals.find((animal) => animal.name === 'Asian elephant');
  return null;
}

identifyButton.addEventListener('click', async () => {
  const file = photoFile.files[0];
  if (!file) {
    identificationStatus.textContent = 'Choose a photo first.';
    return;
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
    identificationStatus.textContent = 'Choose a JPG, PNG or WebP image up to 10 MB.';
    return;
  }

  identifyButton.disabled = true;
  identificationResults.replaceChildren();
  identificationStatus.textContent = 'Loading the on-device image model. The first use needs an internet connection to download it; your photo stays in this browser.';
  let imageUrl = '';
  try {
    const classifier = await getImageClassifier();
    imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    await image.decode();
    identificationStatus.textContent = 'Looking for visual clues…';
    const predictions = await classifier.classify(image, 5);
    const bestGuideMatch = predictions.map((prediction) => ({ prediction, animal: guideEntryForPrediction(prediction.className) })).find((match) => match.animal && match.prediction.probability >= 0.12);
    const labels = document.createElement('p');
    labels.className = 'prediction-labels';
    labels.textContent = `Model suggestions: ${predictions.slice(0, 3).map((item) => `${item.className} (${Math.round(item.probability * 100)}%)`).join(' · ')}`;
    identificationResults.append(labels);
    if (bestGuideMatch) {
      const suggestion = document.createElement('p');
      suggestion.className = 'possible-match';
      suggestion.textContent = `Possible WildScope guide match: ${bestGuideMatch.animal.name}. This is an AI suggestion, not a confirmed identification.`;
      identificationResults.append(suggestion);
      identificationResults.insertAdjacentHTML('beforeend', animalEntryMarkup(bestGuideMatch.animal));
    } else {
      const note = document.createElement('p');
      note.className = 'possible-match';
      note.textContent = 'I couldn’t match this photo confidently to a species in the current field guide. Try a clearer photo, or search the guide by name.';
      identificationResults.append(note);
    }
    identificationStatus.textContent = 'Analysis finished on this device. The photo was not uploaded.';
  } catch (error) {
    identificationStatus.textContent = `${error.message} Your photo has not been uploaded.`;
  } finally {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    identifyButton.disabled = false;
  }
});

photoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const file = photoFile.files[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    uploadStatus.textContent = 'Please choose a JPG, PNG or WebP image.';
    photoFile.value = '';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    uploadStatus.textContent = 'That image is larger than 10 MB. Choose a smaller photo.';
    photoFile.value = '';
    return;
  }

  if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
  previewObjectUrl = URL.createObjectURL(file);
  photoPreview.replaceChildren();
  const image = document.createElement('img');
  image.src = previewObjectUrl;
  image.alt = photoForm.elements.caption.value.trim() || 'Your selected wildlife photo';
  const details = document.createElement('div');
  const caption = document.createElement('strong');
  caption.textContent = photoForm.elements.caption.value.trim();
  const region = document.createElement('small');
  region.textContent = photoForm.elements.region.value.trim() || 'Region not provided';
  details.append(caption, region);
  photoPreview.append(image, details);
  photoPreview.hidden = false;
  uploadStatus.textContent = 'Preview ready on this device. Nothing has been uploaded or saved; online submissions will be added after WildScope has secure storage and review.';
});

photoFile.addEventListener('change', () => {
  const file = photoFile.files[0];
  identifyButton.disabled = !file;
  if (file) uploadStatus.textContent = `${file.name} selected. Choose “Preview contribution” to see it here.`;
  identificationResults.replaceChildren();
  identificationStatus.textContent = '';
});
