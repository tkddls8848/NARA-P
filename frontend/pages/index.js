import Link from 'next/link'


let today = new Date()
let yyyy = today.getFullYear()
let mm = today.getMonth()+1
let dd = today.getDate()
if(dd<10) {
  dd+='0'
} 

if(mm<10) {
  mm +='0'
} 
today = yyyy + mm + dd + "0000";

console.log(today)
  
export default  function Home({posts}) {
  const rowdatas = posts
  console.log("POST", rowdatas[0])
  
  let newdatas = []
  for(let i = 0 ; i < rowdatas.length ; i++) {
    if(rowdatas[i].totalCount != 0) {
      newdatas.push(rowdatas[i])
    }
  }  
  console.log("OLD", rowdatas)
  console.log("NEW", newdatas)

  return (
    <div>
      <ul>
        {rowdatas.map(data => (
          <div key={data.bfSpecRgstNo}>
            <br/>
              <li>기관명 : {data.rlDminsttNm}</li>
              <li>사업명 : {data.prdctClsfcNoNm}</li>
              <li>접수등록 : {data.rcptDt}</li>
              <li>마감 : {data.opninRgstClseDt}</li>
              <li>배정예산 : {data.bfSpecRgstNo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</li>
              <li>파일 : <Link to={data.specDocFileUrl1}>다운로드 링크</Link></li>
            <br/>
          </div>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {

  /*건보 물품*/
  const api = await fetch('http://localhost:5000/sajeon')
  const posts = await api.json()

  return {
    props: {
      posts: [posts]
    }
  }
}