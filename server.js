const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db = require('./models/mortgages')
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/mortgage')

app.get('/', (req, res) => {
    let listing = { HomeValue: "$200,000", Title: "Listing-Title", id: "", Url: "Listing-Url", InterestRate: "4", HomeSlider: 200000 }
    res.render("index.ejs", { listing: listing })
})

app.get('/browse', async (req, res) => {
    const listings = await db.find()
    res.render('browse.ejs', { listings: listings })
})

app.post('/save', async (req, res) => {
    let listing = req.body
    try {
        await db.create({ Title: listing.Title, InterestRate: listing.InterestSlider, HomeValue: listing.HomeSlider, Url: listing.listingUrl })
    }
    catch (e) {
        console.log(e)
    }

    res.redirect("/")
})

app.get('/:id', async (req, res) => {
    const listing = await db.findOne({ id: req.params.id })
    listing.HomeSlider = listing.HomeValue.toString().replace(/\D/g, '')
    if (listing === null) res.redirect('/browse')
    res.render('index.ejs', { listing: listing })
})

app.listen(8080)