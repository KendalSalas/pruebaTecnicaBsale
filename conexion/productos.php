<?php

include_once 'db.php';

//Clase encargada de realizar las querys a la tabla de productos
class Productos extends DB
{
    //Query para obtener los  productos de la tabla product ordenados por ID (anteriormente aleatorio, pero hice el cambio para poder utilizar la funcion de orden)
    //Estos seran los que se mostrarán la primera vez que cargue la página
    public function queryProductos()
    {
        $queryProductos = "SELECT id, name, url_image, price, discount FROM product ORDER BY id ASC";
        $execProductos  = $this->connect()->query($queryProductos);

        if ($execProductos) {
            //En caso de que se ejecute, hago un return de la query
            return $execProductos;
        } else {
            //Caso contrario, regreso un error
            return "ERROR";
        }
    }

    //Query para obtener los productos de una categoria en especifico
    //Estos seran cargados una vez el usuario haga click en una de las categorias del menu tienda
    public function queryProductosCategoria($idCategoria)
    {
        $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE category = $idCategoria";
        $execProductos  = $this->connect()->query($queryProductos);

        if ($execProductos) {
            //En caso de que se ejecute, hago un return de la query
            return $execProductos;
        } else {
            //Caso contrario, regreso un error
            return "ERROR";
        }
    }

    //Query para buscar productos en base a su nombre
    //Estos seran cargados una vez el usuario utilice el campo de buscar
    public function queryProductosNombre($nombre)
    {
        $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE name LIKE '%$nombre%'";
        $execProductos  = $this->connect()->query($queryProductos);

        if ($execProductos) {
            //En caso de que se ejecute, hago un return de la query
            return $execProductos;
        } else {
            //Caso contrario, regreso un error
            return "ERROR";
        }
    }

    //Query para ordenar los productos
    //El orden será en base al listado que estoy mostrando y el orden que solicite el usuario
    public function queryProductosOrden($listadoProductos, $tipoOrden, $filtroOrden = '')
    {
        if ($listadoProductos == 'todos') {
            if ($tipoOrden == 'nombre') {
                $queryProductos = "SELECT id, name, url_image, price, discount FROM product ORDER BY name ASC";
                $execProductos  = $this->connect()->query($queryProductos);

                if ($execProductos) {
                    //En caso de que se ejecute, hago un return de la query
                    return $execProductos;
                } else {
                    //Caso contrario, regreso un error
                    return "ERROR";
                }
            } else if ($tipoOrden == 'precio') {
                $queryProductos = "SELECT id, name, url_image, price, discount FROM product ORDER BY price ASC";
                $execProductos  = $this->connect()->query($queryProductos);

                if ($execProductos) {
                    //En caso de que se ejecute, hago un return de la query
                    return $execProductos;
                } else {
                    //Caso contrario, regreso un error
                    return "ERROR";
                }
            } else {
                return "ERROR TIPO ORDEN $tipoOrden";
            }
        } else if ($listadoProductos == 'categoria') {
            if ($filtroOrden != '') {
                if ($tipoOrden == 'nombre') {
                    $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE category = $filtroOrden ORDER BY name ASC";
                    $execProductos  = $this->connect()->query($queryProductos);

                    if ($execProductos) {
                        //En caso de que se ejecute, hago un return de la query
                        return $execProductos;
                    } else {
                        //Caso contrario, regreso un error
                        return "ERROR";
                    }
                } else if ($tipoOrden == 'precio') {
                    $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE category = $filtroOrden ORDER BY price ASC";
                    $execProductos  = $this->connect()->query($queryProductos);

                    if ($execProductos) {
                        //En caso de que se ejecute, hago un return de la query
                        return $execProductos;
                    } else {
                        //Caso contrario, regreso un error
                        return "ERROR";
                    }
                } else {
                    return "ERROR TIPO ORDEN $tipoOrden";
                }
            } else {
                return "ERROR CATEGORIA ORDENAR, NO LLEGO CATEGORIA";
            }
        } else if ($listadoProductos == 'nombre') {
            if ($filtroOrden != '') {
                if ($tipoOrden == 'nombre') {
                    $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE name LIKE '%$filtroOrden%' ORDER BY name ASC";
                    $execProductos  = $this->connect()->query($queryProductos);

                    if ($execProductos) {
                        //En caso de que se ejecute, hago un return de la query
                        return $execProductos;
                    } else {
                        //Caso contrario, regreso un error
                        return "ERROR";
                    }
                } else if ($tipoOrden == 'precio') {
                    $queryProductos = "SELECT id, name, url_image, price, discount FROM product WHERE name LIKE '%$filtroOrden%' ORDER BY price ASC";
                    $execProductos  = $this->connect()->query($queryProductos);

                    if ($execProductos) {
                        //En caso de que se ejecute, hago un return de la query
                        return $execProductos;
                    } else {
                        //Caso contrario, regreso un error
                        return "ERROR";
                    }
                } else {
                    return "ERROR TIPO ORDEN $tipoOrden";
                }
            } else {
                return "ERROR RESULTADOS POR NOMBRE AL ORDENAR, NO LLEGO EL FILTRO";
            }
        } else {
            return "ERROR LISTADO PRODUCTOS $listadoProductos";
        }
    }
}
