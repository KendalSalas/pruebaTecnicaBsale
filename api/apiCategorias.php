<?php

include_once '../conexion/categorias.php';

//Clase para invocar la funcion queryCategorias y procesarla
class ApiCategorias
{
    public function getCategorias()
    {
        //Creo un objeto para invocar la funcion queryCategorias
        $categoria = new Categorias();

        //Creo un arreglo vacio en donde iré almacenando las respuestas de esta en caso de existir, sino almacenar un mensaje de error
        $categorias = [];

        //Invoco la queryCategorias
        $res = $categoria->queryCategorias();

        //Si se ejecuta y hay resultados, comienzo a trabajalos
        if ($res->num_rows > 0) {
            //Hago un while para recorrer todos los resultados
            while ($row = $res->fetch_assoc()) {
                //Voy almacenando cada respuesta en un arreglo individual, en el cual guardare su ID y su Nombre, para poder mostrarlo en el listado
                $item = array(
                    'id' => $row['id'],
                    'nombre' => $row['name'],
                );

                //Hago un push del arr item hacia el arreglo categorias
                array_push($categorias, $item);
            }

            //Hago un echo al arreglo categorias parseado como JSON, para trabajarlo comodamente con JS
            echo json_encode($categorias);
        } else {
            //Caso contrario, regreso el arreglo con un mensaje de error como JSON
            echo json_encode(array("mensaje" => "No hay productos en esa categoria"));
        }
    }
}
