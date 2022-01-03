import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Page from './datas'

export default  function Home({posts}) {
  const data = posts.response.body.items

  return (
    <div className={styles.container}>
      <ul>
        {data.map(data => (
          <div key={data.bfSpecRgstNo}>
            <br/>
              <li>기관명 : {data.rlDminsttNm}</li>
              <li>사업명 : {data.prdctClsfcNoNm}</li>
              <li>접수등록 : {data.rcptDt}</li>
              <li>마감 : {data.opninRgstClseDt}</li>
              <li>배정예산 : {data.asignBdgtAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</li>
              <li>파일 : <Link to={data.specDocFileUrl1}>다운로드 링크</Link></li>
              <li>파일 : <Link to={data.specDocFileUrl2}>다운로드 링크</Link></li>
              <li>파일 : <Link to={data.specDocFileUrl3}>다운로드 링크</Link></li>
              <li>파일 : <Link to={data.specDocFileUrl4}>다운로드 링크</Link></li>
              <li>파일 : <Link to={data.specDocFileUrl5}>다운로드 링크</Link></li>
            <br/>
          </div>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const api = await fetch("http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng?serviceKey=93KBnFsKzHe%2FGK1nzHq0z04qOkgHolPfnWuGBvSoxMuJ3XW4%2F6FguYCmerWsd2Sf6tV4supaKu9y5ng2Nf7KhA%3D%3D&numOfRows=10&pageNo=1&inqryBgnDt=202112150000&inqryEndDt=202112240000&rlDminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8&type=json")

  const posts = await api.json()
  return {
    props: {
      posts: posts
    }
  }
}