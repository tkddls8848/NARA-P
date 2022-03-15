import { useState, useEffect } from 'react'

const TodayBone = ({task}) => {
  const [taskNumber, setTaskNumber] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [departName, setDepartName] = useState('')
  const [registerDate, setRegisterDate] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [downloadLink, setDownloadLink] = useState('')
  const [isNew, setIsNew] = useState('')

  useEffect(() => {
    setTaskNumber(task.bidNtceNo)
    setTaskTitle(task.bidNtceNm)
    setDepartName(task.dminsttNm)
    setRegisterDate(task.bidNtceDt)
    setCloseDate(task.bidClseDt)
    setDownloadLink(task.ntceSpecDocUrl1)
    setIsNew(task.isNew)
  }, [])

  return (
    <div className="h-full p-2 bg-white rounded-xl border-2 border-green-400 shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top"  key={taskNumber + departName + taskTitle}>
        <div className="text-xl font-medium text-black" key={taskTitle}>(본공고) {taskTitle}</div>
        <p className="text-slate-500">기관명 : {departName}</p>
        <p className="text-slate-500">접수등록 : {registerDate}</p>
        <p className="text-slate-500">파일링크1 : <a underline="hover" href={downloadLink}>다운로드 링크</a></p>
      </span>
    </div>
  )
}

export default TodayBone