"use strict"
module.exports = function(){

if(typeof Device === void 0 && typeof Device.acquireWakeLock !== 'function')
    throw new InternalError("정상적인 Device 내장 객체가 탐지되지 않았습니다.")

function power(){
    "koine.op.power/README.md 참고"
}

Object.defineProperty(power, 'boost', {
    value(){
        Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '')
    },
    enumerable: true
})

Object.defineProperty(power, 'rest', {
    value(){
        Device.releaseWakeLock()
    },
    enumerable: true
})


return power
}