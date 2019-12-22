<div align="center">
  <img alt="DEV" src="https://user-images.githubusercontent.com/17868599/70886819-c6d2cc00-201f-11ea-85e0-e6cee0ebe4ce.png" width="500px">
  <h1><a href="https://wedev.tv" target="_blank">wedev.tv</a> 👩‍💻👨‍💻</h1>
  <strong>개발자의, 개발자들에 의한, 개발자를 위한 동영상 스트리밍.</strong>
</div>

## 🤔 wedev.tv는 무엇인가요?

[wedev.tv](https://wedev.tv)(또는 wedev, 위데브)는 소프트웨어 엔지니어들이 소프트웨어 기술과 관련된 동영상을 공유하고, 의견을 나누며, 커리어 프로필을 작성할 수 있는 곳입니다. 컨퍼런스 발표, 프로그래밍 강의, 기술 설명과 같은 동영상을 한 데 모아보고, 기술에 대한 건설적인 토론을 할 수 있는 커뮤니티를 의도로 제작되었습니다.

## 📝 목차

- [로컬 머신에서 실행하기](#-로컬-머신에서-실행하기)
- [기술 스택](#기술-스택)
- [Git 커밋 및 브랜치 전략](#-git-커밋-및-브랜치-전략)
- [Mobile First Approach](#-mobile-first-approach)
- [서버사이드 렌더링](#-서버사이드-렌더링)
- [클라이언트 API 데이터 요청 및 캐싱](#-클라이언트-api-데이터-요청-및-캐싱)
- [동영상 업로드 및 인코딩 파이프라인](#-동영상-업로드-및-인코딩-파이프라인)
- [서버리스 아키텍쳐](#ƛ-서버리스-아키텍쳐)
- [인증 아키텍쳐 구성](#-인증-아키텍쳐-구성)

## 💻 로컬 머신에서 실행하기

### Client
```
cd packages/client
npm install
npm run dev
```

### Server

```
cd packages/server
npm install
npm run start:dev
```

### 데이터베이스 migration

```
cd packages/typeorm
npm run typeorm migration:run 
```

## 📚기술 스택

다음과 같은 기술을 사용하여 서비스를 제작했습니다.

### Client
- Next.js
- TypeScript
- react-fetching-library
- Material-UI

### Server
- NestJS
- TypeScript
- TypeORM

### Database
- MySQL
- Redis

### Cloud Services
- AWS Lambda
- AWS Cloudfront
- AWS Elastic Transcoder
- AWS S3
- AWS RDS
- AWS ElastiCache

## ♆ Git 커밋 및 브랜치 전략

Git을 활용하여 협업할 때 다음과 같은 commit 및 브랜치 명명 규칙을 사용했습니다.

### Commit 전략

Commit 제목의 형식은 다음과 같습니다.

```
[server ? client] | <type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<Fixes>(optional) <link>
<BLANK LINE>
```

- server 와 client 둘 다 포함 될 경우 `[server & client]` 로 작성합니다.
- subject와 body를 한글로 작성하고, 그 외엔 영어로 작성합니다.
- type: 어떤 의도로 커밋했는지를 type에 명시합니다.
- scope:  커밋의 대상이 되는 것을 명시합니다.
- subject: 최대 50글자가 넘지 않도록 하고 마침표는 찍지 않습니다.
- body: 최대한 작성합니다. How 와 Why 위주로 작성합니다. ~합니다 라는 문체로 작성합니다.
- issue: 이슈에 대한 상세한 설명이 필요한 경우 해당 이슈의 링크를 첨부합니다.
- 참조: 해당 커밋을 작성하기 위해 참고한 링크를 첨부합니다.

### Branch 전략

Branch 이름의 형식은 다음과 같습니다.

```
[유형]/[내용]_[브랜치 생성 날짜]
```

위 형식을 활용하여 다음과 같이 작성할 수 있습니다.
```
feature/search_api_20191219
refactor/search_api_20191220
```

## 📱 Mobile First Approach

Wedev는 UI 디자인 단계부터 Mobile First Approach 전략으로 설계되고 개발되었습니다.

### Mobile First Approach란?

Mobile First Approach란, 모바일 기기의 웹 브라우저로 접속한 사용자를 중심에 두고 생각하는 사고방식 입니다. 인터넷 트래픽에서 모바일 웹 트래픽이 데스크톱의 것을 추월한지 오래이기 때문에 다수 이용자인 모바일 웹을 중심에 두고 생각하는것이 당연하게 되었습니다. 기획 및 디자인 과정에서 모바일 웹 사용자의 UI/UX를 먼저 고려하고 그 다음으로 데스크톱 이용자의 UI/UX를 고민하게 됩니다.

### Mobile First 디자인

![](https://user-images.githubusercontent.com/17868599/70997561-bc482d80-2118-11ea-9666-2c78d9a1c1f8.png)

Mobile First 디자인은 제약된 작은 화면에서 제품 디자인을 시작해서 태블릿과 데스크톱으로 디자인을 확장하는 기법을 말합니다. Wedev는 디자인 과정에서 모바일 화면에서의 UI/UX를 먼저 작성한 후에 데스크톱 화면에서의 UI/UX를 그렸습니다.

### Mobile First 스타일링

Mobile First Approach 전략에 따라 스타일 규칙 또한 Mobile First로 작성합니다. 

```js
export const Container = styled.div`
  padding-top: 6.4rem;
  background-color: #383d3f;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 22rem;
    height: 100%;
  }
`;
``` 

위와 같이, 기본 스타일은 모바일에서 사용할 스타일을 먼저 작성하고 media query를 작성하여 그 내부에는 데스크톱에 추가될 속성을 작성합니다. 일반적으로 모바일 화면이 데스크톱 화면보다 간결하다는 특징이 있습니다. 만약에 위와 같이 Mobile First 스타일 대신에 Desktop First 접근 방법으로 스타일을 작성한다면 미디어 쿼리에서 속성을 취소하는 코드를 작성해야 하기 때문에 불필요한 코드량이 늘어난다는 단점이 있습니다. 따라서 Mobile First 스타일 전략을 통해 보다 간결한 코드를 작성할 수 있습니다.

## 🎨 서버사이드 렌더링

![](https://user-images.githubusercontent.com/17868599/71157419-5200cb80-2285-11ea-969f-888d0d466baa.png)

Wedev는 실제로 운영할 서비스를 목적으로 개발했습니다. 먼저, 검색 엔진 최적화(SEO)를 잘 할 수 있는 방법에 대한 고민이 있었습니다. 서비스는 최대한 많은 사용자가 이용하도록 운영되어야 하고, 그 방법 중의 하나는 검색 엔진 최적화를 통해 최대한 많은 사용자에게 노출되는 것입니다. 클라이언트 앱을 서버 사이드 렌더링 방식의 SPA(single page application)로 작성하게 되면 SEO에서 불리함이 있을 수 있습니다. 그래서, SEO를 손쉽게 할 수 있도록 서버사이드 렌더링 방식의 애플리케이션을 고려하게 되었습니다.

또, 사용자 경험에 비추어 볼때, SPA의 경우에는 초기 접근시에 화면을 그리는 데 사용할 JS 파일을 전부 다운 받아오기 때문에 상당히 긴 시간동안 사용자의 화면에는 아무것도 나타나지 않습니다. 반면 서버사이드 렌더링 된 애플리케이션은 초기 접근시에 UI가 렌더링 html을 바로 받아오기 때문에 나머지 에셋을 로딩하는 시간 동안 사용자는 빠르게 UI 요소를 살펴볼 수 있고 이는 더 나은 사용자 경험으로 다가옵니다. 이러한 이유들을 고려하여 wedev에서는 서버사이드 렌더링 방식으로 서비스를 제공하기로 결정했습니다.

서버 사이드 렌더링 방식으로 애플리케이션을 작성하기 위해서 create-react-app 프로젝트를 서버 사이드 렌더링이 되도록 별도의 webpack 설정 및 스크립트를 작성하는 방법과 next.js 프레임워크를 사용하는 방법이 있었습니다. 하지만 전자 방법의 경우에는 개발 리소스가 많이 소요될 것이라고 생각되어 빠른 개발을 위해 서버 사이드 렌더링을 손쉽게 구현할 수 있는 next.js를 사용하기로 결정했습니다. 

## 📥 클라이언트 API 데이터 요청 및 캐싱

![](https://user-images.githubusercontent.com/17868599/71316004-3fb4a680-24ac-11ea-85bd-c61fcf898b2f.png)

Wedev의 클라이언트 애플리케이션은 높은 수준의 사용자 경험과 네트워크 통신 낭비를 막기 위해서 클라이언트 애플리케이션에서의 API 데이터 캐싱 기능을 사용하고 있습니다. 이를 구현하기 위한 초기 논의 단계에는 상태 관리 라이브러리들을 사용하는 것을 고려했습니다. 대표적으로 Redux, MobX 등이 있었습니다. 하지만, 프로젝트가 아직 초기 단계이고, API 데이터 캐싱 이외에는 복잡한 상태관리가 필요 없었습니다. 또, 상태 관리 라이브러리를 사용했을 때, 작성해야 하는 action, state 관리, 수 많은 로직들을 작성하기에는 개발 마감일을 고려했을 때 개발 리소스가 부족하다고 판단했습니다. 결국 Redux, MobX와 같은 상태관리 라이브러리를 사용하는 것은 오버엔지니어링이라 판단하고 본 기능 구현을 위한 대안들을 찾게 되었습니다.

최근에는 GraphQL 스펙을 제공하는 API가 많아지고 있는데, GraphQL API 서버에 요청을 생성하고 그 데이터를 잘 관리할 수 있는 수 많은 프론트엔드 라이브러리들이 있습니다. 가장 대표적인 라이브러리 중의 하나는 Apollo Client입니다. Apollo는 query, mutation 두 가지 간결한 인터페이스를 활용해서 데이터 요청을 생성할 수 있기 때문에 굉장히 높은 생산성으로 빠르게 애플리케이션을 구현할 수 있습니다. 또, 받아온 데이터를 캐싱해 주는 기능 까지 포함하고 있어서, 빠른 시간내에 높은 수준의 애플리케이션을 만들 수 있습니다.

이와 같이 개발적으로 다양한 편리함을 제공하는 Apollo에서 영감을 받은 REST API 데이터 호출 라이브러리들이 최근에 많이 작성되고 있습니다. 이들은 Apollo와 같이 간결한 인터페이스를 통해 데이터 요청 생성 코드를 손쉽게 작성하고, 원하는 시간 만큼 데이터를 캐싱하는 기능을 제공하고 있습니다. SWR, react-query, react-async, react-fetching-library와 같은 라이브러리들이 있었고, 전부 hooks 기반의 인터페이스를 제공하고 있어서 빠르게 개발 생산성을 잡을 수 있다는 특징이 있습니다. 이 중에서 어느 정도 이슈와 버그가 많이 해결되고, 정식 버전으로 출시되었으며, 캐싱 기능이 가장 훌륭하게 구현된 react-fetching-library를 사용하기로 결정했습니다.

본 라이브러리를 활용하여 다음과 같이 코드를 작성하여 데이터 요청을 생성할 수 있습니다.
```ts
import { useQuery, Action } from 'react-fetching-library';

export const makeTaglist: Action = (page: number) => ({
  method: 'GET',
  endpoint: `https://wedev.tv/api/tags?page=${page}`,
});

const action = createTagListAction(1);
const { payload, error } = useQuery(action);
```

위와 같이 http 요청 정보를 담고 있는 action 객체를 생성하고, react-fetching-library가 제공하는 useQuery에 action 객체를 인자로 전달하여 요청을 생성하게 됩니다.

## 📺 동영상 업로드 및 인코딩 파이프라인

![](https://user-images.githubusercontent.com/17868599/71317488-2835e780-24c5-11ea-9673-995cdf2378a5.png)

Wedev의 동영상 업로드 및 인코딩 파이프라인은 일련의 복잡한 과정을 거치게 됩니다. 먼저, 사용자가 wedev 클라이언트에서 업로드할 파일을 선택하고 동영상 정보(동영상 제목, 상세정보)를 입력한 후 제출합니다.

양식이 제출되면, 먼저 사용자가 선택한 영상을 s3 버킷에 업로드해야 합니다. 이때, s3 버킷에 임시 접근 권한을 제공해서 동영상 파일을 업로드 할 수 있어야 합니다. 이때, aws에서 제공하는 presigned url을 활용해서 클라이언트 앱에 접근 권한을 제공할 수 있습니다.

Presgined url을 발급받기 위해서는 aws IAM 사용자의 액세스 id와 secret을 제공해야하는데, 민감한 정보를 클라이언트 앱에 작성하기에는 보안상 문제가 발생할 수 있기 때문에 presigned url을 발급하여 반환하는 별도의 lambda 함수를 작성했습니다. 결국 클라이언트는 lambda로부터 presinged url을 발급 받고, 해당 url에 대해 요청을 생성하여 파일을 업로드하게 됩니다. 이때 고유한 값의 id를 생성하여 동영상 파일의 디렉토리로 관리하여 인코딩과정에서 동영상을 추적할 수 있습니다. 그 다음, 선택한 파일을 제외한 나머지 정보는 서버에 전송하여 서버가 redis에 기록하게 됩니다.

위와 같이 원본 영상이 s3 버킷에 업로드 되면, 또 다른 lambda 함수를 호출하는데, 이 lambda 함수는 방금 업로드한 동영상의 url을 transcoder에 전달하여 인코딩을 위한 새로운 작업을 생성합니다. Transcoder는 전달받은 동영상 url을 통해 인코딩 작업을 수행합니다. 인코딩이 완료되면 480p, 720p, 1080p 해상도의 영상과 각 해상도의 영상 정보를 담은 .mpd 확장자를 가지는 DASH 표준의 manifest 파일을 작성합니다. 이와같이 인코딩이 완료되면, 생성된 파일들을 s3 버킷에 입력합니다.

위의 인코딩 작업 상태를 바라보던 SNS 서비스가 인코딩작업이 완료되었음을 감지하면, 서버에 인코딩한 동영상 정보를 담은 메시지를 전달하게 됩니다. 서버는 본 메시지를 받게 되면 동영상 경로에 포함된 id를 통해 redis에 기록했던 동영상 정보를 추출하고 동영상 manifest파일의 url과 함께 동영상 정보를 mysql에 기록하게 됩니다.

## ƛ 서버리스 아키텍쳐

AWS Lambda를 활용하여 서버리스 아키텍쳐를 구축했습니다. 서버리스란 클라우드가 제공하는 FaaS의 일종인데, 특정 비즈니스 로직을 함수로 작성하여 특정 이벤트가 발생했을 때 함수를 호출하여 로직을 수행할 수 있는 서비스 입니다. HTTP 요청이 생성되면 함수가 실행되어 비즈니스 로직을 처리하고 종료되는 특징이 있습니다.

서버리스 아키텍쳐를 사용하면 비용을 대폭 줄일 수 있고, 인프라 관리나 보안에 대해 신경쓰지 않고 비즈니스 로직에 집중할 수 있습니다. 또, 일반적으로 대용량 트래픽에 대해 auto scaling과 같이 서버를 증설하는 테크닉을 사용하지만, 서버리스 아키텍쳐의 경우에는 요청이 발생할 때 함수를 호출하는 특성상 별도의 트래픽 처리를 할 필요가 없다는 장점이 있습니다.

### 클라이언트

Wedev 클라이언트 애플리케이션은 다음과 같은 아키텍쳐를 가집니다.

![](https://user-images.githubusercontent.com/17868599/70891944-8f6a1c80-202b-11ea-8f8b-eb7c4d565fdc.png)

사용자가 cloudfront를 가르키는 주소에 접근하면 cloudfront에서 설정된 lambda@edge를 호출하게 됩니다. lamdba@edge는 사용자와 가장 가까운 위치에서 lambda 코드를 호출하여 빠르게 연산을 처리할 수 있는 서비스 입니다.

여기서 사용자가 요청한 페이지가 서버사이드 렌더링 연산이 필요한 경우에는 람다 함수를 통해 ssr을 처리합니다. 이미지와 같은 static 파일은 람다 함수를 거치지 않고 s3에서 가져오게 됩니다.

### 서버

Wedev 서버 애플리케이션은 다음과 같은 아키텍쳐를 가집니다.

![](https://user-images.githubusercontent.com/17868599/70904095-e54abe80-2043-11ea-94a3-a1dd517a3e06.png)

먼저, 서버 로직을 수행하는 람다는 연결된 API Gateway를 통해 호출하게 됩니다. 이때, API Gateway 앞에 cloudfront를 놓고, cloudfront 주소에 연결된 wedev.tv 도메인을 통해 유저가 람다 애플리케이션을 호출할 수 있습니다.

람다 함수는, VPC내부에 구성된 private subnet 내부에 구성됩니다. 본 private subnet에는 리소스 저장을 위한 mysql과 인메모리 데이터 저장을 위한 redis가 함께 구성되어 있어서 람다가 각 데이터베이스에 접근할 수 있습니다. 

때떄로 람다 함수는 외부 3자 API에 접근해야하는 경우가 있습니다. Wedev 앱은 github의 3자 인증을 사용하고 있기 때문에 람다가 외부 API에 요청을 생성할 수 있어야 합니다. 이때, NAT 인스턴스를 생성하여 내부 네트워크 주소만을 가지고있는 람다에게 외부 네트워크 주소를 생성해 줌으로써 외부 API요청을 생성할 수 있게 매핑합니다.


## 🔑 인증 아키텍쳐 구성
- 깃헙 인증 페이지
- 깃헙 로그인을 성공하게되면 Callback URL 로 Redirect
- Callback URL에 대한 응답은 Auth Module이 담당합니다
- 인증이 성공하면 github 으로 부터 code라는 문자열을 받습니다
- Auth Module은 얻은 code로 Third Party Module 에게 Github AccessToken을 달라고합니다. Third Party Module는 많은 api와 연결고리를 가집니다
- 대리인의 성격을 띄는 Third party Module은 들어온 요청에 맞게 Github API module로 부터 주입받은 서비스를 사용합니다
- GitHub API Module은 받은 code를 통해서 Github Api를 이용해 Access Token을 요청합니다
- Auth Module은 응답받은 Access Token을 토대로 GitHub API에게 GIthub 유저 정보를 달라고 요청합니다. 이때 요청과정은 Auth Module -> Third Party Module -> GitHub API Module -> GitHub API 입니다.
- 받은 user 정보가 우리 DB에 있는지 AuthService가 확인합니다.
- 만약 user 정보가 없다면, 회원가입을 해야합니다.
- 회원가입을 위해서 Access Token을 포함한 User 데이터를 저장합니다 그리고 회원가입 페이지로 리다이렉트 합니다
- 사용자가 회원가입 폼을 작성해서 제출을 합니다
- User Module이 이 요청을 수신하여 문제가 없으면 쿠키에 녹아져 있는 Access token 과 아바타 등의 GIthub user 정보와 함께 디비에 저장합니다.
- 회원가입이 되면 로그인을 자동으로 실행해야합니다
- user-serializer 모듈을 이용해서 세션 테이블에 회원정보를 serialize 하고, 그에 해당하는 id를 쿠키에 녹여서 메인페이지로 리다이렉트를 합니다
- 그후 user-serializer가 Serialize 할 수 있게 값을 정제를 해서 user-session-module에게 insert를 하면 user-session-module이 ElastiCache에 저장합니다
