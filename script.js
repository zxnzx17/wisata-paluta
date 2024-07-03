var map = L.map('map').setView([1.4955482737482169, 99.68337766721375], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w'
}).addTo(map);

function runTabuSearch() {
    fetch('http://127.0.0.1:5000/tabu_search', {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            tabu_tenure: 5,
            max_iterations: 40
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        document.getElementById('result').innerText = `Rute Wisata: ${data.best_solution}\n Waktu Tempuh: ${data.best_cost} menit`;

        displayRoute(data.best_solution);
    })
    .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById('result').innerText = 'Error ini brooo: ' + error.message;
    });
}

function displayRoute(route) {
    const locations = [
        {lat: 1.5342940733103487, lng: 99.64382249361992, name: "Hotel Sapadia"},
        {lat: 1.349523864137562, lng: 99.42844107827977, name: "Barumun Nagari Wildlife Sanctuary"},
        {lat: 1.5868444895665277, lng: 99.98702550294901, name: "Agrowisata Durian dan Manggis"},
        {lat: 1.4895173726115556, lng: 99.61155689042731, name: "Waterboom RCM Gunung Tua"},
        {lat: 1.523167829862158, lng: 99.63017987862821, name: "Rumah Makan Holat Alhamdulillah"},
        {lat: 1.5882420196978602, lng: 99.94773723779537, name: "Batik Sekar Najogi"},
        {lat: 1.4094431824434102, lng: 99.72667829362007, name: "Candi Bahal I,II,III"}
    ];

    var latlngs = route.map(index => [locations[index].lat, locations[index].lng]);

    // Hapus lapisan rute sebelumnya jika ada
    map.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Tambahkan tile layer kembali
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXFpbGExMjMiLCJhIjoiY2x4Znc5M216MHF6NTJscXQ4aTE1NmtwOSJ9.B5qf1ggeoXYWTjnujSzc6w'
    }).addTo(map);

    // Tambahkan rute ke peta
    L.polyline(latlngs, {color: 'blue'}).addTo(map);

    // Tambahkan penanda untuk setiap lokasi
    locations.forEach((location, index) => {
        L.marker([location.lat, location.lng])
            .bindPopup(`${location.name}`)
            .addTo(map);
    });

    // Sesuaikan tampilan peta dengan rute
    map.fitBounds(latlngs);
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('/data/top6_ranked_data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table-body');

            data.forEach(item => {
                const row = document.createElement('tr');

                Object.values(item).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});