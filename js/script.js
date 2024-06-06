function Nombre() {
    let Nombre = prompt("Ingrese su nombre");
    alert("Bienvenido al conversor, " + Nombre)
}
Nombre()

let miEdad = parseInt(prompt("ingrese su edad"))
if (miEdad >= 18) {
    alert("Eres mayor de edad ")
} else if (miEdad < 18 && miEdad > 0) {
    alert("Eres menor de edad")
} else {
    alert("dato incorrecto")
}


let eurArs = 1181
let eurUsd = 1.09
let UsdArs = 1100

const convertirdeDivisas = (cantidad, deMoneda, aMoneda) => {
    let resultado;

    switch (deMoneda) {
        case "ars":
            if (aMoneda === "eur") {
                resultado = cantidad / eurArs;
            } else if (aMoneda == "usd") {
                resultado = cantidad / UsdArs;
            }
            break
        case "eur":
            if (aMoneda === "ars") {
                resultado = cantidad * eurArs;
            } else if (aMoneda == "usd") {
                resultado = cantidad * eurUsd;
            }
            break
        case "usd":
            if (aMoneda === "eur") {
                resultado = cantidad / eurUsd
            } else if (aMoneda === "ars") {
                resultado = cantidad * UsdArs
            }
            break;
        default:
            resultado = "Moneda no valida"
    }
    return resultado;
}
function simuladorDivisas() {
    let cantidad = parseFloat(prompt('Ingrese la cantidad a convertir:'));

    if (cantidad <= 0) {
        console.log('Por favor, ingrese una cantidad válida.');
        return;
    }
    let deMoneda = prompt('Ingrese la moneda de origen (EUR/USD/ARS):').toLowerCase();
    let aMoneda = prompt('Ingrese la moneda de destino (EUR/USD/ARS):').toLowerCase();

    let resultado = convertirdeDivisas(cantidad, deMoneda, aMoneda);
    alert("La conversion de " + cantidad + " " + deMoneda + " a " + aMoneda + " es " + resultado);

}

simuladorDivisas();




