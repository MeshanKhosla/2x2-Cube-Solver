import { useState, useEffect } from 'react'
import EnterScramble from './components/EnterScramble'

export const App = () => {
	const [isGraphLoaded, setIsGraphLoaded] = useState(false)

	/* Load the 2x2 cube graph when the app is loaded */
	useEffect(() => {
		fetch('/setup-graph').then(
			res => res.json()
		).then(graphData => {
			console.log(graphData)
			if (graphData['status'] === 200) {
				setIsGraphLoaded(true);
			}
		})
	}, [])

	return (
		<div>
			{isGraphLoaded ? (
				<EnterScramble />
			) : 
				<p>Loading Graph...</p>
			}
		</div>
	)
}

export default App;