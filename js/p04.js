const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('floatingSelect');
const poster = document.getElementById('poster');

btnBuscar.addEventListener('click', cargarImagen);
btnLimpiar.addEventListener('click', limpiar);

window.onload = cargarRazas;

function cargarRazas() {
    const url = "https://dog.ceo/api/breeds/list/all";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al cargar las razas: " + response.status;
                return;
            }
            return response.json();
        })
        .then(data => {
            mostrarRazas(data.message);
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error al cargar las razas: " + error;
        });
}

function mostrarRazas(razas) {
    for (const raza in razas) {
        if (razas[raza].length === 0) {
            const opcion = document.createElement('option');
            opcion.value = raza;
            opcion.textContent = raza;
            lista.appendChild(opcion);
        }
    }
}

function cargarImagen() {
    const seleccion = lista.value;

    if (seleccion === "Seleccionar la Raza") {
        mensaje.innerHTML = "Por favor, selecciona una raza.";
        return;
    }

    const url = `https://dog.ceo/api/breed/${seleccion}/images/random`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al cargar la imagen: " + response.status;
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                poster.src = data.message;
                mensaje.innerHTML = "Imagen cargada exitosamente.";
            } else {
                mensaje.innerHTML = "No se pudo cargar la imagen.";
            }
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error al cargar la imagen: " + error;
        });
}

function limpiar() {
    poster.src = "/img/perromuestra.png";
    mensaje.innerHTML = "";
    lista.value = "Seleccionar la Raza";
}
