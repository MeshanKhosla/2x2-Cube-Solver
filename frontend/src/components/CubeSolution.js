import { useState } from 'react';
import CubeStickerGridStatic from './CubeStickerGridStatic';
import ResettingCube from './ResettingCube';
import EnterScramble from './EnterScramble';
import '../App.css';

const CubeSolution = ({ solutionData }) => {
	const [showInvalidText, setShowInvalidText] = useState(true)

	return (
		<div className="cube-solution-wrapper">
			{solutionData['status'] === 200 ?
				<div>
					<h1>Solution</h1>
					<h2>Rotate so the cube is oriented like this</h2>
						<ResettingCube>
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[6, 7, 14, 15]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[8, 9, 16, 17]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[10, 11, 18, 19]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[4, 5, 12, 13]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[0, 1, 2, 3]} />
							<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[20, 21, 22, 23]} />
						</ResettingCube>
					<h2>{solutionData['solution'].join(' ')}</h2>
				</div>
				:
				<div>
					{showInvalidText && <h1>Invalid cube state. Please try again</h1> }
					<EnterScramble onSubmit={() => setShowInvalidText(false)} isGraphLoaded={true} />
				</div>
			}
		</div>
	)
}

export default CubeSolution
