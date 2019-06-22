import { withRouter } from "next/router";

export default withRouter(props => {
	console.log(props.url.query);
	return <div>{props.url.query.maldito}</div>;
});
