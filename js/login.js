// Clase constructora de usuario
class Usuario {
    constructor(nombre,email,contrasenia){
        this.nombre = nombre;
        this.email = email;
        this.contrasenia = contrasenia;
    }
}
// array de usuarios donde van a ir almacenados los usarios q se logueen
const usuarios = [];

// comienzo de funcion de logueo
function loguearte (){

    const nombre = document.getElementById("nombre");

    const email = document.getElementById("email");

    const contrasenia = document.getElementById("contrasenia");

    const boton = document.getElementById("botonRegistro");

    boton.addEventListener("click", () => {

        if(nombre.value === ""  || email.value === ""  || contrasenia.value === "" ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Complete los campos indicados. Para que el registro se aplique de manera correcta.',
            })

        }else {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: 'Felicitaciones! Has creado tu cuenta con exito! Te regalamos un cupon del 20% en tu reserva ingresando "VIAJE-YA".  Inicia Sesión!'
            })

            //Creo los usarios como objetos para luego pushearlos
            const login = new Usuario(nombre, email, contrasenia);
    
            //push hacia el array de usuarios, (almaceno los usuarios en esa lista)
            usuarios.push(login);
    

            localStorage.setItem("nombre", nombre.value);
            localStorage.getItem("nombre");

            localStorage.setItem("email", email.value);


            localStorage.setItem("clave", contrasenia.value);
        }
        nombre.value = "";
        email.value = "";
        contrasenia.value ="";
    })

    // INICIO DE SESION
    const email2 = document.getElementById("email2");

    const contrasenia2 = document.getElementById("contrasenia2");

    const boton2 = document.getElementById("botonInicioSesion");

    boton2.addEventListener("click", () => {

        // Ternario
        email2.value === ""  || contrasenia2.value === ""  ?  Swal.fire({
            icon: 'Good',
            // title: 'Oops...',
            text: 'Complete los campos indicados. Para que el registro se aplique de manera correcta.',
        }) : null;
        
        // TERNARIO
        let contrasenia1Valida = localStorage.getItem("clave");
        let email1Valido = localStorage.getItem("email");
            contrasenia1Valida != contrasenia2.value &&  email1Valido != email2.value ? Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta. Intente nuevamente.',
            }) : Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Bienvenido ${localStorage.nombre}`,
                showConfirmButton: false,
                timer: 1500
            }), setTimeout(function(){window.location.href = 'index.html#contenedorReserva'}, 2000);  ;

        email2.value = "";
        contrasenia2.value ="";
    })
}

loguearte ();

    


