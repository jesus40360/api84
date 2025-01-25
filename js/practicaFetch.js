const btnCargar = document.getElementById('cargar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('mensaje');
const tbody = document.getElementById('tbody');

btnCargar.addEventListener('click', cargarDatos);
btnLimpiar.addEventListener('click', limpiar);

function cargarDatos() {
    const url = "https://jsonplaceholder.typicode.com/albums";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al solicitar: " + response.status;
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data) mostrar(data); // Evitamos mostrar datos si hubo error
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió el error: " + error;
        });
}

function mostrar(datos) {
    let registros = 0;
    datos.forEach(item => {
        ++registros;
        const fila = document.createElement('tr');

        const col1 = document.createElement('td');
        col1.textContent = registros;
        fila.appendChild(col1);

        const col2 = document.createElement('td');
        col2.textContent = item.userId;
        fila.appendChild(col2);

        const col3 = document.createElement('td');
        col3.textContent = item.id;
        fila.appendChild(col3);

        const col4 = document.createElement('td');
        col4.textContent = item.title;
        fila.appendChild(col4);

        tbody.appendChild(fila);
    });

    mensaje.innerHTML = `Cantidad de Registros: ${registros}`;
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
}
