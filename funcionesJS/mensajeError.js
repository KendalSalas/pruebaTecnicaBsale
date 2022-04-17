//Funcion para inyectar un mensaje de error

//Creo un H5 con un id error-msj
const $errMsj = document.createElement('h5');
$errMsj.setAttribute('id', 'error-msj');


export const mensajeError = (mensaje) => {
    $errMsj.innerHTML = mensaje;
    document.getElementById('destacados').appendChild($errMsj);
}