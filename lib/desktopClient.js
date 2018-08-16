
function answer(answer, user) {
  request('answer', user, { answer })
}

function getState(user) {
  request('state', user)
}

function getRules(user) {
  request('rules', user)
}

function signIn(player, user) {
  request('new-player', user, player)
}

function request(eventName, user, params = {}) {
  const body = Object.assign({ id: user.id }, params)
  user.game.socket.emit(eventName, body)
}

module.exports = {
  answer,
  getRules,
  getState,
  signIn
}
