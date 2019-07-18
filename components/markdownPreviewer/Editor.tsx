import React from 'react'
import { EditorProps } from 'types/markdownPreviewer/EditorTypes'

const Editor: React.FC<EditorProps> = props => {
	return (
		<textarea id="editor" value={props.value} onChange={props.modifyText}/>
	)
}

export default Editor
