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
]