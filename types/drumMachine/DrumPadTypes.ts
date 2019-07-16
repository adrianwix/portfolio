import { ChangeDisplay } from './DrumMachineTypes';

export interface DrumPadInterface {
	audio: HTMLAudioElement | null
	handleKeyPress: HandleKeyPress
	toggleKey: () => void
	activatePad: () => void
}

export interface PropTypes extends KeyConfig {
	volume: number
	power: boolean
	changeDisplay: ChangeDisplay
}

export interface KeyConfig {
	padKeyCode: number
	padKey: string
	id: string
	src: string
}

export interface State {
	style: string
}

export interface HandleKeyPress {
	(e: KeyboardEvent): void
}
