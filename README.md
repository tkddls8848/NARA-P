# 나라장터 API기반 사업 검색 사이트 NARA-P

>MERN(Mongo, Express, React, NodeJS) 스택으로 구현한 나라장터 사전공고 및 본공고 검색사이트입니다.

- 1차 작업기간 : 22.01.04 ~ 22.01.10 (기능 구현 진행)
- 2차 작업기간 : 22.02.05 ~ 22.02.28 (상세 기능 및 배포 환경 설정)

**[서비스 사이트 링크](https://www.naraapi.com)**

**기술스택**
  - Front-End : React + NextJS
  - Back-End : NodeJS + Express
  - Data API : [나라장터 공개 API 활용](https://www.data.go.kr/index.do)
  - Database : Mongoose
  - DevOps : AWS, docker

**URL**
  - / : 로그인 창
  - /userlogin : 로그인 관리
  - /task/narasearch : 검색 홈
  - /usertask/usertask : 로그인 유저의 공고 저장 기록 확인
  - /todaytask/todaytask : 오늘 여러 기관의 공고 확인

**버전정보**
* version 1.0
  - 사이트 AWS EC2 인스턴스 배포 완료 & 서비스 개시
  - 사이트 기능 구현
  - Google Search Console 등록

* version 2.0
  - 로그인 기능 구현 (JWT를 이용한 로그인 상태 유지)
  - 공고 저장 기능 추가
  - https 적용
  - docker컨테이너 기반 배포
  - 도메인 네임 적용(www.naraapi.com)

* version 2.1
  - 검색일 기준 여러 부서 공고 현황 검색 기능 구현

**추후 개선 필요**
  - 비밀번호 암호화, 로그인 검증
  - 동시 로그인 방지
  - 공고 검색 속도 개선(데이터 아카이빙)
  - PM2
  - 조달청 쪽 특정 리퀘스트 수행 시 거절에 대응 필요