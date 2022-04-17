<?php

include_once 'db.php';

class Productos extends DB
{
    public function queryProductosDestacados()
    {
        $queryProductos = "SELECT id, name, url_image, price, discount FROM product ORDER BY RAND() LIMIT 6";
        $execProductos  = $this->connect()->query($queryProductos);

        return $execProductos;
    }
}
