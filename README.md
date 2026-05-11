# Trabajo Lenguaje de Marca
## Temática
LA API tiene dos listas bde recursos, series con sus datos (id, titulo, temporadas, plataforma, estreno, finalizada, director y nota) y los actores con sus datos(id, nombre, edad, nacionalidad, serie, personaje).
## EndPoints
En este apartado mostraré todos los endpoints, con su ruta, método, descripción y ejemplo.
### Mostrar todas las series
1. Método: GET
2. Ruta: http://localhost:9999/series/
3. Descripción: Sirve para ver todas las series
### Seleccionar serie por ID
1. Método: GET
2. Ruta: http://localhost:9999/series/id
3. Descripción: Sirve para mostrar la información de la serie con eso ID, en caso de no encontrarla, mostrará un error
4. Ejemplo: http://localhost:9999/series/1
### Añadir nueva serie
1. Método: POST
2. Ruta: http://localhost:9999/guardar-serie
3. Descripción: Sirve para añadir una serie a la lista
4. Ejemplo: http://localhost:9999/guardar-serie
   Código del body en JSON\
   {\
  "id": 1,\
 "titulo": "The Bridgerton",\
 "genero":"Romance",\
 "temporadas": 4, \
 "plataforma": "Netflix",\ 
 "estreno": 2020,\ 
 "finalizada": false,\ 
 "director":"Chris Van Dusen",\
 "nota": 9\
}

### Actualizar serie
1. Método: PUT
2. Ruta: http://localhost:9999/actualizar-serie
3. Descripción: Sirve para cambiar datos de una serie
5. Ejemplo: http://localhost:9999/guardar-serie
   código del body en JSON\
   {\
  "id": 1,\
 "titulo": "The Bridgerton",\
 "genero":"Romance",\
 "temporadas": 4, \
 "plataforma": "Netflix",\ 
 "estreno": 2020,\ 
 "finalizada": false,\ 
 "director":"Chris Van Dusen",\
 "nota": 9\
}
### Borrar serie
1. Método: PUT
2. Ruta: http://localhost:9999/borrar-serie
3. Descripción: Sirve para borrar una serie de la lista
4. Ejemplo: http://localhost:9999/borrar-serie
   código del body en JSON\
   {\
  "id": 1,\
}
### Ver actores
1. Método: GET
2. Ruta: http://localhost:9999/actores
3. Descripción: Sirve para ver todos los actores
4. Ejemplo: http://localhost:9999/actores
