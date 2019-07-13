import React, { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import MessageBoardUserStory from '../components/messageBoard/MessageBoardUserStory';
import BootstrapForm from '../components/BootstrapForm';
import formSubmitHandler from '../utils/formSubmitHandler';
import MessageBoardApiTable from '../components/messageBoard/MessageBoardApiTable';
import ResponseModal from '../components/messageBoard/ResponseModal';

const MessageBoard = () => {
	const [show, setShow] = useState(false);
	const [response, setResponse] = useState(undefined);
	/**
	 * @description Return a function that add the URL's params using the form values
	 * @param {string} api
	 * @returns {function(values: []): string}
	 */
	function pathname(api) {
		function pathnameWithValues(values) {
			return api + values.board;
		}
		return pathnameWithValues;
	}

	function submitCallback(res) {
		setResponse(res.data);
		setShow(true);
	}

	return (
		<Container>
			<ResponseModal show={show} setShow={setShow} response={response} />
			<h1 className={'mt-3'}>
				<b>ISQA_3</b> - Anon Message Board
			</h1>
			<br />
			<div id="userstories">
				<MessageBoardUserStory />
				<br />
				<MessageBoardApiTable />
			</div>
			<Link href="/board/general">
				<a>Go to testing &apos;/board/general&apos; board</a>
			</Link>

			<hr className={'m-5'} />
			{/*TODO: eliminate board fields in front-end or use then in backend*/}
			{/*TODO:: show API response in modal and reset form*/}
			<h2>API Tests:</h2>
			<Row className="mt-2 mb-5">
				<Col>
					<h4>New thread (POST /api/threads/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'post',
							pathname('/api/threads/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'text',
								placeholder: 'Thread text...',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'delete_password',
								placeholder: 'Password to delete',
								required: true,
								initialValue: '',
							},
						]}
					/>

					<h4>Report thread (PUT /api/threads/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'put',
							pathname('/api/threads/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'report_id',
								placeholder: 'id to report',
								required: true,
								initialValue: '',
							},
						]}
					/>

					<h4>Delete thread (DELETE /api/threads/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'delete',
							pathname('/api/threads/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'thread_id',
								placeholder: 'id to delete',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'delete_password',
								placeholder: 'password',
								required: true,
								initialValue: '',
							},
						]}
					/>
				</Col>

				<Col>
					<h4>New reply (POST /api/replies/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'post',
							pathname('/api/replies/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'thread_id',
								placeholder: 'Thread id',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'text',
								placeholder: 'Text',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'delete_password',
								placeholder: 'Password to delete',
								required: true,
								initialValue: '',
							},
						]}
					/>

					<h4>Report reply (PUT /api/replies/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'put',
							pathname('/api/replies/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'thread_id',
								placeholder: 'Thread id',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'reply_id',
								placeholder: 'Id to report',
								required: true,
								initialValue: '',
							},
						]}
					/>

					<h4>Delete reply (DELETE /api/replies/:board)</h4>
					<BootstrapForm
						updateHandler={formSubmitHandler(
							'delete',
							pathname('/api/replies/'),
							submitCallback
						)}
						className={'mb-4'}
						fields={[
							{
								type: 'text',
								name: 'board',
								placeholder: 'Board',
								required: true,
								initialValue: 'general',
							},
							{
								type: 'text',
								name: 'thread_id',
								placeholder: 'Thread id',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'reply_id',
								placeholder: 'Id to delete',
								required: true,
								initialValue: '',
							},
							{
								type: 'text',
								name: 'delete_password',
								placeholder: 'password',
								required: true,
								initialValue: '',
							},
						]}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default MessageBoard;
