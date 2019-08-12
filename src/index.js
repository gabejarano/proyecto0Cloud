const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const {database} = require('./model/keys')



const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');



//Middlewares
app.use(session({
    secret: 'ABCApp',
    resave: false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req,res,next)=>{
    app.locals.success= req.flash('success');
    app.locals.mensaje= req.flash('mensaje');
    app.locals.user=req.user;
    next();
})

//rutas
app.use('/',require('./routes/abc.js'));
app.use('/',require('./routes/autentificacion'));

//public
app.use(express.static(path.join(__dirname,'public')));

//
app.listen(app.get('port'), ()=>{
    console.log('Server on port'+ app.get('port'));
})