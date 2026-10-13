# Yijie He — Personal website

Live website: **https://henohyj.github.io**  
Chinese version: **https://henohyj.github.io/zh/**

A bilingual portfolio about AI infrastructure, GPU kernels, inference systems, hardware design, and research. Built with plain HTML, CSS, and JavaScript, with no runtime dependencies or tracking.

## Update content

Edit `content.mjs`, then regenerate the pages:

```sh
node scripts/build.mjs
node scripts/check.mjs
```

Commit the generated HTML alongside the source changes. GitHub Pages serves the `main` branch from the repository root. `.nojekyll` keeps publication static.

## Local preview

```sh
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. The site contains an English and Chinese homepage, eight project pages in each language, and printable web resumes. The resume page supports the browser’s Print / Save as PDF command.

## Content sources

- Latest AI Infra resume, supplemented with earlier SDE and AI Infra versions supplied by the site owner.
- The owner’s technical project reports, used to keep benchmark descriptions within their measured scope.
- Public repositories: [2D Systolic Accelerator](https://github.com/HenoHyj/2D-Systolic-Accelerator) and [Neural ODE forecasting](https://github.com/HenoHyj/ECE228_Final_Project).
- [Medical computer vision publication](https://doi.org/10.1007/s10103-026-04843-2), with the author list confirmed in [PubMed](https://pubmed.ncbi.nlm.nih.gov/41784662/).

The current resume takes priority for dates and Qualcomm’s on-device AI infrastructure experience. Operator measurements are identified by workload; separate experiments are not added together. Original resume files, phone numbers, and private technical reports are not included in this repository.
