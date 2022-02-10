import Link from "next/link"

const BoneTask = ({task}) => {
  const [flag, setFlag] = useState('NEW')
  const isNew = task.isNew
  
  useEffect((isNew) => {
    isNew ? setFlag('NEW') : setFlag('NOT NEW')
  }, [isNew])
  
  return (
    <div className="h-full p-4 bg-white rounded-xl shadow-lg flex items-center space-x-3">
      <span className="inline-block align-top">
        <div className="text-xl font-medium text-black" key={task.prdctClsfcNoNm}>{task.prdctClsfcNoNm}</div>
        <p className="text-slate-500" key={task.bidNtceNo + task.dminsttNm}>기관명 : {task.dminsttNm}</p>
        <p className="text-slate-500" key={task.bidNtceNo + task.bidNtceNm}>사업명 : {task.bidNtceNm}</p>
        <p className="text-slate-500" key={task.bidNtceNo + task.bidNtceDt}>접수등록 : {task.bidNtceDt}</p>
        <p className="text-slate-500" key={task.bidNtceNo + task.bidClseDt}>마감 : {task.bidClseDt}</p>
        <p className="text-slate-500" key={task.bidNtceNo + task.ntceSpecDocUrl1}>파일링크1 : <Link underline="hover" href={task.ntceSpecDocUrl1}>다운로드 링크</Link></p>
        </span>
    </div>
  )
}

export default BoneTask