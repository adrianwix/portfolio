import React from 'react';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

export default function Header() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">Portfolio</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Link href="/">
						<a className="nav-link">Home</a>
					</Link>
					<NavDropdown title="Projects" id="basic-nav-dropdown">
						<Link href="/issue-tracker">
							<a className="dropdown-item">
								Issue Tracker
							</a>
						</Link>
						<Link href="/project?project=apitest" as="/project/apitest">
							<a className="dropdown-item">
								Example
							</a>
						</Link>
						<Dropdown.Divider />
					</NavDropdown>
				</Nav>

			</Navbar.Collapse>
		</Navbar>
	);
}
