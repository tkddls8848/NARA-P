import TodaySearchBar from '../component/todayComponent/todaySearchBar'
import TodaySajeon from '../component/todayComponent/todaySajeon'
import axios from 'axios'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import NoData from '../component/staticComponent/nodata'

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
  const departList = ctx.req.query
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

const ShowTodaySajeon = ({toServer}) => {
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
    <TodaySearchBar></TodaySearchBar>
    <div className="h-full w-full grid gap-4 grid-cols-3 grid-rows-3">
      {isdata ?
              tasks.map((task) => (
                <div key={task.refNo}>
                  <TodaySajeon task={task}></TodaySajeon>
                </div>
                )) :
                <NoData/>
      }
      </div>
    </div>
  )
}

export default ShowTodaySajeon