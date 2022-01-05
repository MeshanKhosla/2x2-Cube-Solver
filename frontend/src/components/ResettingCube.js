import { useState } from 'react';
import Cube from 'react-3d-cube';
import '../App.css';

const ResettingCube = ({ children }) => {
	/* Used to reset the cube when reset button is pressed */
	const [resetCube, setResetCube] = useState(0)

	return (
		<div className="cube-btn-wrapper">
			<div className="cube-container">
				<div className='cube-wrapper'>
					<Cube size={300} index="front" key={resetCube}>
						{children}
					</Cube>
				</div>
			</div>
			<button onClick={() => setResetCube(resetCube + 1)}>Reset</button>
		</div>
	)
}

export default ResettingCube;
