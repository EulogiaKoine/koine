"use strict"
module.exports = (function(){

function fromFormat(string, format){
    if(typeof format === "string") return new Date(new this(format).parse(string))
    return new Date(string)
}

return fromFormat.bind(java.text.SimpleDateFormat)
})()