import axios from "axios"
import UserTasks from "../component/userTaskComponent/userTasks"
import jwt from 'jsonwebtoken'
import NoData from "../component/staticComponent/noData"

const backAddress = process.env.BACK_URL

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
  const decodeCookie = jwt.decode(jwtCookie)
  const user = decodeCookie.userId
  const data = await axios.get(backAddress + '/usertask/' + user)
  const toData = data.data.result
  
  return{
    props:{
      toData
    }
  }
}

const UserTask = ({ toData }) => {
  return(
    <div>
      {toData.length == 0 ? 
      <NoData /> :
      <div className="grid grid-cols-2 grid-flow-row gap-x-2">
        {toData.map((d) => (
          <UserTasks usertasks={d} key={d[2]}/>
        ))}
      </div>}
    </div>
  )
}

export default UserTask
