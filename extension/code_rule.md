# koine.extensions - rules
&nbsp;extension 패키지에 대한 규약

0. [사용 전 조건](#0-사용-전-조건)
1. [내장 클래스](#1-내장-클래스)
2. [_init.js](#2-_initjs)
3. [반환값](#3-반환)

<br>

### 0. 사용 전 조건
> koine.base initialization

<br>

### 1. 클래스명 & 모듈명
1. 동작하는 환경에서 내장된 클래스만 확장하도록 제한.
2. 파일명 = "확장할 클래스명.js"

<br>

### 2. _init.js
아래 조건을 만족하는 ._init.js 파일이 존재할 것


```javascript
require: // precondition
    before_execution:
        bind(extensions, Class)
        extensions: {
            static: {
                method()
            }
            prototype: {
                method()
            }
        }
    param:
        1. String[] [methods = all]

ensure: // post-condition
    extensions.static.keys(methods.includes(key))
        .every(method in Class) == true
    extensions.prototype.keys(methods.includes(key))
        .every(method in Class.prototype) == true
```

<br>

### 3. 반환
모듈의 반환값

```javascript
{
    // 내장 클래스에 정적으로 추가될 속성들
    static: {
        field,
        method1(),
        ...
        methodN()
    },

    // 프로토타입 속성으로 추가될 속성들
    prototype: {
        field,
        method1(),
        ...
        methodN()
    },

    init: require('./init.js').bind(/* 반환되는 객체 */, /* 확장하는 내장 클래스 */)
}
```