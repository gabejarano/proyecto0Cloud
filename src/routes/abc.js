const express = require('express');
const router = express.Router();
const db = require('../model/database');
const {isLoggedIn} = require('../lib/auth');

router.get('/eventos/add', (req,res)=>{
   res.render('eventos/agregar')
});

router.get('/', (req,res)=>{
    res.redirect('/eventos')
});

router.get('/home', (req,res)=>{
    res.redirect('/eventos')
});

router.post('/eventos/add', isLoggedIn, async (req,res)=>{
    const {nombre,categoria,lugar,direccion,fechainicial,fechafinal,presencial} = req.body;
    const newEvento={
        nombre,
        categoria,
        lugar,
        direccion,
        fechainicial,
        fechafinal,
        presencial,
        user_id: req.user.id
    }
    console.log(newEvento);
    await db.query('INSERT INTO eventos set ?' ,[newEvento]);
    req.flash('success', 'Evento guardado correctamente');
    res.redirect('/eventos')
});

router.get('/eventos', isLoggedIn, async(req,res)=>{
    const eventos= await db.query('SELECT * FROM eventos where user_id =?', [req.user.id]);
    
    
    res.render('eventos/listar', {eventosAlReves: eventos.reverse()})
})

router.get('/eventos/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM eventos WHERE ID = ?', [id]);
    req.flash('success', 'Evento eliminado correctamente')
    res.redirect('/eventos');
});
router.get('/eventos/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const eventos = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    evento = eventos[0];
    if(evento.presencial==1){
        evento.presencial='Presencial'
    }
    else{
        evento.presencial='Virtual'
    }
    res.render('eventos/editar', {evento});
});
router.get('/eventos/:id', isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const eventos = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    evento = eventos[0];
    if(evento.presencial==1){
        evento.presencial='Presencial'
    }
    else{
        evento.presencial='Virtual'
    }
    res.render('eventos/ver', {evento});
})
router.post('/eventos/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {nombre,categoria,lugar,direccion,fechainicial,fechafinal,presencial} = req.body;
    const newEvento={
        nombre,
        categoria,
        lugar,
        direccion,
        fechainicial,
        fechafinal,
        presencial
    }
    await db.query('UPDATE eventos set ? WHERE id = ?', [newEvento, id]);
    req.flash('success', 'Evento actualizado correctamente')
    res.redirect('/eventos');
});

module.exports = router;
