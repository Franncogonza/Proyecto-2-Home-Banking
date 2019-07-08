//Declaración de variables  

var nombreUsuario = "Franco Gonzalez";
var saldoCuenta = 30000;
var limiteExtraccion = 5000;
var codigoDeSeguridad = 1234;
//Declaración de variables que contienen precio de los servicios
var s1 = ["Agua", 350];
var s2 = ["Luz", 425];
var s3 = ["Internet", 210];
var s4 = ["Telefono", 570];

//Declaración de variables que contienen nombre y numero de cuenta amiga
var cta1 = ["Cuenta Amiga1", "1234567"];
var cta2 = ["Cuenta Amiga2", "7654321"];


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones creadas por mí

//Suma dinero a saldoCuenta
var sumaDinero = function (monto) {
    saldoAnterior = saldoCuenta;
    saldoCuenta = saldoAnterior + monto;
}

//Resta dinero a saldoCuenta
var restaDinero = function (monto) {
    if (monto <= saldoCuenta) {
        saldoAnterior = saldoCuenta;
        saldoCuenta = saldoAnterior - monto;
    } else {
        return false;
    }
}

//Muestra un alert después de hacer un depósito
function alertDeposito(monto, saldoAnterior, saldoCuenta) {
    alert('Has depositado: $' + monto + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
}

//Muestra un alert después de hacer una extracción
function alertExtraccion(monto, saldoAnterior, saldoCuenta) {
    alert('Has retirado: $' + monto + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo Actual: $' + saldoCuenta);
}

//Muestra un alert después de cambiar límite de extracción
function alertLimExtraccion(nuevoLimite) {
    alert('Su nuevo Límite de extracción es: $' + nuevoLimite);
}

// Verifica si hay saldo disponible en la cuenta para realizar una operación
function haySaldoDisponible(monto) {
    if (monto <= saldoCuenta) {
        return true;
    } else {
        return false;
    }
}

//verifica que el usuario no retire mas dinero del límite de extracción permitido
function limExtraccionValido(monto) {
    if (monto <= limiteExtraccion) {
        return true;
    } else {
        alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción");
        return false;
    }
}

//Verifica que el monto a extraer sea múltiplo de 100
function multiploDe100(monto) {
    if (monto % 100 == 0) {
        return true;
    } else {
        alert("Solo puedes extraer billetes de 100");
        return false;
    }
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = prompt("Ingrese nuevo límite de extracción");
    var nuevoLimite = parseInt(nuevoLimite);
    limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla();
    alertLimExtraccion(nuevoLimite);
}


function extraerDinero() {
    var monto = prompt("Ingrese la cantidad de que desea extraer");
    var monto = parseInt(monto);
    if (haySaldoDisponible(monto) && limExtraccionValido(monto) && multiploDe100(monto)) {
        restaDinero(monto);
        actualizarSaldoEnPantalla();
        alertExtraccion(monto, saldoAnterior, saldoCuenta);
    } else {
        return false;
    }
}

function depositarDinero() {
    var monto = prompt("Ingrese la cantidad de que desea depositar");
    var monto = parseInt(monto);
    sumaDinero(monto);
    saldoAnterior = saldoCuenta;
    actualizarSaldoEnPantalla();
    alertDeposito(monto, saldoAnterior, saldoCuenta);
}


function pagarServicio() {

    // El usuario debe elegir el servicio que quiere pagar, ese valor se almcena en servicio y entra al switch
    var servicio = prompt("Que servicio desea abonar?" + '\n' +
        "1. " + s1[0] + ": $" + s1[1] + '\n' +
        "2. " + s2[0] + ": $" + s2[1] + '\n' +
        "3. " + s3[0] + ": $" + s3[1] + '\n' +
        "4. " + s4[0] + ": $" + s4[1] + '\n' +
        "Ingrese el numero del servicio que desea abonar");

    //si el servicio existe devuelve true sino retorna false
    switch (servicio) {
        case "1":
            servicio = s1;
            break;
        case "2":
            servicio = s2;
            break;
        case "3":
            servicio = s3;
            break;
        case "4":
            servicio = s4;
            break;
        default:
            alert("Intente con un servicio valido");
            return false;
    }
    // asigno  a la variable monto el valor de la variable servicio posicion 1
    monto = servicio[1];
   //compruebo que haya saldo suficiente, si es true, ejecuta las funciones, muestra el alert y actualiza
    if (haySaldoDisponible(monto)) {
        restaDinero(monto);
        alert("Pagaste el siguiente servicio: " + servicio[0] + "." + "\n"
            + "Saldo anterior: $" + saldoAnterior + "\n"
            + "Dinero descontado: $" + servicio[1] + "\n"
            + "Saldo actual: $" + saldoCuenta);

        actualizarSaldoEnPantalla();
    } else {
        alert("No hay saldo disponible");
    }
}


function transferirDinero() {
    //Aca se ingresa el monto a trasnferir y se guarda en la variable monto
    var monto = parseInt(prompt("Ingrese el importe a transferir"));
    // Compruebo si tengo dinero suficiente con el if, si da true, pregunto a a que cuenta va a trasnferir el dinero
    if (haySaldoDisponible(monto)) {
        cuentaAmiga = prompt("A qué cuenta amiga desea trasnferir el dinero" + "\n" +
            "1. " + cta1[0] + ": " + cta1[1] + "\n" +
            "2. " + cta2[0] + ": " + cta2[1] + "\n" +
            "Ingrese el numero de cuenta a la que desea transferir");

        //meto el valor en el switch para comprobar que la cuenta sea correcta
        switch (cuentaAmiga) {
            case "1":
                cuentaAmiga = cta1;
                break;
            case "2":
                cuentaAmiga = cta2;
                break;
            default:
                alert("Solo puede transferir dinero a una cuenta amiga válida");
                return false;
        }
        // si devuelve true continua ejecutando las funciones, sino retorna false.
        restaDinero(monto);
        actualizarSaldoEnPantalla();
        alert("Se han transferido: $" + monto + "\n" + "Cuenta destino: " + cuentaAmiga[1] );

    } else {
        alert("No hay saldo disponible para realizar la transferencia");
    }
}




//primero compruebo que la clave de seguridad devuelva true y lo dejo entrar
function iniciarSesion() { 
if (parseInt(prompt("Ingrese su clave: ")) == codigoDeSeguridad) {
   alert("Bienvenido/a " + nombreUsuario + " , ya puedes comenzar a realizar operaciones");

} else { //si devuelve false, bloqueo su cuenta
    saldoCuenta = 0;
    alert("El codigo ingresado es incorrecto. "+'\n'+
          "Por cuestiones de seguridad, su saldo ha sido bloqueado");
    return false;
    }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}