import React from 'react'
import { Container, Row, Col, ListGroupItem, Card, ListGroup, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

// eslint-disable-next-line react/display-name
const Home: React.FC = () => (
	<Container>
		<div className="h1-home">
			<p>
				Hi, my name is Adrian Wix.<br/> I am a <span style={{ color: '#007BFF', textDecoration: 'underline' }}>Software Developer</span> and
				this is my Portfolio.
			</p>
		</div>

		<p className="h2-home">Throughout my journey learning to code I acquired the following skills.</p>

		<Row>
			<Col className="skills" sm={6} md={6} lg={3}>
				<div className="skill">
					<object className="skill_icon" data="static/icons/html.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">HTML</p>
						<p className="skill_description">Markup Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/css.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">CSS</p>
						<p className="skill_description">Styling Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/sass.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Scss/Sass</p>
						<p className="skill_description">CSS Extension Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/javascript.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Javascript</p>
						<p className="skill_description">Programming Language</p>
					</div>
				</div>
			</Col>
			<Col className="skills" sm={6} md={6} lg={3}>
				<div className="skill">
					<object className="skill_icon" data="static/icons/typescript.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">TypeScript</p>
						<p className="skill_description">Programming Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/react.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">React.js</p>
						<p className="skill_description">Front-End Library</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/redux.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Redux</p>
						<p className="skill_description">State Management</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/nodejs.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Node.js</p>
						<p className="skill_description">Server-side JavaScript</p>
					</div>
				</div>
			</Col>
			<Col className="skills" sm={6} md={6} lg={3}>
				<div className="skill">
					<object className="skill_icon" data="static/icons/d3.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">D3.js</p>
						<p className="skill_description">Data Visualization</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/mocha.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Mocha</p>
						<p className="skill_description">JS Testing Framework</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/php.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">PHP</p>
						<p className="skill_description">Programming Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/laravel.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Laravel</p>
						<p className="skill_description">PHP Framework</p>
					</div>
				</div>
			</Col>
			<Col className="skills" sm={6} md={6} lg={3}>
				<div className="skill">
					<object className="skill_icon" data="static/icons/mongodb.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">MongoDB</p>
						<p className="skill_description">NoSQL Database</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/sql.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">SQL</p>
						<p className="skill_description">Database Language</p>
					</div>
				</div>
				<div className="skill">
					<object className="skill_icon" data="static/icons/python.svg" type="image/svg+xml"/>
					<div className="skill_box">
						<p className="skill_name">Python</p>
						<p className="skill_description">Programming Language</p>
					</div>
				</div>
			</Col>
		</Row>

		<p className="h2-home mt-5 mb-4">Skills which helped me to complete the following projects</p>

		{/*TODO: Main Projects' image*/}
		<Row>
			<Col md={6}>
				<Card className="project">
					<Card.Img variant="top" src="static/portfolio.png"/>
					<Card.Body>
						<Card.Title>Portfolio</Card.Title>
						<Card.Text>
							Current Portfolio developed to put in to practice and show most of the
							knowledge learned so far.
						</Card.Text>
					</Card.Body>
					<ListGroup className="project_list">
						<ListGroupItem>
							<Badge className="m-1" variant="primary">React.js</Badge>
							<Badge className="m-1" variant="info">Koa.js</Badge>
							<Badge className="m-1" variant="success">MongoDB</Badge>
							<Badge className="m-1" variant="secondary">Next.js</Badge>
						</ListGroupItem>
					</ListGroup>
					<Card.Body>
						<Card.Link href="https://github.com/adrianwix/portfolio">Github</Card.Link>
					</Card.Body>
				</Card>
			</Col>

			<Col md={6}>
				<Card className="project">
					<Card.Img variant="top" src="static/primasalud.png"/>
					<Card.Body>
						<Card.Title>Prima Salud</Card.Title>
						<Card.Text>
							Prima Salud is the bigger manufacturer of medical products in Venezuela.
						</Card.Text>
					</Card.Body>
					<ListGroup className="project_list">
						<ListGroupItem>
							<Badge className="m-1" variant="primary">PHP</Badge>
							<Badge className="m-1" variant="info">Laravel</Badge>
							<Badge className="m-1" variant="secondary">PostgreSQL</Badge>
							<Badge className="m-1" variant="success">Heroku</Badge>
						</ListGroupItem>
					</ListGroup>
					<Card.Body>
						<Card.Link href="https://primasalud-laravel.herokuapp.com/">Dev Build</Card.Link>
					</Card.Body>
				</Card>
			</Col>
		</Row>

		<p className="h2-home mt-5">Furthermore many other projects were completed in the FreeCodeCamp.com
			curriculum</p>

		<Row>
			<Col lg={6}>
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">Responsive Web Design</h3>
					<p className="fcc-certificate_description">Use of HTML and CSS to build websites.
						Responsive developer through CSS Flexbox and Grid</p>
					<ul className="fcc-certificate_list">
						<li>Tribute Page
							<a href="https://codepen.io/adrianwix/pen/rvNgxy" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Survey Form
							<a href="https://codepen.io/adrianwix/pen/mKxWLd" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Product Landing Page
							<a href="https://codepen.io/adrianwix/pen/mKKXdZ" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Technical Documentation
							<a href="https://codepen.io/adrianwix/pen/bKmXym" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Personal Portfolio (Old)
							<a href="https://codepen.io/adrianwix/pen/pKGgKL" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
					</ul>
				</div>
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">JavaScript Algorithms and Data Structures Certification</h3>
					<p className="fcc-certificate_description">JavaScript programming language to give functionality to
						websites</p>
					<ul className="fcc-certificate_list">
						<li>Palindrome Checker
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-javascript/tree/master/palindromeChecker">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Roman Numeral Converter
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-javascript/tree/master/romanNumeralConverter">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Caesars Cipher
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-javascript/tree/master/caesarsCipher">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Telephone Number Validator
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-javascript/tree/master/telephoneNumberValidator">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Cash Register
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-javascript/tree/master/cashRegister">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
					</ul>
				</div>
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">Front End Libraries</h3>
					<p className="fcc-certificate_description">Building Websites with Front End Frameworks and
						Libraries.
						Specially Bootstrap, jQuery, Sass, React and Redux for state management</p>
					<ul className="fcc-certificate_list">
						<li>Random Quote Machine
							<Link href="/random-quote-machine">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>Markdown Previewer
							<Link href="/markdown-previewer">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>Drum Machine
							<Link href="/drum-machine">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>JavaScript Calculator
							<Link href="/calculator">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>Pomodoro Clock
							<a href="https://codepen.io/adrianwix/full/ZoVdJd/" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
					</ul>
				</div>
			</Col>
			<Col lg={6}>
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">Data Visualization</h3>
					<p className="fcc-certificate_description">D3.js is a JavaScript library for producing dynamic,
						interactive data visualizations in web browsers</p>
					{/*TODO: Add readme to github projects*/}
					<ul className="fcc-certificate_list">
						<li>Bar Chart
							<a title="Github"
							   href="https://github.com/adrianwix/fcc_D3_Visualization/tree/master/BarChart">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
							<a href="https://codepen.io/adrianwix/full/zJpKeJ" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Scatterplot Graph
							<a title="Github"
							   href="https://github.com/adrianwix/fcc_D3_Visualization/tree/master/ScatterplotGraph">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
							<a href="https://codepen.io/adrianwix/full/bmBywM" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Heat Map
							<a title="Github"
							   href="https://github.com/adrianwix/fcc_D3_Visualization/tree/master/Heatmap">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
							<a href="https://codepen.io/adrianwix/full/YJZXRV" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Choropleth Map
							<a title="Github"
							   href="https://github.com/adrianwix/fcc_D3_Visualization/tree/master/ChoroplethMap">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
							<a href="https://codepen.io/adrianwix/full/MzGrvZ" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
						<li>Treemap Diagram
							<a title="Github"
							   href="https://github.com/adrianwix/fcc_D3_Visualization/tree/master/Treemap">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
							<a href="https://codepen.io/adrianwix/full/PxeXNW" title="Codepen">
								<FontAwesomeIcon icon={faCodepen}/>
							</a>
						</li>
					</ul>
				</div>
				{/*TODO: Put all this projects in one script*/}
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">APIs and Microservices</h3>
					<p className="fcc-certificate_description">Managing packages with npm. Back-End Development with
						Node.js
						(Javascript Server-side) and Data storage with MongoDB NoSQL database</p>
					<ul className="fcc-certificate_list">
						<li>Timestamp Microservice
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-timestamp">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Request Header Parser Microservice
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-headerparser">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>URL Shortener Microservice
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-urlshortener">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Exercise Tracker
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-exercisetracker">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>File Metadata Microservice
							<a title="Github"
							   href="https://github.com/adrianwix/fcc-filemetadata">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
					</ul>
				</div>
				<div className="fcc-certificate">
					<h3 className="fcc-certificate_name">Information Security and Quality Assurance</h3>
					<p className="fcc-certificate_description">Adding basic security to websites. Automatic testing with
						Mocha Test Framework. Passport.js for user authentication</p>
					<ul className="fcc-certificate_list">
						<li>Metric-Imperial Converter
							<a title="Github"
							   href="https://github.com/adrianwix/portfolio/blob/master/routes/api/metricConverterApi.js">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Issue Tracker
							<Link href="/issue-tracker">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>Personal Library
							<Link href="/library">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
						<li>Stock Price Checker
							<a title="Github"
							   href="https://github.com/adrianwix/portfolio/blob/master/routes/api/stockCheckerApi.js">
								<FontAwesomeIcon icon={faGithub}/>
							</a>
						</li>
						<li>Anonymous Message Board
							<Link href="/message-board">
								<a title="View"><FontAwesomeIcon icon={faEye}/></a>
							</Link>
						</li>
					</ul>
				</div>
			</Col>
		</Row>

	</Container>
)

export default Home