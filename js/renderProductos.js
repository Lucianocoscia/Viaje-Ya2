const contenedorPaquetes = document.getElementById("card");

fetch("./json/paquetes-populares.json")
.then(response => response.json())
.then(paquetes => {
    for (const paquete of paquetes){
        const div = document.createElement("div");
        div.classList.add("cards");

        div.innerHTML += `<img class="card__img" src="${paquete.img}"  alt="${paquete.destino}">
                        <h2 class="card__titulos">${paquete.destino}</h2>
                        <div class="flexrow">
                        <span>$</span><p>${paquete.precio}</p>
                        </div>
                        <span>${paquete.desc}</span>
                        <button class="boton1 agregar-carrito" data-id="${paquete.id}" type="submit">Comprar</button>
                        `
        contenedorPaquetes.appendChild(div);
    }
});