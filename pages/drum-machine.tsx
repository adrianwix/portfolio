import React from 'react';
import DrumPad from '../components/drumMachine/DrumPad';
import Controls from '../components/drumMachine/Controls';
import config from '../data/config';
import {
	DrumMachineInterface,
	State,
} from 'types/drumMachine/DrumMachineTypes';
import { KeyConfig } from 'types/drumMachine/DrumPadTypes';
import '../styles/DrumMachine.scss';

// TODO: This thing is too ugly
class DrumMachine extends React.Component<any, State>
	implements DrumMachineInterface {
	state = {
		config: config,
		display: '',
		volume: 0.5,
		power: true,
	};

	/**
	 *
	 * @param {string} text String representing the display value
	 */
	changeDisplay = (text: string) => {
		this.setState({
			display: text,
		});
	};

	/**
	 *
	 * @param {number} volume Number representing the volume of the app
	 */
	changeVolume = (volume: number) => {
		this.setState({
			volume: volume,
		});
	};

	changePower = () => {
		const power = !this.state.power;
		const state = this.state.power ? 'Off' : 'On';
		this.changeDisplay(state);
		this.setState({
			power: power,
		});
	};

	renderDrumPad = (props: KeyConfig, index: number): JSX.Element => {
		return (
			<DrumPad
				key={index}
				id={props.id}
				padKey={props.padKey}
				padKeyCode={props.padKeyCode}
				src={props.src}
				changeDisplay={this.changeDisplay}
				volume={this.state.volume}
				power={this.state.power}
			/>
		);
	};

	render() {
		return (
			<main>
				<div id="drum-machine">
					<Controls
						display={this.state.display}
						changeDisplay={this.changeDisplay}
						volume={this.state.volume}
						changeVolume={this.changeVolume}
						power={this.state.power}
						changePower={this.changePower}
					/>
					<div id="pad">
						{this.state.config.map((key: KeyConfig, index: number) => {
							return this.renderDrumPad(key, index);
						})}
					</div>
				</div>
			</main>
		);
	}
}

export default DrumMachine;
