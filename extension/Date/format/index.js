"use strict"
module.exports = (function(){

const SimpleDateFormat = java.text.SimpleDateFormat

function format(pattern){
    if(typeof pattern === "string")
        return SimpleDateFormat(pattern).format(this)
    return this.toString()
}

return format
})()