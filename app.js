const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/locations', locationRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.get('/home', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    res.render('index', { user: req.session.user });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});