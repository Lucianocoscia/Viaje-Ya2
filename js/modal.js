// aca tengo tengo funcionalidad de abrir y cerrar carrito 
const modalContenedor = document.querySelector("#carrito");

const abrirCarrito = document.getElementById("open");

const cerrarCarrito = document.getElementById("cerrar");

abrirCarrito.addEventListener( "click", () =>{
    modalContenedor.classList.toggle("carrito-visible");
});

cerrarCarrito.addEventListener('click', ()=>{

    modalContenedor.classList.remove('carrito-visible')

})


// aca tengo funcionalidad de abrir y cerraR cuenta
const modalContenedorUsuario = document.getElementById("usuario");
const abrirBotonUsuario = document.getElementById("open1");
const cerrarBotonUsuario = document.getElementById("cerrar2");

abrirBotonUsuario.addEventListener("click", () =>{

    let emailCargado = localStorage.getItem("email");
    Swal.fire({
        icon: 'info',
        title: `Usuario: ${localStorage.nombre} 
                Email: ${emailCargado} `,
        showDenyButton: true,
        confirmButtonText: 'Iniciar Sesión',
        denyButtonText: `Cerrar Sesión`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "registro-sesion.html"
            } else if (result.isDenied) {
                localStorage.clear();
                Swal.fire('Se ha cerrado la sesion', '', 'info')
            }
    });

})