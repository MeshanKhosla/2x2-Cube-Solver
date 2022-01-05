import '../App.css';
import Sticker from './Sticker';

const CubeStickerGrid = ({ indices, updateScramble }) => {
	return (
		<div className="sticker-grid-container">
			{indices.map(idx => (
				<Sticker key={idx} idx={idx} updateScramble={updateScramble} />
			))}
		</div>
	)
}
export default CubeStickerGrid;
				