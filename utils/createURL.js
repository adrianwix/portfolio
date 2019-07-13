/**
 *
 * @param {string} pathname
 * @param {object} [request] req value in Component.getInitialProps()
 * @returns {string}
 */
export default function createURL(pathname, request) {
	if (typeof window != 'undefined' && window.document) {
		const url = new URL(window.location.href);
		const protocol = url.protocol;
		const hostname = url.host;
		return protocol + '//' + hostname + pathname;
	} else {
		// TODO: Change protocol
		return 'http://' + request.headers.host + pathname;
	}
}