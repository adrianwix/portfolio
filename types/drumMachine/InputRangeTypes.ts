import { ChangeVolume, ChangeDisplay } from './DrumMachineTypes'

export interface InputRangeInterface {
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PropTypes {
	power: boolean
	volume: number
	changeVolume: ChangeVolume
	changeDisplay: ChangeDisplay
}
