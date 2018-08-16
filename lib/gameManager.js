const randomstring = require('randomstring')
const games = {};

function createGame(name, socket) {
  const game = { id: socket.id, name, socket }
  games[socket.id] = game
  return game
}

function generateToken(user) {
  return JSON.stringify({ id: randomstring.generate(), game_id: user.game.id })
}

function getGame(id) {
  return games[id]
}

function getGames () {
  return games
}

function removeGame(game) {
  if (game) {
    delete games[game.socket.id]
  }
}

module.exports = {
  createGame,
  generateToken,
  getGame,
  getGames,
  removeGame
}
