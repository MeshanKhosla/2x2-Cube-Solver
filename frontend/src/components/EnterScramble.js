import { useState } from 'react'
import ShowSolution from './ShowSolution'


export const EnterScramble = ({ isGraphLoaded }) => {
	const [scramble, setScramble] = useState('')
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
					<button disabled={!isGraphLoaded} onClick={handleScrambleSubmit}>Get solution</button>
				</div>
			:
				<ShowSolution solutionData={solutionData} />
			}
		</div>
	)
}

export default EnterScramble;