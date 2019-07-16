import { PropTypes as DrumPadProps, KeyConfig } from './DrumPadTypes';

export interface State {
	config: any
	display: string
	volume: number
	power: boolean
}

export interface PropTypes {
}

export interface DrumMachineInterface {
	changeDisplay: ChangeDisplay
	changeVolume: ChangeVolume
	changePower: ChangePower
	renderDrumPad: RenderDrumPad
}

export interface ChangeDisplay {
	(text: string): void
}

export interface ChangeVolume {
	(volume: number): void
}

export interface ChangePower {
	(): void
}

export interface RenderDrumPad {
	(props: KeyConfig, index: number): JSX.Element
}
