var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

var campgrounds = [
  {
    name: 'Salmon Creek',
    image: '/josh-hild-8f_VQ3EFbTg-unsplash.jpg'
  },
  {
    name: 'Salmon Creek',
    image: '/josh-hild-8f_VQ3EFbTg-unsplash.jpg'
  },
  {
    name: 'Salmon Creek',
    image: '/josh-hild-8f_VQ3EFbTg-unsplash.jpg'
  },
  {
    name: 'Salmon Creek',
    image: '/josh-hild-8f_VQ3EFbTg-unsplash.jpg'
  },
  {
    name: 'Granite hill',
    image: '/sahin-yesilyaprak-V7uP-XzqX18-unsplash.jpg'
  },
  {
    name: 'Granite hill',
    image: '/sahin-yesilyaprak-V7uP-XzqX18-unsplash.jpg'
  },
  {
    name: 'Granite hill',
    image: '/sahin-yesilyaprak-V7uP-XzqX18-unsplash.jpg'
  },
  {
    name: 'Granite hill',
    image: '/sahin-yesilyaprak-V7uP-XzqX18-unsplash.jpg'
  }
]

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds })
})

app.post('/campgrounds', function(req, res) {
  console.log("You've hit the post route")
  var name = req.body.name
  var image = req.body.image
  var newCampground = { name: name, image: image }
  campgrounds.push(newCampground)
  res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function(req, res) {
  res.render('new')
})

app.listen(3000, (req, res) => {
  console.log('Server started')
})
