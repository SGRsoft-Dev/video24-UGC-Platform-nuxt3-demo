## UGC Streaming / VOD Platform DEMO

VIDEO24를 이용한 UGC 플랫폼을 구현한 FrontEnd 데모코드입니다.




![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/6cd0539427c794dac116b6d4616eea1c.png)



## 데모페이지
[UGC 플랫폼 데모](https://mediaplus-ugc-platform-nuxt3-demo.web.app/)


## 데모페이지 소스코드
[https://github.com/SGRsoft-Dev/video24-UGC-Platform-nuxt3-demo](https://github.com/SGRsoft-Dev/video24-UGC-Platform-nuxt3-demo)


*** 

![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202310/4f8b9055fd11fe2a1595586c52a7ec29.png)

# VIDEO24 for NAVERCLOUD PLATFORM
VIDEO24는 네이버클라우드 플랫폼에서 동작하는 클라우드 네이티브앱입니다.

## VIDEO24 소개
VIDEO24는 끊김 없이 안정적인 동영상 스트리밍 구축과 연동이 가능한 SaaS입니다.

네이버클라우드 플랫폼의 인프라를 사용한 미디어 서비스를 구축을 고려하고 있다면,

VIDEO24는 이러한 번거로운 연동 작업을 단축시켜, 동영상 스트리밍에 필요한 솔루션을 ONESTOP 연동할 수 있습니다.

끊김 없는 안정적인 동영상 재생을 위한 최신 스트리밍 구축/연동 SaaS, VIDEO24를 이용해보세요.


***




## 사전 준비사항
UGC 데모는 VIDEO24의 UGC 스트리밍 서비스를 이용하기 위해, 네이버클라우드 일부 제품의 SDK , VIDEO24의 계정이 필요합니다.

***

## 필수
- 네이버클라우드 플랫폼 Video Player Enhancement SDK URL (v1.1.1 이상)
- 네이버클라우드 플랫폼 Video Player Enhancement SDK KEY (유료 라이선스 필요)
- VIDEO24 프로젝트 API KEY

***

## 제한사항

현재 데모코드에 사용된 필수 요소들은 개발자 로컬 테스트에서만 동작합니다. (http://localhost:3000)

실제 서비스를 위해서는 VIDEO24의 계정을 발급받아야 합니다. (2023년 9월 BETA 서비스 오픈 예정)

***


## 개발환경 구성

- Vue3 + Nuxt3  를 이용한 CSR/SSR 방식을 지원하는 웹사이트
- Node v16 이상 필요
- TypeScript
- Tailwind CSS

***

## 참고 사이트
### NAVERCLOUD PLATFORM Video Player Enhancement

https://guide.ncloud-docs.com/docs/ko/vpe-overview

### Nuxt 3 Introduction

https://nuxt.com/docs/getting-started/introduction

### Nuxt 3 UI

https://ui.nuxtlabs.com/getting-started

### Tailwind CSS
https://tailwindcss.com/docs/installation

### Nuxt 3 Tailwind CSS
https://tailwindcss.nuxtjs.org/

***


## NCP Video Player Enhancement SDK 설정
![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202308/7a602c53cc6a0b69759031e44ad8e5d9.png)

네이버클라우드 콘솔에서 Video Player Enhancement 진입

***

![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202308/bc8f9b9850f93396e7e07ca2c1c9cd4d.png)

플레이어를 신규로 생성합니다.

***

![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202308/37fc51c8dccfdf2711ba7500203c685c.png)

플래이어 생성시 아래 도메인을 필수로 추가합니다.

```bash
http://localhost.com
https://VIDEO24.co.kr
```
나머지는 서비스를 운영할 도메인을 입력합니다.

***

![](https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202308/6ad95ea2ed84a4412224a68f17d22c1b.png)

생성된 플레이어의 SDK URL를 복사합니다.

## Nuxt 3 설정 수정

```javascript
// nuxt.config.js
export default defineNuxtConfig({
    // ...
    head: {
        script: [
            {
                src: '{VPE SDK URL}'
            },
        ],
    },
    // ...
})
```
nuxt.config.js 파일에 SDK URL을 추가합니다.

***
```javascript
// nuxt.config.js
export default defineNuxtConfig({
    // ...
    runtimeConfig:{
        public:{
            appName:'My UGC app',
            VIDEO24ApiKey:'{VIDEO24 프로젝트 API KEY}',
        },

    },
    // ...
})
```
nuxt.config.js 파일에 VIDEO24 프로젝트 API KEY를 추가합니다.

***

## 실행방법

```bash
$ yarn install
$ yarn run dev
```


## 빌드

```bash
$ yarn run generate
```

## 빌드 미리보기

```bash
$ npx serve .output/public
```

## Firebase Hosting 배포

### Firebase Deploy Nitro 가이드

https://nitro.unjs.io/deploy/providers/firebase

```javascript
// nuxt.config.js
export default defineNuxtConfig({
    // ...
    nitro: {
        routeRules: {
            '/api/**' : {cors : true},
        },
        preset: "firebase",
    },
    // ...
})
```
- 서버 빌드 프리셋을 firebase로 변경합니다.

```javascript
//firebase.json
{
  "functions": {
    "source": ".output/server",
    "runtime": "nodejs16"
  },
  "hosting": {
    "public": ".output/public",
    "cleanUrls": true,
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [{ "source": "**", "function": "server" }]
  }
}

```
- firebase.json 파일을 생성합니다.

```bash
$ npm install -g firebase-tools@latest
$ firebase login
$ firebase init 

```
- firebase cli를 설치하고, 로그인을 합니다.

```bash
$ NITRO_PRESET=firebase 
$ npm run build
$ npx firebase-tools deploy
```
- 빌드 후 배포를 합니다.




***


## 문의하기


SGRSOFT 개발팀  : dev@sgrsoft.com

채널톡 : https://sgrsoft.channel.io/home

영업 및 네이버클라우드 가입 문의 : biz@sgrsoft.com

SGRSOFT를 통하여 네이버클라우드 플랫폼 크래딧을 지원 받을 수 있습니다. (최대 300만원)


VIDEO24 웹사이트 :
[https://video24.app/](https://video24.app/)
