import axios from 'axios'
import { useRouter } from 'next/router'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

const UserTasks = ({usertasks}) => {
  const contentNumber = usertasks[3]
  const router = useRouter()

  const deleteTask = async () => {
    console.log(contentNumber)
    await axios.delete(backAddress + '/userTask/delete/' + contentNumber)
    router.push(frontAddress + '/userTask/usertask')
  }

  return (
    <div className="flex-col m-3 p-4 bg-white rounded-xl shadow-lg items-left" key={usertasks[0] + usertasks[3]}>
      <p key={usertasks[3] + usertasks[0]}>유저명 : {usertasks[0]}</p>
      <p key={usertasks[3] + usertasks[1]}>업무 타입 : {usertasks[1]}</p>
      <p key={usertasks[3] + usertasks[2]}>업무명 : {usertasks[2]}</p>
      <button 
      className="m-1 inline-block px-3 py-1.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={() => deleteTask()}>삭제</button>
    </div>
  )
}

export default UserTasks