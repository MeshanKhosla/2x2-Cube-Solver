import CubeStickerGridStatic from './CubeStickerGridStatic';
import ResettingCube from './ResettingCube';
import { Carousel } from 'antd';

const SolutionCarousel = ({ solutionData }) => {
	return (
		<Carousel>
			<div className="solution-carousel-slide">
				<h2>Rotate so the cube is oriented like this</h2>
				<ResettingCube>
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[6, 7, 14, 15]} />
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[8, 9, 16, 17]} />
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[10, 11, 18, 19]} />
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[4, 5, 12, 13]} />
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[0, 1, 2, 3]} />
					<CubeStickerGridStatic rotateTo={solutionData['rotate_to']} indices={[20, 21, 22, 23]} />
				</ResettingCube>
			</div>

			{solutionData['solution'].map((move, idx) => (
				<div className="solution-carousel-slide" key={idx}>
					<h2>{move}</h2>
				</div>
			))}
		</Carousel>	
	)
}

export default SolutionCarousel;