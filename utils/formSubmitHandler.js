import createURL from './createURL'
import axios from 'axios'

/**
 *
 * @param {string} method
 * @param {function|string} pathname
 * @param {function} [callback]
 * @returns {Function}
 */
export default function formSubmitHandler(method, pathname, callback) {
	return async values => {
		try {
			const apiEndPoint = typeof pathname === 'string' ? pathname : pathname(values)
			const url = createURL(apiEndPoint)
			const res = await axios({
				url,
				data: values,
				method,
			})

			if (typeof callback === 'function') {
				callback(res)
			}
		} catch (error) {
			console.error(error)
		}
	}
}
