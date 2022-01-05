import { useState } from 'react';
import '../App.css';
import ColorPalette from './ColorPalette';

const Sticker = ({ idx, updateScramble }) => {
	const [isColorPaletteOn, setIsColorPaletteOn] = useState(false);
	const [stickerColor, setStickerColor] = useState('default')

	const handleMouseEnter = () => setIsColorPaletteOn(true)
	const handleMouseLeave = () => setIsColorPaletteOn(false)
	const updateSticker = color => {
		updateScramble(idx, color)
		setStickerColor(color)
	}

	return (
		<div 
			className={`sticker sticker-color-${stickerColor}`}
			key={idx} 
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>

		{isColorPaletteOn && (
			<ColorPalette updateSticker={updateSticker} />	
		)}

		</div>
	)
}

export default Sticker;
;