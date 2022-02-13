import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

const Modify = () => {
  //임시
  const [userId, setUserId] = useState('1234')
  const [userPw, setUserPw] = useState('1234')
  const [userEmail, setUserEmail] = useState('test@tes.com')
  const [userStatus, setUserStatus] = useState('registered user')    
  const router = useRouter()

    const idHandler = (e) => {
      setUserId(e.target.value)
    }
    const pwHandler = (e) => {
      setUserPw(e.target.value)
    }
    const emailHandler = (e) => {
      setUserEmail(e.target.value)
    }
    const modifySubmit = async () => {
      console.log('rrrrrrr')
      await axios.patch(backAddress + '/login/modify', {'id': userId, "password": userPw, 'email': userEmail, 'status': 'registered user'})      
      router.push(frontAddress + '/userLogin/login')
    }

    return (
        <div className="flex flex-col space-y-2 m-4">
        MODI FORM
        <input 
        className='border-solid border-2 border-black' 
        id='id' 
        defaultValue={userId}
        placeholder='ID' 
        onKeyUp={(key) => idHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        defaultValue={userPw}
        placeholder='PW' 
        onKeyUp={(key) => pwHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='email' 
        defaultValue={userEmail}
        placeholder='EMAIL' 
        onKeyUp={(key) => emailHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {modifySubmit()}}>Modify</button>     
      </div>
      
    )
}

export default Modify