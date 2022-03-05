import axios from 'axios'
import { useState, useEffect } from 'react'

const backAddress = process.env.BACK_URL

const TaskSajeon = ({task, user}) => {
  const userId = user
  const [taskTitle, setTaskTitle] = useState('')
  const [departName, setDepartName] = useState('')
  const [registerDate, setRegisterDate] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [downloadLink, setDownloadLink] = useState('')
  const [isNew, setIsNew] = useState('')

  useEffect(() => {
    setTaskTitle(task.prdctClsfcNoNm)
    setDepartName(task.rlDminsttNm)
    setRegisterDate(task.rcptDt)
    setCloseDate(task.opninRgstClseDt)
    setDownloadLink(task.specDocFileUrl1)
    setIsNew(task.isNew)
  }, [])

  const saveTask = async () => {
    await axios.post(backAddress + '/usertask', {'user_id': userId, 'task_type': 'sajeon', 'task_title': taskTitle})
    alert('"' + taskTitle + '"' + ' 사업이 저장 되었습니다.')
  }

  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top" key={ taskTitle + departName + registerDate }>
        <div className="text-xl font-medium text-black" key={taskTitle}>{taskTitle}</div>
        <p className="text-slate-500">기관명 : {departName}</p>
        <p className="text-slate-500">등록일 : {registerDate}</p>
        <p className="text-slate-500">마감일 : {closeDate}</p>
        <p className="text-slate-500">다운로드1 : <a href= {downloadLink}>다운로드</a></p>
        <p className="text-slate-500">최신여부 : {isNew.toString()}</p>
        <button 
        className="m-1 inline-block px-3 py-1.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => saveTask()}>저장</button>
      </span>
    </div>
  )
}

export default TaskSajeon