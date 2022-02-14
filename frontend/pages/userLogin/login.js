import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default function Login({toUser}) {

  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  const loginSubmit = async () => {
    console.log("SUBMIT", userId, userPw)
    let data = await axios.post(backAddress + '/login/logincheck', {'id': userId, 'pw': userPw}, {
      withCredentials: true
    })
    const tmp = data.data
    const tokendecode = jwt.decode(tmp.token)
    console.log('tokenCheck', tokendecode)
    router.push(frontAddress + '/')
  }

  return (
    <div className="flex flex-col space-y-2 m-4">
    LOGIN FORM
    <input 
    className='border-solid border-2 border-black' 
    id='id' 
    defaultValue={userId}
    placeholder='ID' 
    onChange={(e) => setUserId(e.target.value)}/>
    <input 
    className='border-solid border-2 border-black' 
    id='pw' 
    defaultValue={userPw}
    placeholder='PW' 
    onChange={(e) => setUserPw(e.target.value)}/>
    <input 
    className='border-solid border-2 border-black' 
    id='state' 
    defaultValue={userEmail}
    placeholder='Email' 
    onChange={(e) => setUserEmail(e.target.value)}/>
    <button 
    type='button'
    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {loginSubmit()}}>LOGIN</button>      
    <button 
    type="button" 
    className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {router.push(frontAddress + '/userLogin/join')}}>JOIN</button>
    <button 
    type='button'
    className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {router.push(frontAddress + '/userLogin/modify')}}>modify</button>
    <button 
    type='button'
    className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {router.push(frontAddress + '/userLogin/delete')}}>delete</button>
  </div>      
)
}