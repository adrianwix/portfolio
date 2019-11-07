import Card from 'react-bootstrap/Card'
import ThreadCardBody from './ThreadCardBody'
import BootstrapForm from '../BootstrapForm'
import formSubmitHandler from '../../utils/formSubmitHandler'
import * as PropTypes from 'prop-types'
import React from 'react'
import ReplyCard from './ReplyCard'
import ReplyCount from './ReplyCount'

function Thread(props) {
	return (
		<Card className="my-4">
			<Card.Body>
				<ThreadCardBody
					message={props.thread}
					board={props.board}
					pathname={props.threadsPathname}
					callback={props.deleteThreadCb}
				/>
				{/*Create Reply form*/}
				<BootstrapForm
					className={'ml-3'}
					fields={[
						{
							type: 'hidden',
							name: 'thread_id',
							initialValue: props.thread._id,
						},
						{
							type: 'text',
							name: 'text',
							placeholder: 'Text',
							required: true,
						},
						{
							type: 'text',
							name: 'delete_password',
							placeholder: 'Password to delete',
							required: true,
						},
					]}
					updateHandler={formSubmitHandler(
						'post',
						props.repliesPathname,
						props.createReplyCb
					)}
				/>

				<ReplyCount
					showReplyCount={props.showReplyCount}
					replyCount={props.thread.replycount}
					board={props.board}
					id={props.thread._id}
				/>

				{props.thread.replies.slice(0, 3).map((reply, rIndex) => (
					<ReplyCard
						key={rIndex}
						message={reply}
						pathname={props.repliesPathname}
						callback={() =>
							props.deleteReplyCb(rIndex, props.tIndex)
						}
						thread_id={props.thread._id}
					/>
				))}
			</Card.Body>
		</Card>
	)
}

Thread.defaultProps = {
	showReplyCount: false,
}

Thread.propTypes = {
	board: PropTypes.string.isRequired,
	tIndex: PropTypes.number,
	showReplyCount: PropTypes.bool.isRequired,
	thread: PropTypes.shape({
		_id: PropTypes.string,
		text: PropTypes.string,
		created_on: PropTypes.string,
		bumped_on: PropTypes.string,
		board: PropTypes.string,
		replycount: PropTypes.number,
		replies: PropTypes.arrayOf(PropTypes.any),
	}).isRequired,
	threadsPathname: PropTypes.string.isRequired,
	repliesPathname: PropTypes.string.isRequired,
	deleteThreadCb: PropTypes.func.isRequired,
	createReplyCb: PropTypes.func.isRequired,
	deleteReplyCb: PropTypes.func.isRequired,
}

export default Thread
