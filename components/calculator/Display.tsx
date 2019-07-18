import React from 'react'

interface DisplayProps {
	value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
	return (
		<div id="screen">
			<form action="">
				<input type="text" id="display" value={value} readOnly/>
			</form>
		</div>
	)
}

export default Display
