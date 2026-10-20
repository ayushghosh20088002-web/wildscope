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
    aliases: 'tiger bengal tiger big cat', range: 'India: distributed from the Himalayas to the southern Western Ghats, and from Rajasthan to north-east India.',
    habitat: 'Forests, grasslands and mangrove landscapes; tigers need cover, water and prey.',
    diet: 'Carnivore. Tigers mainly hunt large hoofed mammals, including deer and wild pigs.',
    snapshot: 'Each tiger has a distinctive stripe pattern. The photo shown here was taken at a zoological park in Tamil Nadu.',
    status: 'Endangered · IUCN global assessment (assessed 2021; published 2022)', statusUrl: 'https://doi.org/10.2305/IUCN.UK.2022-1.RLTS.T15955A214862019.en',
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
    status: 'Least Concern · IUCN global assessment (2025)', statusUrl: 'https://datazone.birdlife.org/species/factsheet/indian-peafowl-pavo-cristatus',
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
    status: 'Endangered · IUCN global assessment (assessed 2019; published 2020)', statusUrl: 'https://doi.org/10.2305/IUCN.UK.2020-3.RLTS.T7140A45818198.en',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Elephant_District_of_Wayanad%2C_Kerala%2C_India.jpg/960px-Elephant_District_of_Wayanad%2C_Kerala%2C_India.jpg',
    imageAlt: 'Wild Asian elephant near Wayanad, Kerala',
    imageCredit: 'M V Satheesh Kumar · CC0', imageSource: 'https://commons.wikimedia.org/wiki/File:Elephant_District_of_Wayanad,_Kerala,_India.jpg',
    factsSource: 'https://animaldiversity.org/accounts/Elephas_maximus/'
  }
];

animals.push({"name":"Indian leopard","scientific":"Panthera pardus","group":"Mammal · Cat family","aliases":"leopard panther spotted cat big cat","range":"Leopards live across parts of Africa and Asia, including India.","habitat":"Uses a range of habitats, including forests and rocky landscapes.","diet":"Carnivore. Hunts mammals and may also take birds and reptiles.","snapshot":"A leopard’s rosette markings help distinguish it from the tiger’s stripes. Leopards may carry prey to a secluded feeding spot.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Panthera_pardus/"},{"name":"Indian rhinoceros","scientific":"Rhinoceros unicornis","group":"Mammal · Rhinoceros family","aliases":"rhino one horned rhinoceros greater one horned rhino","range":"Today, wild populations occur in northeastern India and parts of southern Nepal.","habitat":"Wet grasslands and nearby rivers, pools and wetlands are important habitats.","diet":"Herbivore. Grasses are a major food; it also eats other plants, fruit and twigs.","snapshot":"Its upper lip can curl around plant stems. Rhinos often wallow in water and mud.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Rhinoceros_unicornis/"},{"name":"Sloth bear","scientific":"Melursus ursinus","group":"Mammal · Bear family","aliases":"bear slothbear honey bear","range":"Found in India and neighboring parts of South Asia.","habitat":"Lives in tropical forests and grasslands, often in drier forest landscapes.","diet":"Omnivore. Eats insects such as termites, as well as fruit, flowers, leaves and honey.","snapshot":"Long claws and a flexible snout help it open insect nests and feed on termites.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Melursus_ursinus/"},{"name":"Snow leopard","scientific":"Panthera uncia","group":"Mammal · Cat family","aliases":"snow leopard ghost of the mountains himalayan leopard","range":"In India, snow leopards live in the northern Himalayan mountain region.","habitat":"High, rugged mountain landscapes with steep rocky slopes and alpine terrain.","diet":"Carnivore. Common prey includes wild mountain sheep and goats such as bharal and ibex.","snapshot":"Its long, thick tail helps with balance on steep ground and can wrap around the body in cold weather.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://snowleopard.org/our-work/where-we-work/india/","factsLabel":"Snow Leopard Trust"},{"name":"Red panda","scientific":"Ailurus fulgens","group":"Mammal · Ailuridae","aliases":"red panda lesser panda panda himalayan panda","range":"Found in the Himalaya, including Sikkim in India, and neighboring regions.","habitat":"Temperate mountain forests with bamboo in the understory.","diet":"Mostly bamboo leaves, with other plant foods and occasional eggs.","snapshot":"The long, ringed tail helps it balance while moving through trees.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Ailurus_fulgens/"},{"name":"Gharial","scientific":"Gavialis gangeticus","group":"Reptile · Crocodilian","aliases":"fish eating crocodile gharial crocodile","range":"Found in river systems of the northern Indian subcontinent.","habitat":"Freshwater rivers, especially deep bends and sandy riverbanks.","diet":"Adults feed mainly on fish; young gharials also eat small animals such as insects and frogs.","snapshot":"The adult’s long, narrow snout is adapted for catching fish. Males develop a rounded growth at the snout tip.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Gavialis_gangeticus/"},{"name":"Ganges river dolphin","scientific":"Platanista gangetica","group":"Mammal · River dolphin","aliases":"river dolphin susu ganga dolphin freshwater dolphin","range":"Lives in freshwater river systems including the Ganges, Brahmaputra and Meghna basins.","habitat":"Freshwater rivers and connected tributaries; river bends and confluences can provide useful feeding areas.","diet":"Carnivore. Eats fish and other aquatic animals, including crustaceans.","snapshot":"In murky river water, it uses echolocation to find prey. It must surface regularly to breathe.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Platanista_gangetica/"},{"name":"Lion-tailed macaque","scientific":"Macaca silenus","group":"Mammal · Old World monkey","aliases":"lion tailed macaque monkey liontail macaque","range":"Endemic to the Western Ghats of India.","habitat":"Evergreen and semi-evergreen rainforests and monsoon forests.","diet":"Omnivore, with fruit as a major part of its diet; also eats vegetation and some small animals.","snapshot":"A gray mane frames its face, and a dark tuft at the end of its tail gives it its name.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Macaca_silenus/"},{"name":"Chital","scientific":"Axis axis","group":"Mammal · Deer family","aliases":"spotted deer axis deer cheetal","range":"Native to India and Sri Lanka, with introduced populations elsewhere.","habitat":"Uses open grassland alongside nearby forest cover.","diet":"Herbivore. Feeds on grasses and other plant foods, including fallen fruit and leaves.","snapshot":"Its white spots remain visible through adulthood, unlike the spots of many deer fawns.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Axis_axis/"},{"name":"Sambar deer","scientific":"Rusa unicolor","group":"Mammal · Deer family","aliases":"sambar sambar deer rusa deer","range":"Native across South and Southeast Asia, including India.","habitat":"Lives in forested hills, thick forests, scrub and swamp forests.","diet":"Herbivore. Browses on leaves, fruit, grasses, bark, herbs and buds.","snapshot":"Sambar deer are capable swimmers; males grow antlers that are shed and replaced.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Rusa_unicolor/"},{"name":"Dhole","scientific":"Cuon alpinus","group":"Mammal · Wild dog family","aliases":"dhole asiatic wild dog indian wild dog whistling dog","range":"Occurs in forest landscapes across parts of South and Southeast Asia, including India.","habitat":"Uses forests, clearings, riverbeds and other wooded landscapes.","diet":"Carnivore. Packs hunt mammals such as deer and wild pigs; they also eat smaller prey.","snapshot":"Dholes live and hunt in social packs and cooperate to care for pups.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Cuon_alpinus/"},{"name":"Indian pangolin","scientific":"Manis crassicaudata","group":"Mammal · Pangolin family","aliases":"pangolin scaly anteater indian scaly anteater","range":"Occurs across much of India and neighboring parts of South Asia.","habitat":"Uses varied habitats where it can find ants, termites, water and suitable ground for burrows.","diet":"Insectivore. Feeds mainly on ants and termites.","snapshot":"Its keratin scales cover the body, and it can curl into a tight ball when threatened.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Manis_crassicaudata/"},{"name":"Indian flying fox","scientific":"Pteropus medius","group":"Mammal · Fruit bat family","aliases":"flying fox fruit bat giant fruit bat bat","range":"Found across tropical South and Central Asia, including India.","habitat":"Roosts in large groups in trees, often near water.","diet":"Feeds on fruit, nectar and flowers.","snapshot":"By carrying and dropping seeds, flying foxes can help spread plants across the landscape.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Pteropus_giganteus/"},{"name":"Great hornbill","scientific":"Buceros bicornis","group":"Bird · Hornbill family","aliases":"great hornbill hornbill bird","range":"Lives in parts of South and Southeast Asia, including forests in India.","habitat":"Mainly inhabits tall evergreen forests with large old trees for nesting.","diet":"Mostly fruit, especially figs; it also eats some small animals.","snapshot":"Great hornbills help disperse seeds, including seeds from large-fruited trees.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Buceros_bicornis/"},{"name":"Asiatic lion","scientific":"Panthera leo persica","group":"Mammal · Cat family","aliases":"asiatic lion indian lion gir lion big cat","range":"The remaining wild population lives in and around the Gir region of Gujarat, India.","habitat":"Uses scrubland and teak forest in the Gir landscape.","diet":"Carnivore. Lions hunt hoofed mammals and other available prey.","snapshot":"Asiatic lions are the only wild lion population in Asia.","status":"","statusUrl":"","image":"","imageAlt":"","imageCredit":"","imageSource":"","factsSource":"https://animaldiversity.org/accounts/Panthera_leo/","factsLabel":"Animal Diversity Web"});function updateCards() {
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

animals.push(
  {
    name: 'Great Indian bustard', scientific: 'Ardeotis nigriceps', group: 'Bird · Bustard family',
    aliases: 'great indian bustard godawan bustard',
    range: 'Resident in India and Pakistan; its remaining strongholds include dry grasslands in western India.',
    habitat: 'Dry tropical grasslands; arable land is used at the margins of its habitat.',
    diet: 'Omnivore. Eats insects and other small animals, as well as seeds; the balance varies with season.',
    snapshot: 'Insects are important during the monsoon, while seeds form a larger part of its diet in the driest months.',
    status: 'Critically Endangered · IUCN global assessment (2018)', statusUrl: 'https://datazone.birdlife.org/species/factsheet/great-indian-bustard-ardeotis-nigriceps',
    image: '', imageAlt: '', imageCredit: '', imageSource: '',
    factsSource: 'https://www.britannica.com/animal/great-Indian-bustard', factsLabel: 'Encyclopaedia Britannica'
  },
  {
    name: 'White-rumped vulture', scientific: 'Gyps bengalensis', group: 'Bird · Vulture family',
    aliases: 'white rumped vulture vulture gyps bengalensis',
    range: 'Occurs across parts of South Asia, including India; BirdLife records it as resident in India.',
    habitat: 'Uses plains and some hilly regions, including light woodland, open areas, villages and cities.',
    diet: 'Scavenger. Feeds on fresh and putrid carrion.',
    snapshot: 'White-rumped vultures are social and can gather in large groups at feeding sites.',
    status: 'Critically Endangered · IUCN global assessment (2021)', statusUrl: 'https://datazone.birdlife.org/species/factsheet/white-rumped-vulture-gyps-bengalensis',
    image: '', imageAlt: '', imageCredit: '', imageSource: '',
    factsSource: 'https://datazone.birdlife.org/species/factsheet/white-rumped-vulture-gyps-bengalensis', factsLabel: 'BirdLife DataZone'
  },
  {
    name: 'Purple frog', scientific: 'Nasikabatrachus sahyadrensis', group: 'Amphibian · Nasikabatrachidae',
    aliases: 'purple frog pig nosed frog nasikabatrachus sahyadrensis',
    range: 'Known from the Western Ghats in Kerala and Tamil Nadu, India.',
    habitat: 'A burrowing frog of the Western Ghats; it spends most of its life underground.',
    diet: 'Feeds mainly on termites and other small invertebrates.',
    snapshot: 'It emerges above ground for a short breeding period during the monsoon.',
    status: 'Near Threatened · IUCN global assessment (assessed 2020; published 2022)', statusUrl: 'https://www.iucnredlist.org/species/58051/166098621',
    image: '', imageAlt: '', imageCredit: '', imageSource: '',
    factsSource: 'https://www.edgeofexistence.org/species/purple-frog/', factsLabel: 'ZSL EDGE of Existence'
  },
  {
    name: 'Indian star tortoise', scientific: 'Geochelone elegans', group: 'Reptile · Tortoise family',
    aliases: 'indian star tortoise star tortoise geochelone elegans',
    range: 'Native to India, Pakistan and Sri Lanka, with separate populations across its range.',
    habitat: 'Scrub forests, grasslands and coastal scrub in arid and semi-arid regions; also uses some agricultural landscapes.',
    diet: 'Mostly plant foods, including grasses, succulent plants, fruit and fallen flowers; it may also scavenge animal matter.',
    snapshot: 'Its domed shell has distinctive yellow star-like markings.',
    status: 'Vulnerable · IUCN global assessment (2016)', statusUrl: 'https://iucn-tftsg.org/cbftt/species-accounts/geochelone-elegans-106/',
    image: '', imageAlt: '', imageCredit: '', imageSource: '',
    factsSource: 'https://iucn-tftsg.org/cbftt/species-accounts/geochelone-elegans-106/', factsLabel: 'IUCN Tortoise and Freshwater Turtle Specialist Group'
  }
);

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

function missingAnimalFields(animal) {
  return [
    !animal.status && 'conservation status',
    !animal.image && 'photo',
    !animal.habitat && 'habitat',
    !animal.range && 'range',
    !animal.diet && 'diet'
  ].filter(Boolean);
}

let animalSearchTimer = 0;
let animalSearchRequest = 0;
let animalSearchController = null;
let animalSearchTimeout = 0;

function renderAnimalResults(query) {
  const normalized = query.trim().toLowerCase();
  const queryTerms = externalQueryTerms(query);
  const searchableQuery = queryTerms.join(' ');
  const requestId = ++animalSearchRequest;
  window.clearTimeout(animalSearchTimer);
  window.clearTimeout(animalSearchTimeout);
  if (animalSearchController) animalSearchController.abort();
  animalSearchController = null;

  animalResults.hidden = !normalized;
  if (!normalized) {
    searchMessage.textContent = '';
    animalResults.replaceChildren();
    return;
  }

  if (!searchableQuery) {
    searchMessage.textContent = 'Search by an animal name, not photo or license details.';
    animalResults.innerHTML = '<p class="no-animal-result">Enter an animal name to search the field guide.</p>';
    return;
  }

  const matches = animals.filter((animal) =>
    [
      animal.name,
      animal.scientific,
      animal.aliases,
      animal.range,
      animal.habitat,
      animal.diet,
      animal.snapshot
    ].join(' ').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchableQuery)
  );
  const incompleteMatches = matches.filter((animal) => missingAnimalFields(animal).length > 0);
  if (matches.length && incompleteMatches.length === 0) {
    searchMessage.textContent = matches.length + (matches.length === 1 ? ' local animal' : ' local animals') + ' found in the field guide.';
    animalResults.innerHTML = matches.map(animalEntryMarkup).join('');
    return;
  }

  const controller = new AbortController();
  let timedOut = false;
  animalSearchController = controller;
  animalSearchTimeout = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 15000);

  if (matches.length) {
    searchMessage.textContent = matches.length + (matches.length === 1 ? ' local animal' : ' local animals') + ' found in the field guide.';
    animalResults.innerHTML = matches.map(animalEntryMarkup).join('') +
      (incompleteMatches.length
        ? '<div class="external-reference-results" role="status">Loading unverified external references for missing local details…</div>'
        : '');
  } else {
    searchMessage.textContent = 'No local match. Searching Wikipedia and iNaturalist…';
    animalResults.innerHTML = '<p class="no-animal-result" role="status">Searching Wikipedia and iNaturalist for unverified external references…</p>';
  }

  if (!matches.length || incompleteMatches.length) {
    animalSearchTimer = window.setTimeout(() => {
      searchExternalReferences(query, incompleteMatches, requestId, controller.signal, () => timedOut)
        .catch((error) => {
          if (requestId !== animalSearchRequest || error.name === 'AbortError') return;
          searchMessage.textContent = 'External lookup failed. Local guide entries, if any, remain unchanged.';
          const results = animalResults.querySelector('.external-reference-results');
          if (results) results.innerHTML = '<p class="no-animal-result">External references could not be loaded. Please try again later.</p>';
          else animalResults.innerHTML = '<p class="no-animal-result">External references could not be loaded. Please try again later.</p>';
        })
        .finally(() => {
          if (requestId === animalSearchRequest) {
            window.clearTimeout(animalSearchTimeout);
            animalSearchTimeout = 0;
            animalSearchController = null;
          }
        });
    }, 400);
  } else {
    window.clearTimeout(animalSearchTimeout);
    animalSearchTimeout = 0;
    animalSearchController = null;
  }
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`External lookup failed (${response.status}).`);
  return response.json();
}

function safeExternalUrl(value, allowedHosts) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !allowedHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return '';
    return url.href;
  } catch {
    return '';
  }
}

function shortenExternalText(value, limit = 650) {
  const text = String(value || '').trim();
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;
}

function normalizedExternalText(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function externalQueryTerms(query) {
  const stopWords = new Set(['a', 'an', 'and', 'animal', 'animals', 'for', 'in', 'of', 'or', 'the', 'to', 'wildlife']);
  const metadataTerms = new Set([
    'attribution', 'by', 'cc', 'copyright', 'credit', 'credits', 'image', 'images',
    'license', 'licenses', 'licence', 'licences', 'nc', 'nd', 'photo', 'photograph',
    'photographs', 'photographer', 'photographers', 'photos', 'sa'
  ]);
  return normalizedExternalText(query).split(/\s+/)
    .filter((term) => term && !stopWords.has(term) && !metadataTerms.has(term) && !/^\d+$/.test(term));
}

function externalRelevance(query, title, details = '') {
  const terms = externalQueryTerms(query);
  const normalizedQuery = terms.join(' ');
  const normalizedTitle = normalizedExternalText(title);
  if (!normalizedTitle || !terms.length) return 0;

  const normalizedDetails = normalizedExternalText(details);
  const titleWords = new Set(normalizedTitle.split(/\s+/));
  const detailsWords = new Set(normalizedDetails.split(/\s+/));
  const matchingTitleTerms = terms.filter((term) => titleWords.has(term)).length;
  const titleCoverage = matchingTitleTerms / terms.length;
  const exactPhrase = normalizedTitle.includes(normalizedQuery);
  const detailsCoverage = terms.filter((term) => detailsWords.has(term)).length / terms.length;
  const detailsPhrase = normalizedDetails.includes(normalizedQuery);
  const scientificTitle = /^[A-Z][a-z]+(?:\s+[a-z][a-z-]+){1,2}$/.test(String(title).trim());
  const distinctiveTerms = terms.filter((term) => term.length > 2 && ![
    'african', 'american', 'asian', 'black', 'brown', 'common', 'eastern', 'european',
    'greater', 'indian', 'lesser', 'northern', 'red', 'southern', 'western', 'white', 'wild'
  ].includes(term));
  const hasTitleAnimalMatch = titleCoverage === 1 ||
    (detailsPhrase && distinctiveTerms.some((term) => titleWords.has(term)));
  const scientificNameSupported = scientificTitle && detailsPhrase;
  if (!hasTitleAnimalMatch && !scientificNameSupported) return 0;
  if (titleCoverage < 1 && !detailsPhrase) return 0;

  const biologySignals = [
    'conservation', 'diet', 'ecology', 'endangered', 'extinct', 'habitat', 'mammal',
    'native', 'population', 'predator', 'prey', 'range', 'species', 'subspecies',
    'taxonomy', 'threatened', 'vulnerable', 'wildlife'
  ];
  const biologicalEvidence = biologySignals.filter((signal) =>
    new RegExp(`\\b${signal}\\b`).test(normalizedDetails)
  ).length;
  const commercialTitle = /\b(tours?|tourism|safaris?|travel|holidays?|vacations?|packages?|bookings?|operators?|agencies|resorts?|lodges?|hotels?|tickets?|adventures?|excursions?|cruises?)\b/.test(normalizedTitle);
  const commercialDescription = /\b(restaurant chain|fast food|fast casual|franchise|tour operator|travel agency|book now|booking packages?)\b/.test(normalizedDetails);
  if ((commercialTitle || commercialDescription) && biologicalEvidence < 2) return 0;

  return (exactPhrase ? 80 : 0) + titleCoverage * 60 + detailsCoverage * 12 + (detailsPhrase ? 20 : 0);
}

async function fetchWikipediaReferences(query, signal) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} animal`,
    gsrnamespace: '0',
    gsrlimit: '10',
    prop: 'extracts|info|pageimages|pageprops',
    exintro: '1',
    explaintext: '1',
    inprop: 'url',
    piprop: 'thumbnail',
    pithumbsize: '500',
    format: 'json',
    origin: '*'
  });
  const data = await fetchJson(`https://en.wikipedia.org/w/api.php?${params}`, signal);
  if (!data || typeof data !== 'object' || !data.query || typeof data.query !== 'object') {
    throw new Error('Wikipedia returned an invalid search response.');
  }
  const pages = data.query.pages;
  if (pages !== undefined && (!pages || typeof pages !== 'object' || Array.isArray(pages))) {
    throw new Error('Wikipedia returned an invalid page list.');
  }
  const seen = new Set();
  const relevantPages = Object.values(pages || {})
    .filter((page) => page && typeof page === 'object' && !Array.isArray(page))
    .map((page) => ({ page, relevance: externalRelevance(query, page.title, page.extract) }))
    .filter(({ page, relevance }) => page && typeof page.title === 'string' && typeof page.extract === 'string' &&
      page.extract.trim() && relevance > 0 && !Object.prototype.hasOwnProperty.call(page.pageprops || {}, 'disambiguation') &&
      safeExternalUrl(page.fullurl, ['wikipedia.org']))
    .sort((a, b) => b.relevance - a.relevance || a.page.index - b.page.index)
    .filter(({ page }) => {
      const key = normalizedExternalText(page.title);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const exactTitleMatches = relevantPages.filter(({ page }) =>
    normalizedExternalText(page.title) === normalizedExternalText(query)
  );
  return (exactTitleMatches.length ? exactTitleMatches : relevantPages)
    .slice(0, 3)
    .map(({ page }) => page);
}

async function fetchINaturalistReferences(query, signal) {
  const params = new URLSearchParams({ q: query, per_page: '20', locale: 'en', order_by: 'observations_count' });
  const data = await fetchJson(`https://api.inaturalist.org/v1/taxa?${params}`, signal);
  if (!data || typeof data !== 'object' || !Array.isArray(data.results)) {
    throw new Error('iNaturalist returned an invalid taxa response.');
  }
  const taxa = data.results.filter((taxon) => taxon && taxon.is_active !== false);
  const seen = new Set();
  return taxa
    .map((taxon) => ({
      taxon,
      relevance: externalRelevance(
        query,
        `${taxon.preferred_common_name || ''} ${taxon.name || ''}`,
        taxon.wikipedia_url || ''
      )
    }))
    .filter(({ taxon, relevance }) => taxon.id && relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || (b.taxon.observations_count || 0) - (a.taxon.observations_count || 0))
    .filter(({ taxon }) => {
      const key = String(taxon.id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3)
    .map(({ taxon }) => taxon);
}

function wikipediaReferenceMarkup(page) {
  const pageUrl = safeExternalUrl(page.fullurl, ['wikipedia.org']);
  const imageUrl = safeExternalUrl(page.thumbnail?.source, ['wikimedia.org']);
  return `<article class="external-animal-result">${imageUrl ? `<img src="${imageUrl}" alt="" loading="lazy">` : ''}<div><p class="external-result-label">UNVERIFIED EXTERNAL REFERENCE · WIKIPEDIA</p><h3>${escapeHTML(page.title)}</h3><p>${escapeHTML(shortenExternalText(page.extract))}</p>${pageUrl ? `<a href="${pageUrl}" target="_blank" rel="noreferrer">Read Wikipedia source ↗</a><p class="wikipedia-license">This shortened text excerpt is from <a href="${pageUrl}" target="_blank" rel="noreferrer">the Wikipedia article</a>. Wikipedia text is generally available under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>; check the article for exceptions. This text license does not cover images, whose reuse terms vary by file.</p>` : ''}</div></article>`;
}

function iNaturalistReferenceMarkup(taxon) {
  const taxonUrl = `https://www.inaturalist.org/taxa/${encodeURIComponent(taxon.id || '')}`;
  const photoId = taxon.default_photo?.id;
  const photoUrl = safeExternalUrl(taxon.default_photo?.medium_url || taxon.default_photo?.square_url, [
    'inaturalist.org',
    'inaturalist-open-data.s3.amazonaws.com'
  ]);
  const photoSourceUrl = photoId ? `https://www.inaturalist.org/photos/${encodeURIComponent(photoId)}` : '';
  const statusValues = (Array.isArray(taxon.conservation_statuses) ? taxon.conservation_statuses : [])
    .map((status) => status.status_name || status.iucn?.name || status.status || status.name)
    .filter(Boolean);
  const statusMarkup = statusValues.length
    ? `<p>Conservation status (unverified): ${escapeHTML(statusValues.join(', '))}</p>`
    : '';
  const attribution = taxon.default_photo?.attribution
    ? `<p>Photo attribution: ${escapeHTML(taxon.default_photo.attribution)}</p>`
    : '';

  return `<article class="external-animal-result">${photoUrl ? `<img src="${photoUrl}" alt="${escapeHTML(taxon.preferred_common_name || taxon.name || 'Wildlife photo')}" loading="lazy">` : ''}<div><p class="external-result-label">UNVERIFIED EXTERNAL REFERENCE · INATURALIST</p><h3>${escapeHTML(taxon.preferred_common_name || taxon.name || 'Taxon result')}</h3><p><i>${escapeHTML(taxon.name || '')}</i></p>${statusMarkup}${attribution}${photoSourceUrl ? `<a href="${photoSourceUrl}" target="_blank" rel="noreferrer">View photo and attribution ↗</a><br>` : ''}<a href="${taxonUrl}" target="_blank" rel="noreferrer">Open iNaturalist taxon ↗</a></div></article>`;
}

function externalSourceMarkup(label, result, markup) {
  if (result.status === 'rejected') {
    if (result.reason?.name === 'AbortError') return '';
    return `<p class="no-animal-result">${label} is unavailable right now. Local guide information has not been changed.</p>`;
  }
  if (!result.value.length) return `<p class="no-animal-result">No relevant ${label} reference found.</p>`;
  return result.value.map(markup).join('');
}

async function searchExternalReferences(query, localMatches, requestId, signal, didTimeOut) {
  const lookups = localMatches.length
    ? localMatches.map(async (animal) => {
      const [wikipedia, iNaturalist] = await Promise.allSettled([
        fetchWikipediaReferences(animal.name, signal),
        fetchINaturalistReferences(animal.name, signal)
      ]);
      return { animal, missing: missingAnimalFields(animal), wikipedia, iNaturalist };
    })
    : [Promise.allSettled([
      fetchWikipediaReferences(query, signal),
      fetchINaturalistReferences(query, signal)
    ]).then(([wikipedia, iNaturalist]) => ({ animal: null, missing: [], wikipedia, iNaturalist }))];
  const references = await Promise.all(lookups);
  if (requestId !== animalSearchRequest) return;

  const results = animalResults.querySelector('.external-reference-results');
  if (signal.aborted && didTimeOut()) {
    searchMessage.textContent = 'External lookup timed out. Local guide entries remain unchanged.';
    const message = '<p class="no-animal-result">The external sources took too long to respond. Please try again later.</p>';
    if (results) results.innerHTML = message;
    else animalResults.innerHTML = message;
    return;
  }

  const hasResults = references.some(({ wikipedia, iNaturalist }) =>
    (wikipedia.status === 'fulfilled' && wikipedia.value.length) ||
    (iNaturalist.status === 'fulfilled' && iNaturalist.value.length)
  );
  const hasFailures = references.some(({ wikipedia, iNaturalist }) =>
    wikipedia.status === 'rejected' || iNaturalist.status === 'rejected'
  );
  searchMessage.textContent = hasResults
    ? 'External references loaded. They are unverified and do not replace local guide information.'
    : hasFailures
      ? 'Some external sources are unavailable. Local guide information remains unchanged.'
      : 'No relevant external references found.';

  const referenceMarkup = references.map(({ animal, missing, wikipedia, iNaturalist }) => {
    const heading = animal
      ? `<h3>${escapeHTML(animal.name)} · missing locally: ${escapeHTML(missing.join(', '))}</h3>`
      : '<h3>External search results</h3>';
    return `<section class="external-reference-group">${heading}<div class="external-results-note">Unverified external reference. Results are ranked by animal or topic name and need review. A habitat or diet keyword match does not verify that an animal lives there or eats it; nothing here has been checked or copied into the local animal entry.</div>${externalSourceMarkup('Wikipedia', wikipedia, wikipediaReferenceMarkup)}${externalSourceMarkup('iNaturalist', iNaturalist, iNaturalistReferenceMarkup)}</section>`;
  }).join('');
  const output = referenceMarkup || '<p class="no-animal-result">No external results are available for this search.</p>';
  if (results) results.innerHTML = output;
  else animalResults.innerHTML = output;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}  filterButtons.forEach((button) => {
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
let identificationRequestId = 0;
let identificationInProgress = false;

function waitForImageReady(image, timeoutMs = 15000) {
  const imageError = () => new Error('The selected image could not be loaded. Please choose a valid image and try again.');
  const isReady = () => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
  if (isReady()) return Promise.resolve();
  if (image.complete) return Promise.reject(imageError());

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      window.clearTimeout(timeout);
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
    const handleLoad = () => {
      cleanup();
      if (isReady()) resolve();
      else reject(imageError());
    };
    const handleError = () => {
      cleanup();
      reject(imageError());
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Loading the selected image timed out. Please try again.'));
    }, timeoutMs);

    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);
    if (isReady()) handleLoad();
    else if (image.complete) handleError();
  });
}

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
  }).catch((error) => {
    promises.delete(src);
    throw error;
  });
  promises.set(src, promise);
  return promise;
}

async function getImageClassifier() {
  if (!classifierPromise) {
    const loadPromise = (async () => {
      await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js', 'tf');
      await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js', 'mobilenet');
      return window.mobilenet.load({ version: 2, alpha: 0.5 });
    })();
    classifierPromise = loadPromise;
    loadPromise.catch(() => {
      if (classifierPromise === loadPromise) classifierPromise = null;
    });
  }
  return classifierPromise;
}

function waitForImageClassifier(promise, timeoutMs = 120000) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error('Model loading timed out after 2 minutes. The existing load may still be pending; wait and retry, or reload this page if it remains stuck.'));
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
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
  if (identificationInProgress) return;
  const file = photoFile.files[0];
  if (!file) {
    identificationStatus.textContent = 'Choose a photo first.';
    return;
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
    identificationStatus.textContent = 'Choose a JPG, PNG or WebP image up to 10 MB.';
    return;
  }

  const requestId = ++identificationRequestId;
  identificationInProgress = true;
  identifyButton.disabled = true;
  identificationResults.replaceChildren();
  identificationStatus.textContent = 'Loading the on-device image model. First use may take longer while it downloads and initializes; please wait. Your photo stays in this browser and is not uploaded.';
  let imageUrl = '';
  try {
    const classifier = await waitForImageClassifier(getImageClassifier());
    if (requestId !== identificationRequestId) return;
    imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    await waitForImageReady(image);
    if (requestId !== identificationRequestId) return;
    identificationStatus.textContent = 'Model ready. Analyzing the photo on this device…';
    const predictions = await classifier.classify(image, 5);
    if (requestId !== identificationRequestId) return;
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
    if (requestId === identificationRequestId) {
      identificationStatus.textContent = `${error.message} Your photo has not been uploaded.`;
    }
  } finally {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (requestId === identificationRequestId) {
      identificationInProgress = false;
      identifyButton.disabled = !photoFile.files[0];
    }
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
  identificationRequestId++;
  identificationInProgress = false;
  identifyButton.disabled = !file;
  if (file) uploadStatus.textContent = `${file.name} selected. Choose “Preview contribution” to see it here.`;
  identificationResults.replaceChildren();
  identificationStatus.textContent = '';
});
