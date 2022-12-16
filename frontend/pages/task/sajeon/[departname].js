import SearchBar from '../../component/taskComponent/taskSearchBar'
import SajeonTask from '../../component/taskComponent/taskSageon'
import NoData from '../../component/staticComponent/noData'
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
  const pName = encodeURI(ctx.query.departname)
  const beginDate = ctx.query.beginDate
  const endDate = ctx.query.endDate
  const fromServer = await axios.get(backAddress+'/task/sajeon/' + pName + '?beginDate=' + beginDate + '&endDate=' + endDate)
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

const SajeonComponent = ({toServer, user}) => {
  const [tasks, setTasks] = useState(toServer)
  const [isdata, setIsdata] = useState(true)

  useEffect(() => {
    if(tasks.length == 0) {
      setIsdata(false)
    }
  }, [tasks])
  
  return (
    <div>
    <SearchBar address={frontAddress}></SearchBar>
      {isdata ? 
      <div className="h-full w-full p-4 grid gap-2 grid-cols-4">
        {tasks.map((task) => (
        <div key={task.refNo}>
          <SajeonTask task={task} user={user}></SajeonTask>
        </div> ))}
      </div> :
      <NoData />}
    </div>
  )
}

export default SajeonComponent