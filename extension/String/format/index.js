"use strict"
module.exports = function(){
/**
 * @name String.prototype.format
 * @param {{tag: value}} [m] if typeof m == "object" then replace all '{tag}' to (value), else generally work as value
 * @returns {string}
 * @description change {*} to the value of arguments; logic depends on first argument
 * if typeof m == "object":
 *    in original, change every matched string {key} to the value of 1st object
 * else:
 *    change {argument index} to such value
 * 
 * @example "{0} + {1} = {2}".format(1, 2, 1+2) == "1 + 2 = 3"
 * @example "{v1} + {v1} = {result}".format({v1: "spicy", v2: "veryvery spicy"}) == "spicy + spicy = veryvery spicy"
 */
function format(m){
    let str = this
    if(typeof m === "object"){
        for(let key in m)
            str = str.replace(new RegExp("{"+key+"}", "g"), m[key])
        return str
    }

    let i = 0;
    while(i in arguments)
        str = str.replace(new RegExp("{"+i+"}", "g"), arguments[i++])
    return str
}

return format
}