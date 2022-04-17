<?php

include_once '../api/apiProductosOrden.php';

$api = new ApiProductosOrden();

//Variable que almacenará los productos que estoy listando actualmente (todos / categoria / resultados)
//Esto para poder ordenar los productos de ese listado
$listadoProductos = $_POST['listadoProductos'];

$tipoOrden = $_POST['tipoOrden']; //Variable que almacenará el tipo de orden para la query, puede ser nombre o precio

if ($listadoProductos != '' && $tipoOrden != '') {

    if (isset($_POST['filtroOrden']) && $_POST['filtroOrden'] != '') {
        $filtroOrden = $_POST['filtroOrden'];

        if($listadoProductos == 'categoria' || $listadoProductos == 'nombre'){
            $api->getProductosOrden($listadoProductos, $tipoOrden, $filtroOrden);
        } 
    } else {
        $api->getProductosOrden($listadoProductos, $tipoOrden);
    }
}
