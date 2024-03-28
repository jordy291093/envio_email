document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(evt) {
        evt.preventDefault();

        resetFormulario();
    });

    function enviarEmail(evt) {
        evt.preventDefault();
        spinner.classList.add();
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove();
            spinner.classList.add('hidden');

            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(evt) {
         if ( evt.target.value.trim() === '' ) { // target.value ver lo que el usuario escribio y trim() para evitar espacios en blanco
            mostrarAlerta(`El campo ${evt.target.id} es obligatorio`, evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        if ( evt.target.id === 'email' && !validarEmail(evt.target.value) ) {
            mostrarAlerta('El email no es correcto', evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evt.target.parentElement);

        // Asignar los valores
        email[evt.target.name] = evt.target.value.trim().toLowerCase();
        
        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        //Inyectar el error al formulario
        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if ( Object.values(email).includes('') ) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario () {
        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});