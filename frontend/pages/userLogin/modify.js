import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import jwt from 'jsonwebtoken'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req.cookies
  const uid = jwt.decode(cookie.userCookie)

  return {
      props: {
        uid
      }
  }
}

const Modify = ({uid}) => {
  //임시
  const [userId, setUserId] = useState(uid.userId)
  const [userPw, setUserPw] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

    const pwHandler = (e) => {
      setUserPw(e.target.value)
    }
    const emailHandler = (e) => {
      setUserEmail(e.target.value)
    }
    const modifySubmit = async () => {
      console.log('rrrrrrr')
      let data = await axios.patch(backAddress + '/login/modify', {'id': userId, "password": userPw, 'email': userEmail}, {
        withCredentials: true
      })
      const tmp = data.data
      const tokendecode = jwt.decode(tmp.token)
      console.log('tokenCheck', tokendecode)
      router.push(frontAddress + '/userLogin/login')
    }

    return (
        <div className="flex flex-col space-y-2 m-4">
        MODI FORM
        <input 
        className='border-solid border-2 border-gray-200' 
        id='id' 
        defaultValue={userId}
        placeholder='ID' disabled/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        defaultValue={userPw}
        placeholder='Enter New Password' 
        onChange={(key) => pwHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='email' 
        defaultValue={userEmail}
        placeholder='Enter New E-Mail' 
        onChange={(key) => emailHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {modifySubmit()}}>Modify</button>     
      </div>
      
    )
}

export default Modify