"use strict"

module.exports = (function(){

const list = [
    "base",
    "extension"
]

const output = {}

function _init(_global, req){
    if(req === "all"){
        for(let pack of list){
            if(!output[pack]){
                pack = output[pack] = require('./'+pack+'/index.js')
                pack.init(_global, "all")
            }
        }
    } else {
        if(typeof req === "object"){
            for(let pack in req){
                if(this.includes(pack) && !output[pack]){
                    pack = output[pack] = require('./'+pack+'/index.js')
                    pack.init(_global, req[pack])
                }
            }
        } else {
            for(let pack of Array.prototype.splice(arguments, 1)){
                if(!output[pack]){
                    pack = output[pack] = require('./'+pack+'/index.js')
                    pack.init(_global, "all")
                }
            }
        }
    }
}


output.init = _init.bind(list)

return output
})()