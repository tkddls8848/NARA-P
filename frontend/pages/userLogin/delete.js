import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import jwt from 'jsonwebtoken'
import cookies from 'next-cookies'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req.cookies
  const uid = jwt.decode(cookie.userCookie)
  const allCookies = cookies(ctx).userCookie
  console.log('allCookies', allCookies)
  return {
      props: {
        uid
      }
  }
}

const Delete = ({uid}) => {
  const [userId, setUserId] = useState(uid.userId)
  const router = useRouter()
  
  const deleteSubmit = async () => {

    console.log('deleteSubmit', userId)
    console.log("delete", backAddress + '/login/delete/' + '?userId=' + userId)
    let data = await axios.post(backAddress + '/login/delete', {'id': userId}, {
      withCredentials: true
    })    
    router.push(frontAddress + '/userLogin/login')
  }

  return (
    <div className="flex flex-col space-y-2 m-4">
    DELE FORM
    <input 
    className='border-solid border-2 border-gray-200' 
    id='id' 
    defaultValue={userId}
    placeholder='ID' disabled/>
    <button 
    type='button'
    className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {deleteSubmit()}}>DELETE</button>     
  </div>
  );
}

export default Delete