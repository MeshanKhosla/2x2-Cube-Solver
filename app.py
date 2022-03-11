from flask import Flask, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from backend.scripts.main import generate_solution, load_graph 

app = Flask(__name__,static_folder='frontend/build',static_url_path='')

graph = None
CORS(app)

@app.route("/setup-graph")
@cross_origin()
def setup_graph():
	global graph
	# graph = load_graph()
	return { 'status' : 200 }

@app.route("/get-solution")
@cross_origin()
def get_solution():
	initial_state = request.headers['initial_state']
	return generate_solution(graph, initial_state)

@app.route('/')
def serve():
	return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
	graph = load_graph()
	app.run()