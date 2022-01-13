import '../styles/globals.css'
import Footer from '../component/footer'
import Header from '../component/header'
import { useState, useEffect } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
  })

  return (
    <>
      <Head>
        <title>나라장터 검색 웹 페이지</title>
      </Head>
      <Header></Header>
      {loading ? (<Component {...pageProps}/>) : (<div>LOAD</div>)}      
      <Footer></Footer>
    </>
  )


}

export default MyApp
