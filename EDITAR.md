# Cómo editar este sitio

Todo el contenido vive en dos archivos: `index.html` (Works) y `about.html` (Story).
Son texto plano: buscas la frase, la cambias, guardas y recargas el navegador.
No hay que compilar nada.

Para verlo mientras editas, abre la Terminal en esta carpeta y corre:

```
python3 -m http.server 8743
```

Luego entra a `localhost:8743`. Cada vez que guardes, recarga la página.

> **Si guardas un cambio y no lo ves:** el navegador cachea `style.css`.
> Recarga forzando la caché con **Cmd+Shift+R**. Pasa sobre todo al tocar
> colores, fondos o medidas: el archivo está bien pero ves la versión vieja.

---

## Lo mínimo que hay que cambiar antes de publicar

Ahora mismo el sitio tiene el contenido del portfolio de referencia. **Todo esto
tiene que ser tuyo antes de que salga a internet**, tanto por autoría como porque
las imágenes están enlazadas a un servidor ajeno y pueden desaparecer sin aviso.

- [ ] El nombre del logo (arriba a la izquierda, en las dos páginas)
- [ ] El `<title>` de cada página (lo que se ve en la pestaña y en Google)
- [ ] Los titulares y textos de las dos páginas
- [ ] Las 7 imágenes de casos + sus etiquetas
- [ ] Los 4 iconos de servicios
- [ ] Los 7 logos de clientes
- [ ] Las 4 imágenes de la galería
- [ ] En Story: las 3 polaroids, los 6 avatares del historial, las 3 del collage
- [ ] El correo del footer — está en dos sitios: el texto visible y el
      `data-email` del botón (que es lo que se copia al pulsarlo)
- [ ] Los enlaces de redes (hoy están en `#`, sin destino)
- [ ] El botón "Download my CV" de Story (hoy en `#`): apúntalo a tu PDF
- [ ] Las 2 imágenes de resplandor del fondo (ver *Fondo*, más abajo)

---

## Cambiar un texto

Busca la frase tal cual aparece en pantalla y reemplázala. Ejemplo, el titular:

```html
<h1 data-reveal>Hey! I'm Daniel Sun, a designer who brings...</h1>
```

**Ojo con los titulares grandes:** están calibrados para cortar en palabras
concretas. Si pones un texto más largo o más corto, el corte cambia. Si no te
gusta cómo queda, se ajusta el ancho en `style.css` buscando `.hero h1`
(o `.section-title`) y cambiando su `max-width`.

## Cambiar una imagen

1. Mete tu imagen en una carpeta `img/` dentro de este proyecto.
2. Busca la URL vieja y reemplázala por la ruta nueva:

```html
<!-- antes -->
<img src="https://framerusercontent.com/images/QiP6ku....png" alt="Clerk">
<!-- después -->
<img src="img/mi-caso.png" alt="Nombre del proyecto">
```

El `alt` es la descripción para lectores de pantalla y buscadores: escribe qué
es el proyecto, no dejes "imagen".

**Proporciones**, para que no se deformen:
- Caso ancho: 1168 × 658 (aprox. 16:9)
- Caso a media columna: 580 × 659 (casi cuadrado, un poco vertical)
- Galería: 480 × 360
- Iconos de servicio: 80 × 80
- Logos de clientes: alto libre, se dibujan a 48px de alto

## Añadir o quitar un caso

Cada caso es un bloque `<a class="work-card">`. Para quitarlo, borras el bloque
entero. Para añadir uno, copias uno existente y le cambias imagen y etiquetas.

- `class="work-card"` → ocupa el ancho completo
- `class="work-card half"` → ocupa media columna (van de dos en dos)

Las etiquetas de arriba son los `<span class="tag">`. La primera lleva
`class="tag primary"` (fondo blanco) y es el nombre del cliente.

## Crear la página de un caso

`enovus.html` es la plantilla. Para el siguiente caso:

1. Duplica el archivo con el nombre del proyecto (`abastible.html`, por ejemplo).
2. Cambia el `<title>`, el titular, la entradilla, las fichas y los textos.
3. Cambia las cuatro imágenes.
4. En `index.html`, pon ese nombre de archivo en el `href` de su tarjeta:
   `<a class="work-card" href="abastible.html">`.

La estructura se repite: portada, imagen, resumen en dos columnas, y luego
bloques de texto alternados con imágenes.

### Encuadre de la imagen de la tarjeta

La tarjeta es más apaisada que las imágenes del caso, así que recorta por
arriba y por abajo. Por defecto recorta centrado, que suele ser lo correcto.

Si una imagen queda mal encuadrada (algo importante cortado), añade esto al
`<img>` de esa tarjeta:

```html
<img src="..." alt="..." style="object-position: 50% 20%">
```

El segundo número elige qué franja se ve: `0%` es el borde de arriba, `100%`
el de abajo, `50%` el centro. Baja el número para salvar la parte de arriba,
súbelo para salvar la de abajo.

En móvil no hace falta tocar nada: ahí la tarjeta cambia de proporción y la
imagen se ve completa.

## Cambiar colores y tipografía

Están todos juntos al inicio de `style.css`, en los bloques
`body.theme-light` y `body.theme-dark`. Cambiando ahí se actualiza todo el sitio.

La tipografía se carga en la primera línea de `style.css` desde Google Fonts.
Las variables `--serif`, `--sans` y `--garamond` definen dónde se usa cada una.

## Fondo

La retícula fina es un patrón SVG escrito dentro de `style.css`
(variable `--grid-tile`). Para quitarla, borra la regla `body::before`.
Para hacerla más o menos visible, cambia `--grid-opacity`
(hoy: 6% en la página clara, 12% en la oscura).

El hero no lleva resplandor: es fondo plano más la retícula.

---

## Si algo se rompe

Lo más común es borrar un `<div>` de cierre de más y que el layout se desarme.
Si pasa, deshaz con `Cmd+Z` y vuelve a intentar. Y si te trabas, me pasas el
archivo y lo arreglo.
