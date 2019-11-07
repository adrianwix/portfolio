import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import createURL from '../../utils/createURL'
import BookItem from './BookItem'
import BookComment from './BookComment'

const SampleUi = () => {
	const [title, setTitle] = useState('')
	const [books, setBooks] = useState([])
	const [selectedBook, setSelectedBook] = useState(null)

	useEffect(() => {
		fetchBooks()
	}, [])

	async function fetchBooks() {
		try {
			const { data } = await axios.get(createURL('/api/books'))
			setBooks(data)
		} catch (e) {
			console.error(e)
		}
	}

	function showBooks(books) {
		const copyBooks = [...books]
		if (copyBooks.length === 0) {
			return <p>No books in the library</p>
		} else if (copyBooks.length > 5) {
			copyBooks.splice(5)
			let firstBooks = copyBooks.map((book, i) => (
				<BookItem
					setSelectedBook={setSelectedBook}
					key={i}
					book={book}
				/>
			))
			firstBooks.push(<p>and {books.length - 5} more!</p>)
			return firstBooks
		} else {
			return copyBooks.map((book, i) => (
				<BookItem
					setSelectedBook={setSelectedBook}
					key={i}
					book={book}
				/>
			))
		}
	}

	async function createBook(e) {
		e.preventDefault()
		try {
			const url = createURL('/api/books')
			const res = await axios({
				url,
				data: {
					title,
				},
				method: 'post',
			})
			setBooks([res.data, ...books])
			setTitle('')
		} catch (error) {
			console.error(error)
		}
	}

	async function deleteBook(id) {
		try {
			const bookId = id ? id : ''
			const url = createURL('/api/books/' + bookId)
			await axios.delete(url)

			if (!id) {
				setBooks([])
			} else {
				let booksCopy = [...books]
				let booksCopyIds = booksCopy.map(book => book._id)
				let index = booksCopyIds.indexOf(id)
				booksCopy.splice(index, 1)
				setBooks(booksCopy)
				setSelectedBook(null)
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<div>
			<h2>Sample Front End</h2>
			<Form onSubmit={createBook}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Book name</Form.Label>
					<Form.Control
						onChange={e => setTitle(e.target.value)}
						value={title}
						type="text"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>

			<Row className="my-3">
				<Col md={6}>
					<ListGroup>
						{showBooks(books)}
						<hr />
					</ListGroup>
					<Button onClick={() => deleteBook()} variant="danger">
						Delete All!
					</Button>
				</Col>

				<Col md={6}>
					<Card className="p-2 my-2">
						{selectedBook ? (
							<BookComment
								selectedBook={selectedBook}
								setSelectedBook={setSelectedBook}
								books={books}
								setBooks={setBooks}
								deleteBook={deleteBook}
							/>
						) : (
							<p className="m-0">
								Select a book to see it&apos;s details and
								comments
							</p>
						)}
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default SampleUi
