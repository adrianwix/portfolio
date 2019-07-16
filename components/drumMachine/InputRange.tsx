import React from 'react';
import {
	InputRangeInterface,
	PropTypes,
} from 'types/drumMachine/InputRangeTypes';

/**
 * @param {object} props Properties the component.
 * @param {boolean} props.power Power state of drum pad
 * @param {string} props.volume Number of the volumen
 * @param {function} props.changeVolume Change the volumen state of parent container.
 * @param {function} props.changeDisplay Change display text.
 */
class InputRange extends React.Component<PropTypes>
	implements InputRangeInterface {
	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.power) {
			let value = parseFloat(event.target.value);
			let display = `Volumen: ${Math.round(value * 100)}`;

			this.props.changeVolume(value);
			this.props.changeDisplay(display);
		}
	};

	render() {
		return (
			<input
				type="range"
				name="volume"
				id="range"
				min="0"
				max="1"
				step="0.01"
				value={this.props.volume}
				onChange={this.handleChange}
			/>
		);
	}
}

export default InputRange;
