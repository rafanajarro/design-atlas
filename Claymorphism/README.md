# Softspace · Claymorphism

Estudio interactivo bilingüe de accesorios de escritorio, creado con React y Vite. Una mesa compartida permite seleccionar los tres objetos y personalizar sus colores de manera independiente. El panel inferior cambia según la selección y abre los detalles. Las ilustraciones están construidas con CSS y SVG. No procesa compras.

## Ejecutar

Desde la raíz del repositorio:

```powershell
# Ejecutar desde la raíz del repositorio
npm.cmd install
npm.cmd run dev
```

Abrir `http://127.0.0.1:5180/Claymorphism/` o elegir Softspace en el catálogo. Para compilar todos los sitios: `npm.cmd run build`. Para revisar esa versión: `npm.cmd run preview`. Las dependencias se instalan únicamente en la raíz.

El contenido está en `src/main.jsx`, los objetos en `src/style.css` y la composición del estudio en `src/layout.css`. Las tipografías DM Sans y Manrope se cargan desde Google Fonts; hay fuentes de sistema como respaldo.
