import Link from "next/link"
import { useEffect, useState } from "react"

const SajeonTask = ({task}) => {
  const [flag, setFlag] = useState('NEW')
  const isNew = task.isNew
  
  useEffect((isNew) => {
    isNew ? setFlag('NEW') : setFlag('NOT NEW')
  }, [isNew])

  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top">
        <div className="text-xl font-medium text-black" key={task.prdctClsfcNoNm}>{task.prdctClsfcNoNm}</div>
        <p className="text-slate-500" key={task.rlDminsttNm}>기관명 : {task.rlDminsttNm}</p>
        <p className="text-slate-500" key={task.rcptDt}>사전공고 등록일 : {task.rcptDt}</p>
        <p className="text-slate-500" key={task.opninRgstClseDt}>공고 마감일 : {task.opninRgstClseDt}</p>
        <p className="text-slate-500" key={task.specDocFileUrl1}>다운로드1 : <Link href= {task.specDocFileUrl1}>다운로드</Link></p>
        <p className="text-slate-500" key={task.isNew}>최신공고 : {flag}</p>
      </span>
    </div>
  )
}

export default SajeonTask