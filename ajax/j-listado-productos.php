<?php

//En este archivo haré uso del archivo apiCategorias, será consultado mediante fetch de JS
include_once '../api/apiProductos.php';

$api = new ApiProductos();

//Hago un filtro por el tipo de carga que necesito, para mostrar los destacados, los productos por categoria o los resultados de busqueda
if ($_POST['tipo'] == 'destacados') {
    $api->getProductosDestacados();
} else if($_POST['tipo'] == 'categoria'){
    $idCategoria = $_POST['idCategoria'];

    if($idCategoria > 0){
        $api->getProductosCategoria($idCategoria);
    } else {
        echo json_encode(array("mensaje" => "No hay productos para mostrar en esta categoria"));
    }
} else if($_POST['tipo'] == 'nombre'){
    $nombre = $_POST['nombre'];

    if($nombre != ''){
        $api->getProductosNombre($nombre);
    } else {
        echo json_encode(array("mensaje" => "Debe ingresar un valor para buscar"));
    }
}
