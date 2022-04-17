<?php

include_once '../conexion/productos.php';

class ApiProductosOrden
{

    //Función para obtener los resultados de los productos ordenados
    //Estos se mostrarán cuando el usuario haga click en una de las opciones para ordenar
    public function getProductosOrden($nombreOrden, $tipoOrden)
    {
        $producto = new Productos(); //Primero creo una variable en la cual ire invocando la clase Productos para poder usar sus metodos

        $productos = []; //arreglo vacio en el cual iré almacenando los resultados

        $res = $producto->queryProductosOrden($nombreOrden, $tipoOrden); //Variable que invoca la query de productosNombre

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
