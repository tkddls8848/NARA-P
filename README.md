# 나라장터 API기반 사업 검색 사이트 NARA-P

>MERN(Mongo, Express, React, NodeJS) 스택으로 구현한 나라장터 사전공고 및 본공고 검색사이트입니다.

작업기간 : 22.01.04 ~ 22.01.10

**[서비스 사이트 링크](http://15.164.66.139:3000/)**

**기술스택**
  - Front-End : React + NextJS
  - Back-End : NodeJS + Express
  - Data API : [나라장터 공개 API 활용](https://www.data.go.kr/index.do)
  - Database : Mongoose(구성 중)
  - DevOps : AWS, docker(구성 중)

**URL**
  - / : 페이지 홈
  - task/naraSearch : 검색 홈
  - task/sajeon/(기관명) : 검색 기관의 사전공고 검색 결과 출력
  - task/bone/(기관명) : 검색 기관의 본공고 검색 결과 출력

**버전정보**
* version 1.0
  - 사이트 AWS EC2 인스턴스 배포 완료 & 서비스 개시 (22.01.10)
  - 사이트 custom markup page 기능 구현
  - Google Search Console 등록

* version 1.0.1
  - 출력 데이터의 시간 순 정렬
  - 라디오 버튼 서치 제공
  - 사전/본공고 컴포넌트 일원화

**추후 개선 필요**
- https
- 검색 다양화(날짜 설정 및 여러 기관 동시 검색)
- 선택적 데이터 호출(나라장터 API + Mongoose)
- devOps
- 도메인 네임 적용(www.naraapi.com)
- 404 페이지
- Material UI => Tailwind
- 공고의 개인 CRUD