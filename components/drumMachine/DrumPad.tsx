import React from 'react'
import {
	PropTypes,
	State,
	DrumPadInterface,
	HandleKeyPress,
} from 'types/drumMachine/DrumPadTypes'

/**
 * @param {Object} this.props - Properties for the child component
 * @param {String} props.key - The name of the audio
 * @param {String} props.padKey - Name of the key
 * @param {String} props.padKeyCode - Number of the drum pad
 * @param {String} props.src - Audio source
 * @param {Number} props.volume - Volume of the soundtrack
 * @param {Function} props.changeDisplay - callback for changing the text in #Display
 * @param {Boolean} props.power - Power state
 */
class DrumPad extends React.Component<PropTypes, State>
	implements DrumPadInterface {
	audio: HTMLAudioElement | null = null

	// Or state could be active and change style base on that
	state = {
		style: 'drum-pad',
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress)
		this.audio = document.getElementById(this.props.padKey) as HTMLAudioElement
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress)
	}

	handleKeyPress: HandleKeyPress = e => {
		// TODO: do not use keycode
		if (this.props.power && e.keyCode === this.props.padKeyCode) {
			this.toggleKey()
		}
	}

	toggleKey = () => {
		if (this.props.power) {
			if (this.audio) {
				this.activatePad()
				setTimeout(() => this.activatePad(), 200)
				this.audio.volume = this.props.volume
				this.audio.currentTime = 500
				this.audio.play()
				console.log(this.props.padKey)
				this.props.changeDisplay(this.props.id)
			}
		}
	}

	activatePad = () => {
		let index = this.state.style.indexOf('active')
		let style
		index === -1 ? (style = 'drum-pad active') : (style = 'drum-pad')
		this.setState({
			style: style,
		})
	}

	render() {
		return (
			<div
				className={this.state.style}
				id={this.props.id}
				onClick={this.toggleKey}
			>
				<p>{this.props.padKey}</p>
				<audio
					preload="auto"
					className="clip"
					id={this.props.padKey}
					src={this.props.src}
				/>
			</div>
		)
	}
}

export default DrumPad
