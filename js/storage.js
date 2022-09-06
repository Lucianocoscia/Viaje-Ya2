// Storage del login

let usuarioCargado = localStorage.getItem("nombre");

usuarioCargado && alertaStorage();
!usuarioCargado && alertaNoHayStorage();


function alertaStorage (){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: `Bienvenido nuevamente ${localStorage.nombre}`
    })
}

function alertaNoHayStorage (){
    Swal.fire(
        'Inicia Sesion o Registrate',
        '',
        'info'
    )
}