<?php

include_once 'db.php';

//Clase encargada de realizar las querys a la tabla de productos
class Productos extends DB
{
    public function queryProductosDestacados()
    {
        //Query para obtener 6 productos de la tabla product ordenados aleatoriamente
        //Estos seran los que se mostrarán la primera vez que cargue la página
        $queryProductos = "SELECT id, name, url_image, price, discount FROM product ORDER BY RAND() LIMIT 6";
        $execProductos  = $this->connect()->query($queryProductos);

        if($execProductos){
            //En caso de que se ejecute, hago un return de la query
            return $execProductos;
        } else {
            //Caso contrario, regreso un error
            return "ERROR";
        }
        
    }
}
