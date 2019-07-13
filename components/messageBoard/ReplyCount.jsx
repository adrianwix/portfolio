import React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'next/link';

/**
 * @return {null}
 */
function ReplyCount(props) {
	if (props.showReplyCount) {
		return (
			<div className="ml-3 my-3">
				<b>
					{props.replycount} replies total (
					{props.replycount > 3 ? props.replycount - 3 : 0} hidden)
				</b>
				<br/>
				<Link href={`/board/${props.board}/${props.id}`}>
					<a>See the full thread here</a>
				</Link>
			</div>
		);
	} else {
		return null;
	}
}

ReplyCount.propTypes = {
	showReplyCount: PropTypes.bool,
	replycount: PropTypes.number,
	board: PropTypes.string,
	id: PropTypes.string,
};

export default ReplyCount;