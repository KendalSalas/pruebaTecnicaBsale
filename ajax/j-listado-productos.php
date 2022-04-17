<?php

//En este archivo haré uso del archivo apiCategorias, será consultado mediante fetch de JS
include_once '../api/apiCategorias.php';

$api = new ApiCategorias();
$api->getCategorias();
