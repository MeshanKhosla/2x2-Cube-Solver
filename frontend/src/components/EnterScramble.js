import { useState } from 'react'
import ShowSolution from './ShowSolution'


export const EnterScramble = () => {
	const [scramble, setScramble] = useState('')
	const [solutionData, setSolutionData] = useState({})
	const [isScrambleSubmitted, setIsScrambleSubmitted] = useState(false)

	const getSolutionReq = initialState => {
		fetch("/get-solution", { headers: { 'initial_state': initialState }}).then(
			res => res.json()
		).then(solData => {
			if (solData['status'] === 200) {
				setSolutionData({ rotate_to : solData['rotate_to'], solution : solData['solution'] })
				console.log(solData)
			}
		})
	}

	const handleScrambleChange = e => setScramble(e.target.value)
	const handleScrambleSubmit = () => {
		setIsScrambleSubmitted(true)
		getSolutionReq(scramble)
	}
	
	return (
		<div>
			{!isScrambleSubmitted ? 
				<div>
					<p>Enter scramble</p>
					<input onChange={handleScrambleChange} />
					<br />
					<br />
					<button onClick={handleScrambleSubmit}>Get solution</button>
				</div>
			:
				<ShowSolution solutionData={solutionData} />
			}
		</div>
	)
}

export default EnterScramble;