function muestraImagen(){
    document.getElementById('imagenInicial').removeAttribute('hidden');
    document.querySelector('h2').removeAttribute('hidden');
    document.getElementById('parrafo').removeAttribute('hidden');
    document.querySelector('#textoEncriptado').setAttribute('hidden','true');
    document.querySelector('#botonCopiar').setAttribute('hidden','true');
}

function ocultaImagen(){
    document.querySelector('#imagenInicial').setAttribute('hidden','true');
    document.querySelector('h2').setAttribute('hidden','true');
    document.querySelector('#parrafo').setAttribute('hidden','true');
    document.getElementById('textoEncriptado').removeAttribute('hidden');
    document.getElementById('botonCopiar').removeAttribute('hidden');
}


function limpiarCampo() {
    document.querySelector('#valorCampo').value='';
    document.querySelector('#textoEncriptado').value='';
}

function copiarMensaje() {
    const mensajeCampo = document.getElementById('textoEncriptado').value;
    document.querySelector('#valorCampo').value=mensajeCampo;
    document.getElementById('textoEncriptado').value='';
    document.getElementById('botonDesencriptar').removeAttribute('disabled');
}

function validarCampo(mensaje) {
    const regex = /^[a-zñ\s]*$/;
    return regex.test(mensaje);
}

function encriptarTexto(mensaje) {
    let mensajeEncriptado = '';
    for (let i = 0; i < mensaje.length; i++) {
        let numLetra = mensaje.charCodeAt(i);
        if (numLetra >= 97 && numLetra <= 122) {
            mensajeEncriptado += String.fromCharCode(((numLetra - 97 + 3) % 26) + 97);
        } else {
            mensajeEncriptado += mensaje[i];
        }
    }
    return mensajeEncriptado;
}

function desencriptarTexto(mensajeEncriptado) {
    let mensajeDesencriptado = '';
    for (let i = 0; i < mensajeEncriptado.length; i++) {
        let numLetra = mensajeEncriptado.charCodeAt(i);
        if (numLetra >= 97 && numLetra <= 122 ) { 
            mensajeDesencriptado += String.fromCharCode(((numLetra - 97 - 3 + 26) % 26) + 97);
        } else {
            mensajeDesencriptado += mensajeEncriptado[i];
        }
    }
    return mensajeDesencriptado;
}

function iniciaEncriptacion() {
    let mensajeCampo = document.getElementById('valorCampo').value;
    let mensajeError = document.getElementById('mensajeError');
    if (validarCampo(mensajeCampo) && mensajeCampo!='') {
        ocultaImagen();
        document.querySelector('#valorCampo').value='';
        mensajeError.textContent = '';
        let mensajeEncriptado = encriptarTexto(mensajeCampo);
        document.getElementById('textoEncriptado').value = mensajeEncriptado;
    } else {
        mensajeError.textContent = 'No se permiten mayúsculas ni caracteres especiales.';
        document.querySelector('#botonDesencriptar').setAttribute('disabled','true');
        limpiarCampo();
        muestraImagen();
    }
}

function iniciaDesencriptacion(){
    let mensajeEncriptado = document.getElementById('valorCampo').value;
    let mensajeDesencriptado = desencriptarTexto(mensajeEncriptado);
    document.getElementById('textoEncriptado').value = mensajeDesencriptado;
    document.querySelector('#valorCampo').value='';
}

