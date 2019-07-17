import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Thread from '../components/messageBoard/Thread'
import axios from 'axios'
import createURL from '../utils/createURL'
import * as PropTypes from 'prop-types'

const ThreadPage = props => {
	const [thread, setThread] = useState(props.thread)

	/**
	 * @description Return a function that add the URL's params using the form values
	 * @param {string} api
	 */
	function pathname(api) {
		return api + props.board
	}

	function deleteThreadCb() {
		setThread({ ...thread, text: '[deleted]' })
	}

	function createReplyCb(res) {
		const threadCopy = { ...thread }
		threadCopy.replies.unshift(res.data)
		setThread(threadCopy)
	}

	function deleteReplyCb(replyIndex) {
		const threadCopy = { ...thread }
		threadCopy.replies[replyIndex].text = '[deleted]'
		setThread(threadCopy)
	}

	return (
		<Container>
			<h1 className="my-3">Board: {props.board}</h1>
			<h2 className="h5">ID: {props.threadId}</h2>
			<Thread
				board={props.board}
				thread={thread}
				threadsPathname={pathname('/api/threads/')}
				repliesPathname={pathname('/api/replies/')}
				deleteThreadCb={deleteThreadCb}
				createReplyCb={createReplyCb}
				deleteReplyCb={deleteReplyCb}
			/>
		</Container>
	)
}

ThreadPage.propTypes = {
	board: PropTypes.string.isRequired,
	threadId: PropTypes.string.isRequired,
	thread: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		created_on: PropTypes.string.isRequired,
		bumped_on: PropTypes.string.isRequired,
		board: PropTypes.string.isRequired,
		replies: PropTypes.array.isRequired,
	}),
}

ThreadPage.getInitialProps = async props => {
	const { query, req } = props
	try {
		const url =
			createURL('/api/replies/' + query.board, req) +
			`?thread_id=${query.threadId}`

		const res = await axios.get(url)

		return { thread: res.data, board: query.board, threadId: query.threadId }
	} catch (error) {
		console.error('error', error)
	}
}

export default ThreadPage
