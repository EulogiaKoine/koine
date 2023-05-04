"use strict"

/**
 * @pre koine.base.assert in [object global]
 */

module.exports = (function(){

const list = [
    "Object",
    "Array",
    "String",
    "Math"
]

const output = {}

function _init(_global, req){
    if(req === "all"){
        for(let Class of this){
            output[Class] = require('./'+Class+'.js')
            output[Class].init()
        }
    } else if(req === "object"){
        for(let Class of this){
            if(Class in req){
                if(!output[Class]) output[Class] = require('./'+Class+'.js')
                output[Class].init(Array.isArray(req[Class])? req[Class]: null)
            }
        }
    } else {
        for(let Class of Array.prototype.splice.call(arguments, 1)){
            if(this.includes(Class)){
                if(!output[Class]) output[Class] = require('./'+Class+'.js')
                output[Class].init()
            }
        }
    }
}

output.init = _init.bind(list)


return output
})()