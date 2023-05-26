"use strict"
module.exports = function(entries){
    if(!Object.entries)
        Object.entries = entries.bind()
}