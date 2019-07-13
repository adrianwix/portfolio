import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import BootstrapForm from '../components/BootstrapForm';
import formSubmitHandler from '../utils/formSubmitHandler';
import axios from 'axios';
import createURL from '../utils/createURL';
import Thread from '../components/messageBoard/Thread';

const Board = props => {
	const [threads, setThreads] = useState(props.threads);

	/**
	 * @description Return a function that add the URL's params using the form values
	 * @param {string} api
	 */
	function pathname(api) {
		return api + props.board;
	}

	function postCallback(res) {
		const copyThreads = [...threads];
		copyThreads.unshift(res.data);
		setThreads(copyThreads);
	}

	function deleteThreadCallback(index) {
		const copyThreads = [...threads];
		copyThreads[index].text = '[deleted]';
		setThreads(copyThreads);
	}

	/**
	 *
	 * @param {number} thread - index
	 * @param {number} reply - index
	 */
	function deleteReplyCallback(thread, reply) {
		const copyThreads = [...threads];
		copyThreads[thread].replies[reply].text = '[deleted]';
		setThreads(copyThreads);
	}

	function createReplyCallback(threadIndex) {
		return res => {
			const copyThreads = [...threads];
			copyThreads[threadIndex].replies.unshift(res.data);
			copyThreads[threadIndex].replycount += 1;
			setThreads(copyThreads);
		};
	}

	return (
		<Container>
			<h1 className="mt-3">Welcome to board/{props.board}</h1>

			<h2>Submit a new Thread:</h2>
			<BootstrapForm
				className={'my-5'}
				fields={[
					{
						name: 'text',
						type: 'text',
						placeholder: 'Thread text...',
						required: true,
					},
					{
						name: 'delete_password',
						type: 'password',
						placeholder: 'Password to delete',
						required: true,
					},
				]}
				updateHandler={formSubmitHandler(
					'post',
					pathname('/api/threads/'),
					postCallback
				)}
			/>

			{threads.length > 0 &&
				threads.map((thread, tIndex) => (
					<Thread
						key={tIndex}
						board={props.board}
						tIndex={tIndex}
						thread={thread}
						showReplyCount={true}
						threadsPathname={pathname('/api/threads/')}
						deleteThreadCb={() => deleteThreadCallback(tIndex)}
						repliesPathname={pathname('/api/replies/')}
						createReplyCb={createReplyCallback(tIndex)}
						deleteReplyCb={deleteReplyCallback}
					/>
				))}
		</Container>
	);
};

Board.getInitialProps = async props => {
	const { query, req } = props;
	try {
		const res = await axios.get(createURL('/api/threads/' + query.board, req));
		if (res.data.length > 0) {
			return { threads: res.data, board: query.board };
		} else {
			return { threads: [], board: query.board };
		}
	} catch (error) {
		console.error('error');
	}
};

Board.propTypes = {
	board: PropTypes.string.isRequired,
	threads: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			created_on: PropTypes.string.isRequired,
			bumped_on: PropTypes.string.isRequired,
			board: PropTypes.string.isRequired,
			replycount: PropTypes.number.isRequired,
			replies: PropTypes.array.isRequired,
		})
	).isRequired,
};

export default Board;
