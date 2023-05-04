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

&nbsp;init의 첫 번째 인자는 반드시 전역 객체를 넣어주어야 한다.

```javascript
const koine = require('koine')

// 방법1: 전부 적용
koine.init(this/* = [object globa] */, "all")

// 방법2: 패키지명 입력
// 해당하는 패키지(들)의 모든 모듈 적용
koine.init(this, "base", "extension")

// 방법3: 하위 패키지 직접 적용
// 세부적인 모듈까지 모두 고르고 싶을 경우 권장
koine.base.init(this, "inherits")
koine.extension.init(this, {
    "Array": ["random", "shake"],
    "String": ["format"]
})
```

&nbsp;*각 패키지 별 제약사항과 적용 방식, 사용법 등은 해당 패키지 폴더의 README.md를 참고해주세요!