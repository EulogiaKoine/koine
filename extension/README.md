# 🎇 koine.extension
RhinoJS 및 메신저봇의 내장 클래스 기능을 확장(보완)한다.

<br>

&nbsp;&nbsp;**< 감사한 분들 >**
- 와!
- Regret

<br>

```javascript
require:
    global.assert == koine.base.assert
```

<br>

- [Object](#object)
- [Array](#array)
- [String](#string)
- [Math](#math)
- [Date](#date)

<br>

## How to use?
메신저봇R 기본 폴더/global_modules/koine/extension/index.js가 존재하는 상태에서...
```javascript
// 봇의 글로벌 스코프에서
const koine = require('koine')

koine.base.init(this /* [object global] */, "Array", "String") // Array, String의 모든 필드 적용

koine.base.init(this, {
    "적용할 내장 클래스명": ["적용할 메서드명"]
    "Math": ["clamp", "gcd"]
})

koine.base.init(this, "all") // 모두 적용
```

<br>

---------------------------------
## Object

- [Object.values()](#objectvalueobj)
- [Object.entries()](#objectentriesobj)
- [Object.deepCopy()](#objectdeepcopyobj)

<br>

### Object.value(obj)
```javascript
/**
 * @param {object} any object
 * @returns {Array} every enumerable properties' values
 */
```

#### example
```javascript
Object.values({ a:1, b:2, c:4 })
// 결과: [1,2,4]
```
<br>


### Object.entries(obj)
```javascript
/**
 * @param {object} any object
 * @returns {Array} every enumerable properties' [key, value] tuffle
 */
```

#### example
```javascript
const obj = { a:1, b:2, c:4 }
for(let [key, value] of Object.entries(obj))
    console.log(key+": "+value)
```
result:
```
a: 1
b: 2
c: 4
```
<br>


### Object.deepCopy(obj)
```javascript
/**
 * @param {object} obj
 * @returns {object} any object, including array
 * @post return object must be absolutely different with original recursively
 */
```

#### example
```javascript
const arr = [{ test: 0 }]

const copy = Object.deepCopy(arr)
copy[0].test === arr[0].test // false
```
<br><br>


-----------------------
## Array
- [Array.range()](#arrayrangestart-end-step)
- [ES6 standards](#es6-standard-prototypes)
- [Array.prototype.random()](#arrayprototyperandomstart-end)
- [Array.prototype.randomPop()](#arrayprototyperandompopstart-end)
- [Array.prototype.shake()](#arrayprototypeshakestart-end)
- [Array.prototype.toShaken()](#arrayprototypetoshakenstart-end)
- [Array.prototype.findLast()](#arrayprototypefindlastfinder)
- [Array.prototype.findLastIndex()](#arrayprototypefindlastindexfinder)

<br>

### Array.range(start, end, step)
```javascript
/**
 * @param {number} [start=0] if p2 == undefined, p1 is endpoint; else startpoint
 * @param {number} [end=0] endpoint
 * @param {number} [step=1]
 * @pre step != 0
 * @returns {Array}
 */
```

#### example
```javascript
Array.range(5) // [0, 1, 2, 3, 4]
Array.range(3, 6) // [3, 4, 5]
Array.range(0, 1, 0.2) // [0, 0.2, 0.4, 0.6000000000000001, 0.8]

let sum = 0
for(let i in Array.range(5))
    sum += +i + 1
console.log(sum) // 15
```
<br>

### *ES6 standard prototypes
&nbsp;ES6 JS에 있지만 RhinoJS에는 없는 몇몇 메서드 구현체. 사용법, 작동 방식은 모두 동일합니다.

- Array.prototype.at
- Array.prototype.toReversed
- Array.prototype.toSorted
- Array.prototype.with

<br>

### Array.prototype.random(start, end)
```javascript
/**
 * @param {number} [start=0]
 * @param {number} [end=this.length]
 * @returns {*} random element between range [start, end]
 * 
 * @pre start & end == undefined | integer
 * @pre start >= 0 && end <= this.length
 */
```
####example
```javascript
const arr = ["koine", "regret", "와!"]
arr.random() // "와!"
arr.ranodm() // "koine"

const test = []
for(let i in Array.range(1e5))
    test.push(arr.random(1, 2))
test.every(e => e === "regret") // true
```
<br>

### Array.prototype.randomPop(start, end)

**random()** 과 동일하지만 반환되는 요소를 원본에서 제거한다.



<br><br>


### Array.prototype.shake(start, end)
```javascript
/**
 * @param {number} [start=0]
 * @param {number} [end=this.length]   
 * @returns {Array} original
 * 
 * @pre start & end == undefined | integer
 * @pre start >= 0 && end <= this.length
 * @post elements' indexes in range<start, end> are scambled(shaken)
 */
```
#### example
```javascript
let arr = [1,2,3,4,5]
arr.shake()
arr // [4,5,3,1,2]

Array.range(10).shake(5)
// [0,1,2,3,4/*여기까진 섞이지 않음*/, 6,7,9,8,5]
```
<br>

### Array.prototype.toShaken(start, end)
shake와 동일하지만, 복사본을 반환한다.

<br><br>


### Array.prototype.findLast(finder)
```javascript
/**
 * @param {function([value[, index, [this]]])} finder 
 * @returns {*} value
 */
```

**Array.prototype.find** 와 동일하지만, 마지막 인덱스부터 탐색한다.

<br>

### Array.prototype.findLastIndex(finder)
```javascript
/**
 * @param {function([value[, index, [this]]])} finder 
 * @returns {*} value
 */
```

**Array.prototype.findIndex** 와 동일하지만, 마지막 인덱스부터 탐색한다.

<br>

### Array.prototype.count(value)
```javascript
/**
 * @param {any} value 찾을 값
 * /
```
&nbsp;배열에 포함된 해당 값과 일치하는 요소의 개수를 반환한다.

<br>

### Array.prototype.counts(values[])
```javascript
/**
 * @param {Array|undefined} [values = every[]] 기본값 = 배열의 모든 요소
 * @returns {Map}
```
&nbsp;주어진 값들이 각각 몇 개씩 배열에 포함되어 있는지를 ***값: 개수*** 의**맵(Map)** 객체로 반환한다.

&nbsp;한 번의 순회에서 모든 값을 검사하기에 시간복잡도는 ***O(n)***. 개수를 검사해야할 값이 여럿이라면 똑같이 선형 탐색으로 ***O(n)*** 만큼이 걸리는 **count**보다 효율적이다.

&nbsp;*참고: Map을 모르는 사람들을 위해.
```javascript
let counts = [1,2,3,4,5,1,2,3,1].counts([1,3,5])
counts.get(1) // 3
counts.get(3) // 2
counts.get(5) // 1
counts.get('1') // 0
```


<br><br>

--------------
## String
- [String.prototype.format()](#stringprototypeformat)

<br>

### String.prototype.format()
```javascript
/**
 * @param {object} m if typeof m == "object" then replace all '{tag}' to (value), else generally work as value
 * @returns {string}
 * @description change {*} to the value of arguments; logic depends on first argument
 * if typeof m == "object":
 *    in original, change every matched string {key} to the m[key]
 * else:
 *    change {argument index} to such value
 * 
 * @example "{0} + {1} = {2}".format(1, 2, 1+2) == "1 + 2 = 3"
 * @example "{v1} + {v1} = {result}".format({v1: "spicy", v2: "veryvery spicy"}) == "spicy + spicy = veryvery spicy"
 */
```
#### example
```javascript
"{0} + {1} = {2}".format(1, 2, 1+2)
// "1 + 2 = 3"

"{v1} + {v1} = {result}".format({v1: "spicy", v2: "veryvery spicy"})
// "spicy + spicy = veryvery spicy"
```

<br><br>


----------------------------
## Math

- [Math.gcd()](#mathgcdnumbers)
- [Math.lcm()](#mathlcmnumbers)
- [Math.clamp()](#mathclampvalue-min-max)

<br>

### Math.gcd(...numbers)
```javascript
/**
 * @param {...number} n
 * @returns {number} greatest common factor of arguments
 * @pre isInteger(...n) == true && ...n > 0
 */
```
#### example
```javascript
Math.gcd(18, 24) // 6
Math.gcd(1.5, -3) // 1.5   -> 음수와 실수도 가능하지만, 음수는 매우 지양합니다!
Math.gcd(391, 2231, 1633) // 23
```

<br>


### Math.lcm(...numbers)
```javascript
/**
 * @param {...number} n
 * @returns {number} least common multiple of numbers
 * @pre isInteger(...n) == true && ...n > 0
 */
```
#### example
```javascript
Math.lcm(18, 24) // 72
Math.lcm(1.5, -3) // -3
Math.lcm(391, 2231, 1633) // 61934791
```

<br>


### Math.clamp(value, min, max)
```javascript
/**
 * @param {number} value
 * @param {number} min the lowest limit of result
 * @param {number} max the highest limit of result
 * @returns {number} returns value within limited range
 */
```
#### example
```javascript
Math.clamp(2, 1, 3) // 2
Math.clamp(0, 1, 3) // 1
Math.clamp(4, 1, 3) // 3
```

<br>

### Math.lerp(a, b, t)
선형 보간 함수

#### example
```javascript
Math.lerp(5, 10, 0.5) // 7.5
Math.lerp(100, 200, 0.13) // 113
```

<br>

### Math.randint(a, b)
임의의 정수 생성 함수.
b가 없다면 0부터 a까지, 있다면 a~b 까지의 정수를 반환한다. 확률은 모두 동일하다.

##### example
```javascript
Math.randint(0, 10) // 10
Math.randint(4) // 3
```

<br><br><br>

---

## Date

- [Date.prototype.format()]()
- [Date.fromFormat()]()

<br>

### Date.prototype.format()

```javascript
/**
 * @param {string?} pattern 날짜 정보를 반영할 문자열 형식
 * @returns {string} 날짜 정보를 형식에 반영한 문자열
 */
```

#### example
```javascript
new Date().format("y. MM. d. E요일")
// 결과: "2023. 06. 7. 수요일"
```

#### 치환 형식

![치환 형식 표](https://d33wubrfki0l68.cloudfront.net/77f1bd2b1cf55940f68402dd309ecc25221acbd6/6819a/static/1c200ea964ab45a912ccc15b4999bc2a/07a9c/simpledateformat-date-time-patterns.png)

(*요일을 나타내는 E는 로컬 타임에 맞춰진다. 즉, 카톡봇에선 Tue가 아니라 '화'로 표시됨)

<br><br>

### Date.fromFormat()

```javascript
/**
 * @param {string} str 날짜 정보를 담은 문자열
 * @param {string?} pattern str의 형식을 명시하는 문자열
 * @returns {Date} pattern을 이용해 str로부터 추출한 정보로 생성한 Date 객체
 */
```

#### example
```javascript
Date.fromFormat("2023. 06. 7", "y. MM. d")
// 결과: "Wed Jun 07 2023 00:00:00 GMT+0900 (GMT+09:00)"
```

기본 형식은 Date.prototype.format과 동일하다. 하지만 이유는 모르겠지만 요일 parse는 언어 무관 안된다.