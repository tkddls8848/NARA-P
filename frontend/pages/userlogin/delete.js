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

const Delete = ( {uid} ) => {
  const userId = uid.userId
  const router = useRouter()
  
  const deleteSubmit = async () => {
    await axios.delete(backAddress + '/login/' +  userId, {
      withCredentials: true
    })
    alert('삭제되었습니다.')
    router.push(frontAddress + '/')
  }

  return (
    <div className='flex justify-center'>
      <div className="container max-w-sm mx-auto bg-white border-2 rounded-xl shadow-lg m-5 p-5">
        <div className='flex justify-center py-4 text-lg'>
          탈퇴확인
        </div>
        <div className="flex flex-col space-y-3 justify-items-center">
          <label className=''>{userId}님의 계정을 삭제하시겠습니까?</label>
          <button 
          className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"    
          onClick={() => deleteSubmit()}>회원탈퇴</button>
        </div>
      </div>
    </div>
  )
}

export default Delete