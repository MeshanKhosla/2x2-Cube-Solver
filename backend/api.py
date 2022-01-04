from flask import Flask, request
from scripts.main import generate_solution, load_graph

app = Flask('__name__')

graph = None
@app.route("/setup-graph")
def setup_graph():
	global graph
	graph = load_graph()
	return { 'status' : 200 }

@app.route("/get-solution")
def get_solution():
	initial_state = request.headers['initial_state']
	return generate_solution(graph, initial_state)

if __name__ == "__main__":
	app.run(debug=True)