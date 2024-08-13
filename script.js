var map = L.map("map").setView([1.4955482737482169, 99.68337766721375], 11);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w",
  {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w",
  }
).addTo(map);

let currentRouteIndex = -1;
let routesData = [];

const locations = [
  { lat: 1.5342940733103487, lng: 99.64382249361992, name: "Hotel Sapadia" },
  {
    lat: 1.349523864137562,
    lng: 99.42844107827977,
    name: "Barumun Nagari Wildlife Sanctuary",
  },
  {
    lat: 1.5868444895665277,
    lng: 99.98702550294901,
    name: "Agrowisata Durian dan Manggis",
  },
  {
    lat: 1.4895173726115556,
    lng: 99.61155689042731,
    name: "Waterboom RCM Gunung Tua",
  },
  {
    lat: 1.523167829862158,
    lng: 99.63017987862821,
    name: "Rumah Makan Holat Alhamdulillah",
  },
  {
    lat: 1.5882420196978602,
    lng: 99.94773723779537,
    name: "Batik Sekar Najogi",
  },
  {
    lat: 1.4094431824434102,
    lng: 99.72667829362007,
    name: "Candi Bahal I,II,III",
  },
];

function loadRoutesData(type) {
  const filePath = type === "tabu" ? "./data/tabu.json" : "./data/pso.json";
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      routesData = data;
      displayNextRoute(type);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById(`result-${type}`).innerText =
        "Terjadi Error: " + error.message;
    });
}

function displayNextRoute(type) {
  if (routesData.length === 0) {
    console.error("No routes data available.");
    return;
  }

  currentRouteIndex = (currentRouteIndex + 1) % routesData.length;
  const selectedRoute = routesData[currentRouteIndex];

  document.getElementById(
    `result-${type}`
  ).innerText = `Hari ke-${selectedRoute.id}\nRute Wisata: ${selectedRoute.route}\nPerkiraan Waktu Tempuh: ${selectedRoute.cost} menit`;

  displayRoute(selectedRoute.route);
}

function displayRoute(route) {
  if (!Array.isArray(route)) {
    console.error("Route is not an array:", route);
    return;
  }

  const latlngs = route.map((index) => [
    locations[index].lat,
    locations[index].lng,
  ]);

  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w",
    {
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w",
    }
  ).addTo(map);

  L.polyline(latlngs, { color: "blue" }).addTo(map);

  locations.forEach((location, index) => {
    L.marker([location.lat, location.lng])
      .bindPopup(`(${index}) ${location.name}`)
      .addTo(map);
  });

  map.fitBounds(latlngs);
}
