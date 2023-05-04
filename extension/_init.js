"use strict"

module.exports = (function(){

/**
 * @description for initialization
 * @param {function} Class
 * @param {string[]} [methods=all] name of methods want to extend
 * 
 * @pre init.bind((extension/Class.js->extensions{}), ClassName) first
 * @post extensions.static.keys(methods.includes(key))
 *       .every(method in Class) == true
 * @post extensions.prototype.keys(methods.includes(key))
 *       .every(method in Class.prototype) == true
 */
function init(Class, methods){
    assert(Array.isArray(methods) || methods === void 0, "methods must be (undefined) or string[] that includes name of fields/methods")

    methods = methods || Object.keys(this.static).concat(Object.keys(this.prototype))
    let ex

    for(ex in this.static){
        if(methods.includes(ex) && !(ex in Class))
            Class[ex] = this.static[ex].bind(Class)
    }

    for(ex in this.prototype){
        if(methods.includes(ex) && !(ex in Class.prototype))
            Object.defineProperty(Class.prototype, ex, {
                value: this.prototype[ex],
                configurable: true
            })
    }
}

return init
})()