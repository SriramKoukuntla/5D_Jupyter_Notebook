import { Nav, Navbar } from "react-bootstrap";

import "./css/Navbar.css";

const DashNavbar: React.FC<any> = () => {
	return (
		<Navbar className="custom-navbar">
			<div className="navbar-container d-flex">
				<Nav className="align-items-center">
					<Navbar.Brand style={{ paddingLeft: "20px" }}>
						notevis
					</Navbar.Brand>
				</Nav>
			</div>
		</Navbar>
	);
};

export default DashNavbar;
