import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

const Join = () => {
  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userRePw, setUserRePw] = useState()
  const [userEmail, setUserEmail] = useState('')  
  const router = useRouter()

  useEffect(() => {
    userPw == userRePw ?
    document.getElementById('pwAlarm').innerText = '확인되었습니다.' : 
    document.getElementById('pwAlarm').innerText = '비밀번호 입력이 잘못되었습니다.'
  }, [userPw, userRePw])

  const inputHandler = (e) => {
    const type = e.target.id
    if (type == 'id') {
      setUserId(e.target.value) 
    } else if (type == 'pw') {
      setUserPw(e.target.value) 
    } else if (type == 'email') {
      setUserEmail(e.target.value) 
    } else if (type == 'repw') {
      setUserRePw(e.target.value) 
    } 
  }

  const joinSubmit = async () => {
    const data = await axios.post(backAddress + '/login', {'user_id': userId, "user_pw": userPw, 'e_mail': userEmail}, {
      withCgreenentials: true
    })
    if (data.data.state == 'already join user') {
      alert("이미 가입되어 있습니다.")
    } else if (data.data.state == 'join user') {
      alert("가입되었습니다.")
      router.push(frontAddress + '/')
    } else if (data.data.state == 'null data') {
      alert("null")
    }
  }

  return (
  <div className='flex justify-center'>
    <div className="container max-w-sm mx-auto bg-white border-2 rounded-xl shadow-lg m-5 p-5">
      <div className='flex justify-center py-4 text-lg'>
        회원가입
      </div>
      <div className="flex flex-col space-y-3 justify-items-center">
        <input 
        className='border-solid border-2 border-gray-400 rounded-md' 
        id='id'
        placeholder='Enter Your ID'  
        onChange={(e) => inputHandler(e)}/>
        <input 
        className='border-solid border-2 border-gray-400 rounded-md' 
        id='pw'
        placeholder='Enter Your Password' 
        onChange={(e) => inputHandler(e)}/>
        <input 
        className='border-solid border-2 border-gray-400 rounded-md' 
        id='repw' 
        placeholder='Re Enter New Password' 
        onChange={(e) => inputHandler(e)}/>
      <div className='text-xs text-red-500' id='pwAlarm'></div>
        <input 
        className='border-solid border-2 border-gray-400 rounded-md' 
        id='email'
        placeholder='Enter Your E-Mail' 
        onChange={(e) => inputHandler(e)}/>
        <button 
        className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"    
        onClick={() => joinSubmit()}>회원가입</button>
      </div>
    </div>
  </div>            
  )
}

export default Join