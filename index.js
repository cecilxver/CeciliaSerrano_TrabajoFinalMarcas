const express = require('express');
const app = express();
const port = 9999;
app.use(express.json());
app.listen(port, () => {
    console.log("Servidor abierto");
});
let series=[ {titulo: "The Bridgerton", genero:"Romance", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: false, director:"Chris Van Dusen", nota: 9},
    {titulo: "Sex And The City", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 1998, finalizada: true, director:"Darren Star", nota: 9},
    {titulo: "Never Have I Ever", genero:"Comedia", temporadas: 4, plataforma: "Netflix", estreno: 2020, finalizada: true, director:"Mindy Kaling", nota: 10},
    {titulo: "Gossip Girl", genero:"Romance", temporadas: 6, plataforma: "Netflix", estreno: 2007, finalizada: true, director:" Stephanie Savage", nota: 6},
    {titulo: "Aquí no hay quien viva", genero:"Comedia", temporadas: 5, plataforma: "Netflix", estreno: 2003, finalizada: true, director:"Alberto Caballero", nota: 10},
 {titulo: "Escenas de matrimonio", genero:"Comedia", temporadas: 10, plataforma: "Netflix", estreno: 2007, finalizada: true, director:"Alberto Caballero", nota: 9},

]
let actores=[{nombre: "Claudia Jessie", edad: 36, nacionalidad: "Británica", serie: "The Bridgerton", personaje: "Eloise Bridgerton"},
{nombre: "Sarah Jessica Parker", edad: 61, nacionalidad: "Estadounidense", serie:"Sex And The City", personaje: "Carrie Bradshaw"},
{nombre: "Maitreyi Ramakrishnan", edad: 24, nacionalidad: "Canadiense", serie:"Never Have I Ever", personaje: "Devi Vishwakumar"},
{nombre: "Leighton Meester", edad: 40, nacionalidad: "Estadounidense", serie:"Gossip Girl", personaje: "Blair Waldorf"},
{nombre: "Gemma Cuervo", edad: 91, nacionalidad: "Española", serie:"Aquí no hay quien viva", personaje: "Vicenta Benito"},
{nombre: "Marisa Porcel", edad:74, nacionalidad: "Española", serie:"Escenas de matrimonio", personaje: "Pepa Gutiérrez"}]
