"use strict"
module.exports = (function(){

const SimpleDateFormat = java.text.SimpleDateFormat

function format(pattern){
    return SimpleDateFormat(pattern).format(this)
}

return format
})()