import CubeStickerGridStatic from './CubeStickerGridStatic';
import Cube from 'react-3d-cube';
import '../App.css';

const CubeSolution = ({ solutionData }) => {
	return (
		<div>
			{solutionData['status'] === 200 ?
				<div>
					<h1>Solution</h1>
					<br />
					<h2>Rotate so the cube is oriented like this</h2>
					<br />
					<div className='cube-wrapper'>
						<Cube size={300} index="front">
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[6, 7, 14, 15]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[8, 9, 16, 17]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[10, 11, 18, 19]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[4, 5, 12, 13]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[0, 1, 2, 3]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[20, 21, 22, 23]} />
						</Cube>
						<br />
					</div>
					<h2>{solutionData['solution'].join(' ')}</h2>
				</div>
				:
				<h1>{solutionData.status}</h1>
			}
		</div>
	)
}

export default CubeSolution
