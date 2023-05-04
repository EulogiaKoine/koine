"use strict"

/**
 * @license none
 * @version 0.1 2023. 5. 3
 * @contributors Koinē, 와!
 */

module.exports = (function(){

/**
 * @name Object.values
 * @param {object} obj any js object
 * @returns {Array} every enumerable properties' values
 */
function values(obj){
    return Object.keys(obj).map(key => obj[key])
}

/**
 * @name Object.entries
 * @param {object} obj any js object
 * @returns {Array} every enumerable properties' [key, values] tuffle
 */
function entries(obj){
    return Object.keys(obj).map(key => [key, obj[key]])
}

/**
 * @name Object.deepCopy
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



const extensions = {
    static: {
        values: values,
        entries: entries,

        // personal addition
        deepCopy: deepCopy
    },

    prototype: {}
}

extensions.init = require('./_init.js').bind(extensions, Object)


return extensions
})()