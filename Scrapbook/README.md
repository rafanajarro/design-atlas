# POSTALES · Scrapbook

Álbum interactivo bilingüe para un diario ficticio de pequeñas escapadas. Se recorre por seis capítulos: portada, cafés, mercados, rincones, diario y postal. Las pestañas temáticas sustituyen los filtros y cada tema presenta dos recuerdos en una doble página. Incluye navegación anterior/siguiente, relatos en ventanas de detalle y postal personalizable descargable como SVG. React + Vite, ilustraciones SVG, recortes y texturas CSS.

```powershell
# Ejecutar desde la raíz del repositorio
npm.cmd install
npm.cmd run dev
```

Abrir `http://127.0.0.1:5180/Scrapbook/` o elegir POSTALES en el catálogo. Las dependencias se instalan únicamente en la raíz. Compilar todos los sitios: `npm.cmd run build`. Revisar compilación: `npm.cmd run preview`.

Contenido, escenas y descarga: `src/main.jsx`. Componentes visuales: `src/style.css`. Composición del álbum: `src/layout.css`. El idioma se conserva en localStorage. El destinatario y el mensaje permanecen en memoria al pasar entre capítulos; la descarga se genera en el navegador. No envía postales ni conecta servicios externos.

Las tipografías Libre Caslon Display, Caveat y DM Sans se cargan desde Google Fonts con fuentes locales de respaldo. Archivos UTF-8. Los lugares y relatos son imaginarios.
