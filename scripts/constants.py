"""
Cube stickers                           Array subscripts

    W   W                                   00  01
      Up                                      Up
    W   W                                   02  03

G   G   R   R   B   B   O   O           04  05  06  07  08  09  10  11
Left    Front   Right   Back             Left   Front   Right    Back
G   G   R   R   B   B   O   O           12  13  14  15  16  17  18  19

    Y   Y                                   20  21
    Down                                     Down
    Y   Y                                   22  23
"""

# ie: 4 is moved to 10
uMove = {
  0: 1,
  1: 3,
  2: 0,
  3: 2,
  4: 10,
  5: 11,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  10: 8,
  11: 9,
}

dMove = {
  12: 14,
  13: 15,
  14: 16,
  15: 17,
  16: 18,
  17: 19,
  18: 12,
  19: 13,
  20: 21,
  21: 23,
  22: 20,
  23: 22,
}

rMove = {
  1: 18,
  3: 10,
  7: 1,
  8: 9,
  9: 17,
  10: 23,
  15: 3,
  16: 8,
  17: 16,
  18: 21,
  21: 7,
  23: 15,
}

lMove = {
  0: 6,
  2: 14,
  4: 5,
  5: 13,
  6: 20,
  11: 2,
  12: 4,
  13: 12,
  14: 22,
  19: 0,
  20: 19,
  22: 11,
}

fMove = {
  2: 8,
  3: 16,
  5: 3,
  6: 7,
  7: 15,
  8: 21,
  13: 2, 
  14: 6,
  15: 14,
  16: 20,
  20: 5,
  21: 13,
}

bMove = {
  0: 12,
  1: 4,
  4: 22,
  9: 0,
  10: 11,
  11: 19,
  12: 23,
  17: 1,
  18: 10,
  19: 18,
  22: 17,
  23: 9,
}

uPrimeMove = {v : k for k, v in uMove.items()}
dPrimeMove = {v : k for k, v in dMove.items()}
rPrimeMove = {v : k for k, v in rMove.items()}
lPrimeMove = {v : k for k, v in lMove.items()}
fPrimeMove = {v : k for k, v in fMove.items()}
bPrimeMove = {v : k for k, v in bMove.items()}

all_moves = [uMove, dMove, rMove, lMove, fMove, bMove, uPrimeMove, dPrimeMove, rPrimeMove, lPrimeMove, fPrimeMove, bPrimeMove]
abrv_to_move = {
	'U': uMove,
	'D': dMove,
	'R': rMove,
	'L': lMove,
	'F': fMove,
	'B': bMove,
	'U\'': uPrimeMove,
	'D\'': dPrimeMove,
	'R\'': rPrimeMove,
	'L\'': lPrimeMove,
	'F\'': fPrimeMove,
	'B\'': bPrimeMove,
}