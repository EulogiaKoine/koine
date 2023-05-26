"use strict"
module.exports = function(deepCopy){
    if(!Object.deepCopy)
        Object.deepCopy = deepCopy.bind()
}