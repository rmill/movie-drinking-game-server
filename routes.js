const desktopClient = require('./lib/desktopClient')
const gameManager = require('./lib/gameManager')

function getGames() {
  const games = gameManager.getGames()
  return Object.values(games).map(i => { return { name: i.name, id: i.id }})
}

function joinGame(user) {
  return { token: gameManager.generateToken(user) }
}

function signIn(player, user) {
  return desktopClient.signIn(player, user)
}

function getRules(user) {
  return desktopClient.getRules(user)
}

function answer(answer, user) {
  return desktopClient.answer(answer, user)
}

function getState(user) {
  return desktopClient.getState(user)
}

function createGame(name, socket) {
  return gameManager.createGame(name, socket)
}

function removeGame(id) {
  const game = gameManager.getGame(id)
  return gameManager.removeGame(game)
}

module.exports = {
  getGames,
  joinGame,
  signIn,
  getRules,
  answer,
  getState,
  createGame,
  removeGame
}
