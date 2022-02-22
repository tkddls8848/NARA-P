import axios from "axios"
import UserTasks from "../component/userTaskComponent/userTasks"
import jwt from 'jsonwebtoken'
import UserTaskSearch from "../component/userTaskComponent/userTaskSearch"

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL


export const getServerSideProps = async (ctx) => {
  const jwtCookie = ctx.req.cookies.userCookie
  const decodeCookie = jwt.decode(jwtCookie)
  const user = decodeCookie.userId
  const data = await axios.get(backAddress + '/userTask/load/' + user)
  const toData = data.data.result
  console.log('toData', toData)
  return{
    props:{
      toData
    }
  }
}

export default  function usertask({toData}) {
    return(
      <div className="flex flex-col w-1/2">
        <UserTaskSearch></UserTaskSearch>
        {toData.length == 0 ? 
          <div className="">No data</div> :
          toData.map((d) => (
            <UserTasks usertasks={d} key={d[2]}></UserTasks>
          ))
        }
      </div>
    )
  }
