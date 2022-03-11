import { useState, useEffect } from 'react'
import EnterScramble from './components/EnterScramble'

export const App = () => {
	const [isGraphLoaded, setIsGraphLoaded] = useState(false)

	/* Load the 2x2 cube graph when the app is loaded */
	useEffect(() => {
		const makeGraph = async () => {
			let response = await fetch('/setup-graph');
			if (response.status === 200) {
				setIsGraphLoaded(true)
			}
		}
		makeGraph();
	}, [])

	return (
		<div>
			<EnterScramble isGraphLoaded={isGraphLoaded} />
		</div>
	)
}

export default App;