import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const errors=[];
async function htmlFiles(folder) {
 const result=[];
 for(const item of await readdir(folder,{withFileTypes:true})) {
  if(['.git','.qa','node_modules'].includes(item.name))continue;
  const file=path.join(folder,item.name);
  if(item.isDirectory())result.push(...await htmlFiles(file));
  else if(item.name.endsWith('.html'))result.push(file);
 }
 return result;
}
const pages=await htmlFiles(root);
let links=0;
for(const file of pages) {
 const html=await readFile(file,'utf8');
 const relative=path.relative(root,file);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)errors.push(`${relative}: duplicate element ID`);
 if([...html.matchAll(/<h1\b/g)].length!==1)errors.push(`${relative}: expected one primary heading`);
 if(!html.includes('name="viewport"')||!html.includes('class="skip"'))errors.push(`${relative}: missing mobile viewport or skip link`);
 if(/TODO|placeholder|15999591553|619-953-9707|XR Team|C:[\\/]/i.test(html))errors.push(`${relative}: private data or unfinished copy`);
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  const raw=match[1];
  if(!raw.startsWith('/')&&!raw.startsWith('#'))continue;
  const parsed=new URL(raw,'https://henohyj.github.io/'+relative.replaceAll('\\','/'));
  let target=path.join(root,decodeURIComponent(parsed.pathname));
  if(parsed.pathname.endsWith('/'))target=path.join(target,'index.html');
  try {
   const info=await stat(target);
   if(!info.isFile())throw Error('not file');
   if(parsed.hash) {
    const body=target===file?html:await readFile(target,'utf8');
    if(!body.includes(`id="${decodeURIComponent(parsed.hash.slice(1))}"`))throw Error('missing anchor');
   }
   links++;
  }catch {errors.push(`${relative}: broken link ${raw}`);}
 }
}
const css=await readFile(path.join(root,'assets/style.css'),'utf8');
if(!css.includes('prefers-reduced-motion')||!css.includes(':focus-visible'))errors.push('Missing reduced-motion or keyboard focus support');
await stat(path.join(root,'.nojekyll'));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Passed: ${pages.length} pages, ${links} internal links/assets, privacy checks, and accessibility safeguards.`);
