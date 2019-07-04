import { Button, Form } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import createURL from '../../utils/createURL';
import axios from 'axios';

function BookComment(props) {
	const [comment, setComment] = useState('');

	async function createComment(e) {
		e.preventDefault();
		try {
			const url = createURL('/api/books/' + props.selectedBook._id);
			const res = await axios({
				url,
				data: {
					comment,
				},
				method: 'post',
			});
			let booksCopy = [...props.books];
			let booksCopyIds = booksCopy.map(book => book._id);
			let index = booksCopyIds.indexOf(props.selectedBook._id);
			booksCopy[index] = res.data;
			props.setBooks(booksCopy);
			props.setSelectedBook(res.data);
			setComment('');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div id="bookcomments">
			<b>Book for Testing </b>
			<p>(id: {props.selectedBook._id})</p>
			<Form onSubmit={createComment}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Write a comment</Form.Label>
					<Form.Control
						onChange={e => setComment(e.target.value)}
						value={comment}
						type="text"
					/>
				</Form.Group>
				<Button type="submit">Comment</Button>
				<Button
					onClick={() => props.deleteBook(props.selectedBook._id)}
					variant="outline-danger"
					className="ml-5"
				>
					Delete Book
				</Button>
				<ul className="my-3">
					{props.selectedBook.comments.map((comment, i) => (
						<li key={i}>{comment}</li>
					))}
				</ul>
			</Form>
		</div>
	);
}

BookComment.propTypes = {
	selectedBook: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		commentcount: PropTypes.number.isRequired,
		comments: PropTypes.array,
	}),
	setSelectedBook: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired,
	setBooks: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired,
};

export default BookComment;
