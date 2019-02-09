/**
 * @param {*} value
 * @return {Boolean} True if its empty or False if its not
 */
const isEmpty = value =>
	value === undefined ||
	value === null ||
	(typeof value === "object" && Object.keys(value).length === 0) ||
	(typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
