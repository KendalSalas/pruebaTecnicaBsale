<?php

include_once '../api/apiProductosOrden.php';

$api = new ApiProductosOrden();

//Variable que almacenará los productos que estoy listando actualmente (todos / categoria / resultados)
//Esto para poder ordenar los productos de ese listado
$listadoProductos = $_POST['listadoProductos']; 

$tipoOrden = $_POST['tipoOrden']; //Variable que almacenará el tipo de orden para la query, puede ser nombre o precio

if($listadoProductos != '' && $tipoOrden != ''){
    $api->getProductosOrden($listadoProductos, $tipoOrden);
}