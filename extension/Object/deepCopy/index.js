"use strict"

module.exports = function(){
/**
 * @name Object.deepCopy
 * @author 와!
 * 
 * @param {object} target
 * @returns {object}
 * @post return object must be absolutely different with original recursively
 */
function deepCopy(target) {
    if(Array.isArray(target)) {
        let result = []
        for(let i = 0; i < target.length; i++) {
            result.push(deepCopy(target[i]))
        }
        target = null
        return result
    }
    if(typeof target === "object") {
        target = Object.assign({}, target)
        for(let a of Object.getOwnPropertyNames(target)) {
            target[a] = deepCopy(target[a])
        }
    }
    return target
}


return deepCopy
}