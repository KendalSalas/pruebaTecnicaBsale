<?php

include_once '../api/apiProductosOrden.php';

$api = new ApiProductosOrden();

//Variable que almacenará los productos que estoy listando actualmente (destacados / categoria / resultados)
//Esto para poder ordenar los productos de ese listado
$ordenProductos = $_POST['ordenProductos']; 

$tipoOrden = $_POST['tipoOrden']; //Variable que almacenará el tipo de orden para la query, puede ser nombre o precio

if($ordenProductos != '' && $tipoOrden != ''){
    $api->getProductosOrden($ordenProductos, $tipoOrden);
}