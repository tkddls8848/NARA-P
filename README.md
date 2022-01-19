# 나라장터 API기반 사업 검색 사이트 NARA-P

>ReactJS+NextJS, NodeJS+Express로 구현한 나라장터 사전공고 및 본공고 검색사이트입니다.

작업기간 : 22.01.04 ~ 22.01.10

**[서비스 사이트 링크](http://15.164.66.139:3000/)**

**기술스택**
  - Front-End : React + NextJS
  - Back-End : NodeJS + express
  - Data API : [나라장터 공개 API 활용](https://www.data.go.kr/index.do)

**URL**
  - / : 페이지 홈
  - task/sajeon/ : 국민건강보험공단 검색일 기준 1주간에 대한 사전공고 검색 결과 출력
  - task/sajeon/(기관명) : 검색 기관의 검색일 기준 1주간에 대한 사전공고 검색 결과 출력
  - task/bone/ : 국민건강보험공단 검색일 기준 1주간에 대한 본공고 검색 결과 출력
  - task/bone/(기관명) : 검색 기관의 검색일 기준 1주간에 대한 본공고 검색 결과 출력

**버전정보**
* version 1.0
  - 사이트 AWS EC2 인스턴스 배포 완료 & 서비스 개시 (22.01.10)
  - 사이트 custom markup page 기능 구현
  - Google Search Console 등록

**추후 개선 필요**
- https
- 검색 다양화(날짜 설정 및 여러 기관 동시 검색)
- 사전/본공고 라디오 버튼 서치
- 404 페이지