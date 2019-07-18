import React from 'react'
import { PreviewProps } from 'types/markdownPreviewer/PreviewTypes'

const Preview: React.FC<PreviewProps> = props => {
	return <div id="preview" dangerouslySetInnerHTML={props.marked}/>
}

export default Preview
