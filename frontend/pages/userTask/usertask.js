import axios from "axios"
import testData from './testData'
import userTaskComponent from '../component/userTaskComponent/userTaskComponent'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL


export const getServerSideProps = async (ctx) => {
//  await axios.post(backAddress + '/userTask/save', {UserId:'GUEST', TaskType: 'sajeon', TaskData: testData})
  await axios.get(backAddress + '/userTask/load/GUEST')

  const state = 'sta123te'
  return{
    props:{
      state
    }
  }
}

const usertask = ({state}) => {
  console.log(state)
    return(
      <div className="flex flex-col w-1/5">
        <button className="m-4 bg-gray-500">dataget</button>
        <button className="m-4 bg-red-500">datadel</button>
      </div>
    )
  }

export default usertask