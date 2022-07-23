const mongoose = require('mongoose')
const shortID = require('shortid')

const mortgageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: shortID.generate
    },
    Title: {
        type: String,
        required: true
    },
    Url: {
        type: String,
        required: false,
        default: "#"
    },
    HomeValue: {
        type: String,
        required: true
    },
    InterestRate: {
        type: String,
        required: true
    },
    DownPercent: {
        type: String
    }
})

module.exports = mongoose.model('Mortgage', mortgageSchema)