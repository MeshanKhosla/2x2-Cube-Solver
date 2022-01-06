import { useState } from 'react'
import ShowSolution from './ShowSolution'
import CubeStickerGrid from './CubeStickerGrid';
import ResettingCube from './ResettingCube';
import { Button, notification, Tooltip } from 'antd';
import '../App.css'

export const EnterScramble = ({ isGraphLoaded, onSubmit=()=>{} }) => {
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

	const resetScramble = () => setScramble(new Array(24).fill('default'))

	const updateScramble = (idx, color) => {
		scramble[idx] = color;
		setScramble(scramble)		
	}	

	const handleScrambleSubmit = () => {
		const counts = { 'r': 0, 'g': 0, 'o': 0, 'b': 0, 'y': 0, 'w': 0, 'default': 0 };
		for (const color of scramble) {
			counts[color] = counts[color] + 1;
		}

		const fourReds = counts['r'] === 4;
		const fourGreen = counts['g'] === 4;
		const fourOranges = counts['o'] === 4;
		const fourBlues = counts['b'] === 4;
		const fourYellows = counts['y'] === 4;
		const fourWhites = counts['w'] === 4;
		
		if (!fourReds || !fourGreen || !fourOranges || !fourBlues || !fourYellows || !fourWhites) {
			notification.error({
				message: 'Invalid Entry',
				description: <div>
				Please make sure there are 4 of each color on the cube. Current counts: <br />
				Red: {counts['r']} <br />
				Green: {counts['g']} <br />
				Orange: {counts['o']} <br />
				Blue: {counts['b']} <br />
				Yellow: {counts['y']} <br />
				White: {counts['w']} <br />
				</div>
			})
			return
		}
		onSubmit()
		setIsScrambleSubmitted(true)
		const joinedScramble = scramble.join('')
		getSolutionReq(joinedScramble)	
	}
	
	return (
		<div>
			{!isScrambleSubmitted ? 
				<div className="enter-scramble-wrapper">
					<h1>Enter scramble</h1>
						<ResettingCube resetScramble={resetScramble}>
							<CubeStickerGrid updateScramble={updateScramble} indices={[6, 7, 14, 15]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[8, 9, 16, 17]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[10, 11, 18, 19]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[4, 5, 12, 13]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[0, 1, 2, 3]} />
							<CubeStickerGrid updateScramble={updateScramble} indices={[20, 21, 22, 23]} />
						</ResettingCube>
						{!isGraphLoaded ? 
							<Tooltip title="Graph is loading">
								<Button className="get-solution-btn" type="primary" loading={!isGraphLoaded} disabled={!isGraphLoaded} onClick={handleScrambleSubmit}>Get solution</Button>
							</Tooltip>
							:
							<Button className="get-solution-btn" type="primary" loading={!isGraphLoaded} disabled={!isGraphLoaded} onClick={handleScrambleSubmit}>Get solution</Button>
						}
				</div>
			:
				<ShowSolution solutionData={solutionData} />
			}
		</div>
	)
}

export default EnterScramble;