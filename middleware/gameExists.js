const { NotFoundError } = require('../lib/errors')
const gameManager = require('../lib/gameManager')

module.exports = (req, res, next) => {
  const game = gameManager.getGame(req.body['game_id'])

  if (!game) {
    throw new NotFoundError('Game not found')
  }

  req.locals.user =  { game }
  next()
}
