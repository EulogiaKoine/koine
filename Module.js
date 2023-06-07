"use strict"

module.exports = function(_global){


function Module(name, path, requireInit){
    this.name = name
    this.path = path
    if(requireInit)
        this.requireInit = true
}

Object.defineProperty(Module.prototype, 'setConfig', {
    value(config){
        if(typeof config === "object")
            this.config = config
        else
            this.config = JSON.parse(FileStream.read(this.path+'/config.json'))
    },
    enumerable: true
})

Object.defineProperty(Module.prototype, 'import', {
    value(pack){
        if(this.requireInit)
            return null
        else
            return require(this.path)(pack)
    },
    enumerable: true
})

Object.defineProperty(Module.prototype, 'init', {
    value(pack){
        if(FileStream.read(this.path+'/index.js') === null)
            throw new Error("there is no initialization file in module "+this.name)
        
        if(java.io.File(this.path+'/init.js').exists()){
            require(this.path+'/init.js')(require(this.path)(pack), _global)
            delete this.requireInit
        }
    }
})




return Module
}