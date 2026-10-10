import React,{useState,useEffect}from'react';
import{createRoot}from'react-dom/client';
import './base.css';
export function useLocale(key){const[lang,setLang]=useState(()=>{try{return localStorage.getItem(key)==='en'?'en':'es'}catch{return'es'}});useEffect(()=>{document.documentElement.lang=lang;try{localStorage.setItem(key,lang)}catch{}},[lang,key]);return{lang,setLang,tr:(es,en)=>lang==='es'?es:en}}
export function Language({lang,setLang}){return <div className="locale" aria-label="Language"><button onClick={()=>setLang('es')} aria-pressed={lang==='es'}>ES</button><span>/</span><button onClick={()=>setLang('en')} aria-pressed={lang==='en'}>EN</button></div>}
export function mount(Component){createRoot(document.getElementById('root')).render(<Component/>)}
export function saveText(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
