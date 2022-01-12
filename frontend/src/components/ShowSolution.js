import CubeSolution from './CubeSolution';
import '../App.css';

export const ShowSolution = ({ solutionData }) => {
	return (
		<div>
			{!Object.keys(solutionData).length ? 
				<div className="generating-sol-container">
					<p>Generating solution...</p>
				</div>
			:
				<CubeSolution solutionData={solutionData} />
			}	
		</div>
	)
}

export default ShowSolution;