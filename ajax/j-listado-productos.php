<?php

//En este archivo haré uso del archivo apiCategorias, será consultado mediante fetch de JS
include_once '../api/apiProductos.php';

$api = new ApiProductos();
$api->getProductosDestacados();
