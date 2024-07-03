import numpy as np
import pandas as pd

# Dataset dari Tabel 4.4
data1 = {
    'No': list(range(0, 87)),
    'Hotel/ Tempat Wisata': [
        'Hotel Sapadia Gunung Tua', 'Pemandian Aek Milas', 'Wisata Alam Paya Sihorkor',
        'Barumun Nagari', 'Danau Tasik', 'Danau Sagayung', 'Candi Bahal I', 'Batu Kapur Paranginan',
        'Waterboom Gunung Tua', 'Pasir Putih Paranginan', 'Gua Tuktuk', 'Goa Liakkabor', 'Sampuran Simarloting',
        'Air Terjun Siranap', 'Candi Pulo', 'Candi Sitopayan', 'Kebun Binatang Gunung Tua', 'Danau Tao',
        'Puncak Paluta', 'Rumah Makan Holat Alhamdulillah', 'Danau Paya Goti', 'Air Terjun Sigitan',
        'Danau Mandasip/ Danau Tahalak Godang', 'Gua Silattoyung Halongonan', 'Air Terjun Sialombuk',
        'Air Terjun Sihalo- Halo', 'Puncak Batu Tambun', 'Air Terjun Jalamzam', 'Tor Sikudo-Kudo',
        'Air Terjun Sandean Jae', 'Kolam Aek Haruaya Indah', 'Air Terjun Sisinggar Singgar', 'Air Terjun Sibokkik',
        'Aek Milas Sijabi-Jabi', 'Batik Sekar Najogi', 'Agrowisata Durian Dan Manggis', 'Penatapan Nabunddong',
        'Irigasi Batang Ilung', 'Cekdam', 'Sampuran Siunggam Dolok', 'Air Terjun Lubuk Torop', 'Air Terjun Purba Tua',
        'Air Terjun Marimbus', 'Air Terjun Aek Horsik', 'Air Terjun Dan Goa Alam Dolok Sinomba', 'Air Terjun Sihorang',
        'Air Terjun Tor Silali', 'Air Terjun Maringgus', 'Pacuur Sitanggoru', 'Pemandangan Siholbung', 'Wisata Laung',
        'Sampuran Nagiccat', 'Sampuran Aek Litta', 'Air Terjun Batu Nanggar', 'Makam Sutan Nasinok Harahap',
        'Bendungan/ Bebek2 Janji Manahan Sil', 'Aek Sitabu Batu', 'Air Terjun Siloung', 'Air Terjun Aek Sihorbo',
        'Tor Hatopul', 'Air Terjun Tanjung Longat', 'Kincir Air Simataniari', 'Sampuran Aek Sijorni',
        'Air Terjun Sungai Bintang', 'Air Terjun Siburbur', 'Air Terjun Simarlosung', 'Goa Liang Lilu',
        'Pemandian Aek Sibung', 'Pemandian Aek Milas', 'Pemandian Sungai Batang Galoga', 'Pemandian Air Panas Lobu Bara',
        'Pemandian Aek Marussag', 'Air Terjun Sialogo', 'Kolam Renang Halongonan Timur', 'Air Terjun Simarloting',
        'Bandara Udara Aek Godang', 'Pantai Kahona', 'Batu Sigordang', 'Curug Saroha', 'Gedung Kantor Bupati',
        'Pemandian Sungai Durian', 'Sampuran Siagul', 'Air Terjun Maranggun', 'Irigasi Pansolminan', 'Candi Nagasaribu',
        'Wisata Desa Bangun Purba', 'Air Terjun Sitimbulon'
    ],
    'C1': [-0.29, 0.05, 0.05, 6.44, -0.12, -0.29, 0.05, -0.29, 1.06, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29,
            0.05, -0.29, 0.05, 1.40, 0.05, 0.05, 0.05, 0.05, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, 0.72, -0.29, -0.29,
            -0.29, 4.76, 2.41, 0.05, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29,
            -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29,
            -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, 0.56, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29, -0.29,
            -0.29, -0.29, -0.29, -0.29, -0.29, -0.29],
    'C2': [-3.13, -1.29, -1.29, -0.67, -2.52, -0.67, -0.67, -0.67, -0.67, -2.52, -1.90, -2.52, -1.29, -2.52, -1.29,
            -1.29, -0.67, -2.52, -2.52, -0.67, -1.29, -1.29, -1.29, -1.29, -2.52, -1.90, -0.67, -2.52, -0.67, -2.52,
            -1.90, -2.52, -2.52, -1.90, -0.67, -0.67, -0.67, -0.67, -1.90, -2.52, -2.52, -1.29, -2.52, -2.52, -0.67,
            -2.52, -2.52, -2.52, -2.52, -0.67, -0.67, -1.29, -1.29, -1.29, -2.52, -2.52, -2.52, -2.52, -2.52, -2.52,
            -2.52, -2.52, -2.52, -2.52, -2.52, -1.29, -2.52, -1.29, -1.29, -1.29, -1.29, -2.52, -2.52, -0.67, -2.52,
            -0.67, -1.90, -2.52, -1.90, -0.67, -0.67, -2.52, -2.52, -1.90, -1.90, 2.52, 1.90],
    'C3': [-1.80, -1.63, -1.63, -1.72, -1.72, -1.68, -1.55, -1.75, -1.63, -1.76, -1.77, -1.75, -1.77, -1.77, -1.77,
            -1.76, -1.72, -1.72, -1.72, -1.63, -1.72, -1.69, -1.73, -1.76, -1.73, -1.74, -1.76, -1.75, -1.63, -1.74,
            -1.72, -1.73, -1.73, -1.74, -1.73, -1.66, -1.63, -1.75, -1.73, -1.74, -1.77, -1.77, -1.75, -1.73, -1.73,
            -1.77, -1.75, -1.75, -1.74, -1.71, -1.69, -1.73, -1.74, -1.74, -1.77, -1.76, -1.76, -1.75, -1.74, -1.73,
            -1.74, -1.73, -1.76, -1.74, -1.73, -1.76, -1.74, -1.73, -1.74, -1.73, -1.76, -1.75, -1.74, -1.73, -1.76,
            -1.75, -1.74, -1.76, -1.76, -1.72, -1.75, -1.74, -1.76, -1.76, -1.76, -1.75, -1.74],
}

# Buat DataFrame dari data1
data = pd.DataFrame(data1)

# Langkah 2: Tetapkan bobot untuk setiap kriteria
weights = {'C1': 0.35, 'C2': 0.35, 'C3': 0.30}

# Langkah 3: Tentukan nilai kriteria minimal dan maksimal
min_max_values = {
    'C1': {'min': data['C1'].min(), 'max': data['C1'].max()},
    'C2': {'min': data['C2'].min(), 'max': data['C2'].max()},
    'C3': {'min': data['C3'].min(), 'max': data['C3'].max()},
}

# Langkah 4: Normalisasi matrik
def normalize(value, min_value, max_value):
    return (value - min_value) / (max_value - min_value)

normalized_data = data.copy()
for col in ['C1', 'C2', 'C3']:
    normalized_data[col] = data[col].apply(normalize, args=(min_max_values[col]['min'], min_max_values[col]['max']))

# Langkah 5: Perkalian utility dengan bobot
for col in ['C1', 'C2', 'C3']:
    normalized_data[col] *= weights[col]

# Tambahkan kolom total untuk jumlah hasil perkalian utility dengan bobot
normalized_data['Total'] = normalized_data[['C1', 'C2', 'C3']].sum(axis=1)

# Langkah 6: Lakukan perangkingan berdasarkan total skor
ranked_data = normalized_data.sort_values(by='Total', ascending=False)

# Cetak hasil
print("Dataset Awal:")
print(data)
print("\nHasil Normalisasi:")
print(normalized_data)
print("\nHasil Perangkingan:")
print(ranked_data[['No', 'Hotel/ Tempat Wisata', 'Total']].head(6))