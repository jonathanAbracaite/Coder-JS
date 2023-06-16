function ingresarAppBanco() {
  menuPrincipalApp();
}
function menuPrincipalApp() {
  // muestra las opciones al ingresar a la App: registrarse o logearse
  let opcionElegida = Number(eleccionMainApp());
  if (opcionElegida == eligeRegistrarse()) { // Si elige registrarse
    signup();
  } else if (opcionElegida == eligeIngresar()) { // Si elige ingresar
    login();
  } else {
    alert("no ingresaste una opción valida"); // En caso que no coloque una opción correcta
  }
}
function eleccionMainApp() {
  // indica las opciones registrarse o ingresar y devuelve la elección
  let opcionElegida = prompt(`
                                === BIENVENIDO AL BANCO APP ===\n\n
                                ¿Qué desea realizar? \n
                                ● Registrarse (1)\n 
                                ● Ingresar (2)`);
  return opcionElegida;
}

function eligeRegistrarse() { //Devuelve 1 si se elige Registrarse
  return 1;
}
function eligeIngresar() { // Devuelve 2 si elige ingresar
  return 2;
}
function signup() {
  // Solicita el nombre y usuario de la nueva cuenta a crear
  const userName = prompt(
    "ingrese el nombre de usuario que desea tener en su cuenta: "
  );
  const password = prompt("ingrese la contraseña de la cuenta: ");
  validacionDeDatosSignup(userName, password); // valida datos ingresados
  menuPrincipalApp(); // devuelve al menu principal de la App
}
function validacionDeDatosSignup(name, pass) {
  // valida si los datos dados por el parametro no estan vacios
  if (name !== "" && pass !== "") {
    alert(
      "Excelente, se confirmará su registro en las siguientes 24hs habiles"
    );
  } else { // en caso que no se haya ingresado los datos correctamente te devuelve al menu principal para intentar de nuevo o realizar otra accion
    alert("Debés intentar de nuevo, recordá rellenar los campos correctamente");
    menuPrincipalApp();
  }
}
function login() {
  // solicita los datos para ingresar a la cuenta ya creada
  const userRegistrado = "beto"; // dato ya registrado
  const passRegistrado = "123"; // dato ya registrado
  let userLogin = prompt("ingrese su usuario: ");
  let passLogin = prompt("ingrese su contraseña: ");

  validacionDeDatosLogin(userLogin, userRegistrado, passLogin, passRegistrado); // valida si los datos ingresados son iguales a los registrados

  menuDeOperaciones(); // ingresa al menu de operaciones dentrod e la ceunta
}

function validacionDeDatosLogin(name, nameReg, pass, passReg) {
  // valida si tanto el parametro ingresado por el usuario como el que se encuentra actualmente registrado
  if (name == nameReg && pass == passReg) {
    alert("Bienvenido " + name);
    console.log("ingresa correctamente");
  } else {
    alert("El usuario y/o contraseña no son correctos, volve a intentarlo");
    login();
  }
}
function menuDeOperaciones() {
  // dentro del menu de operaciones se puede elegir la opcion de depositar o transferir a un usuario fijo... yo :P
  let saldoActual = 2000;

  do {
    let opcion = Number(opcionesOperacionesCuenta()); // va a realizar el menu de operaciones de la cuenta mientras se confirme que desea realizar otra operacion

    if (opcion === Number(eligeDepositar())) { //elige depositar
      do {
        let a = Number(realizarDeposito()); //realiza deposito
        saldoActual = saldoActual + a; // suma el deposito al saldo actual
        alert(
          "la operación se realizo correctamente, ahora contas con " +
            saldoActual +
            " en tu cuenta"
        );
        console.log(saldoActual);
      } while (confirm("¿Deseas realizar otro deposito?"));
    } else if (opcion === Number(eligeTransferir())) { // elige transferir
      do {
        console.log(saldoActual);
        saldoActual = Number(realizarTransferencia(saldoActual)); //se realiza la transferencia
        console.log(saldoActual);
      } while (confirm("¿Deseás realizar otra transferencia?"));
    } else {
      alert("no ingresaste una opción valida");
    }
  } while (confirm("¿Quieres realizar otra operación? "));
  opcionesOperacionesCuenta();
}

function eligeDepositar() {
  console.log("elige depositar");
  return 1;
}
function eligeTransferir() {
  console.log("elige transferir");
  return 2;
}

function opcionesOperacionesCuenta() {
  // indica y devuelve la opcion elegida por el usuario
  let opcionElegida = prompt(`¿Qué operación desea realizar? \n
  ● depositar (1)\n 
  ● transferir (2)`);
  return opcionElegida;
}
function realizarDeposito() {
  // solicita al usuario el deposito que desea realizar y lo devuelve
  let montoADepositar = parseFloat(
    prompt(`ingrese el monto a depositar a su cuenta: `)
  );
  return montoADepositar;
}
function realizarTransferencia(saldoA) {
  // solicita el monto a depositar y lo resta al saldo actual de la cuenta
  let saldoActual = Number(saldoA);
  let montoATransferir = parseFloat(
    prompt("Ingrese el monto que desea transferir a Jonathan Abracaite: ")
  );
  confirmacionDeOperación(saldoActual, montoATransferir); // verifica si puede realizar la transferencia, en caso que si, confirma con un mensaje, en caso que no, confirma con mensaje 
  //  y retorna el saldo actual
  saldoActual = saldoActual - montoATransferir; // realiza el descuento de la cuenta
  return saldoActual;
}
function confirmacionDeOperación(saldo, montoTransf) {
  // realiza el analisis para verificar si es posible realizar la transferencia
  let saldoActual = Number(saldo);
  let transf = Number(montoTransf);
  if (transf <= saldoActual) { // si es <= es posible 
    alert(
      "La operación se ha realizado con exito \n se han transferido " +
        transf +
        " a Jonathan \n contás con " +
        (saldoActual - transf) +
        " en tu cuenta"
    );
  } else if (transf > saldoActual) { //si el monto es menor, no es posible 
    alert(
      "No es posible realizar la operación ya que el monto a transferir supera el saldo actual"
      
    );
    
  }
}


// main
ingresarAppBanco();
