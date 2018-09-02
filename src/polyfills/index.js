/*
필요한 polyfill이 있다면 여기에 추가 해 준다.

babel-polyfill은 간편하지만 쓰지 않는 내용이 들어가 번들 용량이 커지는 단점이 있고,
babel-runtime은 구문 분석 후 필요한 것만 적용 시켜주긴 하나 내부 module을 항상 거쳐야 하며,
이는 polyfill이 필요없는 최신 브라우저도 예외가 아니라서 성능 문제를 야기 시킨다.
게다가 [1,2].include(..) 같이 즉시 사용 메서드도 사용 불가다.
(항상 default property가 따라 다니는 건 덤)

따라서 babel-polyfill 및 babel-runtime 의 기반(dependency)이 되는 core-js 에서
아래와 같이 추가적으로 필요한 내용만 별도로 기재 하여 사용토록 한다.
단, 이렇게 하면 prototype pollution 이 발생되는 단점이 있다.

지원 polyfill 내용은 아래 사이트 참조.
https://github.com/zloirock/core-js/tree/v2

각 플랫폼 및 브라우저 별 지원 여부는 아래 사이트 참조.
https://caniuse.com
https://www.w3schools.com
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
- 뒤에 Object를 알아보고 싶은 객체를, keys를 알아보고 싶은 메서드를 넣고 확인.
- 구글에서 javascript 객체 메서드 - 와 같은 형식으로 검색하면 mdn 사이트가 자동으로 뜨기도 함.

※ 만약 위 각 사이트별로 지원 여부가 다르다면, mdn의 정보를 따르되,
   정확한 지원 여부를 직접 웹브라우저로 확인 해 봐야 한다.
*/

require('core-js/es6/promise');
require('core-js/fn/object/assign');
// require('core-js/fn/object/keys');
require('core-js/fn/number/is-integer');
require('core-js/fn/string/pad-start');
require('core-js/fn/string/starts-with');