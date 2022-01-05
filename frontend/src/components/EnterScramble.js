import { useState } from 'react'
import ShowSolution from './ShowSolution'
import CubeStickerGrid from './CubeStickerGrid';
import ResettingCube from './ResettingCube';
import '../App.css'

export const EnterScramble = ({ isGraphLoaded }) => {
	const [scramble, setScramble] = useState(new Array(24).fill('default'))
	const [solutionData, setSolutionData] = useState({})
	const [isScrambleSubmitted, setIsScrambleSubmitted] = useState(false)

	const getSolutionReq = initialState => {
		fetch("/get-solution", { headers: { 'initial_state': initialState }}).then(
			res => res.json()
		).then(solData => {
			setSolutionData(solData)
			console.log(solData)
		})
	}

	const updateScramble = (idx, color) => {
		scramble[idx] = color;
		setScramble(scramble)		
	}	

	const handleScrambleSubmit = () => {
		const counts = {};
		for (const color of scramble) {
			counts[color] = counts[color] ? counts[color] + 1 : 1;
		}

		const fourReds = counts['r'] === 4;
		const fourGreen = counts['g'] === 4;
		const fourOranges = counts['o'] === 4;
		const fourBlues = counts['b'] === 4;
		const fourYellows = counts['y'] === 4;
		const fourWhites = counts['w'] === 4;
		if (!fourReds || !fourGreen || !fourOranges || !fourBlues || !fourYellows || !fourWhites) {
			alert('Please make sure there are 4 of each color on the cube.')
			return
		}
		setIsScrambleSubmitted(true)
		const joinedScramble = scramble.join('')
		getSolutionReq(joinedScramble)	
	}
	
	return (
		<div>
			{!isScrambleSubmitted ? 
				<div>
					<h1>Enter scramble</h1>
						<ResettingCube>
							<CubeStickerGrid updateScramble={updateScramble} indices={[6, 7, 14, 15]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[8, 9, 16, 17]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[10, 11, 18, 19]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[4, 5, 12, 13]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[0, 1, 2, 3]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[20, 21, 22, 23]} />
						</ResettingCube>
					<button disabled={!isGraphLoaded} onClick={handleScrambleSubmit}>Get solution</button>
				</div>
			:
				<ShowSolution solutionData={solutionData} />
			}
		</div>
	)
}

export default EnterScramble;