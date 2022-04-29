const fs = require('fs');

const File = 'Productos.txt'

class Contenedor {
    constructor (){
        this.Objects = []
        try{
            let FileData = fs.readFileSync(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
        }
        catch(error){
            if (error.code === 'ENOENT') {  //si es la primera ejecucion y no existe Productos.txt lo creo
                try{
                    fs.writeFileSync(File, '[]')
                    console.log('Se creo el archivo')
                }
                catch{
                    console.log('No se pudo crear el archivo. :(')
                    console.log(error)
                }
               } else {
                    console.log('No se pudo leer el archivo. :(')
                    console.log(error)
               }
        }
    }
    async save(title, price, thumbnail){
        this.Objects.push({
            TITLE: title,
            PRICE: price,
            THUMBNAIL: thumbnail
           })
        let ObjectJSON = JSON.stringify(this.Objects)
        try{
            await fs.promises.writeFile(File, ObjectJSON)
            console.log('Se agrego el producto exitosamente!')
        }
        catch(error){
            console.log('No se pudo agregar el producto al archivo. :(')
        }
    }

    async getById(Number){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            if(0<=Number && Number<this.Objects.length){
                return this.Objects[Number]
            } else{
                return null
            }
        }
        catch(error){
            console.log('No se pudo leer el archivo. :(')
            console.log(error)
        }
        
    }
    async getAll(){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            return this.Objects
        }
        catch(error){
            console.log('No se pudo leer el archivo. :(')
            console.log(error)
        }
    }
    async deleteById(Number){
        let BKArry = this.Objects.splice()
        let ObjectJSON = JSON.stringify(this.Objects)
        if(0<=Number && Number<this.Objects.length){
            this.Objects.splice(Number,1)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El producto se a eliminado exitosamente!')
            }
            catch(error){
                console.log('El producto no pudo ser eliminado. :(')
                this.Objects = BKArry
            }
        } else{
            console.log(`El producto con ID:${Number} no fue encotrado`)
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(File, '[]')
            console.log('La lista se a limpiado con exito!')
            this.Objects = [];
        }
        catch(error){
            console.log('No se limpiar la lista. :(')
            console.log(error)
        }
    }

    length(){
        return this.Objects.length
    }
}

module.exports = Contenedor