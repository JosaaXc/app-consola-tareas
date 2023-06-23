require('colors');
const { guardarDB, leerBD } = require('./helper/guardarArchivo');
const { inquirerMenu, 
    pausa,
    leerInput, listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helper/inquierer');
const Tareas = require('./models/tareas');


const main = async() =>{
    const tareas = new Tareas()
    
    const tareasDB = leerBD()
    if(tareasDB){
        //establecer las tareas 
        tareas.cargarTareaBD(tareasDB)
    }

    let opt = ''
    do{
        opt = await inquirerMenu()
        switch(opt){
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTarea( desc )
            break
            case '2':
                tareas.listadoCompleto()
            break
            case '3':
                tareas.listaCompletadasPendientes(true)
            break
            case '4':
                tareas.listaCompletadasPendientes(false)
            break
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompledas(ids)
            break
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if(id != '0'){
                    const ok = await confirmar('R u sure?')
                    if(ok) {
                        tareas.borrarTarea( id )
                        console.log("Tarea borrada")
                    }
                }

            break
        }

        guardarDB( tareas.listadoArr )
        
        await pausa()
    }while(opt !== '0')
}

main()