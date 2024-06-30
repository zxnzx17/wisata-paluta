import logging

@app.route('/tabu_search', methods=['POST'])
def run_tabu_search():
    data = request.json
    logging.info(f"Received data: {data}")
    try:
        tabu_tenure = data.get('tabu_tenure', 5)
        max_iterations = data.get('max_iterations', 40)
        initial_solution = [0] + list(range(1, len(time_matrix))) + [0]
        best_solution, best_cost = tabu_search(time_matrix, initial_solution, tabu_tenure, max_iterations)
        
        response = {
            'best_solution': list(best_solution),
            'best_cost': int(best_cost)
        }
        return Response(json.dumps(response), mimetype='application/json')
    except Exception as e:
        logging.error(f"Error in run_tabu_search: {e}")
        return Response(f"Error: {e}", status=500, mimetype='application/json')
