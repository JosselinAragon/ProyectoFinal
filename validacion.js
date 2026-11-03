// programa para validar la seguridad de las contrasenias
// aqui comprobaremos que las contrasenias cumplan los requisitos

(function () {

    // CAPTURAR ELEMENTOS HTML

    const password = document.getElementById("input-pass");
    const confirmar = document.getElementById("input-confirmar"); 
    const btnGuardar = document.getElementById("btn-guardar");
    const btnEliminar =document.getElementById("btn-eliminar");
    const linkRecuperar = document.getElementById("link-recuperar");
    const mayus = document.getElementById("req-mayus");
    const minus = document.getElementById("req-minus");
    const numero = document.getElementById("req-num");
    const especial = document.getElementById("req-esp");
    const minimo = document.getElementById("req-min8");

    // creamos la seguridad

    const mensaje = document.createElement("p");
    password.parentElement.after(mensaje);

    mensaje.style.fontWeight = "bold";

    // mensaje de confirmacion

    const mensajeConfirmacion = document.createElement("p");
    confirmar.parentElement.after(mensajeConfirmacion);

    
    // Funcion para validar

    function comprobarSeguridad() {

        const valor = password.value;

        // comprobamos requisitos

        const tieneMayus = /[A-Z]/.test(valor);
        const tieneMinus = /[a-z]/.test(valor);
        const tieneNumero = /[0-9]/.test(valor);
        const tieneEspecial = /[@#$*!?]/.test(valor);
        const tieneMinimo = valor.length >= 8;

        // actualizar casillas

        mayus.checked = tieneMayus;
        minus.checked = tieneMinus;
        numero.checked = tieneNumero;
        especial.checked = tieneEspecial;
        minimo.checked = tieneMinimo;

        // Contar requisitos requeridos

        const puntos = [
            tieneMayus,
            tieneMinus,
            tieneNumero,
            tieneEspecial,
            tieneMinimo
        ].filter(Boolean).length;

        // clasificar la seguridad

        if (valor.length === 0) {

            mensaje.textContent = "";
            
        } else if (puntos <= 2) {

            mensaje.textContent = "Seguridad: Débil";

        } else if (puntos <= 4) {

            mensaje.textContent = "Seguridad: Media";

        } else {

            mensaje.textContent = "Seguridad: Fuerte";

        }

        return puntos === 5;

    }

    
    // Validamos la confirmacion
    

    function comprobarConfirmacion() {

        if (confirmar.value === "") {

            mensajeConfirmacion.textContent = "";

        } else if (password.value === confirmar.value) {

            mensajeConfirmacion.textContent = "Las contraseñas coinciden";

        } else {

            mensajeConfirmacion.textContent = "Las contraseñas no coinciden";

        }

    }

    
    // EVENTOS tiempo real

    password.addEventListener("input", function () {

        comprobarSeguridad();
        comprobarConfirmacion();

    });

    confirmar.addEventListener("input", comprobarConfirmacion);


    // BOTON MOSTRAR Y OCULTAR CONTRASEniA
    

    btnToggle.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

        } else {

            password.type = "password";

        }

    })
// 
// VALIDAR Y GUARDAR CONTRASENIA


btnGuardar.addEventListener("click", function () {

    if (!comprobarSeguridad()) {

        alert("La contraseña no cumple los requisitos de seguridad.");
        return;

    }

    if (password.value !== confirmar.value) {

        alert("Las contraseñas no coinciden.");
        return;

    }

    localStorage.setItem("user_password", password.value);

    alert("Contraseña guardada correctamente.");

});
// FUNCION PARA ELIMINAR CONTRASENIA


btnEliminar.addEventListener("click", function () {

    const confirmarEliminacion = confirm("¿Deseas eliminar la contraseña guardada?");

    if (confirmarEliminacion) {

        localStorage.removeItem("user_password");

        password.value = "";
        confirmar.value = "";

        comprobarSeguridad();
        comprobarConfirmacion();

        alert("Contrasenia eliminada correctamente.");

    }

});

// RECUPERAR CONTRASENIA


linkRecuperar.addEventListener("click", function () {

    const contraseñaRecuperada = localStorage.getItem("user_password");

    if (contraseñaRecuperada === null) {

        alert("No hay ninguna contraseña guardada.");
        return;

    }

    password.value = contraseñaRecuperada;
    confirmar.value = contraseñaRecuperada;

    comprobarSeguridad();
    comprobarConfirmacion();

    alert("Contraseña recuperada correctamente.");

});

})(); 