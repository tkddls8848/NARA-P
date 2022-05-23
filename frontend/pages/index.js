import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

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

export default function Login({ cookie }) {

  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const cookieDecode =  jwt.decode(cookie.userCookie)
  const router = useRouter()  
  const loginState = cookieDecode ? cookieDecode.userId : 'Guest'

  const loginSubmit = async () => {
    const data = await axios.post(backAddress + '/login/signin', {'user_id': userId, 'user_pw': userPw}, {
      withCredentials: true
    })
    if (data.data.state == 'wrong password') {
      alert('로그인 정보가 잘못되었습니다.')
    } else if (data.data.state == 'not registered user') {
      alert('가입한 정보가 없습니다.')
    } else {
      router.push(frontAddress + '/task')
    }
  }

  const logoutSubmit = async() => {
    const uid = cookieDecode.userId
    await axios.get(backAddress + '/login/' + uid, {
      withCredentials: true
    })
    alert('로그아웃 되었습니다.')
    router.push(frontAddress + '/')
  }

  return (
    <div className='flex justify-center'>
      <div className="container max-w-sm mx-auto bg-white border-2 rounded-xl shadow-lg m-5 p-5">
        <div className="flex flex-col space-y-2 m-4">
          <div className='flex justify-center pb-1 text-lg'>
            조달청 검색기 NARA-P입니다.
          </div>
          <div className='flex justify-center pb-1 text-lg'>
            로그인 페이지
          </div>
        {
          loginState == 'Guest' ? 
          <div className='flex justify-center py-1 text-sm'>
            로그인 되어 있지 않습니다.
          </div>
          : 
          <div className='flex justify-center py-1 text-sm'>
            {loginState}님 반갑습니다.
          </div>
        }
        {
          loginState == 'Guest' ?
          <div className="flex flex-col space-y-2">
            <input 
            className='border-solid border-2 border-gray-400 rounded-md' 
            id='id' 
            defaultValue={userId}
            placeholder='ID' 
            onChange={(e) => setUserId(e.target.value)}/>
            <input 
            className='border-solid border-2 border-gray-400 rounded-md' 
            id='pw' 
            defaultValue={userPw}
            placeholder='PW' 
            onChange={(e) => setUserPw(e.target.value)}/>
            <button 
            className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {loginSubmit()}}>로그인</button>
            <button 
            className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {router.push(frontAddress + '/userlogin/join')}}>회원가입</button>
          </div>
          :
          <div></div>
        }
        {
          loginState == 'Guest' ?
          <div></div> 
          :
          <div className="flex flex-col space-y-2">
            <button 
            className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {logoutSubmit()}}>로그아웃</button>
            <button 
            className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {router.push(frontAddress + '/userlogin/modify')}}>정보수정</button>
            <button 
            className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {router.push(frontAddress + '/userlogin/delete')}}>회원탈퇴</button>
          </div>
        }
        </div>    
      </div>
    </div>  
  )
}