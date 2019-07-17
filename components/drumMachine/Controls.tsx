import React from 'react'
import Display from './Display'
import InputRange from './InputRange'
import { PropTypes } from 'types/drumMachine/ControlsTypes'

/**
 *
 * @param {object} props Properties for the child component
 * @param {number} props.volume Number of the volum value
 * @param {function} props.changeVolume Change volume state
 * @param {string} props.display Text to be show in display screen
 * @param {function} props.changeDisplay Change display state
 * @param {boolean} props.power Boolean to indicate is drumpad is on or off
 * @param {function} props.changePower Change power state
 */
function Controls(props: PropTypes) {
	return (
		<div id="controls">
			<Display display={props.display}/>

			<InputRange
				power={props.power}
				volume={props.volume}
				changeVolume={props.changeVolume}
				changeDisplay={props.changeDisplay}
			/>

			<div id="power">
				<div
					id="indicator"
					className={props.power ? 'on' : 'off'}
					onClick={props.changePower}
				/>
			</div>
		</div>
	)
}

export default Controls
