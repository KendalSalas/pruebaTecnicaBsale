//Función para ir insertando el contenido de los productos y el titulo que corresponde

//Creo un h4 al cual le daré el titulo de esta llamada
const $h4 = document.createElement('h4');
$h4.setAttribute('id', 'titulo-destacados');

//creo un section al cual le pasaré los productos obtenidos del fetch
const $section = document.createElement('section');
$section.setAttribute('id', 'productos-destacados');

const $divOpciones = document.createElement('div');
$divOpciones.setAttribute('id', 'orden-productos');

//Referencio al main id destacados del HTML
const $destacados = document.getElementById('destacados');

export const insertarContenido = (titulo, productos, opciones = '') => {
    $h4.innerHTML = titulo;
    $section.innerHTML = productos;

    $destacados.innerHTML = '';

    //Div de opciones para poder ordenar los productos por nombre o valor
    $divOpciones.innerHTML =  `<div class="btn-group">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            Ordenar Por
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                            <li><button class="dropdown-item" type="button" listado="${opciones}" orden="precio">Precio</button></li>
                            <li><button class="dropdown-item" type="button" listado="${opciones}" orden="precio">Nombre</button></li>
                        </ul>
                    </div>`

    $destacados.appendChild($h4);
    $destacados.appendChild($divOpciones);
    $destacados.appendChild($section);
}