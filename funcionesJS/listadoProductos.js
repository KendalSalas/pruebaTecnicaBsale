import { insertarContenido } from "./insertarContenido.js";
import { insertarSpinner } from "./spinner.js";
import { mensajeError } from "./mensajeError.js";

//Archivo JS en el cual guardaré la función encargada de hacer fetch a listado-productos y listar los resultados en la página
const urlProductos = 'https://prueba-tecnica-bsale.herokuapp.com/ajax/j-listado-productos.php'; //URL a la cual haré fetch

//Función asincrona para realizar el fetch a j-listado-productos
export const listadoProductos = async () => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo una variable data a la cual le pasare parametros para enviarlo por POST
        const data = new URLSearchParams();
        data.append('tipo', 'destacados'); //Le paso un tipo = destacados, para indicar que me traiga solo 6 productos aleatorios al cargar la página por primera vez

        //Variable donde almacenaré la respuesta del fetch
        const res = await fetch(urlProductos, {
            method: 'POST',
            body: data
        })

        //variable en la cual almacenaré la respuesta parseada a JSON
        const json = await res.json();

        //En caso de que me devuelva un mensaje de error, lo lanzo al catch con un Error
        if (json.mensaje == 'No hay datos') {
            throw new Error('No hay productos para mostrar');
        }

        //Itero el JSON con un map
        json.map(producto => {
            const { id, nombre, fotoUrl, precio, descuento } = producto; //Obtengo los datos del producto

            let precioOriginal, txtDescuento;

            if(descuento > 0){
                precioOriginal = `<p class="card-text-dscto">Precio $${precio}</p>`;
                txtDescuento = `<p class="card-text">Oferta $${precio - descuento}</p>`;
            } else {
                precioOriginal = `<p class="card-text">Precio $${precio}</p>`;
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

        console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        const titulo = 'Productos Destacados'; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);

    } catch (error) {
        console.error(`Error ${error}`);

        //Limpio el main destacados para luego agregar la variable $errMsj
        document.getElementById('destacados').innerHTML = '';

        mensajeError('No hay productos para mostrar ahora mismo');

    }
}

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

            //Creo un card en el cual mostraré el producto
            //Este lo guardo en la variable template
            $template += `<div class="card" style="width: 16rem;">
                            <img src="${fotoUrl}" class="card-img-top" alt="Producto ${nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">Precio $${precio}</p>
                            </div>
                        </div>`;
        })

        // console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        const titulo = `Productos ${nombreCategoria}`; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);

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

            //Creo un card en el cual mostraré el producto
            //Este lo guardo en la variable template
            $template += `<div class="card" style="width: 16rem;">
                            <img src="${fotoUrl}" class="card-img-top" alt="Producto ${nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">Precio $${precio}</p>
                            </div>
                        </div>`;
        })

        // console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        const titulo = `Resultados para: ${nombre}`; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);

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