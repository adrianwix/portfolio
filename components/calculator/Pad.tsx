import React from 'react'

interface PadProps {
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const values = [
	'AC',
	'CE',
	'/',
	'*',
	'7',
	'8',
	'9',
	'-',
	'4',
	'5',
	'6',
	'+',
	'1',
	'2',
	'3',
]

const Pad: React.FC<PadProps> = ({ handleClick }) => {
	return (
		<div id="pad">
			{values.map(value => (
				<button
					key={value}
					value={value}
					onClick={handleClick}
					className="btn"
				>
					{value}
				</button>
			))}

			<button value="=" className="vertical-btn" onClick={handleClick}>
				=
			</button>

			<button value="0" className="horizontal-btn" onClick={handleClick}>
				0
			</button>

			<button
				value="."
				className="horizontal-btn btn3"
				onClick={handleClick}
			>
				.
			</button>
		</div>
	)
}

export default Pad
