import Link from "next/link"
import axios from 'axios'

const backAddress = process.env.BACK_URL

const userTaskComponent = ({task}) => {
  const isNew = task.isNew

  const deleteTask = (e) => {

  }

  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top">
        <div className="text-xl font-medium text-black" key={task.prdctClsfcNoNm}>{task.prdctClsfcNoNm}</div>
        <button onClick={() => deleteTask(task)}>삭제</button>
      </span>
    </div>
  )
}

export default userTaskComponent