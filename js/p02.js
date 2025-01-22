const btnBuscar = document.getElementById("buscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);

function buscar() {
    limpiar();
    const Id = document.getElementById("idjson").value;

    if (!Id) {
        mensaje.innerHTML = "No capturaste ningún ID";
        return;
    }

    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/users"
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const datos = JSON.parse(this.responseText);
            const datosid = datos.filter(item => item.id == parseInt(Id));
            
            if (datosid.length > 0) {
                datosid.forEach(item => {
                    const fila = document.createElement('tr');

                    const columna1 = document.createElement('td');
                    columna1.textContent = item.id;
                    fila.appendChild(columna1);

                    const columna2 = document.createElement('td');
                    columna2.textContent = item.name;
                    fila.appendChild(columna2);

                    const columna3 = document.createElement('td');
                    columna3.textContent = item.username;
                    fila.appendChild(columna3);

                    const columna4 = document.createElement('td');
                    columna4.textContent = item.email;
                    fila.appendChild(columna4);

                    const columna5 = document.createElement('td');
                    columna5.textContent = `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}, ${item.address.geo.lat}, ${item.address.geo.lng}`;
                    fila.appendChild(columna5);

                    const columna6 = document.createElement('td');
                    columna6.textContent = item.phone;
                    fila.appendChild(columna6);

                    const columna7 = document.createElement('td');
                    columna7.textContent = item.website;
                    fila.appendChild(columna7);

                    const columna8 = document.createElement('td');
                    columna8.textContent = `${item.company.name}, ${item.company.catchPhrase}, ${item.company.bs}`;
                    fila.appendChild(columna8);

                    tbody.appendChild(fila);
                });

                mensaje.innerHTML = "Datos cargados correctamente";
            } else {
                mensaje.innerHTML = "ID erróneo o no encontrado";
            }
        }else if(this.readyState == 4){
            mensaje.innerHTML = "Ocurrio un error inesperado";
        }
    };
}
function limpiar(){
    tbody.innerHTML = "";
    mensaje.innerHTML = ""; 
}