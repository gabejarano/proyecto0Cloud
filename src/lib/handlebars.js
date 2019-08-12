const {format}= require('timeago.js');


const helpers={}
helpers.timeago= (fechainicial, fechafin)=>{
    return format(fechainicial, fechafin)
}
module.exports= helpers;