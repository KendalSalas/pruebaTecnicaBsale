import { listadoCategorias, listadoProductos, listadoProductosCategoria, listadoProductosNombre, listadoProductosOrden } from "./funcionesJS/index.js";

//Archivo en el cual iré importando las distintas funciones y las iré cargando a medida que sea necesario

const d = document;

const $formBuscarProducto = document.getElementById('buscar-producto');
//Invoco la funcion listadoCategorias, para llenar el menu de las categorias con las opciones desde la BBDD
listadoCategorias();

d.addEventListener('DOMContentLoaded', () => {
    listadoProductos();
})

d.addEventListener('click', e => {
    if(e.target.matches('#menu-categorias .dropdown-item')){
        e.preventDefault();
        const idCategoria = e.target.getAttribute('id-categoria');
        const nombreCategoria = e.target.getAttribute('nombre-categoria');

        // console.log(`Id Categoria: ${idCategoria} / Nombre Categoria: ${nombreCategoria}`);
        listadoProductosCategoria(idCategoria, nombreCategoria);
    }

    if(e.target.matches('#ul-orden-opt .orden-opt')){
        e.preventDefault();
        //obtengo el tipo y el nombre del orden del elemento al que se clickeo, para determinar que productos debo ordenar y en base a que
        const tipoOrden = e.target.getAttribute('tipo');
        const nombreOrden = e.target.getAttribute('orden');

        console.log(nombreOrden, tipoOrden);
        listadoProductosOrden(nombreOrden, tipoOrden);
    }
})

$formBuscarProducto.addEventListener('submit', e => {
    e.preventDefault();
    const nombreBuscar = document.getElementById('input-buscar').value;
    listadoProductosNombre(nombreBuscar);
})

