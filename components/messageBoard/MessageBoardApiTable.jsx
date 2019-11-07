import React from 'react'
import { Table } from 'react-bootstrap'

function MessageBoardApiTable() {
	return (
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>API</th>
					<th>GET</th>
					<th>POST</th>
					<th>PUT</th>
					<th>DELETE</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>/api/threads/:board</td>
					<td>List recent threads</td>
					<td>Create thread</td>
					<td>Report thread</td>
					<td>Delete thread with password</td>
				</tr>
				<tr>
					<td>/api/replies/:board</td>
					<td>Show all replies on thread</td>
					<td>Create reply on thread</td>
					<td>Report reply on thread</td>
					<td>Change reply to &apos;[deleted]&apos; on threead</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default MessageBoardApiTable
