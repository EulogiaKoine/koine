"use strict"
module.exports = (evaluate, _global) => {
    if(!_global.evaluate)
        _global.evaluate = evaluate
}