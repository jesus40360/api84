document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar');
    const btnLimpiar = document.getElementById('limpiar');
    const mensaje = document.getElementById('mensaje');
    const imagen = document.getElementById('poster');
    const tablaCocteles = document.getElementById('tabla-cocteles');

    btnBuscar.addEventListener('click', cargarCoctel);
    btnLimpiar.addEventListener('click', limpiar);

    function cargarCoctel() {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        axios.get(url)
            .then(response => {
                if (response.data.drinks) {
                    const coctel = response.data.drinks[0];
                    imagen.src = coctel.strDrinkThumb;
                    mensaje.innerHTML = "Datos del cóctel cargados.";
                    mostrarDetallesEnTabla(coctel);
                } else {
                    mensaje.innerHTML = "No se encontró el cóctel.";
                }
            })
            .catch(error => {
                console.error("Error en la petición Axios:", error);
                mensaje.innerHTML = "Surgió un error al cargar el cóctel: " + error;
            });
    }

    function mostrarDetallesEnTabla(coctel) {
        tablaCocteles.innerHTML = "";

        let ingredientes = "";
        for (let i = 1; i <= 15; i++) {
            const ing = coctel[`strIngredient${i}`];
            const med = coctel[`strMeasure${i}`];
            if (ing) {
                ingredientes += (med ? med.trim() : "") + " " + ing + "<br>";
            }
        }

        const fila = `
            <tr>
                <td>${coctel.strDrink}</td>
                <td>${ingredientes}</td>
                <td>${coctel.strInstructions}</td>
            </tr>
        `;
        tablaCocteles.innerHTML = fila;
    }

    function limpiar() {
        imagen.src = "/img/mojito.png";
        mensaje.innerHTML = "";
        tablaCocteles.innerHTML = "";
    }
});
