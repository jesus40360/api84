const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');
const titulo = document.getElementById('txtPelicula').value;
const poster = document.getElementById('poster');

btnBuscar.addEventListener('click',buscarPelicula);
btnLimpiar.addEventListener('click', limpiar);

function buscarPelicula(){
const titulo = document.getElementById('txtPelicula').value;
const apiKey = "30063268"
const url = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + titulo


fetch(url)
.then((response)=>{
   if(!response.ok){
        alert("No se encontro el servicio")

   }
   return response.json();

})

.then(data =>{

 if(data.Response=="False") mensaje.innerHTML = data.Error;
  else {
        mostrar(data)

  }
    


})

.catch((error)=>{

    mensaje.innerHTML = "Surgio un error " + error

})
}

function mostrar(data){
let registros = 1;
    const fila = document.createElement('tr');
    const col1 = document.createElement('td');
          col1.textContent = registros;
          fila.appendChild(col1);

          const col2 = document.createElement('td');
          col2.textContent = data.Title;
          fila.appendChild(col2);

          const col3 = document.createElement('td');
          col3.textContent = data.Released;
          fila.appendChild(col3);

          const col4 = document.createElement('td');
          col4.textContent = data.Plot;
          fila.appendChild(col4);
          tbody.appendChild(fila);
          tabla.appendChild(tbody);
          poster.src = data.Poster;


}
function limpiar(){

    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    poster.src ="/img/poster.png"
}
