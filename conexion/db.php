<?php

class DB
{
    private $host;
    private $db;
    private $user;
    private $password;
    private $charset;

    public function __construct()
    {
        //Creo las variables con los datos necesarios para realizar la conexion a la BBDD
        $this->host     = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
        $this->db       = 'bsale_test';
        $this->user     = 'bsale_test';
        $this->password = 'bsale_test';
        $this->charset  = 'utf-8';
    }

    public function connect()
    {
        try {
            //Creo la variable de conexion
            $conn = new mysqli($this->host, $this->user, $this->password, $this->db);

            //En caso de existir un error, lanzo al catch con el mensaje de error
            if ($conn->error) {
                throw new Exception("Error al conectar: " . $conn->error);
            }

            //Seteo el charset de la conexion a utf8 para evitar problemas al traer productos con simbolos en el nombre
            if (!mysqli_set_charset($conn, "utf8")) {
                exit();
            }

            //Devuelvo la variable de conexion
            return $conn;
        } catch (Exception $e) {
            //Hago un echo con el mensaje de error
            echo ("ERROR: " . $e->getMessage());
        }
    }
}
