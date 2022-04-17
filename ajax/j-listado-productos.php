<?php

//En este archivo haré uso del archivo apiCategorias, será consultado mediante fetch de JS
include_once '../api/apiProductos.php';

$api = new ApiProductos();

//Hago un filtro por el tipo de carga que necesito, para mostrar los destacados, los productos por categoria o los resultados de busqueda
if ($_POST['tipo'] == 'destacados') {
    $api->getProductosDestacados();
}
