# 🕹️ koine library(ver 2.0)
&nbsp;메신저봇R(카카오톡+RhinoJS) 환경의 부족한 점을 보완하고 개인적으로 유용한 모듈들을 설치할 수 있도록 만든 라이브러리.
<br>

하위 패키지는 아래와 같다.

- **base : inherits, assert 등 일종의 구문 추가**
- **extension : 내장 클래스의 정적/프로토타입 메서드 확장**
- **reinforce : (미개발)**
- **util : (미개발)**
- **ui : (미개발)**

<br>


## How to use?
&nbsp;메신저봇 기본 폴더/global_modules에 패키지를 다운받아 koine 폴더를 그대로 집어넣고, 봇의 전역에서 아래의 코드를 실행한다.
<br>

```javascript
// 라이브러리 설치
const LIBRARY_PATH = '/storage/emulated/0/koine'
require(LIBRARY_PATH)(
    this, // [object global] - 전역 객체
    LIBRARY_PATH // koine 라이브러리가 위치한 경로
    // 경로 기본값 = 메신저봇R의 global_modules/koine
)

// 각 모듈 별 초기 설정
// 초기 설정이 필요한 모듈은 속성으로 호출 시 null이 반환됨
kpack.init(
    "packageName.moduleName",
    "base", // 해당 패키지의 모든 하위 모듈 적용
    "extension.Array.range"
)

klib.packageName.moduleName // 직접 호출 가능
```
<br>
<br>

---

## How to Develop?

&nbsp;라이브러리에 패키지, 또는 모듈을 추가하는 방법입니다.

1. [Package](#package)
2. [Module](#module)
3. [base 패키지](#base-패키지)

```d
// 디렉토리 구조
koine //라이브러리
└ package // 패키지명
  └ config.json // 패키지 정보/설정 파일
  └ module // 모듈명
    └ config.json // 모듈 정보/설정 파일
    └ index.js // 모듈
    └ init.js // 초기 설정 함수
  └ package
    ...
```



<br>

### Package_
&nbsp;라이브러리 폴더의 하위 폴더 중 ***config.json*** 파일이 존재하며, **type:"koinelib/package"** 일 경우 패키지로 판정합니다.

&nbsp;해당 객체에는 패키지의 정보와 기본 설정을 기술할 수 있습니다.

```json
{
    "type": "koinelib/package", // 해당 속성이 있어야 패키지로 판단
}
```



<br>

### Module
&nbsp;패키지에 속한 폴더 중 아래 조건을 모두 만족하면 자동으로 모듈로 판정됩니다.

1. 하나 이상의 **상위 패키지**를 가진다.
2. **index.js가 함수를 반환**한다.
3. **type=="koinelib/module"인** ***config.json***이 존재한다.

<br>

&nbsp;패키지와 마찬가지로 config.json의 양식은 아래와 같이 작성할 수 있습니다.

```json
{
    "type": "koinelib/module", // 모듈 판정 조건
}
```
<br>


&nbsp; <sup>(*version 0.4 추가)</sup>***index.js*** 파일은 기본적인 모듈 코드와 동일하되, 아래처럼 ***'함수를 반환하는 함수'*** 를 반환해야합니다.
```javascript
module.exports = function(pack){
    ...
    return func // 함수
}
```
&nbsp;이때 export되는 함수가 자동으로 모듈의 **부모 패키지<sup>pack</sup>** 를 인자로 받아 실행되어 반환하는 함수 func가 바로 모듈이 제공하는 클래스/기능입니다. 이는 klib과 같이 속성으로 하위 모듈/패키지에 접근할 수 있습니다.

&nbsp;pack.$parent로 상위 패키지에도 접근할 수 있습니다.

```javascript
module.exports = function(pack){
    pack.$parent["현재 패키지명"] === pack // true
    return func
}
```

&nbsp;<font color="red"><b>*주의: </b> 모듈 자신을 참조하면 재귀 오류가 발생할 수 있습니다.</font>

<br>

&nbsp;조금 귀찮지만 모듈 간 소통을 원활히 하고 모듈 스코프를 클로저를 통해 확실히 분리하도록 하기 위함이니 양해 부탁드립니다.


<br><br>

&nbsp;단, 어떤 모듈은 사용 전 <b>초기 설정<sup>initialization</sup></b>을 요구하는 경우도 있을 수 있습니다. ***config.json***에 *requireInit* 속성을 명시함으로써 이 여부를 나타낼 수 있습니다.

```json
// config.json
{
    "type": "koinelib/module",
    "requireInit": true
}
```

&nbsp;**requireInit** 속성이 <font color="blue">true</font>라면 모듈이 <b>init(koine.init)</b>되지 않으면 해당 모듈을 사용(호출)할 수 없습니다.

&nbsp;***init.js*** 는 index.js로 반환되는 모듈과 전역(global) 객체를 인자로 받아 실행됩니다.

```javascript
// File: .../module/init.js
module.exports = function(module, _global){
    _global.moduleTest = module
}
```
<br>

&nbsp;***config.json***에 **requireInit**을 명시하지 않았지만 ***init.js***가 감지될 경우에는 암시적으로 <font color="blue">true</font>가 됩니다.

&nbsp;또한, ***init.js***가 존재하더라도 **requireInit**가 <font color="red">false</font>라면 **init** 없이도 모듈을 사용할 수 있습니다.

<br>

### base 패키지
&nbsp; 패키지 중 라이브러리에 공통으로 사용되거나, 기반이 되는 모듈들이 있을 수 있습니다. 내장되어 안정성을 위해 단정문을 지원하는 *assert*, 클래스(생성자) 간 상속을 돕는 *inherits*처럼요.

&nbsp;이처럼 ***base*** 패키지에 내장된 모듈들은 라이브러리 로드 시 최초에 자동으로 init되는 점 유의해주세요!