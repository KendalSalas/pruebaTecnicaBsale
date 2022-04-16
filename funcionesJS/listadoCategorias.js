//Archivo JS donde almacenare la funcion para hacer fetch a j-listado-categorias
//Y poder listar las categorias de forma asincrona y dinamica desde la BBDD
const urlCategorias = 'http://localhost/pruebaTecnicaBsale/ajax/j-listado-categorias.php'; //URL a la cual haré fetch
const $menuCategorias = document.getElementById('menu-categorias'); //Referencia al menu-categorias de HTML

//Funcion asincrona para obtener el JSON de j-listado-categorias.php
export const listadoCategorias = async () => {
    let $li; //Creo una variable en la cual iré almacenando las respuestas para luego inyectarla en $menuCategorias

    try {
        //Variable donde almacenaré la respuesta del fetch
        const res = await fetch(urlCategorias, {
            method: 'POST',
        })

        //Variable que almacenará la respuesta parseada a JSON
        const json = await res.json();

        //En caso de que el JSON haya retornado un mensaje = 'No hay datos', lanzo el catch
        if(json.mensaje == 'NO HAY DATOS'){
            throw new Error("No hay resultados para la consulta")
        }

        //Hago un map para iterar la respuesta como JSON y obtener sus datos
        json.map(categoria => {
            const { id, nombre } = categoria; //Obtengo el id y el nombre de la categoria
            
            //Creo un li con el id y el nombre de la categoria y lo almaceno en una variable
            $li += `<li><a class="dropdown-item" href="#" id-categoria='${id}' nombre-categoria='${nombre}'>${nombre}</a></li>`;

        })

        //La respuesta me trae un undefined en el primer valor, por lo que hago un replaceAll para limpiarlo
        $li = $li.replaceAll('undefined', '');

        //Inserto  la variable $li en el menu de categorias
        $menuCategorias.innerHTML = $li;
        // console.error('Error' + err);
    } catch (error) {
        console.error(error);
    }
}