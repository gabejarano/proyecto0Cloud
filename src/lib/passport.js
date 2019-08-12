const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const db = require('../model/database');
const helpers= require('../lib/helpers');
passport.use('localSignup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password,done)=>{
    const newUser={
        email,
        password
    }
    newUser.password = await helpers.encriptarPassword(password);
    const result= await db.query('INSERT INTO usuarios set ?', [newUser]);
    newUser.id=result.insertId;
    return done(null, newUser);

}));

passport.use('localSignin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
   
   const rows=  await db.query('SELECT * FROM usuarios WHERE email=' + '\"' + email + '\"');
   if (rows.length>0){
       const user = rows[0];
       const validPassword = await helpers.desencriptarPassword(password, user.password);
       console.log(validPassword);
       if(validPassword){ 
           done(null, user, req.flash('success', 'Bienvenido ' + user.email));
       }
       else{
           done(null, false, req.flash('mensaje', 'Contraseña incorrecta'));
       }
   }
   else{
        return done(null, false, req.flash('mensaje', 'No existe una cuenta asociada con su email'));
   }
    
}))

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
   const rows = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
   return done(null, rows[0]);

})