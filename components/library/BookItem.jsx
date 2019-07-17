import React from 'react'
import * as PropTypes from 'prop-types'
import { ListGroupItem } from 'react-bootstrap'

const BookItem = props => {
	const { book, setSelectedBook } = props
	const { title, commentcount } = book

	return (
		<>
			<ListGroupItem
				className="mt-2"
				onClick={() => setSelectedBook(book)}
			>{`${title} - ${commentcount} comments`}</ListGroupItem>
		</>
	)
}

BookItem.propTypes = {
	book: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		commentcount: PropTypes.number.isRequired,
		comments: PropTypes.array,
	}),
	setSelectedBook: PropTypes.func.isRequired,
}

export default BookItem
