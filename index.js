import { listadoCategorias, listadoProductos, listadoProductosCategoria, listadoProductosNombre, listadoProductosOrden } from "./funcionesJS/index.js";

//Archivo en el cual iré importando las distintas funciones y las iré cargando a medida que sea necesario

const d = document;

const $formBuscarProducto = document.getElementById('buscar-producto');
//Invoco la funcion listadoCategorias, para llenar el menu de las categorias con las opciones desde la BBDD
listadoCategorias();

//Limpio el input filtro orden y el input-buscar por cada vez que se refresque la página
document.getElementById('filtro-orden').value = '';
document.getElementById('input-buscar').value = '';

d.addEventListener('DOMContentLoaded', () => {
    listadoProductos();
})

d.addEventListener('click', e => {
    if (e.target.matches('#menu-categorias .dropdown-item')) {
        e.preventDefault();
        const idCategoria = e.target.getAttribute('id-categoria');
        const nombreCategoria = e.target.getAttribute('nombre-categoria');

        // console.log(`Id Categoria: ${idCategoria} / Nombre Categoria: ${nombreCategoria}`);
        listadoProductosCategoria(idCategoria, nombreCategoria);
    }

    if (e.target.matches('#ul-orden-opt .orden-opt')) {
        e.preventDefault();
        //obtengo el tipo y el nombre del orden del elemento al que se clickeo, para determinar que productos debo ordenar y en base a que
        const listadoProductosActual = e.target.getAttribute('listado-productos'); //Listado de productos mostrados actualmente
        const tipoOrden = e.target.getAttribute('tipo-orden'); //Tipo de orden para la query

        const filtroOrden = document.getElementById('filtro-orden').value;
        console.log(listadoProductosActual, tipoOrden, filtroOrden);
        listadoProductosOrden(listadoProductosActual, tipoOrden, filtroOrden);
    }
})

$formBuscarProducto.addEventListener('submit', e => {
    e.preventDefault();
    const nombreBuscar = document.getElementById('input-buscar').value;
    listadoProductosNombre(nombreBuscar);
})

