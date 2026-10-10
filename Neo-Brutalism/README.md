# OFFSCRIPT · Neo-Brutalism

Cartel digital bilingüe para un festival ficticio de diseño, música e ideas. La portada tipográfica da paso a una agenda en dos columnas por día, con horarios, filtros y selección persistente de sesiones. El pase funciona como talón visual desprendible, personalizable y descargable como SVG. React + Vite e ilustraciones CSS/SVG. El pase es un recuerdo visual, no una entrada o reserva.

```powershell
# Ejecutar desde la raíz del repositorio
npm.cmd install
npm.cmd run dev
```

Abrir `http://127.0.0.1:5180/Neo-Brutalism/` o elegir OFFSCRIPT en el catálogo. Las dependencias se instalan únicamente en la raíz. Compilar todos los sitios: `npm.cmd run build`. Revisar compilación: `npm.cmd run preview`.

Contenido, filtros y descarga: `src/main.jsx`. Componentes visuales: `src/style.css`. Cartel y agenda: `src/layout.css`. El idioma y las sesiones seleccionadas se guardan en localStorage. El nombre del pase permanece únicamente en memoria. Las tipografías Archivo Black y Space Grotesk se cargan desde Google Fonts con fuentes locales de respaldo. Codificación UTF-8.
