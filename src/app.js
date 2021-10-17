const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");
const hbs = require('hbs');

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "./src/config/config.env"
    });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../public")));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get("/", (req, res) => {
    const { token } = req.cookies;
    if (token === undefined) res.render('index', {'loggedIn' : false});
    res.render('index', {'loggedIn' : true});
});

app.get("/cart/", (req, res) => {
    const { token } = req.cookies;
    if (token === undefined) res.redirect('/account/');
    res.render('cart', {'loggedIn' : true});
});

app.get("/account/", (req, res) => {
    res.render('account');
});

app.get("/products/", (req, res) => {
    const { token } = req.cookies;
    if (token === undefined) res.redirect('/account/');
    res.render('products', {'loggedIn' : true});
});

app.get("/products_details/", (req, res) => {
    const { token } = req.cookies;
    if (token === undefined) res.redirect('/account/');
    res.render('product_details', {'loggedIn' : true});
});

app.get("/login/:success/:token/", (req, res) => {
    res.cookie('token', JSON.parse(req.params.token));
});

app.get("/logout/", (req, res) => {
    res.clearCookie('token');
    res.redirect('/account/');
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;