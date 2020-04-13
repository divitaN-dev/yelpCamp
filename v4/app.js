var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')
Campground = require('./models/campground')
Comment = require('./models/comment')
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
      res.render('campgrounds/index', { campgrounds: allCampgrounds })
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
      console(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

//NEW - Show form make new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new')
})

//SHOW - Shows info about one campground
app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id)
    .populate('comment')
    .exec(function(err, foundId) {
      res.render('campgrounds/show', { campground: foundId })
    })
})

//Comments routes
app.get('/campgrounds/:id/comments/new', function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})

app.post('/campgrounds/:id/comments', function(req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err)
        } else {
          campground.comment.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})
app.listen(3000, (req, res) => {
  console.log('Server started')
})
