import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import Link from 'next/link'

export default function Header() {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">Portfolio</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link href="/">
							<a className="nav-link">Home</a>
						</Link>
						<NavDropdown title="Front End" id="front-end-dropdown">
							<Link href="/drum-machine">
								<a className="dropdown-item">Drum Machine</a>
							</Link>
							<Link href="/random-quote-machine">
								<a className="dropdown-item">Quote Machine</a>
							</Link>
							<Link href="/calculator">
								<a className="dropdown-item">Calculator</a>
							</Link>
						</NavDropdown>
						<NavDropdown title="Back End" id="basic-nav-dropdown">
							<Link href="/issue-tracker">
								<a className="dropdown-item">Issue Tracker</a>
							</Link>
							<Link href="/project?project=apitest" as="/project/apitest">
								<a className="dropdown-item">Project: apitest</a>
							</Link>
							<Dropdown.Divider/>
							<Link href="/library">
								<a className="dropdown-item">Library</a>
							</Link>
							<Dropdown.Divider/>
							<Link href="/message-board">
								<a className="dropdown-item">Message Board</a>
							</Link>
							<Link href="/board/general">
								<a className="dropdown-item">Board: General</a>
							</Link>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}
