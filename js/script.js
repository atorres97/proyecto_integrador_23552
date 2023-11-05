//Valor del ticket
const valorTicket = 200;

//Categorias de descuentos
let descuentoEstudiante = 80;
let descuentoTrainee = 50;
let descuentoJunior = 15;

// Variables de los elementos del formulario
let nombre = document.getElementById("nombre");
let divErrorNombre = document.getElementById("mensajeErrorNombre");
let apellido = document.getElementById("apellido");
let divErrorApellido = document.getElementById("mensajeErrorApellido");
let mail = document.getElementById("mail");
let divErrorMail = document.getElementById("mensajeErrorMail");
let cantidadTickets = document.getElementById("cantidadTickets");
let mensajeErrorCantTickets = document.getElementById("mensajeErrorCantTickets");
let categoria = document.getElementById("categoriaSelect");
let mensajeErrorCategoria = document.getElementById("mensajeErrorCategoria");

// Función quitar todos los estilos de error en los campos que los tuvieran.
const quitarClaseError = () => {
    let listaNodos = document.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < listaNodos.length; i++) {
        listaNodos[i].classList.remove('is-invalid');
    }
    let listaNodosdiv = document.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < listaNodosdiv.length; i++) {
        listaNodosdiv[i].classList.remove('mostrarError');
    }
}
//Calculo total a pagar
const totalAPagar = () => { 
        quitarClaseError();
        // Valida campos en Nombre, Apellido y Correo, si no hay datos correctos se aplica un estilo de error, hace foco en el campo en cuestion y se detiene la funcion.
        if (nombre.value === "") {
            nombre.classList.add("is-invalid");
            divErrorNombre.classList.add("mostrarError");
            nombre.focus();
            return;
        }
        if (apellido.value === "" ) {
            apellido.classList.add("is-invalid");
            divErrorApellido.classList.add("mostrarError");
            apellido.focus();
            return;
        }
        if (mail.value === "") {
            mail.classList.add("is-invalid");
            divErrorMail.classList.add("mostrarError");
            mail.focus();
            return;
        }
        // Funcion para verificar si el e-mail es valido (no valida dominios)
        const emailValido = mail => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
        }
        if (!emailValido(mail.value)) {
            mail.classList.add("is-invalid");
            divErrorMail.classList.add("mostrarError");
            mail.focus();
            return;
        }
        // Valida la seleccion de por lo menos 1 tkt, si no hay datos correctos se aplica un estilo de error, hace foco en el campo y se detiene la funcion.
        if ( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value)) ) {
            cantidadTickets.classList.add("is-invalid");
            mensajeErrorCantTickets.classList.add("mostrarError");
            cantidadTickets.focus();
            return;
        }
        // Valida la seleccion de una categoría, si no hay datos correctos se aplica un estilo de error, hace foco en el campo y se detiene la funcion.
        if (categoria.value == "") {
            categoria.classList.add("is-invalid");
            mensajeErrorCategoria.classList.add("mostrarError");
            categoria.focus();
            return;
        }
        //
        let totalValorTickets = (cantidadTickets.value) * valorTicket;
        switch (categoria.value) {
            case "0":
                totalValorTickets = totalValorTickets ;
                break;
            case "1":
                totalValorTickets = totalValorTickets - (descuentoEstudiante / 100 * totalValorTickets);
                break;
            case "2":
                totalValorTickets = totalValorTickets - (descuentoTrainee / 100 * totalValorTickets);
                break;
            case "3":
                totalValorTickets = totalValorTickets - (descuentoJunior / 100 * totalValorTickets);
                break;
        }
        // Inserta el valor en el HTML
        totalPago.innerHTML = totalValorTickets;
    }
    botonResumen.addEventListener('click', totalAPagar);
    // Función para el botón Borrar para que borre el valor
    const resetTotalAPagar = () => {
        quitarClaseError();
        totalPago.innerHTML = "";
    }
    botonBorrar.addEventListener('click', resetTotalAPagar);