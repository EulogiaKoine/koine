module.exports = function(pack){

if(typeof BotManager === void 0 || typeof BotManager.getCurrentBot !== 'function')
    throw new InternalError("API2에서만 해당 모듈을 호출/사용할 수 있습니다!")

// export용 인터페이스 함수
function evaluate(){
    "koine.util.evaluate/README.md 참고"
}

// 내부 변수 및 상수
const _env = {} // 이발 런타임 변수 저장소
const _hash = [] // 관리자 프로필 해시코드
const _room = [] // 이발 명령어 작동 방이름
let _prefix = null // 접두사
let MAX_REPLY_COUNT = { value: 5 } // rp()의 최대 전송 횟수

const ParameterType = Object.defineProperties({}, {
    LEGACY: { value: 1, enumerable: true},
    API2: { value: 2, enumerable: true }
})

let listenerCache = {} // env 통일을 위한 최초 require후 캐싱
let activating = null // 등록된 리스너


// 인터페이스
Object.defineProperty(evaluate, 'prefix', {
    get(){
        return _prefix
    },
    set(prefix){
        if(typeof prefix === "string" && prefix.length > 0)
            _prefix = prefix
        else throw TypeError("evaluate.prefix must be a string which has least 1 character")
    },
    enumerable: true
})

Object.defineProperty(evaluate, 'hash', {
    get(){
        return _hash
    },
    enumerable: true
})

Object.defineProperty(evaluate, 'room', {
    get(){
        return _room
    },
    enumerable: true
})

Object.defineProperty(evaluate, "ParameterType", {
    value: ParameterType,
    enumerable: true
})

Object.defineProperty(evaluate, 'max_reply_count', {
    get(){
        return MAX_REPLY_COUNT.value
    },
    set(v){
        if(isNaN(v) || +v < 1)
            throw new Error("evaluate.max_reply_count must be an integer greater than 1")
        MAX_REPLY_COUNT.value = +v >> 0
    },
    enumerable: true
})

Object.defineProperty(evaluate, 'listener', {
    value(parameterType){
        switch(parameterType){
            case ParameterType.LEGACY:
                return listenerCache.legacy 
                    || (listenerCache.legacy = require('./legacy.js')(_env, _prefix, _hash, _room, MAX_REPLY_COUNT).bind(_global))
            case ParameterType.API2:
                return listenerCache.api2
                    || (listenerCache.api2 = require('./api2.js')(_env, _prefix, _hash, _room, MAX_REPLY_COUNT).bind(_global))
            default:
                throw new Error("evaluate - undefined parameter " + parameterType)
        }
    },
    enumerable: true
})

Object.defineProperty(evaluate, 'on', {
    value(parameterType){
        if(!_prefix)
            throw new Error("evaluate.on - prefix must be set")

        if(activating)
            return false

        activating = this.listener(parameterType)
        const bot = BotManager.getCurrentBot()
        if(bot.listeners(Event.MESSAGE).includes(activating))
            return false;

        bot.addListener(
            Event.MESSAGE,
            activating
        )
        return true
    },
    enumerable: true
})

Object.defineProperty(evaluate, 'off', {
    value(){
        if(activating){
            BotManager.getCurrentBot().removeListener(activating)
            activating = null
            return true
        }

        return false
    },
    enumerable: true
})


return evaluate
}