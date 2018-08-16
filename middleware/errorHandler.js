const error = require('http-errors')
const { NotFoundError } = require('../lib/errors')

module.exports = (err, req, res, next) => {
    if (err instanceof NotFoundError) return next(error.NotFound())
    next(err)
}
