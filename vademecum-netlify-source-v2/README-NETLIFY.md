# Publicar el Vademécum en Netlify

La aplicación puede publicarse como un sitio estático. No necesita base de datos,
registro ni variables privadas para funcionar.

## Opción recomendada: GitHub + Netlify

1. Sube el código a un repositorio de GitHub.
2. En Netlify, selecciona **Add new project** y después **Import an existing project**.
3. Conecta el repositorio.
4. Netlify leerá `netlify.toml` y utilizará automáticamente:
   - comando: `npm run build:netlify`
   - carpeta pública: `out`
   - Node.js: `22.13.0`
5. Selecciona **Deploy**.

Cada actualización que envíes a la rama principal generará una publicación nueva.

## Opción rápida: Netlify Drop

1. Ejecuta `npm install`.
2. Ejecuta `npm run build:netlify`.
3. Arrastra la carpeta `out` a https://app.netlify.com/drop.

## Dominio y enlaces sociales

Netlify proporciona una dirección `*.netlify.app`. Si conectas un dominio propio,
crea la variable `NEXT_PUBLIC_SITE_URL` con la dirección definitiva y vuelve a
publicar para que los enlaces sociales utilicen ese dominio.
