import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import {sites} from './shared/sites.js';
export default defineConfig({build:{rollupOptions:{input:Object.fromEntries([['catalog',resolve('index.html')],...sites.map(s=>[s.folder,resolve(s.folder,'index.html')])])}},server:{host:'127.0.0.1',port:5180,strictPort:true}});
