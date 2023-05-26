"use strict"
module.exports = function(values){
    if(!Object.values)
        Object.values = values.bind()
}