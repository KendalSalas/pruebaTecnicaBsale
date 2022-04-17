import { insertarContenido } from "./insertarContenido.js";
import { insertarSpinner } from "./spinner.js";
import { mensajeError } from "./mensajeError.js";

//Archivo JS en el cual guardaré la función encargada de hacer fetch a listado-productos y listar los resultados en la página
const urlProductos = 'https://prueba-tecnica-bsale.herokuapp.com/ajax/j-listado-productos-orden.php'; //URL a la cual haré fetch

//Estilo a las monedas como CLP
const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

//Función asincrona para realizar el fetch a j-listado-productos, enviando como tipo = nombre y el nombre a buscar por POST
export const listadoProductosOrden = async (listadoProductos, tipoOrden, filtroOrden = '') => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo una variable data a la cual le pasare parametros para enviarlo por POST
        const data = new URLSearchParams();
        data.append('listadoProductos', listadoProductos); //Le paso el tipo de listado de productos a buscar (destacados / categoria / resultado busqueda)
        data.append('tipoOrden', tipoOrden) //Tipo de orden para la query, puede ser por nombre o por precio actualmente

        if (filtroOrden != '' || filtroOrden != null) {
            data.append('filtroOrden', filtroOrden);
        }

        //Variable donde almacenaré la respuesta del fetch
        const res = await fetch(urlProductos, {
            method: 'POST',
            body: data
        })

        //variable en la cual almacenaré la respuesta parseada a JSON
        const json = await res.json();

        // console.log(json);

        //En caso de que me devuelva un mensaje de error, lo lanzo al catch con un Error
        if (json.mensaje == 'No hay datos') {
            throw new Error('La consulta no trajo resultados');
        } else if (json.error) {
            throw new Error(`Error al intentar ordenar productos ${json.error}`);
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

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        let titulo;

        if (listadoProductos == 'todos') {
            titulo = 'Productos';
        } else if(listadoProductos == 'categoria'){
            const $nombreLi = document.querySelector(`[id-categoria="${filtroOrden}"]`).getAttribute('nombre-categoria')
            titulo = `Productos ${$nombreLi}`;
        } else if(listadoProductos == 'nombre'){
            titulo = `Resultados para ${filtroOrden}`;
        }
        insertarContenido(titulo, $template);

    } catch (error) {
        console.error(`Error ${error}`);

        //Limpio el main destacados
        document.getElementById('destacados').innerHTML = '';

        mensajeError('No hay resultados para mostrar.')

    }
}