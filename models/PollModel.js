// mongoose import
const mongoose = require('mongoose');



// Mongoose Schema
const Schema = mongoose.Schema
const pollSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 500,
    },
    totalVote: {
        type: Number,
        default: 0,
    },
    options: {
        type: [{
            name: String,
            vote: Number
        }]
    }
})


// Mongoose Model {Contact নামে database save হবে}
const Poll = mongoose.model('Poll', pollSchema)

module.exports = Poll