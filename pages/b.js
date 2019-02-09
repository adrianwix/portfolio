export default props => {
	console.log(props.url.query);
	return <div>{props.url.query.maldito}</div>;
};
