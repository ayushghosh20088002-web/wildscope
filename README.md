# WildScope

A responsive, static HTML/CSS/JavaScript homepage for a public wildlife platform. It starts with India as its first region and is designed to grow into a global field guide for wildlife, photography, conservation and education.

## Preview

Open `index.html` in a browser. There are no build tools or paid services required. The Google Fonts link is optional; the page falls back to system fonts when offline.

## Photo credits and replacements

The homepage currently displays wildlife photographs hosted on Wikimedia Commons. Each photo has a visible photographer and license credit linking to its source. These images need an internet connection. To use your own photography later, put files in an `images/` folder, update the relevant `<img src>` in `index.html`, and keep meaningful alt text and any required attribution.

## Current interactions

- Responsive navigation with keyboard escape and accessible expanded state
- Wildlife group filters (including educational field notes)
- Live animal search across common/scientific names, aliases, range, habitat and diet
- Species results with field-guide facts, photo credits and reference links
- Photo identification suggestions using TensorFlow.js MobileNet in the browser
- India emergency notice linking to the Government of India's 112 service
- Photo contribution form with file checks and a local device preview
- Skip link, semantic landmarks, focus indicators and reduced-motion support

The finder currently contains four starter entries: Bengal tiger, Indian peafowl, Indian cobra and Asian elephant. Add new entries to the `animals` list in `script.js`, with a source for each fact, to expand the guide. The summaries are introductory, not exhaustive species monographs. Photo identification downloads TensorFlow.js and the MobileNet model on first use, then classifies the selected image in the browser. The model has general ImageNet labels rather than a wildlife-specific taxonomy, so results are suggestions and may not identify the species. The photo itself is not uploaded for analysis. Use an internet connection for the model download.

The contribution form only previews a file locally; it does not upload or save the image. Public contributions will need a backend, storage, moderation and clear privacy/consent rules. Avoid publishing exact locations of vulnerable wildlife. The India emergency banner links to the official 112 government service for immediate danger to people; wildlife rescue contacts vary by state. Add regional emergency guidance, citations and expert review before publishing detailed wildlife or snake-safety advice.
