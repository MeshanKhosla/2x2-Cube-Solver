import CubeSolution from './CubeSolution';
import '../App.css';

export const ShowSolution = ({ solutionData }) => {
	return (
		<div>
			{!Object.keys(solutionData).length ? 
				<p>Generating solution...</p>
			:
				<div>
					<CubeSolution solutionData={solutionData} />
				</div>
			}	
		</div>
	)
}

export default ShowSolution;