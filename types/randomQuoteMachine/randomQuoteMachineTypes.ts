export interface IQuote {
	ID: number
	title: string
	content: string
	link: string
	custom_meta?: {
		Source: string
	}
}

export interface dangerouslySetInnerHTML {
	__html: string
}