let element = document.querySelector('.element')

const showVelibStation = (items) => {
  items.records.forEach((item) => {
    
    let time = new Date().toLocaleString('fr-FR')
    element.innerHTML += `
    <div class="app">
    <h2 id="time">${time}</h2>
    <h3>Station : ${item.fields.name}</h3>
    <p>${item.fields.mechanical} classical Velibs</p>
    <p>${item.fields.ebike} electric Velibs</p>
    </div>
    `
    const marker = L.marker([item.fields.coordonnees_geo[0], item.fields.coordonnees_geo[1]]).addTo(map)
    marker.bindPopup(`Station : ${item.fields.name}<br>${item.fields.mechanical} vélos libres<br>${item.fields.ebike} vélos eléctirques libres`).openPopup()
  })
}

const city = prompt('Quelle ville souhaitez-vous afficher ?')

const velibData = () => {
  fetch(
    `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=${city}&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes`
  )
    .then((response) => {
      return response.json()
    })
    .then((items) => {
      showVelibStation(items)
    }).catch((error) =>
        console.log('Error return : ', error.message)
      )
  }

const map = L.map('map').setView([48.856, 2.352], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


velibData()
setInterval(velibData, 60000)

