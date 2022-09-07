// renderizado los paquetes en la seccion de reserva
const contenedorPaquetes = document.getElementById("contenedorPaquetes");

fetch("./json/paquetes.json")
.then(response => response.json())
.then(paquetes => {
    for (const paquete of paquetes) {
        const div = document.createElement("div");
        div.classList.add("paquete__item")
        div.innerHTML += `<img class="paquete__img" src="${paquete.img}"  alt="Cancún">
                        <div class="displayRow">
                            <h2 class="absolute">${paquete.destino}</h2>
                            <button id= "agregoDestino"  class="agregar-destino botonDestino">Consultar</button> 
                        </div>       
                        `
        contenedorPaquetes.append(div);
    }
})
.catch((error) => console.log(error));