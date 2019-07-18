import React, { useState, useEffect } from 'react'
import marked from 'marked'
import * as hljs from 'highlight.js'
import 'styles/MarkdownPreviewer.scss'
import 'highlight.js/styles/atom-one-dark.css'

import Editor from 'components/markdownPreviewer/Editor'
import Preview from 'components/markdownPreviewer/Preview'

const renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
	return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
}

marked.setOptions({
	renderer,
	highlight: function(code) {
		return hljs.highlightAuto(code).value
	},
	breaks: true,
})

const MarkdownPreviewer: React.FC = () => {
	const [text, setText] = useState(initText)

	useEffect(() => {
		hljs.initHighlightingOnLoad()
	})

	return (
		<div className="flex" id="app">
			<Editor value={text} modifyText={e => setText(e.target.value)}/>
			<Preview marked={{ __html: marked(text) }}/>
		</div>
	)
}

const initText = `# Header
## Sub header
[A link](https://codepen.io/adrianwix/)

\`<div>I am a DIV</div>\`

\`\`\`
// this is multi-line code:

const Editor = (props) => {
  return (
    <textarea 
      id="editor"
      onChange={props.modifyText}
    >{props.value}</textarea>
  )
}
\`\`\`
- List
- Of
- Things
***
**Bolded Text**
> #### Blockquote
> bar
> baz
---
![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default MarkdownPreviewer
