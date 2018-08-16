"use strict"

const bodyParser = require('body-parser')
const express = require('express')
const socketio = require('socket.io');
const http = require('http');

const app = express()
const middleware = require('./middleware')
const routes = require('./routes')
const port = process.argv[2] || 3000
const server = http.createServer(app);

var io = socketio(server);
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
      console.log(`Removing Game: ${ socket.id }`)
      routes.removeGame(socket.id)
  });

  socket.on('create-game', (data) => {
    console.log(`New Game: ${ socket.id } -> ${ data['name'] }`);
    routes.createGame(data['name'], socket)
  });
});

app.use(bodyParser.json())
app.use(middleware.addLocals)

app.get('/games', (req, res) => {
  res.json(routes.getGames())
})

app.post('/join', middleware.gameExists, (req, res) => {
  res.json(routes.joinGame(req.locals.user))
})

app.post('/signin', middleware.authorized, (req, res) => {
  routes.signIn(req.body, req.locals.user)
  res.end()
})

app.get('/rules', middleware.authorized, (req, res) => {
  routes.getRules(req.locals.user)
  res.end()
})

app.post('/answer', middleware.authorized, (req, res) => {
  routes.answer(req.body['answer'], req.locals.user)
  res.end()
})

app.get('/state', middleware.authorized, (req, res) => {
  routes.getState(req.locals.user)
  res.end()
})

app.use(middleware.errorHandler)

server.listen(port, () => console.log(`listening on port ${port}`))
