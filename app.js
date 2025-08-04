const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aquib');
}

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'dance_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Profile route
app.get('/profile', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('profile.pug', { user });
});
const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  age: Number,
  gender: String,
  intrest: String,
  message: String,
});
const clientModel = mongoose.model('clientModel', clientSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const instructors = [
  {
    img: "/static/teacher1.jpg",
    name: "Mr. Raj",
    style: "Hip-Hop",
    exp: "6 Years",
    bio: "Specializes in freestyle and street choreography."
  },
  {
    img: "/static/teacher2.jpg",
    name: "Ms. Priya",
    style: "Contemporary",
    exp: "5 Years",
    bio: "Known for expressive flow and modern moves."
  },
  {
    img: "/static/teacher3.jpg",
    name: "Mr. Arjun",
    style: "Ballet",
    exp: "8 Years",
    bio: "Classically trained with stage show experience."
  },
  {
    img: "/static/teacher4.jpg",
    name: "Ms. Kavya",
    style: "Salsa",
    exp: "4 Years",
    bio: "Energetic Latin flair and partner dancing expert."
  }
];

app.get('/', (req, res) => {
  res.status(200).render('home.pug', { instructors });
});

app.get('/services', (req, res) => {
  res.status(200).render('services.pug');
});

app.get('/about', (req, res) => {
  res.status(200).render('aboutus.pug');
});

app.get('/contact', (req, res) => {
  res.status(200).render('contactus.pug', { submitted: false });
});

app.post('/contact', (req, res) => {
  var myData = new clientModel(req.body);
  myData.save().then(() => {
    res.render('contactus.pug', { submitted: true });
  }).catch(() => {
    res.status(400).render('contactus.pug', { submitted: false });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/signup', (req, res) => {
  res.render('signup.pug');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // Render signup page again with error message
    return res.status(400).render('signup', { message: 'User already exists. Please log in.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  // After successful signup, redirect to home
  res.redirect('/');
});


app.get('/login', (req, res) => {
  res.render('login.pug');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).render('login', { message: 'User not found. Please sign up first.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).render('login', { message: 'Incorrect password. Try again.' });
  }

  // ✅ Login successful – store user in session
  req.session.user = user;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`this shit is running on ${port}`);
});
