import { withRouter } from 'next/router'

export default withRouter(props => {
	const { router } = props
	console.log(router)
	return <div>{JSON.stringify(router.query)}</div>
})
