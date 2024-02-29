// Llamada genérica AJAX al servidor
// Response es la funcion que devuelve los datos
// Response tienen una función json() que devuelve una promesa
// Para caoturar la promesa usamos .then()

// fetch('http://localhost:5000/dishes').then((response) => console.log(response))

// Para enviuar la promesa, hacemos return
// NO olvidad return si hay llaves en la funcion

const SERVER_URL = 'http://localhost:5000'
const CATEGORIES_URL = `${SERVER_URL}/categories`
const DISHES_URL = `${SERVER_URL}/dishes`
const RESTAURANTS_URL = `${SERVER_URL}/restaurants`

// 3 peticiones. Navegador nos devuelve en consola 3 arrays.
// Pide una url, cuando llegue la respuesta ejecuta la funcion .json que devuelve los datos y me los retornas

// Con Wait, haz la peticion y espera hasta que acabe de ejecutarse y continua. Un poco volver a ser sincrono.
// Queremos pedir todos a la vez y recibirlos así. No esperar.

// Lo metemos en una función asíncrona.

async function procesarDatos() {
  const dishesPromise = fetch(DISHES_URL)
    .then((response) => {
      // Al recibir los datos los pasa a formato json.
      // Es una promesa de que va a generar un array con los datos/jason.
      return response.json() // no olvidar el return si hay llaves en la función
    })
    // Devolvemos el array con los datos.
    .then((data) => data)
    .catch((error) => console.log(error)) // Si es un error
    .finally(() => console.log('Finalizando')) // Finalizamos la peticion.

  const categoriesPromise = fetch(CATEGORIES_URL)
    .then((response) => {
      return response.json() // no olvidar el return si hay llaves en la función
    })
    .then((data) => data)

  const restaurantsPromise = fetch(RESTAURANTS_URL)
    .then((response) => {
      return response.json() // no olvidar el return si hay llaves en la función
    })
    .then((data) => data)

  // Hasta que no lleguen las llamadas de la promesas no se ejecuta.
  // Con objeto promise, guardamos las promesas y devuelve un array con todos los datos y por destructuracion devuelvo.
  // Todo esto lo hacemos cuando tenemos todos los datos. Al tener las tres peticiones de la promesa.

  const [dishes, categories, restaurants] = await Promise.all([
    dishesPromise,
    categoriesPromise,
    restaurantsPromise,
  ])

  insertarDatos(dishes, categories, restaurants)
}

// Funcion para insertar datos

function insertarDatos(dishes, categories, restaurants) {
  // 1 - Seleccionamos el elemento del DOM
  const tbody = document.querySelector('tbody')
  const table = document.querySelector('table')
  // 2 - Insertamos los datos con esta estructura:

  // mostramos los dishes en la tabla
  dishes.forEach(
    ({ platoID, plato, descripcion, precio, categoriaID, restauranteID }) => {
      const row = document.createElement('tr')
      const categoria = categories[restauranteID - 1].categoria
      const restaurante = restaurants[restauranteID - 1].restaurante
      const barrio = restaurants[restauranteID - 1].barrio
      row.innerHTML = `
      <th scope="row">${platoID}</th>
      <td>${plato}</td>
      <td>${descripcion || ''}</td>
      <td class="text-nowrap justify-content-end">${precio.toFixed(2)} €</td>
      <td>${categoria}</td>
      <td>${restaurante}(${barrio})</td>
    `
      tbody.appendChild(row)
    }
  )

  // Muestro la tabla: quito la clase visually-hidden
  table.classList.remove('visually-hidden')
}

// Llamamos a la función procesardatos. Al tener esperas se trata de una función asíncrona.
procesarDatos()
