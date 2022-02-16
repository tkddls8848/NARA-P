import axios from "axios"
import cookies from 'next-cookies'
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export const getServerSideProps = (ctx) => {
  const cookie = ctx ? ctx.req.cookies : 'empty'
  return {
      props: {
        cookie
      }
  }
}

export default  function Index({cookie}) {  

  const cookieUserId = cookie.userCookie == null ? {userId: 'GUEST'} : jwt.decode(cookie.userCookie)
  const [userId, setUserId] = useState(cookieUserId.userId)

  return (
    <div>
      <div>조달청 검색기입니다.</div>   
      <div>나에 대한 소개 및 연락처 및 관련 링크 및 자소서링크 등등</div>
      <div>{userId}</div>
      <div>======추후 하기에 로그인창======</div>
    </div>
  )
}
