# 📑 koine.base

카카오톡 봇, RhinoJS 환경의 부족하거나 필자가 필요한 문법적 부분을 함수로 보완한 패키지.

1. [inherits](#inherits)
2. [assert](#assert)

<br>

## How to use?
메신저봇R 기본 폴더/global_modules/koine/base/index.js가 존재하는 상태에서...
```javascript
// 봇의 글로벌 스코프에서
const base = require('koine/base')
base.init(this /* global scope */)
base.import("assert", "inherits")
```

<br>

----------
## inherits

&nbsp;class 문법을 지원하지 않는 <sub><del>(더러운)</del></sub>RhinoJS에서 생성자 함수로 상속을 구현하기 위한 함수.

&nbsp;super 문법은 시도 끝에 실패했다.

```javascript
/**
 * @param {function} subClass   자식 클래스용 생성자 함수
 * @param {function} superClass 부모 클래스용 생성자 함수
 * 
 * @post Object.getOwnPropertyNames(superClass).every(static => static in subClass) == true
 * @post Object.getOwnPropertyNames(superClass.prototype).every(field => field in subClass) == true
 */
```
<br>

#### Example
```javascript
function Food(name){
    this.name = name
}

Object.defineProperty(Food.prototype, "eaten", {
    value(eater){
        return eater+"(이)가 "+this.name+"(을)를 섭취했다!"
    }
})

function Banana(){
    Food.call("바나나")
}

inherits(Banana, Food) // 상속

new Banana().eaten("코이네") // "코이네(이)가 바나나(을)를 섭취했다!"
```
<br>

## assert

&nbsp;단정문을 통한 오류 검사 및 추적<sup>Error Tracing</sup>을 원활히 할 수 있도록 만든 함수.

```javascript
/**
 * @function assert
 * 
 * @param {boolean|function} condition assertion that must be TRUE
 * @param {string} msg error msg if condition is FALSE
 * @param {number=} [level=Infinity] assertion importance level
 * 
 * @throws {Error}
 * 
 * @pre int get assert.ignoranceLevel >= 1
 * @pre int level >= 1
 * @pre typeof(condition) == "function" => condition returns {boolean}
 * @post condition == false && level >= ignoranceLevel => error is throwed with traced stack
 */
```
<br>

#### Example
```javascript
function c(v){
    assert(v > 3, "parameter must larget than 3!")
}

function b(v){
    c(v)
}

function a(v){
    b(v)
}

try{
    a(3)
} catch(e){
    console.log(e+'\n'+e.stack)
    /* RhinoJS 기준 결과(대충 줄이랑 같이 비슷하게 나옴)
    Error: parameter must larget than 3!
        at c
        at b
        at a
    */
}
```