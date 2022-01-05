import Link from 'next/link'

const BoneTask = ({task}) => (
    <div key={task.dminsttNm}>
      <ul>
        <li>기관명 : {task.dminsttNm}</li>
        <li>사업명 : {task.bidNtceNm}</li>
        <li>접수등록 : {task.bidNtceDt}</li>
        <li>마감 : {task.bidClseDt}</li>
        <li>파일 : <Link href={task.ntceSpecDocUrl1}>다운로드 링크</Link></li>
      </ul>  
    </div>
  )

export default BoneTask