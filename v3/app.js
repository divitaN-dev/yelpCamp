var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')
Campground = require('./models/campground')
seedDB = require('./seed')

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
seedDB()

app.get('/', (req, res) => {
  res.render('landing')
})
//INDEX
app.get('/campgrounds', (req, res) => {
  //Get all Campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { campgrounds: allCampgrounds })
    }
  })
})

//Create - creates new campground
app.post('/campgrounds', function(req, res) {
  console.log("You've hit the post route")
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = { name: name, image: image, description: desc }
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console('Error')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

//NEW - Show form make new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new')
})

//SHOW - Shows info about one campground
app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id)
    .populate('comment')
    .exec(function(err, foundId) {
      res.render('show', { campground: foundId })
    })
})

app.listen(3000, (req, res) => {
  console.log('Server started')
})
