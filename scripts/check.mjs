import fs from 'node:fs';
import path from 'node:path';
import {createRequire}from'node:module';
import {transformSync}from'esbuild';
import React from'react';
import {renderToStaticMarkup}from'react-dom/server';
import {sites}from'../shared/sites.js';
const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const configurations={
 'Claymorphism':[{2:0},{2:1},{2:2},{4:1}],
 'Cybercore':[{2:'map'},{2:'modules',3:2},{2:'about'},{4:true}],
 'Neo-Brutalism':[{1:0},{1:2,2:[1,4]},{3:true},{4:'Zoë & amigos',5:2}],
 'Scrapbook':Array.from({length:6},(_,page)=>({1:Math.min(Math.max(page,1),3),2:page})),
 'Surrealism':[...Array.from({length:3},(_,room)=>({1:room})),{1:0,2:true},{1:1,3:true},{1:2,4:[true,true,true,true,true]},{5:true}],
 'Y2K Aesthetic':[{}, {0:2,1:true,2:60,3:3}],
 'Pixel Art':[{}, {0:[4,2,1],1:1,2:'water'}],
 'Synthwave':[{}, {0:2,1:true,2:60,3:80},{2:100}],
 'Glassmorphism':[{}, {0:2,1:22,2:true}],
 'Neumorphism':[{}, {0:2,1:true,2:37},{0:0,2:60}],
 'Bento Grid':[{}, {0:[true,true,true],1:4,2:2,3:'Una idea con ilusión'}],
 'Editorial Design':[{}, {0:2,1:true}],
 'Swiss Design':[{}, {0:1,1:[2,3]}],
 'Minimalism':[{}, {0:2,1:true,2:true}],
 'Maximalism':[{}, {0:2,1:2,2:true}],
 'Luxury Typography':[{}, ...Array.from({length:4},(_,step)=>({0:step,1:[1,1,1],2:true}))],
 'Conceptual Sketch':[{}, {0:2,1:1,2:false}],
 'Ethereal':[{}, {0:2,1:80,2:true}],
 'Bohemian':[{}, {0:2,1:2,2:true}],
 'Victorian':[{}, {0:2},{1:true}],
 'Cyberpunk':[{}, {0:2,1:[0,2,3],2:true}],
 'Wabi-Sabi':[{}, {0:2,1:true,2:7,3:true}]
};
const catalogRequire=createRequire(path.join(root,'package.json'));
globalThis.localStorage={getItem:()=>null,setItem:()=>{}};
globalThis.location=new URL('http://localhost:5180/');
let rendered=0;
for(const site of sites){const entry=path.join(site.folder,'src/main.jsx');for(const filename of ['index.html','README.md','src/main.jsx','src/style.css',...(fs.existsSync(site.folder+'/src/layout.css')?['src/layout.css']:[])]){const text=new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(path.join(site.folder,filename)));if(/[\u00c3\u00c2\ufffd]/.test(text))throw Error(`Encoding: ${site.folder}/${filename}`)}
 const require=catalogRequire;
 let source=fs.readFileSync(entry,'utf8').replace(/^import '\.\/(?:style|layout)\.css';\r?\n/gm,'').replace(/import '\.\/style\.css';/g,'').replace(/createRoot\(document.getElementById\('root'\)\)\.render\(<App\/>\);/g,'').replace(/mount\(App\);/g,'');
 if(!source.includes('export default'))source+='\nexport default App;';
 const compiled=transformSync(source,{loader:'jsx',format:'cjs'}).code;
 const legacy=sites.indexOf(site)<5;
 for(const language of ['es','en'])for(const variant of configurations[site.folder]){
  let cursor=0;const setters=[];
  const react={...React,useState:initial=>{const index=cursor++;const value=legacy&&index===0?language:Object.hasOwn(variant,index)?variant[index]:typeof initial==='function'?initial():initial;setters[index]=[];return[value,next=>setters[index].push(typeof next==='function'?next(value):next)]},useEffect:()=>{},useRef:()=>({current:null})};
  const ui={useLocale:()=>({lang:language,setLang:()=>{},tr:(es,en)=>language==='es'?es:en}),Language:({lang})=>React.createElement('span',null,lang),mount:()=>{},saveText:()=>{}};
  const module={exports:{}};new Function('require','module','exports',compiled)(name=>name==='react'?react:name.includes('shared/ui')?ui:require(name),module,module.exports);
  const html=renderToStaticMarkup(React.createElement(module.exports.default));
  if(!html.includes('<main')||!/<h[12]/.test(html)||!html.includes('<button'))throw Error(`Empty render: ${site.folder}`);
  if(html.includes('undefined'))throw Error(`Undefined content: ${site.folder}`);
  rendered++;
 }
 console.log(`OK ${site.folder} · ${configurations[site.folder].length*2} states`);
}
// Check that the catalog resolves encoded style names and emits the correct iframe.
const catalogSource=fs.readFileSync('catalog/main.jsx','utf8').replace("import './style.css';",'').replace("createRoot(document.getElementById('root')).render(<App/>);",'export default App;');
const catalogCompiled=transformSync(catalogSource,{loader:'jsx',format:'cjs'}).code;
for(const selected of [null,sites[5]]){let cursor=0;const values=['','Todos',selected,'mobile',true,0,800];const react={...React,useState:()=>[values[cursor++],()=>{}],useEffect:()=>{},useRef:()=>({current:null})};const module={exports:{}};new Function('require','module','exports',catalogCompiled)(name=>name==='react'?react:name.includes('shared/sites')?{sites}:catalogRequire(name),module,module.exports);const html=renderToStaticMarkup(React.createElement(module.exports.default));if((html.match(/class="catalog-card/g)||[]).length!==22)throw Error('Catalog count');if(selected&&!html.includes('src="/Y2K%20Aesthetic/"'))throw Error('Encoded iframe URL');}
console.log(`PASS: ${rendered} demo states, 2 catalog states, UTF-8 and all 22 entries.`);
// Exercise state transitions through the actual controls, without a browser DOM.
function harness(folder){let cursor=0;const state=new Map();const react={...React,useState:initial=>{const index=cursor++;if(!state.has(index))state.set(index,typeof initial==='function'?initial():initial);return[state.get(index),next=>state.set(index,typeof next==='function'?next(state.get(index)):next)]},useEffect:()=>{},useRef:()=>({current:null})};const ui={useLocale:()=>({lang:'es',setLang:()=>{},tr:(es)=>es}),Language:()=>null,mount:()=>{},saveText:()=>{}};const source=fs.readFileSync(folder+'/src/main.jsx','utf8').replace("import './style.css';",'').replace('mount(App);','');const compiled=transformSync(source,{loader:'jsx',format:'cjs'}).code;const module={exports:{}};new Function('require','module','exports',compiled)(name=>name==='react'?react:name.includes('shared/ui')?ui:catalogRequire(name),module,module.exports);function tree(){cursor=0;return module.exports.default()}function find(predicate){const nodes=[];function walk(node){if(Array.isArray(node)){node.forEach(walk);return}if(!React.isValidElement(node))return;if(typeof node.type==='function'){walk(node.type(node.props));return}if(predicate(node))nodes.push(node);walk(node.props.children)}walk(tree());if(!nodes.length)throw Error('Control missing: '+folder);return nodes}return{state,find,tree}}
const garden=harness('Pixel Art');
garden.find(n=>n.props['aria-pressed']!==undefined&&n.props.children?.[1]?.props?.children==='PLANTAR')[0].props.onClick();
for(let i=0;i<3;i++){garden.find(n=>n.props.className?.startsWith('plot '))[i].props.onClick();garden.state.set(2,'water');for(let j=0;j<3;j++)garden.find(n=>n.props.className?.startsWith('plot '))[i].props.onClick();garden.state.set(2,'seed')}
if(!garden.state.get(0).every(n=>n===4))throw Error('Garden growth failed');
garden.state.set(2,'clear');garden.find(n=>n.props.className?.startsWith('plot '))[1].props.onClick();if(garden.state.get(0)[1]!==0)throw Error('Garden reset failed');
const city=harness('Cyberpunk');city.find(n=>n.props.className==='route-add')[0].props.onClick();city.find(n=>n.props.className?.startsWith('city-pin'))[2].props.onClick();city.find(n=>n.props.className==='route-add')[0].props.onClick();if(city.state.get(1).join(',')!=='1,2')throw Error('City route ordering');city.find(n=>n.props.className==='route-add')[0].props.onClick();if(city.state.get(1).join(',')!=='1')throw Error('City route removal');
const ritual=harness('Luxury Typography');ritual.find(n=>n.type==='button'&&n.props.children?.[0]==='Comenzar el ritual')[0].props.onClick();for(let i=0;i<3;i++)ritual.find(n=>n.props.className==='ritual-next')[0].props.onClick();if(ritual.state.get(0)!==3||!ritual.state.get(2))throw Error('Fragrance flow');ritual.find(n=>n.props.className==='ritual-restart')[0].props.onClick();if(ritual.state.get(0)!==0)throw Error('Fragrance restart');
const day=harness('Bento Grid');for(let i=0;i<3;i++)day.find(n=>n.type==='button'&&n.props.children?.[1]?.type==='span'&&typeof n.props.children?.[1]?.props?.children==='string'&&n.props.children?.[0]?.type==='i')[i].props.onClick();if(!day.state.get(0).every(Boolean))throw Error('Day intentions');day.find(n=>n.type==='textarea')[0].props.onChange({target:{value:'Diseñar con intención'}});if(day.state.get(3)!=='Diseñar con intención')throw Error('Note edit');
const pause=harness('Neumorphism');pause.find(n=>n.props.className==='start')[0].props.onClick();if(!pause.state.get(1))throw Error('Pause start');pause.find(n=>n.props.className==='reset')[0].props.onClick();if(pause.state.get(1)||pause.state.get(2)!==0)throw Error('Pause reset');
console.log('PASS: garden growth/reset, ordered route/removal, fragrance flow/restart, intentions/note and timer controls.');
const urlIndex=process.argv.indexOf('--url');
if(urlIndex>=0){const base=process.argv[urlIndex+1];if(!base)throw Error('Missing --url');for(const folder of ['',...sites.map(s=>s.folder)]){const url=new URL(folder?encodeURIComponent(folder)+'/':'/',base.endsWith('/')?base:base+'/');const response=await fetch(url);const html=await response.text();if(!response.ok||!html.includes('id="root"'))throw Error('HTTP route failed: '+url);const assets=[...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css)(?:\?[^" ]*)?)"/g)].map(m=>new URL(m[1],url));for(const asset of assets){const res=await fetch(asset);if(!res.ok||!/(javascript|css)/.test(res.headers.get('content-type')??''))throw Error('Asset failed: '+asset)}console.log('HTTP OK '+(folder||'catalog'));}}
