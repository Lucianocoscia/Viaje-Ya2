// renderizado los paquetes en la seccion de reserva
const contenedorPaquetes = document.getElementById("contenedorPaquetes");

fetch("./json/paquetes.json")
.then(response => response.json())
.then(paquetes => {
    for (const paquete of paquetes) {
        const div = document.createElement("div");
        div.classList.add("paquete__item")
        div.innerHTML += `<img class="paquete__img" id="paquete${paquete.id}" src="${paquete.img}"  alt="${paquete.destino}">
                        <div class="displayRow">
                            <h2 class="absolute">${paquete.destino}</h2>
                            <button type='button' id= "agregoDestino" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="agregar-destino botonDestino">Consultar</button> 
                        </div>       
                        `
        contenedorPaquetes.append(div);
    }
})
.catch((error) => console.log(error));