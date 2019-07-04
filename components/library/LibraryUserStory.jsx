import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const userStories = [
	'Nothing from my website will be cached in my client as a security measure.',
	'I will see that the site is powered by \'PHP 4.2.0\' even though it isn\'t as a security measure.',
	'I can <b>post</b> a <code>title</code> to /api/books to add a book and returned will be the object with the <code>title</code> and a unique <code>_id</code>.',
	'I can <b>get</b> /api/books to retrieve an aray of all books containing <code>title</code>, <code>_id</code>, & <code>commentcount</code>',
	'I can <b>get</b> /api/books/{_id} to retrieve a single object of a book containing <code>title</code>, <code>_id</code>, & an array of <code>comments</code> (empty array if no comments present).',
	'I can <b>post</b> a <code>comment</code> to /api/books/{_id} to add a comment to a book and returned will be the books object similar to <b>get</b> /api/books/{_id}.',
	'I can <b>delete</b> /api/books/{_id} to delete a book from the collection. Returned will be \'delete successful\' if successful.',
	'If I try to request a book that doesn\'t exist I will get a \'no book exists\' message.',
	'I can send a <b>delete</b> request to /api/books to delete all books in the database. Returned will be \'complete delete successful\' if successful.',
	'All 6 functional tests required are complete and passing.',
];

export default function LibraryUserStory() {
	return (
		<React.Fragment>
			<h3>User Stories</h3>
			<ListGroup>
				{userStories.map((story, i) => <ListGroupItem key={i} dangerouslySetInnerHTML={{ __html: story }} />)}
			</ListGroup>
			<br />
		</React.Fragment>
	);
}
