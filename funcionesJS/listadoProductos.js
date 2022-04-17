import { insertarContenido } from "./insertarContenido.js";
import { insertarSpinner } from "./spinner.js";

//Archivo JS en el cual guardaré la función encargada de hacer fetch a listado-productos y listar los resultados en la página
const urlProductos = 'https://prueba-tecnica-bsale.herokuapp.com/ajax/j-listado-productos.php'; //URL a la cual haré fetch

//Función asincrona para realizar el fetch a j-listado-productos
export const listadoProductos = async () => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        const data = new URLSearchParams();
        data.append('tipo', 'destacados');

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

        console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        const titulo = 'Productos Destacados'; //variable que almacenara el titulo a inyectar en conjunto a los productos
        insertarContenido(titulo, $template);

    } catch (error) {
        console.error(`Error ${error}`);
        document.getElementById('destacados').innerHTML = 'No hay productos para mostrar ahora mismo'; //En caso de existir un error, muestro ese texto para que no se caiga la app
    }
}

//Función asincrona para realizar el fetch a j-listado-productos, enviando como tipo = categorias y un idCategoria por POST
export const listadoProductosCategoria = async (idCategoria, nombreCategoria) => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        const data = new URLSearchParams();
        data.append('tipo', 'categoria');
        data.append('idCategoria', idCategoria);

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
        $destacados.innerHTML = 'No hay productos para mostrar en esta categoria'; //En caso de existir un error, muestro ese texto para que no se caiga la app
    }
}