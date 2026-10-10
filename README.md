# Design Atlas

Catálogo local de 22 demos de diseño web. Cada sitio tiene su carpeta, su concepto y su recorrido. El catálogo incluye búsqueda, filtros y un visor con tamaños de escritorio, tablet y móvil. Todas las demos incluyen español e inglés; algunos nombres y lemas de marca conservan su idioma original.

## Un solo servicio

Requisitos: Node.js 22.12 o superior y npm. Se recomienda Node.js 24 LTS. No se necesitan variables de entorno ni servicios externos.

Después de clonar el repositorio, ejecuta desde su raíz:

```powershell
npm ci
npm run dev
```

Abre **http://127.0.0.1:5180**. Todas las demos utilizan las dependencias y los comandos de la raíz.

En Windows PowerShell, si la política de ejecución bloquea `npm`, utiliza `npm.cmd` en estos comandos.

Para compartir un estilo concreto, usa su ruta directa: `http://127.0.0.1:5180/Claymorphism/` o `http://127.0.0.1:5180/Y2K%20Aesthetic/`. También puedes compartir el visor con `?site=Claymorphism`.

El visor reduce visualmente el lienzo a su contenedor. Seleccionar móvil usa un viewport de 390 px; tablet, 768 px. Cada sitio tiene scroll propio dentro del visor. «Abrir sitio» lo muestra a tamaño completo en otra pestaña.

## Verificar y compilar

```powershell
npm run check
npm run build
npm run preview
```

La compilación genera el catálogo y las 22 páginas en `dist/`. El preview se abre en **http://127.0.0.1:4180**. Los checks comprueban UTF-8, renderizado en ambos idiomas y estados de las demos. Si se usa `--url http://127.0.0.1:5180`, también verifican las rutas HTTP del servicio activo.

## Organización

- `catalog/`: catálogo y visor integrado.
- `shared/sites.js`: inventario de estilos, marcas, familias y rutas.
- `shared/ui.jsx` y `shared/base.css`: selector de idioma, descarga local y base de las 17 demos nuevas.
- Cada carpeta de estilo contiene su `index.html`, `src/main.jsx`, `src/style.css` y README. Las cinco primeras también conservan sus archivos de composición.
- `package.json`, `package-lock.json` y `node_modules/` existen únicamente en la raíz; las 22 demos comparten una sola instalación.
- `vite.config.js`: una entrada por demo para generar un sitio estático con múltiples páginas.

Las marcas y sus productos, eventos, escenarios y servicios son conceptuales. Las interacciones ocurren en el navegador, sin backend. Las tipografías se cargan desde Google Fonts con alternativas locales. Las ilustraciones se construyen con CSS y SVG. Y2K sintetiza melodías mediante Web Audio al pulsar escuchar; no reproduce una emisora externa.

Los programas, patrones, postales y fragmentos se descargan localmente. No se procesan compras, reservas ni mensajes externos.

## Repositorio

Se versionan el código, la documentación y `package-lock.json`. Git excluye las dependencias instaladas, las compilaciones, las variables de entorno y los archivos locales del editor. `.editorconfig` y `.gitattributes` mantienen UTF-8 y finales de línea consistentes entre sistemas.

Si alojas el repositorio en GitHub, el workflow incluido ejecuta las comprobaciones y la compilación en cada push y pull request. No publica ni despliega el sitio.

La compilación está configurada para servir desde la raíz de un dominio. Para publicar bajo una subcarpeta, como GitHub Pages de un proyecto, hay que adaptar la base y los enlaces del catálogo.
