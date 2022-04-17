//Función para ir insertando el contenido de los productos y el titulo que corresponde

//Creo un h4 al cual le daré el titulo de esta llamada
const $h4 = document.createElement('h4');
$h4.setAttribute('id', 'titulo-destacados');

//creo un section al cual le pasaré los productos obtenidos del fetch
const $section = document.createElement('section');
$section.setAttribute('id', 'productos-destacados');

//Referencio al main id destacados del HTML
const $destacados = document.getElementById('destacados');

export const insertarContenido = (titulo, productos, opciones = '') => {
    $h4.innerHTML = titulo;
    $section.innerHTML = productos;

    $destacados.innerHTML = '';

    $destacados.appendChild($h4);
    $destacados.appendChild($section);
}