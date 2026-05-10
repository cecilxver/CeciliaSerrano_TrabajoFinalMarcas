const express = require('express');
const app = express();
const port = 9999;
app.use(express.json());
app.listen(port, () => {
    console.log("Servidor abierto");
});
/** CREACIÓN DE LAS LISTAS */
let series=[ {id: 1,titulo: "The Bridgerton", genero:"Romance", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: false, director:"Chris Van Dusen", nota: 9},
    {id: 2,titulo: "Sex And The City", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 1998, finalizada: true, director:"Darren Star", nota: 9},
    {id: 3,titulo: "Never Have I Ever", genero:"Comedia", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: true, director:"Mindy Kaling", nota: 10},
    {id: 4,titulo: "Gossip Girl", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 2007, finalizada: true, director:" Stephanie Savage", nota: 6},
    {id: 5,titulo: "Aquí no hay quien viva", genero:"Comedia", temporadas: 5, plataforma: "Netflix", estreno: 2003, finalizada: true, director:"Alberto Caballero", nota: 10},
 {id:6,titulo: "Escenas de matrimonio", genero:"Comedia", temporadas: 10, plataforma: "Netflix", estreno: 2007, finalizada: true, director:"Alberto Caballero", nota: 9},

]
let actores=[{ id: 1, nombre: "Claudia Jessie", edad: 36, nacionalidad: "Británica", serie: "The Bridgerton", personaje: "Eloise Bridgerton"},
{id: 2,nombre: "Sarah Jessica Parker", edad: 61, nacionalidad: "Estadounidense", serie:"Sex And The City", personaje: "Carrie Bradshaw"},
{id: 3,nombre: "Maitreyi Ramakrishnan", edad: 24, nacionalidad: "Canadiense", serie:"Never Have I Ever", personaje: "Devi Vishwakumar"},
{id: 4,nombre: "Leighton Meester", edad: 40, nacionalidad: "Estadounidense", serie:"Gossip Girl", personaje: "Blair Waldorf"},
{id: 5,nombre: "Gemma Cuervo", edad: 91, nacionalidad: "Española", serie:"Aquí no hay quien viva", personaje: "Vicenta Benito"},
{id: 6,nombre: "Marisa Porcel", edad:74, nacionalidad: "Española", serie:"Escenas de matrimonio", personaje: "Pepa Gutiérrez"}]
 
/** MÉTODOS LISTA PRINCIPAL */

    app.get("/series/:id", (req, res) => {
        const serie = series.find(series => series.id === Number(req.params.id));
        return res.json(serie);
    });
    app.post("/guardar-serie", (req,res) =>{
    let nuevaSerie = {
        id: series.length+1,
        titulo: req.body.titulo,
        genero: req.body.genero,
        temporadas: req.body.temporadas,
        plataforma: req.body.plataforma,
        estreno: req.body.estreno,
        finalizada: req.body.finalizada,
        director: req.body.director,
        nota: req.body.nota
    }

    series.push(nuevaSerie);
    return res.status(200).json(nuevaSerie);
})
app.put("/actualizar-serie", (req,res) => {
    series[req.body.id-1].id = req.body.id;
    series[req.body.id-1].titulo = req.body.titulo;
    series[req.body.id-1].temporadas = req.body.temporadas;
    series[req.body.id-1].plataforma = req.body.plataforma;
    series[req.body.id-1].estreno = req.body.estreno;
    series[req.body.id-1].finalizada = req.body.finalizada;
    series[req.body.id-1].director = req.body.director;
    series[req.body.id-1].nota = req.body.nota;

    return res.json(series[req.body.id-1])
})

app.delete("/borrar-serie", (req,res) => {
    const index = series.findIndex(a => a.id == req.body.id)
    series.splice(index, 1)
    return res.send("La serie: " + req.body.id + " ha sido eliminada.")
})
/*MÉTODOS ACTORES */
app.get("/actores", (req, res) => {
        return res.json(actores);
    });
    app.get("/actores/:id", (req, res) => {
        const actor = actores.find(actores => actores.id === Number(req.params.id));
        return res.json(actor);
    });
    app.post("/guardar-actor", (req,res) =>{
    let nuevoActor = {
        id: actores.length+1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        nacionalidad: req.body.nacionalidad,
        serie: req.body.serie,
        personaje: req.body.personaje,

    }

    series.push(nuevoActor);
    return res.status(200).json(nuevoActor);
})
app.put("/actualizar-actor", (req,res) => {
    actores[req.body.id-1].id = req.body.id;
    actores[req.body.id-1].nombre = req.body.nombre;
    actores[req.body.id-1].edad = req.body.edad;
    actores[req.body.id-1].nacionalidad = req.body.nacionalidad;
    actores[req.body.id-1].serie = req.body.serie;
    actores[req.body.id-1].personaje= req.body.personaje;
    

    return res.json(actores[req.body.id-1])
})

app.delete("/borrar-actor", (req,res) => {
    const index = actores.findIndex(a => a.id == req.body.id)
    actores.splice(index, 1)
    return res.send("El actor/la actriz: " + req.body.id + " ha sido eliminado/a.")
})
app.get("/series", (req,res) =>{
    const genero=req.query.genero;
  if (!genero) {
        return res.json(series);
    }
    const resultado= series.filter(serie => serie.genero.toLowerCase().includes(genero.toLowerCase()));
res.json(resultado);
});
app.get("/series-nota", (req,res)=>{
    const nota= req.query.nota;
    const resultado=series.filter(serie=>serie.nota>nota);
    res.json(resultado);
});
app.get("/actores-orden", (req,res)=>{
    const orden=req.query.orden;
    if(orden.toLowerCase().includes("asc")){
        actores.sort((a,b)=>
        a.nombre.localeCompare(b.nombre))
    }else if(orden.toLowerCase().includes("desc")){
        actores.sort((a,b)=>
        b.nombre.localeCompare(a.nombre));
    }else{
        return res.status(400).json({
            error: 'Datos inválidos, debe usar "asc" o "desc'
        });
    }
    return res.json(actores);
})
app.get("/series-terminada",(req,res)=>{
    const fin=req.query.fin;
    if(fin.toLowerCase()==="true"){
        const resultado=series.filter(serie =>serie.finalizada ===true);
    return res.json(resultado);

    }else if(fin.toLowerCase()==="false"){
            const resultado=series.filter(serie =>serie.finalizada===false);
    return res.json(resultado);
    }else{
            return res.status(400).json({
                error: 'Datos inválidos, debe usar "true" o "false"'
            });
        }

    })
    app.get("/calcular-maxima-nota",(req,res)=>{
        const notas = series.map(serie => serie.nota);
       let max = notas[0];
        for (let index = 0; index < notas.length; index++) {
            if(notas[index]> max){
            max = notas[index];
            }
            
        }
        return res.json ("La máxima nota es "+max);
    });
    
    app.get("/series-ranking", (req,res)=>{
        const n=req.query.n;
        if(!n|| n<=0){
            return res.status(400).json({
                error: "Debes un número válido en n"
            });
        }
        const resultado = series
        .sort((a,b) => b.nota - a.nota)
        .slice(0,n);
        res.json(resultado);
    })
    app.get("/total-actores", (req,res)=>{
         res.json("Son en total "+actores.length+" actores");
    })
    app.get("/series-por-genero",(req,res)=>{
        const resultado={};
        series.forEach(serie => {
            const genero = serie.genero;
            if(resultado[genero]){
                resultado[genero]++;
            }else{
                resultado[genero]=1
            }
        }
        )
         return res.json(resultado);
    })



