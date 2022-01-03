from igraph import *
from constants import all_moves, abrv_to_move
from generate_files import rotate_cube_to_match, apply_move

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

def main():
	print('\nLoading graph...')
	g = Graph.Read_Pickle('graph-data/graph-igraph.pickle')
	print('Graph loaded\n')

	SOLVED = 'WWWWGGRRBBOOGGRRBBOOYYYY'

	start = input('Enter your cube state: ').upper()

	invalid_input = False
	try:
		start = rotate_cube_to_match(start)
	except IndexError:
		invalid_input = True
	if not start or invalid_input:
		print('\nInvalid cube state, please try again')
		return

	print('\nGenerating solution...\n')
	path_in_idx = g.get_shortest_paths(start, SOLVED)[0]
	path_in_states = list(map(lambda idx: g.vs[idx]['name'], path_in_idx))
	path_in_moves = convert_states_path_to_moves(path_in_states)
	print('Rotate to', start)
	# Replace two consecutive chars with _2
	
	print(' -> '.join(path_in_moves))

main()

"""
Files needed for this to work:
- graph-igraph.pickle
- 2x2states.pickle
"""