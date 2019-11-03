import React, { useState, useEffect } from 'react'
import * as marked from 'marked'
import * as hljs from 'highlight.js'
import 'styles/MarkdownPreviewer.scss'
import 'highlight.js/styles/atom-one-dark.css'

import Editor from 'components/markdownPreviewer/Editor'
import Preview from 'components/markdownPreviewer/Preview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
	return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
}

renderer.image = function(href, title, text) {
	return `<img class="img-fluid" src="${href}" title="${title}" alt="${title}">${text}</img>`
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
		<div id="app">
			<h1 className="pt-4 mb-3">Markdown Previewer
				<a title="Github"
				   className="ml-2"
				   href="https://github.com/adrianwix/portfolio/blob/master/pages/markdown-previewer.tsx">
					<FontAwesomeIcon icon={faGithub}/>
				</a>
			</h1>

			<div className="flex">
				<Editor value={text} modifyText={e => setText(e.target.value)}/>
				<Preview marked={{ __html: marked(text) }}/>
			</div>
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
