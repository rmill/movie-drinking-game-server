const { UnauthorizedError } = require('../lib/errors')
const gameManager = require('../lib/gameManager')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    throw UnauthorizedError('Authorization header is missing')
  }

  const token = JSON.parse(authHeader)
  const game = gameManager.getGame(token['game_id'])

  if (!game) {
    throw NotFoundError('Game not found')
  }

  req.locals.user = { id: token['id'], game }
  next()
}
