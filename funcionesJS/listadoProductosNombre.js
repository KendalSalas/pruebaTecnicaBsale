import { insertarContenido } from "./insertarContenido.js";
import { insertarSpinner } from "./spinner.js";
import { mensajeError } from "./mensajeError.js";

//Archivo JS en el cual guardaré la función encargada de hacer fetch a listado-productos y listar los resultados en la página
const urlProductos = 'https://prueba-tecnica-bsale.herokuapp.com/ajax/j-listado-productos.php'; //URL a la cual haré fetch

//Estilo a las monedas como CLP
const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

//Función asincrona para realizar el fetch a j-listado-productos, enviando como tipo = nombre y el nombre a buscar por POST
export const listadoProductosNombre = async (nombre) => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo una variable data a la cual le pasare parametros para enviarlo por POST
        const data = new URLSearchParams();
        data.append('tipo', 'nombre'); //Le paso un tipo = nombre, para indicar que estará buscando productos en base a su nombre
        data.append('nombre', nombre); //Le paso el nombre a buscar

        //Variable donde almacenaré la respuesta del fetch
        const res = await fetch(urlProductos, {
            method: 'POST',
            body: data
        })

        //variable en la cual almacenaré la respuesta parseada a JSON
        const json = await res.json();

        //En caso de que me devuelva un mensaje de error, lo lanzo al catch con un Error
        if (json.mensaje == 'Debe ingresar un valor para buscar') {
            throw new Error('Ingrese un parametro a buscar');
        }

        //Itero el JSON con un map
        json.map(producto => {
            const { id, nombre, fotoUrl, precio, descuento } = producto; //Obtengo los datos del producto

            const precioFormat = formatter.format(precio);

            let precioOriginal, txtDescuento;

            if (descuento > 0) {
                const precioOferta = formatter.format(precio - descuento);
                precioOriginal = `<p class="card-text original">Precio ${precioFormat}</p>`;
                txtDescuento = `<p class="card-text oferta">Oferta ${precioOferta}</p>`;
            } else {
                precioOriginal = `<p class="card-text">Precio ${precioFormat}</p>`;
                txtDescuento = '';
            }

            //Creo un card en el cual mostraré el producto
            //Este lo guardo en la variable template
            $template += `<div class="card" style="width: 16rem;">
                            <img src="${fotoUrl}" class="card-img-top" alt="Producto ${nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                ${precioOriginal}
                                ${txtDescuento}
                            </div>
                        </div>`;
        })

        // console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        const titulo = `Resultados para: ${nombre}`; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);

        //Actualizo datos de los botones para ordenar por precio/nombre
        document.getElementById('filtro-orden').value = nombre;//Seteo el valor de filtro-orden al nombre del producto que se está buscando

        document.getElementById('tipo-orden-precio').setAttribute('listado-productos', 'nombre');
        document.getElementById('tipo-orden-nombre').setAttribute('listado-productos', 'nombre');

    } catch (error) {
        console.error(`Error ${error}`);

        //Limpio el main destacados
        document.getElementById('destacados').innerHTML = '';

        //En caso de existir un error, valido cual es, para mostrar un mensaje u otro y luego inyectarlo en el main destacados
        if (error.message == 'Ingrese un parametro a buscar') {
            mensajeError('Debe ingresar un nombre para poder buscar.');
        } else {
            mensajeError('No hay resultados para mostrar.')
        }
    }
}