from flask import Flask, request
from scripts.main import generate_solution

app = Flask('__name__')

# TODO persist graph when first loaded. try just setting a variable in setup() route and seeing if you could acces it later

@app.route("/get-solution")
def get_solution():
	initial_state = request.headers['initial_state']
	return generate_solution(initial_state)

if __name__ == "__main__":
	app.run(debug=True)