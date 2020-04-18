// import User Model
const Poll = require('../models/PollModel')

// import Bcrypt --> Password কে Hide করে # Tag Use করার জন্য
// const bcrypt = require('bcrypt')




// {GET Method} data show করার জন্য
const getAllCreateController = (req, res, next) => {
    res.render('createPoll')
}

// {POST Method} Create Poll
const createPollController = async (req, res, next) => {
    let { title, description, options } = req.body

    options = options.map(opt => {
        return {
            name: opt,
            vote: 0
        }
    })

    let poll = new Poll({
        title,
        description,
        options
    })

    try {
        await poll.save()
        res.redirect('/poll/createPoll/polls')
    } catch (e) {
        console.log(e)
    }
}


// {GET Method} data show করার জন্য
const getPollsController = async (req, res, next) => {
    try {
        let polls = await Poll.find()
        res.render('polls', { polls })
    } catch (error) {
        console.log(error)
    }
}


// {GET Method} data show করার জন্য
const viewPollGetController = async (req, res, next) => {
    let id = req.params.PostId

    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]

        let resultVote = []

        options.forEach(option => {
            let percentage = (option.vote * 100) / poll.totalVote
            resultVote.push({
                ...option.doc,
                percentage: percentage ? percentage : 0
            })
        })
        res.render('viewPoll', { poll, resultVote })
    } catch (error) {
        console.log(error)
    }
}


// {POST Method} data show করার জন্য
const viewPollPostController = async (req, res, next) => {
    let id = req.params.PostId
    let optionId = req.body.option


    try {
        let poll = await Poll.findById(id)

        let options = [...poll.options]

        let index = options.findIndex(opt => opt.id === optionId)
        options[index].vote = options[index].vote + 1

        let totalVote = poll.totalVote + 1

        await Poll.findOneAndUpdate(
            { _id: poll._id },
            { $set: { options, totalVote } }
        )

        res.redirect('/poll/createPoll/polls/' + id)


    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getAllCreateController,
    createPollController,
    getPollsController,
    viewPollGetController,
    viewPollPostController
}
