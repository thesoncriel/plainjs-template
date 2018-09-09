# PureJS Template
간단한 js 프로젝트를 진행하기 위한 프로젝트 템플릿이다.  

## Getting Started
개발 진행 시 아래 명령어로 수행 한다.
```
npm run dev
```
그리고 웹브라우저에서 localhost:8080 주소로 접근 한다.
만약 IE 에서 Security 오류가 난다면 다음과 같이 수행.
- 인터넷 옵션 > 보안 > 로컬 인트라넷 > 사이트 > 고급
- http://localhost, ws://localhost 추가
- IE 재시작

## Features
- webpack 을 이용한 build system 포함.
- webpack-dev-server 를 이용하여 개발 진행 시 실시간으로 개발 변화 내용을 볼 수 있도록 함. (HMR 이용)
- polyfill 적용 (필요한 내용만 직접 선택하여 적용 함)
- SASS 사용 가능. 컴파일 내용이 별도의 css 파일로 export 되어 html 에서 사용할 수 있음

## Todo
- 기본적인 API 호출 Service 제공
- SPA로 동작되는 MVVM 패턴 적용
