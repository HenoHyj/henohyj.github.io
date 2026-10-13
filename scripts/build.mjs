import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { profile, experience, projects, skills } from '../content.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const origin = 'https://henohyj.github.io';
const e = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const t = (v, lang) => typeof v === 'object' ? v[lang] : v;
const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const upArrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const ui = {
 en: { work:'Work', experience:'Experience', about:'About', contact:'Contact', resume:'Résumé', skip:'Skip to content', menu:'Menu', selected:'Selected work', selectedIntro:'Some problems I’ve been working on.', more:'More work', detail:'View project', all:'All projects', back:'Back to all work', what:'What I work with', aboutHeading:'A little about me.', education:'Education', masters:'M.S. Computer Engineering', bachelors:'B.S. Computer Engineering', expected:'Expected May 2027', bachelorDates:'Sep 2021 — Jun 2025', mastersDates:'Sep 2025 — May 2027', contactHeading:'Let’s talk.', contactText:'For engineering opportunities, research, or a project you’d like to discuss.', footer:'© 2026 Yijie He', print:'Print / save as PDF', overview:'Overview', related:'Next project', expIntro:'Industry, research, and the work in between.', details:'Technical details', results:'Results & scope' },
 zh: { work:'项目', experience:'经历', about:'关于', contact:'联系', resume:'简历', skip:'跳转到正文', menu:'菜单', selected:'精选项目', selectedIntro:'最近在做的一些技术工作。', more:'更多项目', detail:'查看项目', all:'全部项目', back:'返回项目列表', what:'技术与工具', aboutHeading:'关于我。', education:'教育经历', masters:'计算机工程硕士', bachelors:'计算机工程本科', expected:'预计 2027 年 5 月毕业', bachelorDates:'2021.09 — 2025.06', mastersDates:'2025.09 — 2027.05', contactHeading:'聊聊吧。', contactText:'欢迎联系我讨论工程机会、研究，或一个想一起做的项目。', footer:'© 2026 贺逸杰', print:'打印 / 保存为 PDF', overview:'概览', related:'下一个项目', expIntro:'实习、研究，以及其中的技术工作。', details:'技术细节', results:'结果与测试范围' },
};
const base = lang => lang === 'zh' ? '/zh/' : '/';
const projectUrl = (project, lang) => `${base(lang)}work/${project.slug}/`;
const label = (txt, x, y) => `<text x="${x}" y="${y}">${e(txt)}</text>`;

function diagram(type, lang='en') {
 let parts = '';
 const line = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}H${x2}"/>`;
 if (type === 'array' || type === 'attention') {
   parts += label(type === 'array' ? 'SYSTOLIC ARRAY' : 'EXACT / SUMMARY', 22, 31);
   for (let r=0;r<4;r++) for(let c=0;c<7;c++) parts += `<rect class="${(c+r)%4===0 ? 'fill' : c<3?'tint':''}" x="${23+c*35}" y="${52+r*31}" width="25" height="22" rx="2"/>`;
   parts += `<path d="M22 186h232"/>` + label(type === 'array' ? 'WEIGHT ↔ OUTPUT STATIONARY' : 'INT8 QK  /  FP8 PV',22,213);
 } else if (type === 'routing') {
   parts += label('WORK-AWARE ROUTING',22,31);
   parts += '<rect x="22" y="98" width="74" height="40" rx="3"/><path d="M96 118h30V65h27M126 118h27M126 118v53h27"/>';
   parts += label('REQUEST',32,122);
   [48,101,154].forEach((y,i)=>{parts+=`<rect class="${i===1?'tint':''}" x="153" y="${y}" width="102" height="34" rx="3"/>`+label('GPU REPLICA',167,y+21)});
 } else if (type === 'precision') {
   parts += label('LOW-PRECISION DATA',22,31);
   [65,134].forEach((y,r)=>{for(let i=0;i<8;i++)parts+=`<rect class="${r?'fill':'tint'}" x="${22+i*(r?17:29)}" y="${y}" width="${r?12:22}" height="31" rx="2"/>`;});
   parts += label('BF16',22,117)+label('FP4 → TENSOR CORE',22,189);
 } else if (type === 'loop') {
   parts += label('MEASURED ITERATION',22,31);
   const cells=[['IMPLEMENT',22,57],['VALIDATE',153,57],['MEASURE',153,150],['REVIEW',22,150]];
   cells.forEach(([txt,x,y])=>{parts+=`<rect class="${txt==='MEASURE'?'tint':''}" x="${x}" y="${y}" width="104" height="38" rx="3"/>`+label(txt,x+13,y+24)});
   parts+='<path d="M126 76h27M205 95v55M153 169h-27M74 150V95"/>';
 } else if(type==='series') {
   parts+=label('IRREGULAR OBSERVATIONS',22,31)+'<path d="M22 182h240M22 50v132"/><path class="curve" d="M26 151C47 151 46 75 76 75S107 160 132 144 145 71 176 72 213 155 253 98"/>';
   [[26,151],[61,83],[105,123],[130,145],[177,72],[240,117]].forEach(([x,y])=>{parts+=`<circle class="fill" cx="${x}" cy="${y}" r="4"/>`});
   parts+=label('TIME →',211,211);
 } else if(type==='vision') {
   parts+=label('SEGMENT / TRACK / DETECT',22,31)+'<rect x="22" y="50" width="234" height="135" rx="4"/><path class="tint" d="M76 102 94 78 145 83 166 113 148 151 104 155 72 129Z"/><path stroke-dasharray="4 4" d="M63 69h111v96H63Z"/><circle class="fill" cx="110" cy="112" r="5"/><path d="M110 112h77M182 107l5 5-5 5"/>';
 } else {
   parts+=label('RETRIEVAL → RESPONSE',22,31);
   ['QUERY','CONTEXT','RESPONSE'].forEach((txt,i)=>{parts+=`<rect class="${i===1?'tint':''}" x="${22+i*81}" y="84" width="70" height="50" rx="3"/>`+label(txt,26+i*81,113);if(i<2)parts+=`<path d="M${92+i*81} 109h11"/>`});
   parts+=label('API  /  CACHE  /  DATA',22,185);
 }
 return `<svg class="diagram" viewBox="0 0 280 232" aria-hidden="true" focusable="false">${parts}</svg>`;
}

function header(lang, route='') {
 const u=ui[lang], other=lang==='en'?'zh':'en';
 const otherUrl=`${base(other)}${route}`;
 return `<a class="skip" href="#main">${u.skip}</a><header class="site-header"><div class="container header-inner"><a class="wordmark" href="${base(lang)}" aria-label="Yijie He home">yh<span>.</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">${u.menu}<span aria-hidden="true">＋</span></button><nav class="site-nav" id="navigation" aria-label="${lang==='en'?'Main navigation':'主导航'}"><a href="${base(lang)}#work">${u.work}</a><a href="${base(lang)}#experience">${u.experience}</a><a href="${base(lang)}#about">${u.about}</a><a href="${base(lang)}resume/">${u.resume}</a><a class="language" href="${otherUrl}" lang="${other==='zh'?'zh-CN':'en'}" hreflang="${other==='zh'?'zh-CN':'en'}">${other==='zh'?'中文':'EN'}</a></nav></div></header>`;
}

function footer(lang) {
 return `<footer class="site-footer container"><span>${ui[lang].footer}</span><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub ${upArrow}</a><a href="mailto:${profile.email}">${lang==='en'?'Email':'邮件'} ${upArrow}</a></footer>`;
}

function shell(lang, route, title, description, content, extra='') {
 const url=origin+base(lang)+route;
 const other=lang==='en'?'zh':'en';
 return `<!doctype html>
<html lang="${lang==='zh'?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f7f6f2"><title>${e(title)}</title><meta name="description" content="${e(description)}"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${origin}/${route}"><link rel="alternate" hreflang="zh-CN" href="${origin}/zh/${route}"><link rel="alternate" hreflang="x-default" href="${origin}/${route}"><meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/social.png"><meta property="og:locale" content="${lang==='en'?'en_US':'zh_CN'}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css"><script src="/assets/main.js" defer></script>${extra}</head><body>${header(lang,route)}${content}${footer(lang)}</body></html>`;
}

function metrics(project,lang) {
 if(!project.metrics.length)return '';
 return `<dl class="metrics">${project.metrics.map(m=>{const [number,label]=t(m,lang);return `<div><dt>${e(label)}</dt><dd>${e(number)}</dd></div>`}).join('')}</dl>`;
}
function externalLinks(project,lang) {
 return (project.links||[]).map(l=>`<a class="text-link" href="${e(l.url)}" target="_blank" rel="noopener noreferrer">${e(t(l.label,lang))} ${upArrow}</a>`).join('');
}
function experienceRows(lang,expanded=false) {
 return experience.map((exp,i)=>`<article class="experience-row"><div class="experience-meta"><p class="mono">${e(t(exp.date,lang))}</p><h3>${e(exp.company)}</h3><p class="muted">${e(t(exp.place,lang))}</p></div><div><h4>${e(t(exp.role,lang))}</h4><p>${e(t(exp.description,lang))}</p>${expanded?`<ul>${exp.details.map(d=>`<li>${e(t(d,lang))}</li>`).join('')}</ul>`:`<details><summary>${ui[lang].details}<span aria-hidden="true">＋</span></summary><ul>${exp.details.map(d=>`<li>${e(t(d,lang))}</li>`).join('')}</ul></details>`}</div></article>`).join('');
}
function education(lang) {
 const u=ui[lang];
 return `<div class="education"><h3>${u.education}</h3><div><span class="mono">2025 — 2027</span><h4>UC San Diego</h4><p>${u.masters}</p><small>${u.expected}</small></div><div><span class="mono">2021 — 2025</span><h4>UC San Diego</h4><p>${u.bachelors}</p></div></div>`;
}

function home(lang) {
 const u=ui[lang], p=profile[lang];
 const featured=projects.filter(p=>p.featured), more=projects.filter(p=>!p.featured);
 const person={ '@context':'https://schema.org', '@type':'Person', name:profile.name, alternateName:profile.chineseName, url:origin, sameAs:[profile.github], alumniOf:{'@type':'CollegeOrUniversity',name:'University of California San Diego'}, knowsAbout:['GPU kernels','AI infrastructure','High-performance computing'] };
 const content=`<main id="main"><section class="hero container" aria-labelledby="intro"><div class="hero-copy"><p class="eyebrow">COMPUTER ENGINEERING · UC SAN DIEGO</p><h1 id="intro">Yijie He<span class="name-dot">.</span></h1><p class="chinese-name" lang="zh-CN">贺逸杰</p><h2 class="hero-role">${e(p.role)}</h2><p class="hero-intro">${e(p.intro)}</p><div class="hero-actions"><a class="button" href="#work">${u.selected} ${arrow}</a><a class="text-link" href="mailto:${profile.email}">${u.contact} ${upArrow}</a></div></div><aside class="hero-notebook" aria-label="${lang==='en'?'Areas of focus':'关注方向'}"><div class="notebook-top"><span class="mono">01 / FIELD NOTES</span><span class="notebook-cross" aria-hidden="true">＋</span></div><div class="notebook-stack"><div><span>01</span><p>${lang==='en'?'Model inference':'模型推理'}</p><small>vLLM · multimodal · serving</small></div><div><span>02</span><p>${lang==='en'?'GPU kernels':'GPU 算子'}</p><small>attention · GEMM · convolution</small></div><div><span>03</span><p>${lang==='en'?'Hardware':'硬件'}</p><small>AMD · CUDA · on-device</small></div></div><div class="notebook-array">${diagram('array',lang)}</div><p class="notebook-foot mono">${lang==='en'?'FROM THE MODEL TO THE MACHINE':'从模型到硬件'}</p></aside></section>
<div class="context-line container"><span>${lang==='en'?'Previously':'曾就职 / 研究于'}</span><span>ByteDance</span><span>Qualcomm</span><span>UC San Diego · ARC Lab</span></div>
<section class="section container" id="work" aria-labelledby="work-heading"><div class="section-heading"><div><p class="eyebrow">01 / ${u.work}</p><h2 id="work-heading">${u.selected}${lang==='en'?'.':'。'}</h2></div><p>${u.selectedIntro}</p></div><div class="project-grid">${featured.map((project,i)=>`<article class="project-card"><a class="project-visual" href="${projectUrl(project,lang)}" tabindex="-1" aria-hidden="true"><span class="mono visual-index">0${i+1} / ${project.year}</span>${diagram(project.graphic,lang)}</a><div class="project-copy"><p class="project-subtitle mono">${e(t(project.subtitle,lang))}</p><h3><a href="${projectUrl(project,lang)}">${e(t(project.title,lang))}${upArrow}</a></h3><p>${e(t(project.summary,lang))}</p><div class="tags">${project.tags.slice(0,3).map(tag=>`<span>${e(tag)}</span>`).join('')}</div></div></article>`).join('')}</div><div class="more-work"><h3>${u.more}</h3>${more.map(project=>`<a class="project-row" href="${projectUrl(project,lang)}"><span class="mono project-year">${project.year}</span><span><strong>${e(t(project.title,lang))}</strong><small>${e(t(project.summary,lang))}</small></span>${upArrow}</a>`).join('')}</div></section>
<section class="experience-section" id="experience" aria-labelledby="experience-heading"><div class="container"><div class="section-heading"><div><p class="eyebrow">02 / ${u.experience}</p><h2 id="experience-heading">${u.experience}${lang==='en'?'.':'。'}</h2></div><p>${u.expIntro}</p></div>${experienceRows(lang)}</div></section>
<section class="section container" id="about" aria-labelledby="about-heading"><div class="about-grid"><div><p class="eyebrow">03 / ${u.about}</p><h2 id="about-heading">${u.aboutHeading}</h2><p class="about-text">${e(p.about)}</p><p>${e(p.note)}</p><a class="text-link" href="${base(lang)}resume/">${u.resume} ${arrow}</a></div>${education(lang)}</div><div class="skills"><h3>${u.what}</h3><div class="skills-grid">${skills.map(s=>`<div><h4>${e(t(s.title,lang))}</h4><p>${e(s.items)}</p></div>`).join('')}</div></div></section>
<section class="contact-section container" id="contact" aria-labelledby="contact-heading"><p class="eyebrow">04 / ${u.contact}</p><div class="contact-inner"><div><h2 id="contact-heading">${u.contactHeading}</h2><p>${u.contactText}</p></div><a class="contact-email" href="mailto:${profile.email}">${profile.email} ${upArrow}</a></div></section></main>`;
 return shell(lang,'',`${profile.name} · AI Infrastructure & GPU Computing`,p.intro,content,`<script type="application/ld+json">${JSON.stringify(person)}</script>`);
}

function casePage(project,lang,index) {
 const u=ui[lang], next=projects[(index+1)%projects.length];
 const content=`<main id="main" class="case-main container"><a class="back-link" href="${base(lang)}#work">← ${u.back}</a><div class="case-header"><div><p class="eyebrow">${e(t(project.subtitle,lang))} · ${project.year}</p><h1>${e(t(project.title,lang))}</h1><p class="case-lede">${e(t(project.summary,lang))}</p><div class="tags">${project.tags.map(tag=>`<span>${e(tag)}</span>`).join('')}</div><div class="case-links">${externalLinks(project,lang)}</div></div><div class="case-art">${diagram(project.graphic,lang)}</div></div>${metrics(project,lang)}<div class="case-body"><div class="case-prose">${project.sections.map(section=>`<section><h2>${e(t(section.title,lang))}</h2><p>${e(t(section.text,lang))}</p>${section.bullets?`<ul>${section.bullets.map(b=>`<li>${e(t(b,lang))}</li>`).join('')}</ul>`:''}</section>`).join('')}<aside class="scope-note"><h2>${u.results}</h2><p>${e(t(project.scope,lang))}</p></aside></div><aside class="case-sidebar"><p class="eyebrow">${u.overview}</p><p>${project.year}</p><p>${e(t(project.subtitle,lang))}</p><h2>${u.what}</h2><ul>${project.tags.map(tag=>`<li>${e(tag)}</li>`).join('')}</ul><a class="text-link" href="mailto:${profile.email}">${u.contact} ${upArrow}</a></aside></div><a class="next-project" href="${projectUrl(next,lang)}"><span><small>${u.related}</small><strong>${e(t(next.title,lang))}</strong></span>${arrow}</a></main>`;
 return shell(lang,`work/${project.slug}/`,`${t(project.title,lang)} · Yijie He`,t(project.summary,lang),content);
}

function resume(lang) {
 const u=ui[lang];
 const content=`<main id="main" class="resume-main container"><div class="resume-heading"><div><p class="eyebrow">${u.resume}</p><h1>Yijie He <span lang="zh-CN">贺逸杰</span></h1><p>${e(profile[lang].role)}</p><a href="mailto:${profile.email}">${profile.email}</a> · <a href="${profile.github}">github.com/HenoHyj</a></div><button class="button print-button" data-print>${u.print} ${arrow}</button></div><p class="resume-intro">${e(profile[lang].about)}</p><section><h2>${u.experience}</h2>${experienceRows(lang,true)}</section><section><h2>${u.work}</h2>${projects.map(project=>`<article class="resume-project"><div><h3><a href="${projectUrl(project,lang)}">${e(t(project.title,lang))}</a></h3><span class="mono">${project.year}</span></div><p>${e(t(project.summary,lang))}</p><small>${project.tags.map(e).join(' · ')}</small></article>`).join('')}</section><section>${education(lang)}</section><section><h2>${u.what}</h2>${skills.map(s=>`<p><strong>${e(t(s.title,lang))}:</strong> ${e(s.items)}</p>`).join('')}</section></main>`;
 return shell(lang,'resume/',`${u.resume} · Yijie He`,profile[lang].intro,content);
}

const urls=[];
async function save(route,html) { const file=path.join(root,route,'index.html');await mkdir(path.dirname(file),{recursive:true});await writeFile(file,html);urls.push(`${origin}/${route}${route?'/':''}`); }
for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh':'';
 await save(prefix,home(lang));
 await save([prefix,'resume'].filter(Boolean).join('/'),resume(lang));
 for(const [i,project] of projects.entries()) await save([prefix,'work',project.slug].filter(Boolean).join('/'),casePage(project,lang,i));
}
await writeFile(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(root,'404.html'),shell('en','','Page not found · Yijie He','Return to Yijie He’s portfolio.',`<main id="main" class="container not-found"><p class="eyebrow">404</p><h1>This page isn’t here.</h1><p>The address may have changed.</p><a class="button" href="/">Back to the website ${arrow}</a></main>`));
console.log(`Built ${urls.length} pages, a 404 page, and sitemap.`);
