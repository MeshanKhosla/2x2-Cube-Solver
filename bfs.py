def shortest_path(start, goal):
    explored = set()
     
    # Queue for traversing the
    # graph in the BFS
    queue = [[start]]
     
    # If the desired node is
    # reached
    if start == goal:
        print("Same Node")
        return
     
    # Loop to traverse the graph
    # with the help of the queue
    while queue:
        print(len(queue))
        path = queue.pop(0)
        node = path[-1]
         
        # Condition to check if the
        # current node is not visited
        if node not in explored:
            neighbours = graph[node]
             
            # Loop to iterate over the
            # neighbours of the node
            for neighbour in neighbours:
                new_path = list(path)
                new_path.append(neighbour)
                queue.append(new_path)
                 
                # Condition to check if the
                # neighbour node is the goal
                if neighbour == goal:
                    print("Shortest path = ", *new_path)
                    return
            explored.add(node)
 
    # Condition when the nodes
    # are not connected
    print("Connecting path doesn't exist")


from constants import all_moves, abrv_to_move
from main import rotate_cube_to_match, apply_move

def get_abrv_from_move(starting_move):
	"""
	Takes in a move and return the abbreviation
	"""
	for abrv, move in abrv_to_move.items():
		if starting_move == move:
			return abrv

def convert_states_path_to_moves(path_in_states):
	"""
	Takes in a path for a solution to the cube in state and outputs the moves necessary
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

# import json
# with open('graph.json') as f:
#   graphj = json.load(f)
# print(len(graphj))

import pickle

# with open('graph.pickle', 'rb') as f:
#     graph = pickle.load(f)
# print(len(graph))

# solved = 'WWWWGGRRBBOOGGRRBBOOYYYY'
# start  = 'WRWRGGRYBBWOGGRYBBWOYOYO' # R scramble

# start = 'WRGOOOYBYYBBRWRBRWGGGWYO'
# start = rotate_cube_to_match(start)

# print(graph['WWRRRYBBWOGGGGRYBBWOYOYO'])
# shortest_path(start, solved)

from igraph import *

# i = 0
# for node, edges in graph.items():
# 	g.add_edges([(node, edge) for edge in edges])
# 	i += 1
# 	print(i)

# k = 0
# def identity(n):
# 	"""
# 	Only used to get counter update	
# 	"""
# 	global k
# 	k += 1
# 	print('Edge', k)
# 	return n

# g = Graph()

# i = 0
# for node in graph:
# 	g.add_vertex(node)
# 	i += 1
# 	print("Node", i)
# g.write_pickle('vertices-igraph.pickle')
# print('DONE ADDING NODES')

# all_edges=[(identity(node), edge) for node, edges in graph.items() for edge in edges]
# print("Num edges", len(all_edges))

# # Serializes list of tuples representing each edge
# with open('all-edges.pickle', 'wb') as edges_file:
#     pickle.dump(all_edges, edges_file, protocol=pickle.HIGHEST_PROTOCOL)
# print("DONE SERIALIZING EDGES")

# g.add_edges(all_edges)
# print('DONE ADDING EDGES')
# g.write_pickle('graph-igraph.pickle')

# start = 'WRGOOOYBYYBBRWRBRWGGGWYO'

g = Graph.Read_Pickle('graph-igraph.pickle')
print('Graph loaded')

solved = 'WWWWGGRRBBOOGGRRBBOOYYYY'
# start  = 'WRWRGGRYBBWOGGRYBBWOYOYO' # R scramble
# start = 'WRGOOOYBYYBBRWRBRWGGGWYO' # Hour long scramble
start = 'YBGORRWGWOWBWOYYGYORBRBG'

start = rotate_cube_to_match(start)
print('Starting point:', start)


path_in_idx = g.get_shortest_paths(start, solved)[0]
path_in_states = list(map(lambda idx: g.vs[idx]['name'], path_in_idx))
path_in_moves = convert_states_path_to_moves(path_in_states)
print(' -> '.join(path_in_moves))
# print(path_in_states)
# print(g.ecount())
# print(g.vcount())

# PROBLEM: I'm adding edges in a directed way, so every edge counts as 2