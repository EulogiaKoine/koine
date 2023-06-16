"use strict"

module.exports = function style_result(timeout, result){
    /**
     * @param {number} timeout 걸린 시간(단위: 초; 소숫점 9자리까지)
     * @param {result} eval 실행 결과
     */

    return "⏱˚ " + timeout + " sec.\n" + result
}