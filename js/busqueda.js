import {paquetes00} from "./paquetes.js"

const barraBusqueda = document.getElementById("barraDeBusqueda");

const botonBuscar = document.getElementById("buscar")

botonBuscar.addEventListener("click", () =>{
    barraBusqueda.value === "" ? alert(`Lo sentimos no encontramos ningun destino con el nombre " ${barraBusqueda.value} "` ) : null;

    let busqueda = paquetes00.find( el => el.destino === barraBusqueda.value) ;
/*     busqueda = undefined ?   alert("Lo sentimos no tenemos paquetes disponibles para ese destino!") : null;
    let destinoEncontrado = busqueda.destino; */

    // destinoEncontrado === barraBusqueda.value ?
    Swal.fire({
        title:`${busqueda.destino}` ,
        text:'Mirá el destino que buscaste!' ,
        imageUrl: `${busqueda.img}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: `${busqueda.destino}`,
    }) ;
    // busqueda.destino != barraBusqueda.value ? alert("Lo sentimos no tenemos paquetes disponibles para ese destino!"): null;

    barraBusqueda.value = "";
});