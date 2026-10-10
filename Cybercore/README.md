# NEXUS/01 · Cybercore

Escritorio bilingüe para un espacio de trabajo conceptual, creado con React y Vite. Un dock abre el mapa, el explorador de módulos o el documento del sistema dentro del mismo espacio. La terminal permanece disponible y el inspector cambia al seleccionar nodos. Ilustraciones CSS/SVG. No conecta servicios externos.

```powershell
# Ejecutar desde la raíz del repositorio
npm.cmd install
npm.cmd run dev
```

Abrir `http://127.0.0.1:5180/Cybercore/` o elegir NEXUS/01 en el catálogo. Las dependencias se instalan únicamente en la raíz. Compilar todos los sitios: `npm.cmd run build`. Revisar compilación: `npm.cmd run preview`.

Comandos: `help`, `about`, `modules`, `map`, `focus`, `exit`, `clear`, `lang es`, `lang en`. `focus` deja visible únicamente la sección de terminal; `exit` restaura la página. El historial de terminal permanece en memoria y el idioma se conserva localmente.

Contenido y comportamiento: `src/main.jsx`. Componentes visuales: `src/style.css`. Composición del escritorio: `src/layout.css`. Tipografías Barlow Condensed e IBM Plex Mono servidas por Google Fonts, con fuentes de respaldo locales. Archivos guardados en UTF-8.
