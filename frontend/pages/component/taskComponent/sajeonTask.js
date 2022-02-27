import Link from "next/link"
import axios from 'axios'

const backAddress = process.env.BACK_URL

const SajeonTask = ({task, user}) => {
  const isNew = task.isNew
  const taskTitle = task.prdctClsfcNoNm
  const userId = user
  const saveTask = async () => {
    await axios.post(backAddress + '/userTask/save/', {'UserId': userId, 'TaskType': 'sajeon', 'TaskTitle': taskTitle})
    alert('"' + taskTitle + '"' + ' 사업이 저장 되었습니다.')
  }

  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top">
        <div className="text-xl font-medium text-black" key={task.prdctClsfcNoNm}>{task.prdctClsfcNoNm}</div>
        <p className="text-slate-500" key={task.rlDminsttNm}>기관명 : {task.rlDminsttNm}</p>
        <p className="text-slate-500" key={task.rcptDt}>등록일 : {task.rcptDt}</p>
        <p className="text-slate-500" key={task.opninRgstClseDt}>마감일 : {task.opninRgstClseDt}</p>
        <p className="text-slate-500" key={task.specDocFileUrl1}>다운로드1 : <Link href= {task.specDocFileUrl1}>다운로드</Link></p>
        <p className="text-slate-500" key={task.isNew}>최신여부 : {isNew.toString()}</p>
        <button 
        className="m-1 inline-block px-3 py-1.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => saveTask()}>저장</button>
      </span>
    </div>
  )
}

export default SajeonTask