import React, { useState } from "react";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "./css/ProjectGallery.css";

interface Project {
	id: number;
	title: string;
	description: string;
}

interface ProjectGalleryProps {
	projects: Project[];
	onAddProject: (newProject: Project) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
	projects,
	onAddProject,
}) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>("");
	const [newDescription, setNewDescription] = useState<string>("");

	const handleAddProjectClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setNewTitle("");
		setNewDescription("");
	};

	const handleSaveProject = () => {
		const newProject: Project = {
			id: Date.now(), // Use timestamp as a unique ID
			title: newTitle,
			description: newDescription,
		};
		onAddProject(newProject);
		handleCloseModal();
	};

	return (
		<>
			<Row xs={1} md={2} lg={3} className="g-4">
				{projects.map((project) => (
					<Col key={project.id}>
						<Card
							style={{
								height: "300px",
								backgroundColor: "black",
							}}
							className="project-card text-white"
						>
							<Card.Body>
								<Card.Title className="project-title">
									{project.title}
								</Card.Title>
								<Card.Text className="project-description">
									{project.description}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
				<Col>
					<Card
						className="project-card text-center text-white add-project-card"
						onClick={handleAddProjectClick}
						style={{
							cursor: "pointer",
							height: "300px",
							backgroundColor: "black",
						}}
					>
						<Card.Body>
							<Card.Title className="project-title">
								Add New Project
							</Card.Title>
							<div className="add-button">+</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Modal for Adding New Project */}
			<Modal show={showModal} onHide={handleCloseModal} centered>
				<Modal.Header closeButton className="modal-header-custom">
					<Modal.Title style={{ color: "#ff8c00" }}>
						Add New Project
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-body-custom">
					<Form>
						<Form.Group controlId="formNewProjectTitle">
							<Form.Label className="form-label-custom">
								Title
							</Form.Label>
							<Form.Control
								type="text"
								value={newTitle}
								onChange={(e) => setNewTitle(e.target.value)}
								className="form-control-custom"
								placeholder="Enter project title"
							/>
						</Form.Group>
						<Form.Group
							controlId="formNewProjectDescription"
							className="mt-3"
						>
							<Form.Label className="form-label-custom">
								Description
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={5}
								value={newDescription}
								onChange={(e) =>
									setNewDescription(e.target.value)
								}
								className="form-control-custom"
								placeholder="Enter project description"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer
					style={{ backgroundColor: "#1e1e1e", border: "none" }}
				>
					<Button
						variant="secondary"
						onClick={handleCloseModal}
						className="button-custom"
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={handleSaveProject}
						style={{ backgroundColor: "#ff8c00" }}
						disabled={!newTitle.trim() || !newDescription.trim()}
					>
						Save Project
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ProjectGallery;
