import '../App.css';

const CubeStickerGridStatic = ({ indices, rotateTo }) => {
	return (
		<div className="sticker-grid-container">
			{indices.map(idx => (
				<div className={`sticker sticker-color-${rotateTo.charAt(idx).toLowerCase()}`} key={idx}></div>
			))}
		</div>
	)
}
export default CubeStickerGridStatic;
				