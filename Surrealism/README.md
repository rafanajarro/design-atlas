# UMBRAL · Surrealism

Un museo imaginario bilingüe que se recorre por tres salas a pantalla completa. La navegación sustituye las escenas en lugar de repetir secciones de landing. React + Vite, paisajes CSS y SVG originales.

```powershell
# Ejecutar desde la raíz del repositorio
npm.cmd install
npm.cmd run dev
```

Abrir `http://127.0.0.1:5180/Surrealism/` o elegir UMBRAL en el catálogo. Las dependencias se instalan únicamente en la raíz. Compilar todos los sitios: `npm.cmd run build`. Revisar compilación: `npm.cmd run preview`.

- Sala 01: toca el reloj para detener o reanudar sus movimientos.
- Sala 02: abre la puerta suspendida sobre el agua.
- Sala 03: enciende cinco lunas y restablece el jardín.
- Cambia de sala con la navegación inferior, la flecha de avance o las teclas izquierda/derecha.
- Guarda un fragmento SVG de cada sueño; refleja el estado de su objeto interactivo.

Los estados se conservan al cambiar de sala; el idioma se guarda en localStorage. Las notas del museo se abren en un diálogo accesible. Respeta la preferencia de movimiento reducido. No conecta servicios ni vende entradas.

Contenido y escenas: `src/main.jsx`. Composición y animaciones: `src/style.css`. Tipografías Italiana, Cormorant Garamond y DM Sans desde Google Fonts, con respaldo local. Archivos UTF-8.
