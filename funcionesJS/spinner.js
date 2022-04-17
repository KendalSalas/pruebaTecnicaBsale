//Creo una variable para almacenar un spinner 
const $spinner = `<div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                 </div>`;

//Función para inyetar el spinner en el main mientras cargan los producto
export const insertarSpinner = () => {
    document.getElementById('destacados').innerHTML = $spinner;
}