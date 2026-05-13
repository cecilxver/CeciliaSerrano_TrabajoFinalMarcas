/**
 * TODO Añadir Try-Catch
 */
async function cargarSeries() {

    const respuesta = await fetch(
        "http://localhost:9999/series"
    );

    const datos = await respuesta.json();

    console.log(datos);

    document.getElementById("resultado").innerHTML = datos.map(serie => `
         <div class="card">
            <h3>${serie.titulo}</h3>
            <p>${serie.genero} · ${serie.temporadas} temporadas</p>
            <p>${serie.plataforma} · ${serie.estreno}</p>
            <p>${serie.director}</p>
            <p><span class="badge">${serie.finalizada ? "Finalizada" : "En emisión"}</span></p>
            <div class="nota-row">★ ${serie.nota}</div>
        </div>
    `).join("");
}
/*async function buscarSeriePorID(params) {
    
}*/
async function cargarActores() {

    const respuesta = await fetch(
        "http://localhost:9999/actores"
    );

    const datos = await respuesta.json();

    console.log(datos);

    document.getElementById("resultadoPersonajes").innerHTML = datos.map(actores => `
        <div class="card">
            <h3>${actores.nombre}</h3>
            <p>Edad: ${actores.edad} años</p>
            <p>Nacionalidad: ${actores.edad}</p>
            <p>Serie: ${actores.serie}</p>
            <p>Personaje: ${actores.personaje}</p>
    </div>
`).join("");
}
async function buscarGenero() {
    try{

    const genero =
        document.getElementById("verGenero").value;

    const respuesta = await fetch(
        `http://localhost:9999/series?genero=${genero}`
    );

    const datos = await respuesta.json();

    document.getElementById("GeneroContainer").innerHTML =datos.map(serie => `
         <div class="card">
            <h3>${serie.titulo}</h3>
            <p>${serie.genero} · ${serie.temporadas} temporadas</p>
            <p>${serie.plataforma} · ${serie.estreno}</p>
            <p>${serie.director}</p>
            <p>${serie.finalizada ? "Finalizada" : "En emisión"}</span></p>
            <p>★ ${serie.nota}</p>
        </div>
    `).join("");
    }catch(error){
    alert(error);
    }
}
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario"); // solo una vez

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nuevaSerie = {
            titulo: document.getElementById("titulo").value,
            genero: document.getElementById("genero").value,
            temporadas: Number(document.getElementById("temporadas").value),
            plataforma: document.getElementById("plataforma").value,
            estreno: document.getElementById("estreno").value,
            finalizada: document.getElementById("finalizada").checked,
            director: document.getElementById("director").value,
            actores: document.getElementById("actores").value.split(","),
            nota: Number(document.getElementById("nota").value)
        };

        try {
            const respuesta = await fetch("http://localhost:9999/guardar-serie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaSerie)
            });

            const datos = await respuesta.json();
            console.log(datos);
            alert("Serie guardada");

        } catch(error) {
            console.log(error);
        }
    });

    // El resto de tus funciones (cargarSeries, cargarActores, etc.) también aquí dentro

});

