# Yijie He — Personal website

Live website: **https://henohyj.github.io**  
Chinese version: **https://henohyj.github.io/zh/**

A bilingual portfolio about ML systems and HPC, covering GPU kernel optimization, inference serving, hardware design, and research. Built with plain HTML, CSS, and JavaScript, with no runtime dependencies or tracking. A limited-palette cosmic silhouette illustration and a consistent set of blue project cards sit on a cream background.

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

Open http://127.0.0.1:4173. The site contains English and Chinese homepages, eight project pages in each language, and a résumé download page. `files/` contains the latest original English and Chinese AI Infra PDF résumés supplied by the owner. The homepage download link uses the current page's language.

## Content sources

- Latest AI Infra resume, supplemented with earlier SDE and AI Infra versions supplied by the site owner.
- The owner’s technical project reports, used to keep benchmark descriptions within their measured scope.
- Public repositories: [2D Systolic Accelerator](https://github.com/HenoHyj/2D-Systolic-Accelerator) and [Neural ODE forecasting](https://github.com/HenoHyj/ECE228_Final_Project).
- [Medical computer vision publication](https://doi.org/10.1007/s10103-026-04843-2), with the author list confirmed in [PubMed](https://pubmed.ncbi.nlm.nih.gov/41784662/).
- English terminology informed by official [ByteDance inference systems](https://joinbytedance.com/search/7667726338627356933), [Applied Compute research systems](https://jobs.ashbyhq.com/Applied%20Compute/16eb6620-ccd1-42fa-9890-34ba7cefbd86/), and [OpenAI inference performance](https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/) job descriptions. The descriptions do not imply experience beyond the owner's source materials.

The current resume takes priority for dates and Qualcomm’s on-device AI infrastructure experience. Operator measurements are identified by workload; separate experiments are not added together. Private technical reports are not included. Original PDF résumés are published at the owner's request and are preserved byte for byte.

The self-hosted font in `assets/fonts/portfolio-sans.woff2` is a subset of [Noto Sans SC](https://github.com/google/fonts/tree/main/ofl/notosanssc), covering the current website copy. Its SIL Open Font License is in `assets/fonts/OFL.txt`. If new characters are added, regenerate the subset or replace it with an expanded one; system fonts provide a fallback.

The original illustration in `assets/cosmic-silhouette.png` was generated for this website using the built-in image generation tool. Homepage cards use the same stencil chip mark; technical diagrams are reserved for project detail pages.
