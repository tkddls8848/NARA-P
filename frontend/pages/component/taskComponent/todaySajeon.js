import axios from 'axios'
import { useState, useEffect } from 'react'

const backAddress = process.env.BACK_URL

const TodaySajeon = ({task}) => {
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

  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top" key={ taskTitle + departName + registerDate }>
        <div className="text-xl font-medium text-black" key={taskTitle}>{taskTitle}</div>
        <p className="text-slate-500">기관명 : {departName}</p>
        <p className="text-slate-500">등록일 : {registerDate}</p>
        <p className="text-slate-500">마감일 : {closeDate}</p>
        <p className="text-slate-500">다운로드1 : <a href= {downloadLink}>다운로드</a></p>
        <p className="text-slate-500">최신여부 : {isNew.toString()}</p>
      </span>
    </div>
  )
}

export default TodaySajeon