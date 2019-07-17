'use strict'

const Router = require('koa-router')
const router = new Router()

const Project = require('../../models/Project')

const isEmpty = require('../../validation/isEmpty')

/**
 * @route /api/issues
 * @type {Router<any, {}>}
 */
module.exports = router
	.get('/:project', async ctx => {
		// test or apitest
		const project_name = ctx.params.project
		const query = ctx.query

		const project = await Project.findOne({ project: project_name })

		ctx.assert(project, 200, 'Project not found')

		const issues = project.issues

		issues.sort((a, b) => {
			return Date.parse(b.created_on) - Date.parse(a.created_on)
		})

		if (query.open) {
			if (query.open === 'true') {
				query.open = true
			} else if (query.open === 'false') {
				query.open = false
			}
		}

		if (!isEmpty(query)) {
			const queryResults = issues.filter(obj => {
				for (let key in query) {
					if (
						!Object.prototype.hasOwnProperty.call(obj, key) &&
						obj[key] != query[key]
					) {
						return false
					} else {
						return true
					}
				}
			})
			ctx.body = queryResults
		} else {
			ctx.body = issues
		}
	})
	.post('/:project', async ctx => {
		// Get request information
		const project_name = ctx.params.project
		const {
			issue_title,
			issue_text,
			created_by,
			assigned_to,
			status_text,
			open,
		} = ctx.request.body

		// Find a project with the param name
		let project = await Project.findOne({ project: project_name })

		// If no project found, create one. Else create a new issue an add it to the project
		if (!project) {
			let newProject = new Project({
				project: project_name,
				issues: [
					{
						issue_title,
						issue_text,
						created_by,
						assigned_to,
						status_text,
						open,
					},
				],
			})

			project = await newProject.save().catch(() => {
				ctx.throw(400, 'Project validation failed')
			})
			ctx.body = project.issues[0]
		} else {
			const newIssue = {
				issue_title,
				issue_text,
				created_by,
				assigned_to,
				status_text,
				open,
			}
			project.issues.unshift(newIssue)

			const projectSave = await project.save().catch(() => {
				ctx.throw(400, 'Project validation failed')
			})

			const issues = projectSave.issues

			issues.sort((a, b) => {
				return Date.parse(b.created_on) - Date.parse(a.created_on)
			})

			ctx.body = issues[0]
		}
	})
	.put('/:project', async ctx => {
		// Get request information
		let project_name = ctx.params.project
		let {
			_id,
			issue_title,
			issue_text,
			created_by,
			assigned_to,
			status_text,
			open,
		} = ctx.request.body
		let updatedFields
		const setValues = {
			issue_title,
			issue_text,
			created_by,
			assigned_to,
			status_text,
			open,
		}

		// TODO: can be extracted
		/**
		 *
		 * @param {Object} obj Object to filter
		 * @param {Function} predicate Condition
		 */
		function filterObj(obj, predicate) {
			let result = {}

			for (let key in obj) {
				if (
					Object.prototype.hasOwnProperty.call(obj, key) &&
					predicate(obj[key])
				) {
					result['issues.$.' + key] = obj[key]
				}
			}

			return result
		}

		const filteredObj = filterObj(setValues, property => {
			return !isEmpty(property)
		})

		if (isEmpty(filteredObj)) {
			return ctx.throw(400, 'no updated field sent')
		}

		filteredObj['issues.$.updated_on'] = Date.now()

		updatedFields = Object.keys(filteredObj).length

		const response = await Project.updateOne(
			{
				project: project_name,
				'issues._id': _id,
			},
			{
				$set: filteredObj,
			},
		).catch(err => {
			ctx.throw(400, 'could not update ' + _id, err)
		})

		ctx.body = {
			response,
			updatedFields,
			message: 'successfully updated',
		}
	})
	.delete('/:project', async ctx => {
		let project_name = ctx.params.project
		let { _id } = ctx.request.body
		if (isEmpty(_id)) {
			return ctx.throw(400, 'No _id sended')
		}

		let project = await Project.findOne({
			project: project_name,
			'issues._id': _id,
		})

		const issuesIds = project.issues.map(issue => issue.id)
		const index = issuesIds.indexOf(_id)
		if (index == -1) {
			ctx.throw(404, 'id not found')
		}

		project.issues.splice(index, 1)

		project = await project.save()

		ctx.body = {
			project: {
				_id: project._id,
				name: project.project,
			},
			message: 'valid _id',
		}
	})
