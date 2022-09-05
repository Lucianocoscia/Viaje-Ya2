import { paquetes00 } from "./paquetes.js";

// Variables 

const vueloIda = document.getElementById("ida");
const vueloIdaYVuelta = document.getElementById("idaYVuelta");

const fecha1 = document.getElementById("fechaSalida");
const fecha2 = document.getElementById("fechaVuelta");

const origen = document.getElementById("origen");
const destino = document.getElementById("destino");

const cantidadDePasajeros = document.getElementById("pasajeros");

// Array donde seran guardados los datos PrecioGlobal, PrecioDescuentoGlobal, IdGlobal
let datos = [];
// Array donde seran guardados las reservas completas 
let reservasCarrito = [];


console.log(reservasCarrito);
// Variables q le asigno luego la posicion del array en la q esten pusheados
let idGlobal;
let precioGlobal;
let precioDescuentoGlobal;

// Variables carrito
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

// Declaro el boton de la reserva
const boton = document.getElementById("botonReserva");

boton.addEventListener("click", ()=> {

  // Esto reemplaza el switch, enrealidad trae el objeto completo y luego traigo las propiedades com .
  let paquete = paquetes00.find((elemento) => elemento.destino === destino.value);
  console.log(paquete);

  // Precio
  let precio = paquete.precio;

  datos.push(precio); //[0]

  // Paso por funcion para ver si hay descuento
  valorFinal(precio);

  // ID
  let id = paquete.id;
  datos.push(id);

  precioGlobal = datos[0];
  precioDescuentoGlobal = datos[1];
  idGlobal = datos[2];

    // crear objeto
    const infoReserva = {
      fechaPartida: fecha1.value,
      fechaVuelta: fecha2.value,
      origen: origen.value,
      destino: destino.value,
      precioBase: precioGlobal,
      precioDescuentoBase: precioDescuentoGlobal,
      precio: precioGlobal,
      precioDescuento: precioDescuentoGlobal,
      id: idGlobal,
      cantidad: 1,
    };
    
    // console.log(infoReserva);

    if (vueloIda.checked) {
      const mensaje1 = `Fecha de partida: ${fecha1.value} <br> Origen: ${origen.value} <br> Destino: ${destino.value} <br>   Precio Lista: $${datos[0]} <br>
      Precio Final con descuento aplicado: $${datos[1]} <br> Cantidad de Pasajeros: ${cantidadDePasajeros.value} <br> ID: ${datos[2]} `;

      Swal.fire("Su reserva quedo de esta manera:", ` ${mensaje1}`, "info");

      datos = [];
    } else if (vueloIdaYVuelta.checked) {
      const mensaje2 = `Su reserva quedo de esta manera: <br> Fecha de partida: ${fecha1.value} <br> Fecha de vuelta: ${fecha2.value} <br> Origen: ${origen.value} <br> Destino: ${destino.value} <br>  Precio Lista: $${datos[0]} <br> Precio Final con descuento aplicado: $${datos[1]} <br> Cantidad de Pasajeros: ${cantidadDePasajeros.value} <br> ID: ${datos[2]} `;

      Swal.fire("Su reserva quedo de esta manera:", ` ${mensaje2}`, "info");
      datos = [];
    }

  // Agrega elementos al arreglo de reservacarrito
  reservasCarrito = [...reservasCarrito, infoReserva];

  // Ver por consola si me lo agrego
  console.log(reservasCarrito);

  function hacerCarrito(){

    //contador de item en el carrito
    const contador = document.getElementById("contador1");
    contador.innerText = reservasCarrito.length;

    limpiarHTML();
  // aca si ubico el localstorage de lugares-populares me lo muestra pero no me anda la funcionalidad de sumar y restar

    // Imprimo todo en el carrito
    reservasCarrito.forEach((reserva) => {
      // Optimizando con variables
      const { fechaPartida, fechaVuelta, origen, destino, precio, precioDescuento, id, cantidad} = reserva;

      const row = document.createElement("tr");

      row.innerHTML = `
                              <td class="productoEnCarrito2-p" >Fecha de Partida: ${fechaPartida} 
                                                              <p>Fecha de Vuelta: ${fechaVuelta}</p>
                                                              <p>Origen: ${origen}</p>
                                                              <p>Destino: ${destino}</p> 
                              </td>
                              
                              <td class="productoEnCarrito2-p" >Precio: $${precio}
                                                              <p>Precio con descuento: $${precioDescuento}</p>
                              </td>
                              <td>${cantidad}</td>
                              <td><button id ="Eliminar${id}" class = "boton-eliminar icono2 jam jam-trash"></button></td>
                              <td> <button id ="Restar${id}" class = "boton-resta  icono2 jam jam-minus"></button> </td>
                              <td> <button id ="Sumar${id}" class = "boton-suma  icono2 jam jam-plus"></button> </td>
                          `;
      contenedorCarrito.append(row);
    
        // Eliminar reserva del carrito
        const botonEliminar = document.getElementById(`Eliminar${id}`);

        botonEliminar.addEventListener("click", () => {
          console.log("Apretando en el boton eliminar");
          reservasCarrito = reservasCarrito.filter((reserva) => reserva.id !== id); 

          hacerCarrito();
          console.log(reservasCarrito);
        });

      // Sumar y restar cantidades 
      const botonMas = document.getElementById(`Sumar${id}`);
      const botonMenos = document.getElementById(`Restar${id}`);

      // BOTON MAS 
      botonMas.addEventListener('click', ()=>{
            console.log("apretando en mas");
            for(let i = 0; i < reservasCarrito.length; i++){
              if(reservasCarrito[i].id === id){
                reservasCarrito[i].cantidad++;
                reservasCarrito[i].precio = reservasCarrito[i].precioBase * reservasCarrito[i].cantidad;
                reservasCarrito[i].precioDescuento = reservasCarrito[i].precioDescuentoBase * reservasCarrito[i].cantidad;
              }
            }
            hacerCarrito();
            console.log(reservasCarrito);
      });

      // BOTON MENOS 
      botonMenos.addEventListener('click', ()=>{
        console.log("apretando en menos");
        for(let i = 0; i < reservasCarrito.length; i++){
          if(reservasCarrito[i].id === id){
            reservasCarrito[i].cantidad -= 1;
            reservasCarrito[i].precio = reservasCarrito[i].precioBase * reservasCarrito[i].cantidad;
            reservasCarrito[i].precioDescuento = reservasCarrito[i].precioDescuentoBase * reservasCarrito[i].cantidad;

          }
          if(reservasCarrito[i].cantidad <= 0){
            reservasCarrito.splice(i,1);
          }
        }
        hacerCarrito();
      }); 

      console.log(reservasCarrito);
    });// Aca termina el for each
  }
  hacerCarrito(); 

  borrarDatos();
});


// Funcionalidad de apretar consultar y q lleve el titulo al input con id="destino"
const agregoDestinoAlInput = document.getElementById("contenedorPaquetes");

agregoDestinoAlInput.addEventListener("click", (e)=>{

  if(e.target.classList.contains("agregar-destino")){
    const destinoSeleccionado = e.target.parentElement;
    leerDestino(destinoSeleccionado);

    function leerDestino(destino) {
      //creo un objeto con el contenido del paquete mostrado
      const infoReserva = {
        titulo: destino.querySelector("h2").textContent,
      };
  
      const destino1 = document.getElementById("destino");
      destino1.value = `${infoReserva.titulo}`;
    }
  }
  window.location.href='#'
});

// FUNCIONES

// Funcion ValorFinal
function valorFinal(precio) {
  const cuponDescuento = document.getElementById("descuento");
  let descuento = precio * 0.2;

  // Ternario
  cuponDescuento.value === "VIAJE-YA" || cuponDescuento.value === "viaje-ya"
    ? Toastify({
        text: "Descuento aplicado! Se le hizo un descuento del 20%",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #009688)",
        },
      }).showToast()
    : null;

  if (
    cuponDescuento.value === "viaje-ya" ||
    cuponDescuento.value === "VIAJE-YA"
  ) {
    let resultado = precio - descuento;
    // llevo al array el precioDescuento
    datos.push(resultado); // [5]
    cuponDescuento.value = "";
  }
};

// Borrar datos de input
function borrarDatos (){
  fecha1.value = "";
  fecha2.value = "";
  origen.value = "";
  destino.value = "";
  cantidadDePasajeros.value = "";
  vueloIdaYVuelta.checked = false;
  vueloIda.checked = false;
}

// Funciones para el carrito

// Vaciar el carrito
vaciarCarritoBtn.addEventListener("click", ()=>{
  reservasCarrito = []; // reseteamos el carrito
  limpiarHTML(); // eliminamos todo del HTML
  console.log(reservasCarrito);
  // localStorage.reservasCarrito.clear();
});

// Limpiar Html
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
};
