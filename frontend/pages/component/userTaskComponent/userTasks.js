import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

const UserTasks = ({usertasks}) => {
  const [userName, setUserName] = useState('')
  const [taskType, setTaskType] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const router = useRouter()

  useEffect(() => {
    setUserName(usertasks[0])
    usertasks[1] == 'sajeon' ? setTaskType('사전공고') : setTaskType('본공고') 
    setTaskTitle(usertasks[2])
    setUserNumber(usertasks[3])
  }, [usertasks])

  const deleteTask = async () => {
    await axios.delete(backAddress + '/usertask/' + userNumber)
    alert('삭제되었습니다.')
    router.push(frontAddress + '/usertask')
  }

  return (
    <div className="m-3 p-4 bg-white rounded-lg border-2 border-gray-300" key={userName + userNumber}>
      <p>유저명 : {userName}</p>
      <p>업무 타입 : {taskType}</p>
      <p>업무명 : {taskTitle}</p>
      <button 
      className="inline-block px-3 py-2 mt-2 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={() => deleteTask()}>삭제</button>
    </div>
  )
}

export default UserTasks