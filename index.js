const express = require('express');
const app = express();
const port = 9999;
const cors = require("cors");
app.use(express.json());
app.listen(port, () => {
    console.log("Servidor abierto");
});
app.use(cors());
/**
 * TODO:
 * -Terminar fronted
 * - Intentar hacer uno de busqueda de cualquiera
 */
/** CREACIÓN DE LAS LISTAS */
let series = [
{ id: 1, titulo: "The Bridgerton", genero:"Romance", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: false, director:"Chris Van Dusen", actores:["Claudia Jessie","Sarah Jessica Parker"], nota: 9 },
{ id: 2, titulo: "Sex And The City", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 1998, finalizada: true, director:"Darren Star", actores:["Sarah Jessica Parker","Maitreyi Ramakrishnan"], nota: 9 },
{ id: 3, titulo: "Never Have I Ever", genero:"Comedia", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: true, director:"Mindy Kaling", actores:["Maitreyi Ramakrishnan","Leighton Meester"], nota: 10 },
{ id: 4, titulo: "Gossip Girl", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 2007, finalizada: true, director:"Stephanie Savage", actores:["Leighton Meester","Gemma Cuervo"], nota: 6 },
{ id: 5, titulo: "Aquí no hay quien viva", genero:"Comedia", temporadas: 5, plataforma: "Netflix", estreno: 2003, finalizada: true, director:"Alberto Caballero", actores:["Gemma Cuervo","Marisa Porcel"], nota: 10 },
{ id: 6, titulo: "Escenas de matrimonio", genero:"Comedia", temporadas: 10, plataforma: "Netflix", estreno: 2007, finalizada: true, director:"Alberto Caballero", actores:["Marisa Porcel","Claudia Jessie"], nota: 9 }
];
let actores=[{ id: 1, nombre: "Claudia Jessie", edad: 36, nacionalidad: "Británica", serie: "The Bridgerton", personaje: "Eloise Bridgerton"},
{id: 2,nombre: "Sarah Jessica Parker", edad: 61, nacionalidad: "Estadounidense", serie:"Sex And The City", personaje: "Carrie Bradshaw"},
{id: 3,nombre: "Maitreyi Ramakrishnan", edad: 24, nacionalidad: "Canadiense", serie:"Never Have I Ever", personaje: "Devi Vishwakumar"},
{id: 4,nombre: "Leighton Meester", edad: 40, nacionalidad: "Estadounidense", serie:"Gossip Girl", personaje: "Blair Waldorf"},
{id: 5,nombre: "Gemma Cuervo", edad: 91, nacionalidad: "Española", serie:"Aquí no hay quien viva", personaje: "Vicenta Benito"},
{id: 6,nombre: "Marisa Porcel", edad:74, nacionalidad: "Española", serie:"Escenas de matrimonio", personaje: "Pepa Gutiérrez"}]
 
/** MÉTODOS LISTA PRINCIPAL */
app.get("/series", (req,res) =>{
    try{
    const genero=req.query.genero;
  if (!genero) {
        return res.json(series);
    }
    
    const resultado= series.filter(serie => serie.genero.toLowerCase().includes(genero.toLowerCase()));
    if(resultado==null){
        return res.json(400).json({
            error: "No se ha encontrado ningún genero"
        })
    }
res.json(resultado);
}catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   })
}});
    app.get("/series/:id", (req, res) => {
        try{
        const serie = series.find(series => series.id === Number(req.params.id));
        if (!serie) {

            return res.status(404).json({
                error: "Serie no encontrada"
            });
        }
        return res.json(serie);
    } catch (error) {

   return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
    app.post("/guardar-serie", (req,res) =>{
        try{
    let nuevaSerie = {
        id: series.length+1,
        titulo: req.body.titulo,
        genero: req.body.genero,
        temporadas: req.body.temporadas,
        plataforma: req.body.plataforma,
        estreno: req.body.estreno,
        finalizada: req.body.finalizada,
        director: req.body.director,
        actores: req.body.actores,
        nota: req.body.nota
    }
    if(
    !req.body.titulo ||
    !req.body.genero ||
    !req.body.temporadas ||
    !req.body.plataforma ||
    !req.body.estreno ||
    req.body.finalizada === undefined ||
    !req.body.director ||
    !req.body.actores||
    !req.body.nota
){
    return res.status(400).json({
        error: "Datos incompletos"
    })
}
    series.push(nuevaSerie);
    return res.status(201).json(nuevaSerie);
}catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})
app.put("/actualizar-serie", (req,res) => {
    try{
    series[req.body.id-1].id = req.body.id;
    series[req.body.id-1].titulo = req.body.titulo;
    series[req.body.id-1].temporadas = req.body.temporadas;
    series[req.body.id-1].plataforma = req.body.plataforma;
    series[req.body.id-1].estreno = req.body.estreno;
    series[req.body.id-1].finalizada = req.body.finalizada;
    series[req.body.id-1].director = req.body.director;
    series[req.body.id-1].actores=req.body.actores;
    series[req.body.id-1].nota = req.body.nota;
       if(
    !req.body.titulo ||
    !req.body.genero ||
    !req.body.temporadas ||
    !req.body.plataforma ||
    !req.body.estreno ||
    req.body.finalizada === undefined ||
    !req.body.director ||
    !req.body.actores ||
    !req.body.nota
){
    return res.status(400).json({
        error: "Para actualizar una serie, debes añadir todos los datos de esta."
    })}

    return res.json(series[req.body.id-1])
}catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})

app.delete("/borrar-serie", (req,res) => {
    try{
    const index = series.findIndex(a => a.id == req.body.id)
    if(index === -1){ //si no se encuentra, findIndex devolverá -1
        return res.status(404)({
            error: "Serie no encontrada"
        })
    }

    series.splice(index, 1);
    series.forEach((serie, i) => {
        serie.id = i + 1;
    });
    return res.send("La serie: " + req.body.id + " ha sido eliminada.")
}catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})
/*MÉTODOS RECURSO SECUNDARIO */
app.get("/actores", (req, res) => {
    try{
        return res.json(actores);
    }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   })
}});  
    app.get("/actores/:id", (req, res) => {
        try{
        const actor = actores.find(actores => actores.id === Number(req.params.id));

        if (!actor) {

            return res.status(404).json({
                error: "Actor no encontrado"
            });
        }
        return res.json(actor);
    }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})
    app.post("/guardar-actor", (req,res) =>{
        try{
    let nuevoActor = {
        id: actores.length+1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        nacionalidad: req.body.nacionalidad,
        serie: req.body.serie,
        personaje: req.body.personaje,

    }
    if(
    !req.body.nombre ||
    !req.body.edad ||
    !req.body.nacionalidad ||
    !req.body.serie ||
    !req.body.personaje
){
    return res.status(400).json({
        error: "Datos incompletos"
    })
}
    series.push(nuevoActor);
    return res.status(200).json(nuevoActor);
    }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})
app.put("/actualizar-actor", (req,res) => {
    try{
    actores[req.body.id-1].id = req.body.id;
    actores[req.body.id-1].nombre = req.body.nombre;
    actores[req.body.id-1].edad = req.body.edad;
    actores[req.body.id-1].nacionalidad = req.body.nacionalidad;
    actores[req.body.id-1].serie = req.body.serie;
    actores[req.body.id-1].personaje= req.body.personaje;
      if(
    !req.body.nombre ||
    !req.body.edad ||
    !req.body.nacionalidad ||
    !req.body.serie ||
    !req.body.personaje
){
    return res.status(400).json({
        error: "Datos incompletos"
    })}
    
   return res.status(200).json(actores[req.body.id-1])
   }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})

app.delete("/borrar-actor", (req,res) => {
    try{
    const index = actores.findIndex(a => a.id == req.body.id)
    actores.splice(index, 1)
        if(index === -1){ //si no se encuentra, findIndex devolverá -1
        return res.status(404)({
            error: "Actor no encontrado"
        })
    }
    return res.status(200).json;
       }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}})

app.get("/series-nota", (req,res)=>{
    try{
    const nota= req.query.nota;
    const resultado=series.filter(serie=>serie.nota>nota);
    res.json(resultado);
    }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
app.get("/actores-orden", (req,res)=>{
    try{
    const orden=req.query.orden;
    if(orden.toLowerCase().includes("asc")){
        actores.sort((a,b)=>
        a.nombre.localeCompare(b.nombre))
    }else if(orden.toLowerCase().includes("desc")){
        actores.sort((a,b)=>
        b.nombre.localeCompare(a.nombre));
    }else{
        return res.status(400).json({
            error: 'Datos inválidos, debe usar "asc" o "desc"'
        });
    }
    return res.json(actores);
    }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
app.get("/series-terminada",(req,res)=>{
    try{
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

        }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
    app.get("/calcular-maxima-nota",(req,res)=>{
        try{
        const notas = series.map(serie => serie.nota);
       let max = notas[0];
        for (let index = 0; index < notas.length; index++) {
            if(notas[index]> max){
            max = notas[index];
            }
            
        }
        return res.json ("La máxima nota es "+max);
        }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
    
    app.get("/series-ranking", (req,res)=>{
        try{
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
        }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
    app.get("/total-actores", (req,res)=>{
        try{
         res.json("Son en total "+actores.length+" actores");
             }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   });
}});
    app.get("/series-por-genero",(req,res)=>{
        try{
        const resultado={};
        series.forEach(serie => {
            const genero = serie.genero;
            if(resultado[genero]){
                resultado[genero]++;
            }else{
                resultado[genero]=1
            }
        })
         return res.json(resultado);
             }catch{
 return res.status(500).json({
      error: "Error interno del servidor"
   })
}});
