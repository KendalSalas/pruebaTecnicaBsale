<?php
include_once 'db.php';

//Clase para hacer una query a la tabla 'category'
class Categorias extends DB
{
    public function queryCategorias()
    {
        $queryCategorias = "SELECT * FROM category";
        $execCategorias  = $this->connect()->query($queryCategorias);

        //Si la query se realiza correctamente, hago un return de esta
        if ($execCategorias) {
            return $execCategorias;
        } else {
            //Caso contrario, retorno un error
            return "ERROR";
        }
    }
}
