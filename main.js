//ESTE CODIGO NOS SIRVE PARA CONECTAR EL COGIGO CON
//LA PAGINA WEB
const inputPass = document.getElementById('input-pass');
const btnToggle = document.getElementById('btn-toggle');
const inputUsuario = document.getElementById('input-usuario');
const btnGenerar = document.getElementById('btn-generar');
const btnGuardar = document.getElementById('btn-guardar');
const btnEliminar = document.getElementById('btn-eliminar');
const linkRecuperar = document.getElementById('link-recuperar');

const reqMayus = document.getElementById('req-mayus');
const reqMinus = document.getElementById('req-minus');
const reqNum = document.getElementById('req-num');
const reqEsp = document.getElementById('req-esp');
const reqMin8 = document.getElementById('req-min8');
let contraseniaGuardada = localStorage.getItem('user_password') || "";