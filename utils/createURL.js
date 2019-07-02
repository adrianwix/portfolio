export default function createURL(pathname) {
	if (typeof window != 'undefined' && window.document) {
		const url = new URL(window.location.href);
		const protocol = url.protocol;
		const hostname = url.host;
		return protocol + '//' + hostname + pathname;
	} else {
		return 'http:localhost:3000' + pathname;
	}
}