<?php

//En este archivo invocaré la función getCategorias, este es el que recibirá la llamada del fetch desde JS
include_once '../api/apiCategorias.php';

$api = new ApiCategorias();
$api->getCategorias();
