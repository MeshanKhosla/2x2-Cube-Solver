import '../App.css';

const ColorPalette = ({ updateSticker }) => {
	const colors = ['r', 'g', 'o', 'b', 'y', 'w']
	return (
		<div className="color-palette-container">
			{colors.map(c => (
				<div 
					key={c}
					className={`palette-color palette-color-${c}`}
					onClick={() => updateSticker(c)}
				></div>
			))}
		</div>
	)
}

export default ColorPalette;
