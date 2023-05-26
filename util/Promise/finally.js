(function(){
"use strict";


/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  const P = this.constructor;
  return this.then(
    function(value) {
      return P.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return P.resolve(callback()).then(function() {
        return P.reject(reason);
      });
    }
  );
}


module.exports = finallyConstructor;
})();