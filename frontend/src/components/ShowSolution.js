export const ShowSolution = ({ solutionData }) => {
	return (
		<div>
			{!Object.keys(solutionData).length ? 
				<p>Generating solution...</p>
			:
				<div>
					<h1>Solution:</h1>
					<h2>Rotate to {solutionData['rotate_to']}</h2>
					<h2>{solutionData['solution'].join(' ')}</h2>
				</div>
			}	
		</div>
	)
}

export default ShowSolution;