from constants import *
import json 
import pickle



def apply_move(initial_state, move):
    """
    Applies a given move to the state
	:param initial_state: The cubestate to apply the move on
	:param move: The move to be applied
	:return: The state of the cube after the move has been applied
    """
    altered_state = list(initial_state)
    for k, v in move.items():
      altered_state[v] = initial_state[k]
    return ''.join(altered_state)

def rotate_cube_to_match(state):
	"""
	Performs rotation operations (max 24) on a cubestate until it matches one of the
	combinations in the states set
	:param state: The state that needs to be rotated
	:return: The rotated state that is in the set (still same permutation)
	
	X = R + L' (Entire cube on R)
	Y = U + D' (Entire cube on U)
	Z = F + B' (Entire cube on F)
	"""
	with open('2x2states.pickle', 'rb') as f:
		states = pickle.load(f)
	def check_horizontal(state):
		for _ in range(4):
			if state in states:
				return state
			# Y rotation
			state = apply_move(state, uMove)
			state = apply_move(state, dPrimeMove)

	for _ in range(4):
		maybe_valid = check_horizontal(state)
		if maybe_valid:
			return maybe_valid

		# X rotation
		state = apply_move(state, rMove)
		state = apply_move(state, lPrimeMove)
	
	# Z rotation
	state = apply_move(state, fMove)
	state = apply_move(state, bPrimeMove)
	maybe_valid = check_horizontal(state)
	if maybe_valid:
		return maybe_valid

	# ZZ rotation
	state = apply_move(state, fMove)
	state = apply_move(state, bPrimeMove)
	state = apply_move(state, fMove)
	state = apply_move(state, bPrimeMove)
	maybe_valid = check_horizontal(state)
	if maybe_valid:
		return maybe_valid

def generate_one_move_possibilities(initial_state):
  """
  Given a 2x2 cube state, generate all possible reaching points by moving
  one face
  
  :param intitial_state: 24 length string denoting the starting cube state
  :return: List of length 12 with all possible states reachable with 1 move
  """
  new_states = []
  for move in all_moves:
    # altered_state = list(initial_state)
    # for k, v in move.items():
    #   altered_state[v] = initial_state[k]

    # altered_state = ''.join(altered_state)
    altered_state = apply_move(initial_state, move)

	# Rotate the cube until it matches a combination
    altered_state = rotate_cube_to_match(altered_state)

    new_states.append(altered_state)

  return new_states


def save_graph_to_file():
	"""
	Serializes and saves a dictionary (adjacency list) representing 
	the graph for 2x2 states in graph.json and graph.pickle
	"""
	graph = {}
	with open('2x2states.txt') as f:
		i = 0
		for state in f:
			print(i)
			state = state.rstrip('\n')
			graph[state] = generate_one_move_possibilities(state)
			i += 1

	with open('graph.pickle', 'wb') as f:
		pickle.dump(graph, f, protocol=pickle.HIGHEST_PROTOCOL)
	
	with open('graph.json', 'w') as f:
		json.dump(graph, f)

def save_states_to_file():
	"""
	Serializes a set of all possible 2x2 combinations into 2x2states.pickle
	"""
	states = set()
	with open('2x2states.txt') as f:
		i = 0
		for state in f:
			state = state.rstrip('\n')
			states.add(state)
			print(i)
			i += 1

	
	with open('2x2states.pickle', 'wb') as f:
		pickle.dump(states, f, protocol=pickle.HIGHEST_PROTOCOL)

# save_graph_to_file()