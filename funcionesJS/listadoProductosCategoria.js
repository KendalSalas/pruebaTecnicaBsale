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

//Función asincrona para realizar el fetch a j-listado-productos, enviando como tipo = categorias y un idCategoria por POST
export const listadoProductosCategoria = async (idCategoria, nombreCategoria) => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo una variable data a la cual le pasare parametros para enviarlo por POST
        const data = new URLSearchParams();
        data.append('tipo', 'categoria'); //Le paso el tipo categoria, para indicar que buscará productos en base a la categoria
        data.append('idCategoria', idCategoria); //Le paso el ID de la categoria a filtrar

        //Variable donde almacenaré la respuesta del fetch
        const res = await fetch(urlProductos, {
            method: 'POST',
            body: data
        })

        //variable en la cual almacenaré la respuesta parseada a JSON
        const json = await res.json();

        //En caso de que me devuelva un mensaje de error, lo lanzo al catch con un Error
        if (json.mensaje == 'No hay datos') {
            throw new Error('No hay productos para mostrar en esta categoria');
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

        const titulo = `Productos ${nombreCategoria}`; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);
        document.getElementById('filtro-orden').value = idCategoria; //Seteo el valor de filtro-orden al id de la categoria actual para poder ordenar en base a ella

    } catch (error) {
        console.error(`Error ${error}`);

        //Limpio el main destacados
        document.getElementById('destacados').innerHTML = '';

        //Creo el mensaje de error y lo inyecto en el main destacados
        if (error.message == 'No hay productos para mostrar en esta categoria') {
            mensajeError('No hay productos para mostrar en esta categoria.');
        } else {
            mensajeError('No hay productos para mostrar ahora mismo');
        }
    }
}