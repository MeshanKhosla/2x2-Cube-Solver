import { useState } from 'react';
import Cube from 'react-3d-cube';
import { Button, Modal } from 'antd';
import '../App.css';

const ResettingCube = ({ children, resetScramble=()=>{} }) => {
	/* Used to reset the cube when reset button is pressed */
	const [resetCubeCounter, setResetCubeCounter] = useState(0)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const resetCube = () => {
		setResetCubeCounter(resetCubeCounter + 1)
		resetScramble()
		setIsModalVisible(false)
	}
	const handleModalOpen = () => setIsModalVisible(true)
	const handleModalClose = () => setIsModalVisible(false)

	return (
		<>
			<div className="cube-btn-wrapper">
				<div className="cube-container">
					<div className='cube-wrapper'>
						<Cube size={300} index="front" key={resetCubeCounter}>
							{children}
						</Cube>
					</div>
				</div>
				<Button className="reset-cube-btn" onClick={handleModalOpen}>Orient Cube</Button>
			</div>
			<Modal title="Reset cube" visible={isModalVisible} okText="Yes" onOk={resetCube} onCancel={handleModalClose}>
				<h3>Are you sure you want to reset the cube?</h3>
			</Modal>	
		</>
	)
}

export default ResettingCube;
