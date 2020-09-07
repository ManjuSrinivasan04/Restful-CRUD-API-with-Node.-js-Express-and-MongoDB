
require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars=require('handlebars');
const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access')
let app = express();

const hbs=exphbs.create({
    defaultLayout:'main',
    extname:'hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars)
});

app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

const employeeController = require('./controllers/employeeController');


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee', employeeController);