from igraph import *
from scripts.constants import all_moves, abrv_to_move
from scripts.generate_files import rotate_cube_to_match, apply_move

def get_abrv_from_move(starting_move):
	"""
	Takes in a move and return the abbreviation
	>>> { 0: 1, 1: 3, 2: 0, 3: 2, 4: 10, 5: 11, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9 }
	'U'
	"""
	for abrv, move in abrv_to_move.items():
		if starting_move == move:
			return abrv

def convert_states_path_to_moves(path_in_states):
	"""
	Takes in a path for a solution to the cube in state and outputs the moves necessary to solve
	>>> ['WRWRGGRYBBWOGGRYBBWOYOYO', 'WWWWGGRRBBOOGGRRBBOOYYYY']
	['R']
	"""
	path_in_moves = []
	for i in range(len(path_in_states) - 1):
		cur_state = path_in_states[i]
		next_state = path_in_states[i + 1]
		for move in all_moves:
			if (apply_move(cur_state, move)) == next_state:
				path_in_moves.append(get_abrv_from_move(move))
				break	
	return path_in_moves

def half_turn_metric(path_in_moves):
	"""
	Converts a solution to the cube with consecutive letters into half turns
	>>> ["R", "R", "U", "F'", "F'"]
	["R2", "U", "F2"]
	>>> ["R", "R", "U", "F'", "F'", 'L']
	["R2", "U", "F2", "L"]
	"""
	half_turn_result = []
	skip = False
	for i in range(len(path_in_moves)):
		if (i == len(path_in_moves) - 1) and not skip:
			half_turn_result.append(path_in_moves[i])
			break
		if skip:
			skip = False
			continue
		cur_move = path_in_moves[i]
		next_move = path_in_moves[i + 1]
		new_move = cur_move
		if cur_move == next_move:
			new_move = cur_move[0] + "2"
			skip = True
		half_turn_result.append(new_move)
	return half_turn_result

def load_graph():
	print('\nLoading graph...')
	g = Graph.Read_Pickle('scripts/graph-data/graph-igraph.pickle')
	print('Graph loaded\n')
	return g

def generate_solution(graph=None, start=None):
	if not graph:
		graph = load_graph()

	SOLVED = 'WWWWGGRRBBOOGGRRBBOOYYYY'

	if not start:
		start = input('Enter your cube state: ')

	start = start.upper()
	invalid_input = False
	try:
		start = rotate_cube_to_match(start)
	except IndexError:
		invalid_input = True
	if not start or invalid_input:
		print('\nInvalid cube state, please try again')
		return { 'status': 'Invalid Cube State' }

	print('\nGenerating solution...\n')
	path_in_idx = graph.get_shortest_paths(start, SOLVED)[0]
	path_in_states = list(map(lambda idx: graph.vs[idx]['name'], path_in_idx))
	path_in_moves = half_turn_metric(convert_states_path_to_moves(path_in_states))
	print('Rotate to', start)
	print(' -> '.join(path_in_moves))
	return { 
		'status': 200, 
		'rotate_to': start, 
		'solution': path_in_moves
	}

# generate_solution()

"""
Files needed for this to work:
- graph-igraph.pickle
- 2x2states.pickle
"""