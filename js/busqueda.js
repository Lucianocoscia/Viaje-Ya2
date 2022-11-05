import {paquetes00} from "./paquetes.js"

const barraBusqueda = document.getElementById("barraDeBusqueda");

// const botonBuscar = document.getElementById("buscar")

// barraBusqueda.addEventListener("keypress", () =>{
//     barraBusqueda.value === "" ? alert(`Lo sentimos no encontramos ningun destino con el nombre " ${barraBusqueda.value} "` ) : null;

//     let busqueda = paquetes00.find( el => el.destino === barraBusqueda.value) ;
// /*     busqueda = undefined ?   alert("Lo sentimos no tenemos paquetes disponibles para ese destino!") : null;
//     let destinoEncontrado = busqueda.destino; */

//     // destinoEncontrado === barraBusqueda.value ?
//     Swal.fire({
//         title:`${busqueda.destino}` ,
//         text:'Mirá el destino que buscaste!' ,
//         imageUrl: `${busqueda.img}`,
//         imageWidth: 400,
//         imageHeight: 200,
//         imageAlt: `${busqueda.destino}`,
//     }) ;
//     // busqueda.destino != barraBusqueda.value ? alert("Lo sentimos no tenemos paquetes disponibles para ese destino!"): null;

//     barraBusqueda.value = "";
// });

// Funcion busqueda
const filtrar = e=>{
    console.log(barraBusqueda.value);
    if (e.key === "Enter"){
        const destino = barraBusqueda.value.toLowerCase();
        for(let producto of paquetes00){
            let nombre = producto.destino.toLowerCase();
    
            if(nombre.indexOf(destino) !== -1){
                // Aca pongo lo q quiero q muestre 
                console.log(`encontre algo y es esto ${producto.id}`);
                    window.location.href = `#paquete${producto.id}`
            }
        }
    }

}
barraBusqueda.addEventListener("keypress",filtrar)

