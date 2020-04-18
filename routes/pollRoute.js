/**
*! -*-*-*-*-*-*- Express Poll Router -*-*-*-*-*-*-
*/


// Express Router Import
const pollRouter = require('express').Router()

// Import Route Controller
const pollController = require('../controllers/pollRouterController')




// example.com/poll/createPoll/ --> GET
pollRouter.get('/', pollController.getAllCreateController)

// example.com/poll/create-poll/ --> POST
pollRouter.post('/', pollController.createPollController)

// example.com/poll/createPoll/polls/ --> GET
pollRouter.get('/polls', pollController.getPollsController)

// example.com/poll/createPoll/polls/:PostId --> GET
pollRouter.get('/polls/:PostId', pollController.viewPollGetController)

// example.com/poll/createPoll/polls/:PostId --> POST
pollRouter.post('/polls/:PostId', pollController.viewPollPostController)


module.exports = pollRouter
