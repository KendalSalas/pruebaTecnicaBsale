import { listadoCategorias, listadoProductos, listadoProductosCategoria } from "./funcionesJS/index.js";

//Archivo en el cual iré importando las distintas funciones y las iré cargando a medida que sea necesario

const d = document;

//Invoco la funcion listadoCategorias, para llenar el menu de las categorias con las opciones desde la BBDD
listadoCategorias();

d.addEventListener('DOMContentLoaded', () => {
    listadoProductos();
})

d.addEventListener('click', e => {
    if(e.target.matches('.dropdown-item')){
        e.preventDefault();
        const idCategoria = e.target.getAttribute('id-categoria');
        const nombreCategoria = e.target.getAttribute('nombre-categoria');

        console.log(`Id Categoria: ${idCategoria} / Nombre Categoria: ${nombreCategoria}`);
    }
})