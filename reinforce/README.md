# koinelib/reinforce_

----

### 필요성

&nbsp;RhinoJS는 Java를 이용한 JS 구현체이다. 그러나 이 과정에서 기본적으로 브라우저 엔진을 사용하는 JS의 환경적 조건을 모두 동일하게 구현하지 못한 바람에 여러 문제점이 발생하게 되었다.

&nbsp;이에 따라 RhinoJS 및 카카오톡 환경의 기존 구현체의 성능을 높이는 동시에 자동 대체, 확장할 수 있도록 한다.

<br>

- setTimeout/setInterval
- send(): Legacy-Api.replyRoom() / API2 - bot.send()