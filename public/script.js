// ── AÑADIDO: Navegación por tabs ─────────────────────────────
function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === 'tab-' + tabName);
  });
}
 
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});
 
// ── AÑADIDO: Sistema de toast ─────────────────────────────────
let toastTimer;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}
 
// ── AÑADIDO: Carga automática al iniciar ─────────────────────
window.addEventListener('DOMContentLoaded', () => {
  cargarSeries();
  cargarActores();
});
 
// ════════════════════════════════════════════════════════════
//  CÓDIGO ORIGINAL — NO MODIFICADO
// ════════════════════════════════════════════════════════════
 
async function cargarSeries() {
try{
    document.getElementById("resultado").innerHTML = "";
    const respuesta = await fetch(
        "http://localhost:9999/series"
    );
 
    const datos = await respuesta.json();
 
    console.log(datos);
 
    document.getElementById("resultado").innerHTML = datos.map(serie => `
         <div class="card">
            <div class="card-id"># ${serie.id}</div>
            <h3>${serie.titulo}</h3>
            <p>${serie.genero} · ${serie.temporadas} temporadas</p>
            <p>${serie.plataforma} · ${serie.estreno}</p>
            <p>${serie.director}</p>
            <p>${serie.actores}</p>
            <p><span class="badge">${serie.finalizada ? "Finalizada" : "En emisión"}</span></p>
            <div class="nota-row">★ ${serie.nota}</div>
        </div>
    `).join("");
    }catch(error){
        alert(error)
    }
}
 
    async function cargarActores() {
    try{
    const respuesta = await fetch(
        "http://localhost:9999/actores"
    );
 
    const datos = await respuesta.json();
 
    console.log(datos);
 
    document.getElementById("resultadoPersonajes").innerHTML = datos.map(actores => `
        <div class="card">
            <div class="card-id"># ${actores.id}</div>
            <h3>${actores.nombre}</h3>
            <p>Edad: ${actores.edad} años</p>
            <p>Nacionalidad: ${actores.nacionalidad}</p>
            <p>Serie: ${actores.serie}</p>
            <p>Personaje: ${actores.personaje}</p>
    </div>
`).join("");
}catch(error){
    alert(error)
}}
 
    async function busquedaAvanzada() {
    const campos = {
        id:           document.getElementById("b-id").value,
        titulo:       document.getElementById("b-titulo").value,
        genero:       document.getElementById("b-genero").value,
        plataforma:   document.getElementById("b-plataforma").value,
        director:     document.getElementById("b-director").value,
        actor:        document.getElementById("b-actor").value,
        finalizada:   document.getElementById("b-finalizada").value,  // "true", "false" o ""
        notaMin:      document.getElementById("b-notaMin").value,
        notaMax:      document.getElementById("b-notaMax").value,
        estrenoDe:    document.getElementById("b-estrenoDe").value,
        estrenoHasta: document.getElementById("b-estrenoHasta").value,
        temporadasMin: document.getElementById("b-temporadasMin").value,
        temporadasMax: document.getElementById("b-temporadasMax").value,
    };
 
    document.getElementById("resultado").innerHTML = "";
    const params = new URLSearchParams();
    for (const [clave, valor] of Object.entries(campos)) {
        if (valor !== "" && valor !== null) {
            params.append(clave, valor);
        }
    }
    try{
    const respuesta = await fetch(`http://localhost:9999/series/buscar?${params.toString()}`);
    const datos = await respuesta.json();
    console.log(datos);
    document.getElementById("resultado").innerHTML = datos.map(serie => `
         <div class="card">
            <div class="card-id"># ${serie.id}</div>
            <h3>${serie.titulo}</h3>
            <p>${serie.genero} · ${serie.temporadas} temporadas</p>
            <p>${serie.plataforma} · ${serie.estreno}</p>
            <p>${serie.director}</p>
            <p>${serie.actores}</p>
            <p>${serie.finalizada ? "Finalizada" : "En emisión"}</span></p>
            <p>★ ${serie.nota}</p>
        </div>
    `).join("");
 
 
    const formulario = document.getElementById("formulario"); 
}catch(error){
    alert(error)
 
}}
//CREAR SERIE
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
 
    document.getElementById("formularioActor").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    
     const nuevoActor = {
        nombre:       document.getElementById("nombre").value.trim(),
        edad:         Number(document.getElementById("edad").value),
        nacionalidad: document.getElementById("nacionalidad").value.trim(),
        serie:        document.getElementById("serie").value.trim(),
        personaje:    document.getElementById("personaje").value.trim()
    };
 
    try {
        const res = await fetch("http://localhost:9999/guardar-actor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoActor)
        });
 
        const data = await res.json();
 
        if (!res.ok) {
            alert("Error: " + data.error);
        } else {
            alert("Actor guardado correctamente");
            document.getElementById("formularioActor").reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioActualizarActor").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const actorActualizado = {
        id:           Number(document.getElementById("id-actualizar").value),
        nombre:       document.getElementById("nombre-actualizar").value.trim(),
        edad:         Number(document.getElementById("edad-actualizar").value),
        nacionalidad: document.getElementById("nacionalidad-actualizar").value.trim(),
        serie:        document.getElementById("serie-actualizar").value.trim(),
        personaje:    document.getElementById("personaje-actualizar").value.trim()
    };
 
    try {
        const res = await fetch("http://localhost:9999/actualizar-actor", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actorActualizado)
        });
 
        const data = await res.json();
 
        if (!res.ok) {
            alert("Error: " + data.error);
        } else {
            alert("Actor actualizado correctamente");
            document.getElementById("formularioActualizarActor").reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioBorrarActor").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const id = Number(document.getElementById("id-borrar").value);
 
    if (!id) {
        alert("Introduce un ID válido.");
        return;
    }
 
    if (!confirm(`¿Seguro que quieres borrar el actor con ID ${id}?`)) return;
 
    try {
        const res = await fetch("http://localhost:9999/borrar-actor", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
 
        if (!res.ok) {
            const data = await res.json();
            alert("Error: " + data.error);
        } else {
            alert("Actor borrado correctamente.");
            document.getElementById("formularioBorrarActor").reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioActualizarSerie").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const serieActualizada = {
        id:         Number(document.getElementById("id-serie-actualizar").value),
        titulo:     document.getElementById("titulo-actualizar").value.trim(),
        genero:     document.getElementById("genero-actualizar").value.trim(),
        temporadas: Number(document.getElementById("temporadas-actualizar").value),
        plataforma: document.getElementById("plataforma-actualizar").value.trim(),
        estreno:    Number(document.getElementById("estreno-actualizar").value),
        finalizada: document.getElementById("finalizada-actualizar").checked,
        director:   document.getElementById("director-actualizar").value.trim(),
        actores:    document.getElementById("actores-actualizar").value.trim().split(",").map(a => a.trim()),
        nota:       Number(document.getElementById("nota-actualizar").value)
    };
 
    try {
        const res = await fetch("http://localhost:9999/actualizar-serie", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serieActualizada)
        });
 
        const data = await res.json();
 
        if (!res.ok) {
            alert("Error: " + data.error);
        } else {
            alert("Serie actualizada correctamente.");
            document.getElementById("formularioActualizarSerie").reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioBorrarSerie").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const id = Number(document.getElementById("id-serie-borrar").value);
 
    if (!id) {
        alert("Introduce un ID válido.");
        return;
    }
 
    if (!confirm(`¿Seguro que quieres borrar la serie con ID ${id}?`)) return;
 
    try {
        const res = await fetch("http://localhost:9999/borrar-serie", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });
 
        if (!res.ok) {
            const data = await res.json();
            alert("Error: " + data.error);
        } else {
            const mensaje = await res.text();
            alert(mensaje);
            document.getElementById("formularioBorrarSerie").reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
document.getElementById("formularioActoresOrden").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const orden = document.getElementById("orden").value;
 
    try {
        const res = await fetch(`http://localhost:9999/actores-orden?orden=${orden}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
 
        const datos = await res.json();
 
        if (!res.ok) {
            alert("Error: " + datos.error); // ✅ datos, no data
        } else {
            document.getElementById("resultadoPersonajes").innerHTML = datos.map(actor => `
                <div class="card">
                    <div class="card-id"># ${actor.id}</div>
                    <h3>${actor.nombre}</h3>
                    <p>Edad: ${actor.edad} años</p>
                    <p>Nacionalidad: ${actor.nacionalidad}</p>
                    <p>Serie: ${actor.serie}</p>
                    <p>Personaje: ${actor.personaje}</p>
                </div>
            `).join("");
        }
 
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioMaximaNota").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    try {
        const res = await fetch("http://localhost:9999/calcular-maxima-nota", {
            method: "GET"
        });
 
        const datos = await res.json();
 
        if (!res.ok) {
            alert("Error: " + datos.error);
        } else {
            document.getElementById("resultadoMaximaNota").innerHTML = `
                <div class="card">
                    <h3>${datos}</h3>
                </div>
            `;
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
 
document.getElementById("formularioRanking").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    const n = document.getElementById("n").value;
 
    if (!n || n <= 0) {
        alert("Introduce un número válido.");
        return;
    }
 
    try {
        const res = await fetch(`http://localhost:9999/series-ranking?n=${n}`, {
            method: "GET"
        });
 
        const datos = await res.json();
 
        if (!res.ok) {
            alert("Error: " + datos.error);
        } else {
            document.getElementById("resultadoRanking").innerHTML = datos.map((serie, index) => `
                <div class="card">
                    <h3>#${index + 1} — ${serie.titulo}</h3>
                    <p>Nota: ${serie.nota}</p>
                    <p>Género: ${serie.genero}</p>
                    <p>Plataforma: ${serie.plataforma}</p>
                    <p>Temporadas: ${serie.temporadas}</p>
                    <p>Director: ${serie.director}</p>
                </div>
            `).join("");
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
document.getElementById("formularioTotalActores").addEventListener("submit", async function(e) {
    e.preventDefault();
 
    try {
        const res = await fetch("http://localhost:9999/total-actores", {
            method: "GET"
        });
 
        const datos = await res.json();
 
        if (!res.ok) {
            alert("Error: " + datos.error);
        } else {
            document.getElementById("resultadoTotalActores").innerHTML = `
                <div class="card">
                    <h3>${datos}</h3>
                </div>
            `;
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});
document.getElementById("formularioSeriesPorGenero").addEventListener("submit", async function(e) {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:9999/series-por-genero", {
            method: "GET"
        });
 
        const datos = await res.json();
 
        if (!res.ok) {
            alert("Error: " + datos.error);
        } else {
            document.getElementById("resultadoSeriesPorGenero").innerHTML = Object.entries(datos).map(([genero, cantidad]) => `
                <div class="card">
                    <h3>${genero}</h3>
                    <p>Series: ${cantidad}</p>
                </div>
            `).join("");
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
});


