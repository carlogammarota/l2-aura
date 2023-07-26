const express = require('express');
const axios = require('axios');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3333;
const path = require('path');

// Configuración de opciones para express.static
const staticOptions = {
    etag: false, // Deshabilitar Etag para evitar el código de estado 304 Not Modified
    maxAge: '1d', // Configurar el tiempo máximo de almacenamiento en caché (ejemplo: 1 día)
    index: false, // Deshabilitar la respuesta de archivo predeterminada "index.html"
    setHeaders: (res, path) => {
      // Configurar encabezados personalizados
      res.setHeader('Cache-Control', 'public, max-age=0'); // Configurar la caché pública
      res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString()); // Configurar la fecha de vencimiento en 1 día
    },
  };
  
  // Middleware para servir archivos estáticos con opciones personalizadas
  app.use(express.static(path.join(__dirname, './dist'), staticOptions));





    //cuando la ruta es /productos/:id_del_producto
app.get('/productos/:id_producto', async (req, res) => {
    console.log("SSR PRODUCTOS", req.params.id_producto);

    let data = {};
    try {
        const response = await axios.get(`https://api.alguientiene.com/productos/${req.params.id_producto}`);
        console.log(response.data);
        data = {
            title: response.data.titulo,
            description: response.data.descripcion,
            };
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }

   

    // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
    // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta 
    const metaTags = `
        <title>${data.title}</title>
        <meta name="description" content=" ${data.description}">
        <meta itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <meta property="og:image" itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <!-- Otras metaetiquetas dinámicas -->
    `;
    
    // Lee el archivo "index.html"
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    fs.readFile(indexPath, 'utf-8', (err, html) => {
        if (err) {
        console.error('Error al leer el archivo index.html', err);
        return res.status(500).send('Error interno del servidor');
        }
    
        // Inserta las metaetiquetas dinámicas en el archivo "index.html" creadas en ej objeto metaTags
        const modifiedHtml = html.replace('<title></title>',  `${metaTags}`);
    
        // Envía el archivo "index.html" modificado con las metaetiquetas
        res.send(modifiedHtml);
    });
    
});
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
app.get('*', async (req, res) => {

    // Aquí puedes generar dinámicamente las metaetiquetas según el ID del producto
    // Aca se puede agregar meta tags dinamicos para el caso de productos tambien se puede hacer para categorias o con cualquier ruta 
    const metaTags = `<title>AlguienTiene.com</title>
        <meta name="description" content=" test">
        <meta itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <meta property="og:image" itemprop="image" content="https://i.ibb.co/BNRGXxY/140x140.png">
        <meta name="apple-mobile-web-app-title" content="hola">
        <!-- Otras metaetiquetas dinámicas -->
    `;
    
    // Lee el archivo "index.html"
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    fs.readFile(indexPath, 'utf-8', (err, html) => {
        if (err) {
        console.error('Error al leer el archivo index.html', err);
        return res.status(500).send('Error interno del servidor');
        }
    
        // Inserta las metaetiquetas dinámicas en el archivo "index.html" creadas en ej objeto metaTags
        const modifiedHtml = html.replace('<title></title>',  `${metaTags}`);

    
        // Envía el archivo "index.html" modificado con las metaetiquetas
        res.send(modifiedHtml);
    });
    
});


    

app.listen(port, () => {
  console.log(`Servidor Express.js en ejecución en http://localhost:${port}`);
});
