import CubeSolution from './CubeSolution';
import '../App.css';

export const ShowSolution = ({ solutionData }) => {
	return (
		<div>
			{!Object.keys(solutionData).length ? 
				<p>Generating solution...</p>
			:
				<CubeSolution solutionData={solutionData} />
			}	
		</div>
	)
}

export default ShowSolution;