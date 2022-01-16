import { useState } from 'react';
import EnterScramble from './EnterScramble';
import SolutionCarousel from './SolutionCarousel';
import { Button, Modal } from 'antd';
import '../App.css';

const CubeSolution = ({ solutionData }) => {
	const [showInvalidText, setShowInvalidText] = useState(true)
	const [tryAnotherBtnPressed, setTryAnotherBtnPressed] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleModalOpen = () => setIsModalVisible(true)
	const handleModalClose = () => setIsModalVisible(false)
	const goToEnterScramble = () => {
		handleModalClose()
		setTryAnotherBtnPressed(true)
	}

	// TODO: Cleanup file
	return (
		<>
		{!tryAnotherBtnPressed ? (
		<div className="cube-solution-wrapper">
			{solutionData['status'] === 200 ?
				<div>
					<h1 style={{ textAlign: 'center' }}>Solution found. Click through the slides for moves to make</h1>
					<SolutionCarousel solutionData={solutionData}/>
					<div className="try-another-btn-wrapper">
						<Button className="try-another-btn" type="primary" onClick={handleModalOpen}>Try another</Button>
					</div>
				</div>
				:
				<div>
					{showInvalidText && <h1 className="invalid-text">Invalid cube state. Please try again</h1> }
					<EnterScramble onSubmit={() => setShowInvalidText(false)} isGraphLoaded={true} />
				</div>
			}
		</div>
		) : 
			<EnterScramble isGraphLoaded={true} />
		}

		<Modal title="Try another" visible={isModalVisible} okText="Yes" onOk={goToEnterScramble} onCancel={handleModalClose}>
			<h3>Are you sure you want to enter another scramble?</h3>
		</Modal>	
		</>
	)
}

export default CubeSolution
