# evaluate

```python
@version 1.0
@update 2023. 6. 15
@contributor
    Eulogia Koinē
```

> &nbsp;<font color="red">*표준 카카오톡 봇 ***API2*** 전용 모듈.</font>

&nbsp;채팅을 통해 코드를 실행하는 것은 카카오톡 봇 디버깅에 매우 효율적이다. 이를 편하게 적용할 수 있도록 지원한다. 약칭 **'이발'**

&nbsp;**이발 사용 권한, 이발 명령어 접두사, 작동할 방 설정 기능** 제공.

&nbsp;도배 방지가 되어있는 축약형 답장 함수 ***rp(답장할 말)*** 제공.

&nbsp;런타임 동안 이발 명령어 환경에서 유지되는 ***env*** 객체 존재. 전역 접근이 가능하긴 하지만 안전을 위한 대비.

<br>

---
### How to use?]

#### 라이브러리 없이 사용하는 법_

global_modules 폴더에 evaluate 폴더 넣어놓고 전역에 아래 코드 적용.

기타 이발 설정은 바로 다음의 interface 참고.

```javascript
const evaluate = require('evaluate')() // 끝
```

<br>

#### @interface

##### 1. 속성

```typescript
+prefix: string
    > 이발 여부를 감지할 메시지 접두사
    > 기본값 없음

+hash: number[]
    > 카카오톡 프로필 사진 바이트코드를 java.lang.String 클래스의 hashCode()로 얻어낸 해시코드.
       >> API2 기준 MESSAGE 리스너 매개변수가 msg일 때 java.lang.String(msg.avatar.author.getBase64()).hashCode(). 
    > 이발 권한을 가질 대상의 프로필 해시

+room: string[]
    > 이발이 작동될 방을 제한.
    > 해당 배열에 들어간 이름과 일치하는 방에서만 작동.
    > 앱 자체 디버그 룸에서는 상관없이 작동.

+enum ParameterType: {
    LEGACY,
    API2
}

+max_reply_count: number
    > 자연수 값으로 자유로이 설정 가능
    > 이발에서는 답장 함수의 축약형으로 rp(string) 함수를 제공하는데, 해당 함수가 한 이발에서 답장할 수 있는 최대 횟수를 제한한다. 도배를 막기 위함이다.
    > 기본값 = 5
```



<br>

##### 2. 메서드

```typescript
+on(parameterType: ParameterType): boolean
    > MESSAGE Event에 이발용 리스너를 추가.
    > 이미 추가됐을 경우 false를, 아니라면 추가 후 true를 반환.
```
parameterType은 매개변수 형태를 결정한다. 아래는 이발이 실행되는 함수 스코프의 매개변수 형태다.

```typescript
// ParameterType.LEGACY
function (
    room: string,
    msg: string,
    sender: string,
    isGroupChat: boolean,
    replier: { reply(msg: string): void },
    imageDB: { getProfileHash(): number },
    packageName: string,
    isDebugRoom: boolean,
    isMention: boolean
){ /* 이발 실행 코드*/ }

// ParameterType.API2
function ( // 하나의 객체 매개변수에 담김
    chat: {
        room: string,
        content: string,
        author: {
            name: string,
            avatar: { getBase64(): string }
        },
        isGroupChat: boolean,
        isDebugRoom: boolean,
        isMention: boolean,
        packageName: string,
        reply(msg: string): void
    }
){ /* 이발 실행 코드 */}
```

<br>

```typescript
+off(): boolean
    > MESSAGE Event의 이발용 리스너를 제거한다.
    > 없을 경우 제거 실패를 의미하는 false를, 아니라면 제거하고 true를 반환한다.
```

```typescript
+function listener(parameterType: ParameterType):
    > MESSSAGE 이벤트에 추가할 리스너를 직접 가져온다.
    > 매개변수 타입 별 리스너 함수의 참조는 유지된다.
```

<br>

#### example

```javascript
// 독립 적용
const evaluate = require('evaluate')()

/* 라이브러리로 적용
kpack.init('op/evaluate')
 ...or...
const evaluate = klib.op.evaluate
*/

evaluate.prefix = "e" // 접두사 설정
evaluate.room.push("사용할 방")
evaluate.hash.push(1234567890) // 관리자 해시코드
evaluate.on(evaluate.Parameter.LEGACY) // 레거시 매개변수로 이발 적용
```

<br>

#### Tip_

1. style~.js 파일을 수정하여 이발 메시지 출력 형태를 수정할 수 있습니다.
2. index.js의 ParameterType 객체에 요소를 추가하고 listener의 switch문을 수정하고, evaluate내에 다른 형식의 매개변수를 가진 함수를 추가하여 원하는 이발 타입을 추가할 수 있습니다.
2. 사용하지 않는 이발 함수의 캐시는 사라집니다.