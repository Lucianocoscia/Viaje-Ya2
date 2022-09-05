import {paquetes00} from "./paquetes.js"

const barraBusqueda = document.getElementById("barraDeBusqueda");

const botonBuscar = document.getElementById("buscar")

botonBuscar.addEventListener("click", () =>{

    let busqueda = paquetes00.find( el => el.destino === barraBusqueda.value);

    Swal.fire({
        title:`${busqueda.destino}` ,
        text:'Mirá el destino que buscaste!' ,
        imageUrl: `${busqueda.img}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: `${busqueda.destino}`,
    })
    barraBusqueda.value = "";
});


