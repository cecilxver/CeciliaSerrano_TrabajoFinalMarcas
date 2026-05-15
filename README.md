# Trabajo Lenguaje de Marca
## Temática
LA API tiene dos listas bde recursos, series con sus datos (id, titulo, temporadas, plataforma, estreno, finalizada, director y nota) y los actores con sus datos(id, nombre, edad, nacionalidad, serie, personaje).
## EndPoints
En este apartado mostraré todos los endpoints, con su ruta, método, descripción y ejemplo.
### Mostrar todas las series
1. Método: GET
2. Ruta: http://localhost:9999/series/
3. Descripción: Sirve para ver todas las series
### Seleccionar serie por búsqueda avanzada
1. Método: GET
2. Ruta: http://localhost:9999/series/buscar/
3. Descripción: Sirve para buscar por cualquier parámetro las series
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
### Seleccionar actores por ID
1. Método: GET
2. Ruta: http://localhost:9999/actores/:id
3. Descripción: Sirve para seleccionar un actor en concreto por ID
4. Ejemplo: http://localhost:9999/actores/1
### Guardar actor
1. Método: POST
2. Ruta: http://localhost:9999/guardar-actor
3. Descripción: Sirve para guardar un actor
4. Ejemplo: Código en JSON\ {\
  "nombre": "Malena Alterio",\
  "edad":56,\
  "nacionalidad":"Española",\
  "serie":"Aquí no hay quien viva",\
  "personaje":"Belén López Vázquez"\
}
### Actualizar actor
1. Método: PUT
2. Ruta: http://localhost:9999/actualizar-actor
3. Descripción: Sirve para actualizar un actor
4. Ejemplo: Código en JSON\ {\
  "nombre": "Malena Alterio",\
  "edad":56,\
  "nacionalidad":"Española",\
  "serie":"Aquí no hay quien viva",\
  "personaje":"Belén López Vázquez"\
}
### Borrar actor
1. Método: DELETE
2. Ruta: http://localhost:9999/borrar-actor
3. Descripción: Sirve para borrar un actor
4. Ejemplo: Código en JSON\ {\
  "id": 1\
}
### Filtrar series por nota
1. Método: GET
2. Ruta: http://localhost:9999/series-nota
3. Descripción: Sirve para buscar series con una nota mayor a la elegida.
4. Ejemplo: http://localhost:9999/series-nota?nota=9

### Ordenar series de manera ascendente y descendente
1. Método: GET
2. Ruta: http://localhost:9999/actores-orden
3. Descripción: Sirve para ordenar los actores de manera ascendente y descendente
4. Ejemplo: http://localhost:9999/actores-orden?orden=asc

### Filtrar series por terminada

