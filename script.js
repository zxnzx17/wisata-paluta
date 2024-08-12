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

//TABU
let currentRouteIndex = -1;
let routesData = []; // Pastikan data JSON dimuat ke dalam array ini

// Fungsi untuk memuat data JSON
function loadRoutesDataTabu() {
  fetch("./data/tabu.json") // Menggunakan nama file baru
    .then((response) => response.json())
    .then((data) => {
      routesData = data; // Menyimpan data JSON ke dalam routesData
      displayNextRoute(); // Menampilkan rute pertama setelah data dimuat
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("result").innerText =
        "Terjadi Error: " + error.message;
    });
}

// Fungsi untuk menampilkan rute berikutnya
function displayNextRoute() {
  if (routesData.length === 0) {
    console.error("No routes data available.");
    return;
  }

  // Meningkatkan index untuk menampilkan rute berikutnya
  currentRouteIndex++;

  // Reset index jika sudah melebihi jumlah rute
  if (currentRouteIndex >= routesData.length) {
    currentRouteIndex = 0;
  }

  // Ambil rute berdasarkan index saat ini
  const selectedRoute = routesData[currentRouteIndex];
  console.log("Selected Route:", selectedRoute); // Debugging
  console.log("Route:", selectedRoute.route); // Debugging

  // Tampilkan rute pada peta dan di elemen result
  const resultTabu = document.getElementById("result");
  resultTabu.innerText = `Hari ${selectedRoute.id}: Rute Wisata: ${selectedRoute.route}\n Perkiraan Waktu Tempuh: ${selectedRoute.cost} menit`;
  resultTabu.classList.add("alert-info");
  displayRouteWithPSO(selectedRoute.route);
}
// Fungsi untuk memulai peta dengan rute yang diambil
function displayRouteWithPSO(route) {
  if (!Array.isArray(route)) {
    console.error("Route is not an array:", route);
    return; // Keluar dari fungsi jika bukan array
  }

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

  var latlngs = route.map((index) => [
    locations[index].lat,
    locations[index].lng,
  ]);

  // Hapus lapisan rute sebelumnya jika ada
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Tambahkan tile layer kembali
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

  // Mendefinisikan ikon hijau menggunakan AwesomeMarkers
  var greenMarker = L.AwesomeMarkers.icon({
    icon: "info-sign",
    markerColor: "green",
  });

  // Tambahkan rute ke peta
  L.polyline(latlngs, { color: "blue" }).addTo(map);

  // Tambahkan penanda untuk setiap lokasi
  locations.forEach((location, index) => {
    L.marker([location.lat, location.lng], { icon: greenMarker })
      .bindPopup(`(${index}) ${location.name}`)
      .addTo(map);
  });

  // Sesuaikan tampilan peta dengan rute
  map.fitBounds(latlngs);
}

// Memanggil fungsi untuk menampilkan rute berikutnya ketika tombol ditekan
document.getElementById("nextRouteButton");

//PSO
// Fungsi untuk memuat data JSON
function loadRoutesDataPSO() {
  fetch("./data/pso.json")
    .then((response) => response.json())
    .then((data) => {
      routesData = data; // Menyimpan data JSON ke dalam routesData
      displayNextRoute(); // Menampilkan rute pertama setelah data dimuat
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("result").innerText =
        "Terjadi Error: " + error.message;
    });
}

// Fungsi untuk menampilkan rute berikutnya
function displayNextRoute() {
  if (routesData.length === 0) {
    console.error("No routes data available.");
    return;
  }

  // Meningkatkan index untuk menampilkan rute berikutnya
  currentRouteIndex++;

  // Reset index jika sudah melebihi jumlah rute
  if (currentRouteIndex >= routesData.length) {
    currentRouteIndex = 0;
  }

  // Ambil rute berdasarkan index saat ini
  const selectedRoute = routesData[currentRouteIndex];

  // Tampilkan rute pada peta dan di elemen result
  document.getElementById(
    "result"
  ).innerText = `Hari ke-${selectedRoute.id}\n Rute Wisata: ${selectedRoute.route}\n Perkiraan Waktu Tempuh: ${selectedRoute.cost} menit`;

  // Pastikan hanya array route yang dikirimkan
  displayRouteWithPSO(selectedRoute.route);
}

// Fungsi untuk memulai peta dengan rute yang diambil
function displayRouteWithPSO(route) {
  if (!Array.isArray(route)) {
    console.error("Route is not an array:", route);
    return; // Keluar dari fungsi jika bukan array
  }

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

  var latlngs = route.map((index) => [
    locations[index].lat,
    locations[index].lng,
  ]);

  // Hapus lapisan rute sebelumnya jika ada
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Tambahkan tile layer kembali
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

  // Tambahkan rute ke peta
  L.polyline(latlngs, { color: "blue" }).addTo(map);

  // Tambahkan penanda untuk setiap lokasi
  locations.forEach((location, index) => {
    L.marker([location.lat, location.lng])
      .bindPopup(`(${index}) ${location.name}`)
      .addTo(map);
  });

  // Sesuaikan tampilan peta dengan rute
  map.fitBounds(latlngs);
}

// Memanggil fungsi untuk menampilkan rute berikutnya ketika tombol ditekan
document.getElementById("nextRouteButton");

// Script Untuk Metode MAUT
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data/top6_ranked_data.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("data-table-body");

      data.forEach((item) => {
        const row = document.createElement("tr");

        Object.values(item).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        });

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
