//ESTE CODIGO NOS SIRVE PARA CERAR CONSTANTES QUE CAPTUREAN LAS REFERENCIAS
//DE LOS ELEMENTOS HTML
const inputPass = document.getElementById('input-pass');
const btnToggle = document.getElementById('btn-toggle');
const inputUsuario = document.getElementById('input-usuario');
const btnGenerar = document.getElementById('btn-generar');
const btnGuardar = document.getElementById('btn-guardar');
const btnEliminar = document.getElementById('btn-eliminar');
const linkRecuperar = document.getElementById('link-recuperar');
//CAPTURAN LAS REFERENCIAS DE LAS CASILLAS DE VERIFICACION LOS CHECKBOXES
//INDICAN DE MANERA VISUAL SI CUMPLEN LOS REQUISITOS
const reqMayus = document.getElementById('req-mayus');
const reqMinus = document.getElementById('req-minus');
const reqNum = document.getElementById('req-num');
const reqEsp = document.getElementById('req-esp');
const reqMin8 = document.getElementById('req-min8');
let contraseniaGuardada = localStorage.getItem('user_password') || "";
//ACA HEMOS DECLARADO UNA VARIABLE MUTABLE LET QUE INTENTA RECUPERAR UNA CONTRASEÑA GUARDADA
//PREVIA DE LA MEMORIA DEL NAVEGADOR, Y EL LOCALSTORAGE, SINO ENCUENTRA UNA CONTRASEÑA
//LE ASIGNA POR DEFECTO UNA CADENA VACIA ""

function validarContrasenia() {//SE CREA UNA FUNCION PARA QUE VERIFIQUE EN TIEMPO REAL SI LA CONTRASEÑA CUMPLE
    //LOS REQUISITOS DE SEGURIDAD ESPECIFICADOS
    const valor = inputPass.value;//OBTIENE LA INFORMACION Y LEE LO QUE EL USUARIO HA ESCRITO
//VALIDAMOS LAS REGLAS CON EXPRESIONES O CARACTERES Y LONGITUD DESDE LA PAGINA
    const tieneMayus = /[A-Z]/.test(valor);
    const tieneMinus = /[a-z]/.test(valor);
    const tieneNum = /[0-9]/.test(valor);
    const tieneEsp = /[@#$.,:;!¡?¿_+\-*\/]/.test(valor); 
    const tieneMin8 = valor.length >= 8;

//ACTUALIZA SEGUN LA INFORMACION OBTENIDA EN TIEMPO REALY ASIGNA EL RESULATDO VERDADERO O FALSO A LA PROPIEDAD CHECK
    reqMayus.checked = tieneMayus;
    reqMinus.checked = tieneMinus;
    reqNum.checked = tieneNum;
    reqEsp.checked = tieneEsp;
    reqMin8.checked = tieneMin8;
//ESTA LINEA ES MUY IMPORTANTE YA QUE CIERRA LA FUNCION DEVOLVIENDO UN VALOR TRUE SI TODOS LOS VALORES SON VERDADEROS
    return (tieneMayus && tieneMinus && tieneNum && tieneEsp && tieneMin8);
}//EL INPUTPASS ES LA PRINCIPAL CASILLA DE TEXTO DONDE EL USUARIO ESCRIBE SU CONTRASEÑA Y SE LE ASIGNA UN EVENTO DE INPUT
inputPass.addEventListener('input', validarContrasenia);//INMEDIATAMENTE EJECUTA LA FUNCION DE REVISION QUE HICIMOS ARRIBA
//CON ESTA LINEA NO SE ESPERA A QUE TERMINES LA CONTRASEÑA PARA SABER SI ESTA CORRECTA, SINO QUE 
//MIENTRAS VAS ESCRIBIENDO LO VA REVISANDO LETRA POR LETRA
btnGenerar.addEventListener('click', () => {
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const especiales = "@#$*!?";

    let contraseniaGenerada = "";//ES UN ESPACIO VACIO DONDE SE VA IR ESCRIBIENDO LA CONTRASEÑA GENERADA
    let intentoCorrecto = false; //ESTA ES LA VARIABLE QUE SE UTILIZA PARA CONTROLAR EL BUCLE WHILE,
    //INICIALEMNTE ES FALSA POR QUE AUN NO SE HA GENERADO NINGUNA CONTRASEÑA.

    // ESTE ES EL BUCLE LOGICO QUE SOLAMENTE PERMITE SALIR HASTA QUE HAYA GENERADO UNA CONTRASEÑA CON TODOS LOS REQUISITOS.
    while (!intentoCorrecto) {//
        let caracteresPool = [];
        
        //ESTE CODIGO ES PARA GARARNTIZAR DE FORMA OBLIGATORIA
        //QUE LA CONTRASEÑA CUMPLA CON 1 CARACTER DE CADA TIPO.
        caracteresPool.push(mayusculas[Math.floor(Math.random() * mayusculas.length)]);
        caracteresPool.push(minusculas[Math.floor(Math.random() * minusculas.length)]);
        caracteresPool.push(numeros[Math.floor(Math.random() * numeros.length)]);
        caracteresPool.push(especiales[Math.floor(Math.random() * especiales.length)]);

        //CON ESTE COGIGO PODEMOS AYUDAR EL USUARIO A GENERAR UN AJEMPLO DE UNA CONTRSEÑA
        //QUE CUMPLA CON TODOS LOS REQUISITOS 
        const todosLosCaracteres = mayusculas + minusculas + numeros + especiales;
        for (let i = 0; i < 4; i++) {//ESTE BUCLE AGREGA 4 CARACTERES PARA HACERLA MAS SEGURA Y MAS LARGA
            caracteresPool.push(todosLosCaracteres[Math.floor(Math.random() * todosLosCaracteres.length)]);
        }//MEZCLA LOS CARACTERES DE FORMA ALEATORIA Y LOS UNE EN UNA CADENA
        contraseniaGenerada = caracteresPool.sort(() => Math.random() - 0.5).join('');
        inputPass.value = contraseniaGenerada;
        //ESTA PARTE LO QUE HACE ES TOMAR LA CONTRASEÑA GENERADA Y MOSTRARLA EN LA CAJITA DE TEXTO DE LA PANTALLA PARA QUE EL USUARIO LA VEA

        if (validarContrasenia()) {//POR ULTIMO ESTA LINEA DE CODIGO LO QUE HACE ES QUE LLAMA LA VALIDACION DE LA CONTRASEÑA
            intentoCorrecto = true;//Y CAMBIA EL ESTADO PARA ROMPER EL CICLO
        }//EN CASO DE QUE NO SE CUMPLA SE REPETIRA EL CICLO HASTA SE CUMPLA Y E GENERE UNA CONTRASEÑA SEGURA
    }
});
