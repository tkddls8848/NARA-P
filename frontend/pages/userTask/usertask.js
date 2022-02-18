import axios from "axios"
import UserTasks from "../component/userTaskComponent/userTasks"
import jwt from 'jsonwebtoken'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL


export const getServerSideProps = async (ctx) => {

  const jwtCookie = ctx.req.cookies.userCookie
  console.log('data', jwtCookie)
  const decodeCookie = jwt.decode(jwtCookie)
  console.log('data', decodeCookie)
  const user = decodeCookie.userId
  const data = await axios.get(backAddress + '/userTask/load/' + user)
  const toData = data.data.result
  return{
    props:{
      toData
    }
  }
}

export default  function usertask({toData}) {
  console.log(toData)
    return(
      <div className="flex flex-col w-1/2">
        {toData.length == 0 ? 
          <div className="">No data</div>
          :
          toData.map((d) => (
            <UserTasks usertasks={d} key={d[2]}></UserTasks>
          ))
        }
      </div>
    )
  }
