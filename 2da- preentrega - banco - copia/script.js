/* ====================================
   ===          pantallas           ===
   ====================================
*/

// obtención de pantallas principales
let formPantallaSignup = document.getElementById("signup");
let formPantallaLogin = document.getElementById("Login");
let pantallaMain = document.getElementById("main");

// definicion de estados
let mostrar = "block";
let ocultar = "none";
// obtención de componentes
// alert success deny
let alertDiv = document.getElementById("alertDiv");
// inicialización de pantallas
formPantallaSignup.style.display = ocultar;
formPantallaLogin.style.display = ocultar;
pantallaMain.style.display = ocultar;

// obtención y asignación de botones
let btnOpcionSignup = document.getElementById("btnSignup");
let btnOpcionLogin = document.getElementById("btnLogin");

// opción elegida registro
let registrarse = btnOpcionSignup.addEventListener("click", () => {
  formPantallaSignup.style.display = mostrar;
  formPantallaLogin.style.display = ocultar;
});
// opción elegida ingreso
let ingresar = btnOpcionLogin.addEventListener("click", () => {
  formPantallaLogin.style.display = mostrar;
  formPantallaSignup.style.display = ocultar;
});
// obtención de boton de accion registrarse
let btnAccionSignup = document.getElementById("accionRegistrarse");
let btnAccionLogin = document.getElementById("accionLogin");
// obtención boton transferir
let btnAccionTransferir = document.getElementById("enviarTransferencia");
// definición de alertas
let danger = "danger";
let success = "success";
let warning = "warning";
let movimiento = "light";
let divNotis = document.getElementById("movimientosRecientes");

// definicion de mensajes de alerta
function alertMsg(type, msg) {
  return `<div class="alert alert-${type}" role="alert">
  ${msg}
</div>`;
}

/* ====================================
   === creación de listas y objetos ===
   ====================================
*/

// lista de usuarios
let usuarios = [];

// creación de objetos
class Usuario {
  constructor(DNI, nombre, contraseña, saldo, operaciones) {
    this.DNI = DNI;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.saldo = 0;
    this.operaciones = [];
  }
}

/* ====================================
   ===           SIGNUP             ===
   ====================================
*/

// asignación de evento signup
btnAccionSignup.addEventListener("click", () => {
  let DNI = document.getElementById("DNI").value;
  let nombre = document.getElementById("name").value;
  let contraseña = document.getElementById("password").value;
  event.preventDefault();

  // Verifica si el DNI ya existe en la lista de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].DNI === DNI) {
      // si ya existe un DNI en la lista no es posible realizar el registro
      alertDiv.innerHTML = alertMsg(
        danger,
        "Ya existe una cuenta con ese DNI, no es posible realizar el registro. 🙅‍♂️"
      );

      // Detener el registro
      return;
    }
  }

  // Crea un nuevo objeto "usuario"
  const usuario = new Usuario(DNI, nombre, contraseña);

  // Agregar el usuario a la lista si cumple condición
  if (
    DNI === "" ||
    DNI.length !== 8 ||
    nombre === "" ||
    contraseña === "" ||
    contraseña.length < 8
  ) {
    alertDiv.innerHTML = alertMsg(
      warning,
      `Por favor, complete todos los campos de forma correcta<br>
      <u>Recordá</u>
      <li>El DNI debe tener 8 dígitos</li>
      <li>La contraseña debe tener al menos 8 caractéres</li>`
    );
  } else {
    usuarios.push(usuario);

    cargarUsuariosALocalStorage()
    alertDiv.innerHTML = alertMsg(
      success,
      "Te has registrado de forma exitosa 👌, ya podes ingresar🔥"
    );
   
  }
});
// guarda user en usuarios en LS
function cargarUsuariosALocalStorage() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
// trae user de usuarios en ls
function traerUsuariosdeLocalStorage() {
  const usuariosGuardados = localStorage.getItem('usuarios');
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
  } else {
    // si no esta guardado se inicializa vacio
    usuarios = [];
  }
}


// ==============================================================================



/* ====================================
   ===           lOGIN              ===
   ====================================
*/

// obtención de inputs Login

btnAccionLogin.addEventListener("click", () => {
  const DNILogin = document.getElementById("dniLogin").value;
  const passLogin = document.getElementById("passLogin").value;
  event.preventDefault();

  traerUsuariosdeLocalStorage() // trae los usuarios de LS
  usuarios.forEach((usuario) => {
    if (usuario.DNI === DNILogin && usuario.contraseña === passLogin) {

      // esconde formularios
      formPantallaLogin.style.display = ocultar;
      btnOpcionLogin.style.display = ocultar;
      btnOpcionSignup.style.display = ocultar;
      // muestra pantalla principal
      pantallaMain.style.display = mostrar;
    
      // saluda
      saludo(usuario);
      // da regalo
      usuario.saldo = regaloNuevaCuenta(usuario);

// ================================================================

/* ====================================
   ===        transferencias        ===
   ====================================
*/
      // accion transferencia
      btnAccionTransferir.addEventListener("click", () => {
        // obtención de datos
        let monto = parseInt(document.getElementById("monto").value);
        let destino = document.getElementById("alias").value;

        event.preventDefault();
        if (monto === "" || monto < 0 || destino === "") {
          alertDiv2.innerHTML = alertMsg(
            danger,
            "Los campos deben estar llenos"
          );
        } else {
          if (monto > usuario.saldo) {
            alertDiv2.innerHTML = alertMsg(
              danger,
              "No es posible realizar la operación, el monto es mayor al saldo actual"
            );
          } else {
            usuario.saldo -= monto;
            event.preventDefault();

            alertDiv2.innerHTML = alertMsg(success, "Operación exitosa");
            monto.innerHTML = ""
            destino.innerHTML = ""

            // se crea el objeto operacion
            const operacion = {
              tipo: "Transferencia",
              destino: destino,
              monto: monto,
            };

            const listaDeOperaciones = usuario.operaciones;
            // se guarda en la lista de operaciones del usuario
            listaDeOperaciones.push(operacion);

            // Actualizar la lista de operaciones en el elemento "divNotis"
            let listaMovimientosRealizados = "<ul>";
            for (const operacion of listaDeOperaciones) {
              listaMovimientosRealizados += alertMsg(
                movimiento,
                `Enviaste una ${operacion.tipo} a <b>${operacion.destino}</b> por <span class ="montoDescontado">-$${operacion.monto}</span>`
              );
            }
            listaMovimientosRealizados += "</ul>";
            divNotis.innerHTML = listaMovimientosRealizados;

            muestraDineroActual(usuario.saldo);
          }
        }
      });

      return;
    }
  });
});
/* ====================================
   ===   funciones main account     ===
   ====================================
*/

function saludo(User) {
  let user = User;
  // ubica div "saludo"
  let divSaludo = document.getElementById("saludo");
  divSaludo.innerHTML = `<h1>Bienvenido ${user.nombre}</h1>`;
}

function muestraDineroActual(user) {
  let montoActual = user;
  let divMontoActual = document.getElementById("saldoActual");
  divMontoActual.innerHTML = `<div class="container monto">
                                  $${montoActual}
                              </div>`;
  return montoActual.saldo;
}
function regaloNuevaCuenta(user) {
  let montoActual = user.saldo;

  montoActual = montoActual + 500;



  let notiRegalo = alertMsg(
    success,
    "Te regalamos $500 por registrarte con nosotros"
  );

  divNotis.innerHTML = notiRegalo;
  muestraDineroActual(montoActual);
  return montoActual;
}
