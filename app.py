from flask import Flask, request, Response
from flask_ngrok import run_with_ngrok
from flask_cors import CORS
import numpy as np
import json

app = Flask(__name__)
# run_with_ngrok(app)  # Start ngrok when app is run
CORS(app)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

# Matriks waktu tempuh yang diberikan
time_matrix = np.array([
    [0, 85, 68, 79, 4, 15, 38],
    [99, 0, 154, 165, 88, 76, 102],
    [67, 149, 0, 16, 71, 80, 97],
    [79, 161, 16, 0, 84, 96, 101],
    [4, 88, 71, 83, 0, 11, 33],
    [16, 75, 83, 90, 12, 0, 34],
    [37, 102, 104, 116, 33, 32, 0]
])

# Fungsi untuk menghitung total waktu tempuh dari rute
def calculate_route_cost(route, time_matrix):
    cost = 0
    for i in range(len(route) - 1):
        cost += time_matrix[route[i], route[i + 1]]
    cost += time_matrix[route[-1], route[0]]  # kembali ke titik awal
    return cost

# Fungsi untuk menghasilkan tetangga (swap dua kota selain kota 0)
def generate_neighbors(route):
    neighbors = []
    for i in range(1, len(route) - 1):
        for j in range(i + 1, len(route) - 1):
            neighbor = route.copy()
            neighbor[i], neighbor[j] = neighbor[j], neighbor[i]
            neighbors.append((neighbor, i, j))
    return neighbors

# Tabu Search
def tabu_search(time_matrix, initial_solution, tabu_tenure, max_iterations):
    # Inisialisasi
    best_solution = initial_solution
    best_cost = calculate_route_cost(best_solution, time_matrix)
    tabu_list = []
    tabu_list_size = len(initial_solution) * tabu_tenure
    current_solution = initial_solution
    current_cost = best_cost

    for iteration in range(max_iterations):
        neighbors = generate_neighbors(current_solution)
        best_neighbor = None
        best_neighbor_cost = float('inf')
        swapped_cities = (None, None)

        # Evaluasi tetangga
        for neighbor, i, j in neighbors:
            if neighbor not in tabu_list:
                neighbor_cost = calculate_route_cost(neighbor, time_matrix)
                if neighbor_cost < best_neighbor_cost:
                    best_neighbor = neighbor
                    best_neighbor_cost = neighbor_cost
                    swapped_cities = (i, j)

        # Perbarui solusi saat ini
        current_solution = best_neighbor
        current_cost = best_neighbor_cost

        # Perbarui solusi terbaik
        if current_cost < best_cost:
            best_solution = current_solution
            best_cost = current_cost

        # Update tabu list
        tabu_list.append(current_solution)
        if len(tabu_list) > tabu_list_size:
            tabu_list.pop(0)

    return best_solution, best_cost

@app.route('/tabu_search', methods=['POST'])
def run_tabu_search():
    data = request.json
    tabu_tenure = data.get('tabu_tenure', 5)
    max_iterations = data.get('max_iterations', 40)
    print(tabu_tenure)
    print(max_iterations)
    initial_solution = [0] + list(range(1, len(time_matrix))) + [0]
    best_solution, best_cost = tabu_search(time_matrix, initial_solution, tabu_tenure, max_iterations)
    
    best_solution = list(best_solution)
    best_cost = int(best_cost)
    response = {
        'best_solution': best_solution,
        'best_cost': best_cost
    }

    return Response(json.dumps(response), mimetype='application/json')

if __name__ == '__main__':
    app.run();