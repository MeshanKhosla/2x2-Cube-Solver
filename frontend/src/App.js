import { useState, useEffect } from 'react';

export const App = () => {

	const [data, setData] = useState({})

	const initialState = "WBOWGYGRBRYOOGWYGOBBRRYW"
	useEffect(() => {
		fetch("/get-solution", { headers: { 'initial_state': initialState }}).then(
			res => res.json()
		).then(jsonData => {
			setData(jsonData)
			console.log(jsonData)
		})
	}, [])

	return (
		<div>
		hey
		</div>
	)
}

export default App;