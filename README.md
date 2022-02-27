# 나라장터 API기반 사업 검색 사이트 NARA-P

>MERN(Mongo, Express, React, NodeJS) 스택으로 구현한 나라장터 사전공고 및 본공고 검색사이트입니다.

작업기간 : 22.01.04 ~ 22.01.10 (기능 개선 작업 진행)

**[서비스 사이트 링크](http://15.164.66.139:3000/)**

**기술스택**
  - Front-End : React + NextJS
  - Back-End : NodeJS + Express
  - Data API : [나라장터 공개 API 활용](https://www.data.go.kr/index.do)
  - Database : Mongoose
  - DevOps : AWS, docker(구성 중)

**URL**
  - / : 로그인 창
  - task/naraSearch : 검색 홈
  - task/sajeon/(기관명) : 검색 기관의 사전공고 검색 결과 출력
  - task/bone/(기관명) : 검색 기관의 본공고 검색 결과 출력
  - usertask/usertask : 로그인 유저의 공고 저장 기록 확인

**버전정보**
* version 1.0
  - 사이트 AWS EC2 인스턴스 배포 완료 & 서비스 개시 (22.01.10)
  - 사이트 custom markup page 기능 구현
  - Google Search Console 등록

* version 2.0.0
  - 로그인 기능 구현 (JWT를 이용한 로그인 상태 유지)
  - 공고 저장 기능 추가

**추후 개선 필요**
- https
- 도메인 네임 적용(www.naraapi.com)
- devOps(docker)
- 비밀번호 암호화, 로그인 검증
- 공고 검색 속도 개선
