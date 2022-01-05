import Link from 'next/link'

const SajeonTask = ({task}) => (
        <div key={task.prdctClsfcNoNm}>
          <ul>
            <li>유형 : {task.bsnsDivNm}</li>
            <li>기관명 : {task.rlDminsttNm}</li>
            <li>사업명 : {task.prdctClsfcNoNm}</li>
            <li>접수등록 : {task.rcptDt}</li>
            <li>마감 : {task.opninRgstClseDt}</li>
            <li>배정예산 : {task.bfSpecRgstNo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</li>
            <li>파일 : <Link href={task.specDocFileUrl1}>다운로드 링크</Link></li>
          </ul>
        </div>
      )

export default SajeonTask