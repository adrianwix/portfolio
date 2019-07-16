export interface PropTypes {
	power: boolean
	volume: number
	display: string
	changeVolume: any
	changeDisplay: any
	changePower: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
