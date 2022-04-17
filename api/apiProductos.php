<?php

include_once '../conexion/productos.php';

//Clase para invocar las funciones del archivo productos.php
class ApiProductos
{   
    //Función para obtener 6 productos aleatorios, los cuales se mostrarán en la página al cargar por primera vez
    public function getProductosDestacados()
    {
        $producto = new Productos(); //Primero creo una variable en la cual ire invocando la clase Productos para poder usar sus metodos
        
        $productos = []; //arreglo vacio en el cual iré almacenando los resultados

        $res = $producto->queryProductosDestacados(); //Variable que invoca la query de productosDestacados

        //Si hay datos, comienzo a procesarlos
        if ($res->num_rows > 0) {
            //Creo un while para iterar la respuesta
            while ($row = $res->fetch_assoc()) {
                //Por cada respuesta, creo un arreglo en el cual almacenaré sus datos
                $item = array(
                    'id' => $row['id'],
                    'nombre' => $row['name'],
                    'fotoUrl' => $row['url_image'],
                    'precio' => $row['price'],
                    'descuento' => $row['discount'],
                );
                //Hago un push de ese arreglo en el de productos
                array_push($productos, $item);
            }

            //Una vez termino de iterar, hago un echo del arreglo productos parseado a JSON
            echo json_encode($productos);
        } else {
            //En caso contrario, hago un echo con un arreglo que contiene el mensaje de error como JSON
            echo json_encode(array("mensaje" => "No hay datos"));
        }
    }

    //Función para obtener los productos filtrados por categoria
    //Estos se irán mostrando cada vez que el usuario haga click en una de las opciones del menu tienda
    public function getProductosCategoria($idCategoria)
    {
        $producto = new Productos(); //Primero creo una variable en la cual ire invocando la clase Productos para poder usar sus metodos
        
        $productos = []; //arreglo vacio en el cual iré almacenando los resultados

        $res = $producto->queryProductosCategoria($idCategoria); //Variable que invoca la query de productosCategoria

        //Si hay datos, comienzo a procesarlos
        if ($res->num_rows > 0) {
            //Creo un while para iterar la respuesta
            while ($row = $res->fetch_assoc()) {
                //Por cada respuesta, creo un arreglo en el cual almacenaré sus datos
                $item = array(
                    'id' => $row['id'],
                    'nombre' => $row['name'],
                    'fotoUrl' => $row['url_image'],
                    'precio' => $row['price'],
                    'descuento' => $row['discount'],
                );
                //Hago un push de ese arreglo en el de productos
                array_push($productos, $item);
            }

            //Una vez termino de iterar, hago un echo del arreglo productos parseado a JSON
            echo json_encode($productos);
        } else {
            //En caso contrario, hago un echo con un arreglo que contiene el mensaje de error como JSON
            echo json_encode(array("mensaje" => "No hay datos"));
        }
    }
}
