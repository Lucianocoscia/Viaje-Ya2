const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaPaquetes = document.querySelector("#lista-paquetes");

let paquetesCarrito =  JSON.parse(localStorage.getItem("carrito")) ;
if(!paquetesCarrito){
    paquetesCarrito = [];
}

// Agrega el html del carrito en el tbody

// FUNCIONES
function agregarPaquete (e){
    // e.preventDefault(); //para q no se te tire para arriba

    if(e.target.classList.contains("agregar-carrito")){
        const paqueteSeleccionado = e.target.parentElement;

        leerDatosPaquete(paqueteSeleccionado);
    }

}



// funcion para limpiar el carrito
function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = "";

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function cargarEventListeners (){
    // cuando agregas un paquete presionando "Agregar al Carrito"
    listaPaquetes.addEventListener("click", agregarPaquete);

    //elimina paquetes del carrito
    // carrito.addEventListener("click", eliminarPaquete);

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{
        paquetesCarrito = []; // reseteamos el carrito
        limpiarHTML(); // eliminamos todo del HTML
        carritoHTML(); 
    })
}
cargarEventListeners();


// Muestra el carrito de compras en el html
function carritoHTML (){
    
    // const contador = document.getElementById("contador1");
    // contador.innerText = paquetesCarrito.length;

    localStorage.setItem("carrito", JSON.stringify(paquetesCarrito));
    
    //Limpiar el html
    limpiarHTML();

    // Recorre el carrito y genera el html
    paquetesCarrito.forEach( paquete => {

        // optimizando con variables
        const { titulo, precio, cantidad, id, imagen  } = paquete;

        const div = document.createElement("div");
        div.innerHTML = `
                        <hr className='hr-cart'></hr>
                        <div  class=' grid-principal'>
                            <div class='grid-hijo'>
                                <img style="width: 100px; height: 100px; object-fit: cover;"
                                src= "${imagen}"
                                alt="${titulo}"/>
                            </div>

                            <div class='grid-hijo2'>
                                <div class='div-detalle'> 
      
                                    <h5>${titulo}</h5>
                                    <button id ="Restar${id}" class = "boton-resta icono2">-</button>
                                    <p >${cantidad}</p>
                                    <button id ="Sumar${id}" class = "boton-suma  icono2 ">+</button>
                                </div>

                                <div class='div-precio'>
                                    <button id ="Eliminar${id}" class = "boton-eliminar "><img src="./images/garbage-bin.gif" class="icono2" alt="trash"></button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="contenedor-suma" >
                            <p class="fw-bold" >Subtotal</p>
                            <p>${precio}</p>
                        </div>


                        `;
        // Agrega el html del carrito en el tbody
        contenedorCarrito.append(div);

        // Eliminar reserva del carrito
        const botonEliminar = document.getElementById(`Eliminar${id}`);

        botonEliminar.addEventListener("click", () => {
          console.log("Apretando en el boton eliminar");
          paquetesCarrito = paquetesCarrito.filter((reserva) => reserva.id !== id); 

          carritoHTML();
          console.log(paquetesCarrito);
        });

      // Sumar y restar cantidades 
      const botonMas = document.getElementById(`Sumar${id}`);
      const botonMenos = document.getElementById(`Restar${id}`);

      // BOTON MAS 
      botonMas.addEventListener('click', ()=>{
            console.log("apretando en mas");
            for(let i = 0; i < paquetesCarrito.length; i++){
              if(paquetesCarrito[i].id === id){
                paquetesCarrito[i].cantidad++;
                paquetesCarrito[i].precio = paquetesCarrito[i].precioBase * paquetesCarrito[i].cantidad;
                paquetesCarrito[i].precioDescuento = paquetesCarrito[i].precioDescuentoBase * paquetesCarrito[i].cantidad;
              }
            }
            carritoHTML();
            console.log(paquetesCarrito);
      });

      // BOTON MENOS 
      botonMenos.addEventListener('click', ()=>{
        console.log("apretando en menos");
        for(let i = 0; i < paquetesCarrito.length; i++){
          if(paquetesCarrito[i].id === id){
            paquetesCarrito[i].cantidad -= 1;
            paquetesCarrito[i].precio = paquetesCarrito[i].precioBase * paquetesCarrito[i].cantidad;
            paquetesCarrito[i].precioDescuento = paquetesCarrito[i].precioDescuentoBase * paquetesCarrito[i].cantidad;

          }
          if(paquetesCarrito[i].cantidad <= 0){
            paquetesCarrito.splice(i,1);
          }
        }
        carritoHTML();
      }); 


    })
}



//Lee el contenido del HTML, al q le dimos click y extrae la informacion del paquete
function leerDatosPaquete(paquete){
    // console.log(paquete);

    //Creo el objeto con el contenido del paquete actual
    const infoPaquete = {
        imagen: paquete.querySelector("img").src,
        titulo: paquete.querySelector("h2").textContent,
        precio: paquete.querySelector("p").textContent,
        id: paquete.querySelector("button").getAttribute("data-id"),
        precioBase: paquete.querySelector("p").textContent,
        cantidad: 1,
    }
    console.log(infoPaquete);

    //revisa si un elemento ya existe en el carrito
    const existe = paquetesCarrito.some ( paquete => paquete.id === infoPaquete.id);

    if(existe){
        //actualizamos la cantidad .map crea un nuevo arreglo por eso la variable
        const paquetes = paquetesCarrito.map ( paquete => {
            if(paquete.id === infoPaquete.id){
                paquete.cantidad += 1;
                // paquete.precio = paquete.precioBase * cantidad;
                return paquete; // retorna el objeto actualizado
            }else{
                return paquete; // retorna los objetos que no son los duplicados
            }
        })
        paquetesCarrito = [...paquetes];

    } else{ 
        // Agrega elementos al arreglo del carrito
        paquetesCarrito = [...paquetesCarrito, infoPaquete];
    }
    Swal.fire(
        'Gracias por elegirnos!',
        'Se ha guardado el paquete en el carrito',
        'success'
    )
    console.log(paquetesCarrito);

    carritoHTML();
} 
carritoHTML();




/* contenedorCarrito.addEventListener("click", (e) =>{
    const mas = e.target.classList.contains("boton-suma");
    const menos = e.target.classList.contains("boton-resta");
    if( mas || menos){
        for(let i = 0; i < paquetesCarrito.length; i++){
            if(paquetesCarrito[i].id === e.target.dataset.id){
                if(mas){
                    paquetesCarrito[i].cantidad += 1;
                }
                else if(menos){
                    paquetesCarrito[i].cantidad -= 1;
                }
                paquetesCarrito[i].precio = paquetesCarrito[i].precioBase * paquetesCarrito[i].cantidad;
            }
            if(paquetesCarrito[i].cantidad <= 0){
                paquetesCarrito.splice(i,1);
            }
        }
        carritoHTML();
    }
}); */

/*                         <td> <button data-id ="${id}" class = "boton-eliminar icono2 jam jam-trash"></button> </td>
                        <td> <button data-id ="${id}" class = "boton-resta  icono2 jam jam-minus"></button> </td>
                        <td> <button data-id ="${id}" class = "boton-suma  icono2 jam jam-plus"></button> </td> */

// Elimina paquete del carrito
/* function eliminarPaquete (e){
    if(e.target.classList.contains("boton-eliminar")){
        const paqueteId = e.target.getAttribute("data-id");
        //Elimina del arreglo de paquetesCarrito por el data-id
        paquetesCarrito = paquetesCarrito.filter (  paquete => paquete.id !== paqueteId);

        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
} */


/*                            
                        <td>${titulo}</td>
                        <td>${precio}</td>
                        <td>${cantidad}</td>
                        <td><button id ="Eliminar${id}" class = "boton-eliminar icono2 jam jam-trash"></button></td>
                        <td> <button id ="Restar${id}" class = "boton-resta  icono2 jam jam-minus"></button> </td>
                        <td> <button id ="Sumar${id}" class = "boton-suma  icono2 jam jam-plus"></button> </td>
 */