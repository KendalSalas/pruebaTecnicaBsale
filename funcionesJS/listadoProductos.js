import { insertarSpinner } from "./spinner.js";

//Archivo JS en el cual guardaré la función encargada de hacer fetch a listado-productos y listar los resultados en la página

const urlProductos = 'https://prueba-tecnica-bsale.herokuapp.com/ajax/j-listado-productos.php'; //URL a la cual haré fetch
const $destacados = document.getElementById('destacados'); //Referencio al main id destacados del HTML

//Función asincrona para realizar el fetch a j-listado-productos
export const listadoProductos = async () => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo un h4 al cual le daré el titulo de esta llamada
        const $h4 = document.createElement('h4');
        $h4.setAttribute('id', 'titulo-destacados');

        //creo un section al cual le pasaré los productos obtenidos del fetch
        const $section = document.createElement('section');
        $section.setAttribute('id', 'productos-destacados');

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

        $h4.innerHTML = 'Productos Destacados'; //Inyecto el titulo en el h4
        $section.innerHTML = $template; //Guardo todos los productos en el section
        $destacados.innerHTML = ''; //Limpio el main id destacados, para quitar el spinner
        $destacados.appendChild($h4); //Agrego el titulo
        $destacados.appendChild($section); //Agrego los productos

    } catch (error) {
        console.error(`Error ${error}`);
        $destacados.innerHTML = 'No hay productos para mostrar ahora mismo'; //En caso de existir un error, muestro ese texto para que no se caiga la app
    }
}

export const listadoProductosCategoria = async (idCategoria, nombreCategoria) => {
    let $template; //Variable que almacenará los resultados del fetch

    try {
        insertarSpinner(); //Inyecto el spinner en $destacados en lo que cargan los productos

        //Creo un h4 al cual le daré el titulo de esta llamada
        const $h4 = document.createElement('h4');
        $h4.setAttribute('id', 'titulo-destacados');

        //creo un section al cual le pasaré los productos obtenidos del fetch
        const $section = document.createElement('section');
        $section.setAttribute('id', 'productos-destacados');

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

        console.log(json);

        //La llamada me devuelve un undefined en el primer row, por lo cual lo elimino
        $template = $template.replaceAll('undefined', '');

        $h4.innerHTML = `Productos ${nombreCategoria}`; //Inyecto el titulo en el h4
        $section.innerHTML = $template; //Guardo todos los productos en el section
        $destacados.innerHTML = ''; //Limpio el main id destacados, para quitar el spinner
        $destacados.appendChild($h4); //Agrego el titulo
        $destacados.appendChild($section); //Agrego los productos

    } catch (error) {
        console.error(`Error ${error}`);
        $destacados.innerHTML = 'No hay productos para mostrar en esta categoria'; //En caso de existir un error, muestro ese texto para que no se caiga la app
    }
}