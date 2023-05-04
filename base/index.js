"use strict"

module.exports = (function(){

const list = [
    "assert",
    "inherits"
]
const output = {}

function _init(_global, request){
    if(request === "all"){
        for(let module of this)
            if(!_global[module])
                _global[module] = output[module] = require('./'+module+'.js')
    } else {
        for(let req of Array.prototype.splice.call(arguments, 1))
            if(!_global[req] && this.includes(module))
                _global[req] = output[req] = require('./'+module+'.js')
    }
}

output.init = _init.bind(list)


return output
})()