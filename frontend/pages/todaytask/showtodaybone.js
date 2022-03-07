import TodaySearchBar from '../component/todayComponent/todaySearchBar'
import TodayBone from '../component/todayComponent/todayBone'
import axios from 'axios'
import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export const getServerSideProps = async (ctx) => {
  const jwtCookie = ctx.req.cookies.userCookie
  if (!jwtCookie) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const departList = ctx.req.query.departNames
  console.log('ctx', departList)
  const fromServer = await axios.post(backAddress+'/task/bone', {'departList' : departList})
  const toServer = fromServer.data
  const decodeCookie = jwt.decode(jwtCookie)
  const user = decodeCookie.userId
  return {
    props: {
      toServer,
      user
    }
  }
}

const ShowTodayBone = ({toServer, user}) => {
  const [tasks, setTasks] = useState(toServer)
  const [isdata, setIsdata] = useState(true)

  console.log(toServer)
  useEffect(() => {
    if(tasks.length == 0) {
      setIsdata(false)
    }
  }, [tasks])
  
  return (
    <div>
    <TodaySearchBar address={frontAddress}></TodaySearchBar>
    <div className="h-full w-full grid gap-4 grid-cols-3 grid-rows-3">
    {isdata ?
              tasks.map((task) => (
                <div key={task.refNo}>
                  <TodayBone task={task} />
                </div>
                )) :
                <NoData />
      }
      </div>
    </div>
  )
}

export default ShowTodayBone