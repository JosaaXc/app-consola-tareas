const Tarea = require('./tarea')
class Tareas {
    _listado = {}

    get listadoArr(){

        const listado = []

        Object.keys(this._listado).forEach(key =>{
            listado.push(this._listado[key])
        })
        return listado

    }

    constructor(){
        this._listado = {}
    }
    borrarTarea( id = ''){
        if( this._listado[id] ){
            delete this._listado[id]
        }
    }

    cargarTareaBD( tareas = []){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea( desc='' ){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
        this.listadoArr.forEach((key, index) => (!key.completadoEn) ? console.log(`${index+1}. ${key.desc} :: ${'Pendiente'.red}`) : console.log(`${index+1}. ${key.desc} :: ${'Completado'.green}`));
    }

    listaCompletadasPendientes(completadas = true) {
        const filtrados = this.listadoArr.filter((key) => {
            return completadas ? key.completadoEn !== null : key.completadoEn === null;
        });
    
        filtrados.forEach((key, index) => {
            const estado = completadas ? `${key.completadoEn}`.green : 'PENDIENTE'.red;
            console.log(`${index + 1} ${key.desc} :: ${estado}`);
        });
    }
    toggleCompledas (ids =[]){

        ids.forEach(id =>{
            const tarea = this._listado[id]
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea=>{

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}


module.exports = Tareas