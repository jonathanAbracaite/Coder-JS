function ingresarAppBanco() {
  menuPrincipalApp();
}
function menuPrincipalApp() {
  let opcionElegida = Number(eleccionMainApp());
  if (opcionElegida == eligeRegistrarse()) {
    signup();
  } else if (opcionElegida == eligeIngresar()) {
    login();
  } else {
    alert("no ingresaste una opción valida");
  }
}
function eleccionMainApp() {
  let opcionElegida = prompt(`
                                === BIENVENIDO AL BANCO APP ===\n\n
                                ¿Qué desea realizar? \n
                                ● Registrarse (1)\n 
                                ● Ingresar (2)`);
  return opcionElegida;
}
function eligeRegistrarse() {
  return 1;
}
function eligeIngresar() {
  return 2;
}
function signup() {
  const userName = prompt(
    "ingrese el nombre de usuario que desea tener en su cuenta: "
  );
  const password = prompt("ingrese la contraseña de la cuenta: ");
  validacionDeDatosSignup(userName, password);
  menuPrincipalApp();
}
function validacionDeDatosSignup(name, pass) {
  if (name !== "" && pass !== "") {
    alert(
      "Excelente, se confirmará su registro en las siguientes 24hs habiles"
    );
  } else {
    alert("Debés intentar de nuevo, recordá rellenar los campos correctamente");
    menuPrincipalApp();
  }
}
function login() {
  const userRegistrado = "beto";
  const passRegistrado = "123";
  let userLogin = prompt("ingrese su usuario: ");
  let passLogin = prompt("ingrese su contraseña: ");

  validacionDeDatosLogin(userLogin, userRegistrado, passLogin, passRegistrado);

  menuDeOperaciones();
}
function validacionDeDatosLogin(name, nameReg, pass, passReg) {
  if (name == nameReg && pass == passReg) {
    alert("Bienvenido " + name);
    console.log("ingresa correctamente");
  } else {
    alert("El usuario y/o contraseña no son correctos, volve a intentarlo");
    login();
  }
}
function menuDeOperaciones() {
  let saldoActual = 2000;

  do {
    let opcion = Number(opcionesOperacionesCuenta());

    if (opcion === Number(eligeDepositar())) {
      do {
        let a = Number(realizarDeposito());
        saldoActual = saldoActual + a;
        alert(
          "la operación se realizo correctamente, ahora contas con " +
            saldoActual +
            " en tu cuenta"
        );
        console.log(saldoActual);
      } while (confirm("¿Deseas realizar otra operación?"));
    } else if (opcion === Number(eligeTransferir())) {
      do {
        console.log(saldoActual);
        saldoActual = Number(realizarTransferencia(saldoActual));
        console.log(saldoActual);
      } while (confirm("¿Deseás realizar otra transferencia?"));
    } else {
      alert("no ingresaste una opción valida");
    }
  } while (confirm("¿Quieres realizar otra operación? "));
  opcionesOperacionesCuenta();
}

function opcionesOperacionesCuenta() {
  let opcionElegida = prompt(`¿Qué operación desea realizar? \n
  ● depositar (1)\n 
  ● transferir (2)`);
  return opcionElegida;
}
function realizarDeposito() {
  //   let saldoActual = parseFloat(saldoA);
  let montoADepositar = parseFloat(
    prompt(`ingrese el monto a depositar a su cuenta: `)
  );
  return montoADepositar;
}
function realizarTransferencia(saldoA) {
  let saldoActual = Number(saldoA);
  let montoATransferir = parseFloat(
    prompt("Ingrese el monto que desea transferir a Jonathan Abracaite: ")
  );
  confirmacionDeOperación(saldoActual, montoATransferir);
  saldoActual = saldoActual - montoATransferir;
  return saldoActual;
}
function confirmacionDeOperación(saldo, montoTransf) {
  let saldoActual = Number(saldo);
  let transf = Number(montoTransf);
  if (transf <= saldoActual) {
    alert(
      "La operación se ha realizado con exito \n se han transferido " +
        transf +
        " a Jonathan \n contás con " +
        (saldoActual - transf) +
        " en tu cuenta"
    );
  } else if (transf > saldoActual) {
    alert(
      "No es posible realizar la operación ya que el monto a transferir supera el saldo actual"
    );
  }
}
function eligeDepositar() {
  console.log("elige depositar");
  return 1;
}
function eligeTransferir() {
  console.log("elige transferir");
  return 2;
}

// main
ingresarAppBanco();
