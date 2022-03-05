import TodaySearchBar from '../component/todayComponent/todaySearchBar'
import TodaySajeon from '../component/todayComponent/todaySajeon'
import axios from 'axios'
import { useState } from 'react'
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
  const fromServer = await axios.post(backAddress+'/task/sajeon', {'departList' : departList})
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

const ShowTodaySajeon = ({toServer, user}) => {
  const [tasks, setTasks] = useState(toServer)
  const [isdata, setIsdata] = useState(true)

  console.log(toServer)
  
  return (
    <div>
    <TodaySearchBar address={frontAddress}></TodaySearchBar>
    <div className="h-full w-full grid gap-4 grid-cols-3 grid-rows-3">
        {tasks.map((task) => (
        <div key={task.refNo}>
          <TodaySajeon task={task}></TodaySajeon>
        </div>
        ))}
      </div>
    </div>
  )
}

export default ShowTodaySajeon