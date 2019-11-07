import React from 'react'
import Container from 'react-bootstrap/Container'
import LibraryUserStory from '../components/library/LibraryUserStory'
import LibraryCreateForm from '../components/library/LibraryCreateForm'
import LibraryCommentForm from '../components/library/LibraryCommentForm'
import SampleUi from '../components/library/SampleUI'
import createURL from '../utils/createURL'
import axios from 'axios'
import Router from 'next/router'
import { Table } from 'react-bootstrap'

const Library = () => {
	/**
	 *    TODO: Use helper function
	 */
	async function updateHandler(values) {
		try {
			const id = values._id ? values._id : ''
			const pathname = '/api/books/' + id
			const url = createURL(pathname)
			await axios({
				url,
				data: values,
				method: 'post',
			})
			Router.push(pathname)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container>
			<h1 className={'mt-3'}>
				<b>ISQA Project</b> - Personal Library
			</h1>
			<br />
			<div id="userstories">
				<LibraryUserStory />
				<br />
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>API</th>
							<th>GET</th>
							<th>POST</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>/api/books</td>
							<td>List all books</td>
							<td>Add new book</td>
							<td>Delete all books</td>
						</tr>
						<tr>
							<td>/api/books/:id</td>
							<td>Show book :id</td>
							<td>Add comment to :id</td>
							<td>Delete :id</td>
						</tr>
					</tbody>
				</Table>
			</div>

			<hr className={'m-5'} />

			<div id="sampleposting">
				{/* This show the api response in the browser */}
				<h2 className={'text-left'}>Test API responses:</h2>
				<LibraryCreateForm
					updateHandler={updateHandler}
					className="my-3"
				/>
				<LibraryCommentForm
					updateHandler={updateHandler}
					className="mt-5 mb-3"
				/>
			</div>

			<hr className={'m-5'} />

			<div id="sampleui" className="my-3">
				<SampleUi />
			</div>
		</Container>
	)
}

Library.propTypes = {}

export default Library
